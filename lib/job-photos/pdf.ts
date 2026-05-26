import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { createAdminClient } from "@/lib/supabase";
import { STORAGE_BUCKET, formatPropertyDate, type PhotoSession, type SessionPhoto } from "./index";

// Page geometry (letter, in points: 72pt = 1in)
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

// Capitol Shine palette translated to PDF rgb (0-1)
const NAVY     = rgb(0.090, 0.149, 0.247); // #17243f
const INK      = rgb(0.047, 0.082, 0.161); // #0c1529
const MUTED    = rgb(0.365, 0.388, 0.447); // #5d6372
const GOLD     = rgb(0.780, 0.604, 0.227); // #c79a3a
const PAPER_BG = rgb(0.984, 0.973, 0.953); // #fbf8f3
const LINE     = rgb(0.090, 0.149, 0.247); // navy at low alpha drawn separately
const WHITE    = rgb(1, 1, 1);

interface PdfArgs {
  session: PhotoSession;
  beforePhotos: SessionPhoto[];
  afterPhotos: SessionPhoto[];
}

export async function generatePhotoReportPdf({ session, beforePhotos, afterPhotos }: PdfArgs): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold    = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic  = await doc.embedFont(StandardFonts.HelveticaOblique);

  const admin = createAdminClient();

  // Helper: fetch the photo as bytes from Supabase Storage
  async function fetchPhoto(p: SessionPhoto): Promise<{ image: PDFImage; w: number; h: number } | null> {
    const { data, error } = await admin.storage.from(STORAGE_BUCKET).download(p.storage_path);
    if (error || !data) {
      console.error("Failed to download", p.storage_path, error);
      return null;
    }
    const buf = new Uint8Array(await data.arrayBuffer());
    let image: PDFImage;
    if (p.storage_path.toLowerCase().endsWith(".png")) {
      image = await doc.embedPng(buf);
    } else {
      // Default to JPEG (also covers .jpg from our client-side resize step)
      image = await doc.embedJpg(buf);
    }
    return { image, w: image.width, h: image.height };
  }

  // ─── Cover page ───────────────────────────────────────────────────────────
  const cover = doc.addPage([PAGE_W, PAGE_H]);

  // Header band
  cover.drawRectangle({ x: 0, y: PAGE_H - 140, width: PAGE_W, height: 140, color: NAVY });
  cover.drawText("CAPITOL SHINE", {
    x: MARGIN, y: PAGE_H - 64,
    size: 11, font: fontBold, color: GOLD,
  });
  cover.drawText("Before & After Cleaning Report", {
    x: MARGIN, y: PAGE_H - 100,
    size: 22, font: fontBold, color: WHITE,
  });
  cover.drawText("Professional cleaning, documented", {
    x: MARGIN, y: PAGE_H - 122,
    size: 11, font: fontItalic, color: WHITE,
  });

  // Body details
  let y = PAGE_H - 200;
  const drawDetail = (label: string, value: string) => {
    cover.drawText(label.toUpperCase(), { x: MARGIN, y, size: 8, font: fontBold, color: MUTED });
    y -= 14;
    cover.drawText(value, { x: MARGIN, y, size: 14, font: fontRegular, color: INK });
    y -= 28;
  };
  drawDetail("Property", session.property_address);
  drawDetail("Service Date", formatPropertyDate(session.service_date));
  drawDetail("Cleaned by", session.cleaner_name ?? "(not provided)");
  drawDetail("Report Generated", new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));

  // Photo counts summary
  y -= 8;
  cover.drawLine({
    start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y },
    thickness: 0.6, color: rgb(0.85, 0.85, 0.88),
  });
  y -= 24;
  cover.drawText("Photos in this report", { x: MARGIN, y, size: 10, font: fontBold, color: NAVY });
  y -= 18;
  cover.drawText(`${beforePhotos.length} before · ${afterPhotos.length} after`, {
    x: MARGIN, y, size: 13, font: fontRegular, color: INK,
  });

  // Footer on cover
  drawFooter(cover, fontRegular);

  // ─── Photo sections ───────────────────────────────────────────────────────
  await drawPhotoSection(doc, "BEFORE", beforePhotos, fontRegular, fontBold, fetchPhoto);
  await drawPhotoSection(doc, "AFTER",  afterPhotos,  fontRegular, fontBold, fetchPhoto);

  const bytes = await doc.save();
  return bytes;
}

async function drawPhotoSection(
  doc: PDFDocument,
  title: string,
  photos: SessionPhoto[],
  fontRegular: PDFFont,
  fontBold: PDFFont,
  fetchPhoto: (p: SessionPhoto) => Promise<{ image: PDFImage; w: number; h: number } | null>,
): Promise<void> {
  if (photos.length === 0) {
    // Still emit a section page noting "no photos" so the report explicitly
    // shows the section even when the cleaner didn't upload any.
    const page = doc.addPage([PAGE_W, PAGE_H]);
    drawSectionHeader(page, title, 0, fontBold, fontRegular);
    page.drawText("No photos uploaded for this section.", {
      x: MARGIN, y: PAGE_H - 220,
      size: 11, font: fontRegular, color: MUTED,
    });
    drawFooter(page, fontRegular);
    return;
  }

  // Layout: 2 columns × 3 rows per page = 6 photos. Each cell is roughly
  // (CONTENT_W - gap)/2 wide × ~210pt tall (3:2 aspect-ish).
  const COLS = 2;
  const ROWS = 3;
  const PER_PAGE = COLS * ROWS;
  const GAP_X = 14;
  const GAP_Y = 18;
  const HEADER_H = 110;
  const CELL_W = (CONTENT_W - GAP_X * (COLS - 1)) / COLS;
  const CELL_H = (PAGE_H - HEADER_H - MARGIN - 40 - GAP_Y * (ROWS - 1)) / ROWS;

  for (let i = 0; i < photos.length; i += PER_PAGE) {
    const slice = photos.slice(i, i + PER_PAGE);
    const page = doc.addPage([PAGE_W, PAGE_H]);
    drawSectionHeader(page, title, photos.length, fontBold, fontRegular);

    for (let j = 0; j < slice.length; j++) {
      const photo = slice[j];
      const col = j % COLS;
      const row = Math.floor(j / COLS);

      const x = MARGIN + col * (CELL_W + GAP_X);
      const y = PAGE_H - HEADER_H - (row + 1) * CELL_H - row * GAP_Y;

      // Cell background
      page.drawRectangle({
        x, y, width: CELL_W, height: CELL_H,
        color: PAPER_BG,
        borderColor: rgb(0.85, 0.85, 0.88),
        borderWidth: 0.5,
      });

      const fetched = await fetchPhoto(photo);
      if (!fetched) {
        page.drawText("Photo unavailable", {
          x: x + 8, y: y + CELL_H / 2,
          size: 9, font: fontRegular, color: MUTED,
        });
        continue;
      }

      // Fit image inside cell preserving aspect ratio
      const PAD = 6;
      const innerW = CELL_W - PAD * 2;
      const innerH = CELL_H - PAD * 2 - 14; // leave room for caption
      const scale = Math.min(innerW / fetched.w, innerH / fetched.h);
      const drawW = fetched.w * scale;
      const drawH = fetched.h * scale;
      const drawX = x + (CELL_W - drawW) / 2;
      const drawY = y + PAD + 14 + (innerH - drawH) / 2;

      page.drawImage(fetched.image, { x: drawX, y: drawY, width: drawW, height: drawH });

      // Caption inside cell
      const caption = `${title.charAt(0)}${title.slice(1).toLowerCase()} #${i + j + 1}`;
      page.drawText(caption, {
        x: x + PAD, y: y + PAD,
        size: 8, font: fontBold, color: NAVY,
      });
    }

    drawFooter(page, fontRegular);
  }
}

function drawSectionHeader(
  page: PDFPage,
  title: string,
  total: number,
  fontBold: PDFFont,
  fontRegular: PDFFont,
): void {
  // Top band
  page.drawRectangle({ x: 0, y: PAGE_H - 80, width: PAGE_W, height: 80, color: NAVY });
  page.drawText("CAPITOL SHINE · PHOTO REPORT", {
    x: MARGIN, y: PAGE_H - 32,
    size: 9, font: fontBold, color: GOLD,
  });
  page.drawText(title, {
    x: MARGIN, y: PAGE_H - 60,
    size: 22, font: fontBold, color: WHITE,
  });
  if (total > 0) {
    page.drawText(`${total} ${total === 1 ? "photo" : "photos"} total`, {
      x: PAGE_W - MARGIN - 100, y: PAGE_H - 60,
      size: 10, font: fontRegular, color: rgb(1, 1, 1),
    });
  }
}

function drawFooter(page: PDFPage, font: PDFFont): void {
  page.drawText("capitolshinecleaners.com · 703-375-9132 · hello@capitolshinecleaners.com", {
    x: MARGIN, y: 24,
    size: 8, font, color: MUTED,
  });
}
