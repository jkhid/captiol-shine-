/**
 * PROTOTYPE — Mapbox Voronoi zone map
 * Each neighbourhood centre point generates a Voronoi cell that fills the
 * entire service area with no gaps or overlaps. Labels render on the map.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import * as turf from "@turf/turf";
import { NEIGHBORHOODS, type Neighborhood } from "@/lib/neighborhoods";

// ── Distinct pastel fill per neighbourhood ────────────────────────────────────
const ZONE_COLORS: Record<string, string> = {
  Rosslyn:            "#BDD5EA",
  Courthouse:         "#F5DEB3",
  "Lyon Village":     "#C8E6C9",
  Clarendon:          "#D7B8D8",
  "Virginia Square":  "#FFDAB9",
  Ballston:           "#B2DFDB",
  Cherrydale:         "#F5DEB3",
  Bluemont:           "#C5E1A5",
  "Pentagon City":    "#D7B8D8",
  "Crystal City":     "#B2DFDB",
  "Columbia Pike":    "#BDD5EA",
  Shirlington:        "#FFDAB9",
  McLean:             "#F9C6C9",
  Alexandria:         "#D1C4E9",
  "Falls Church":     "#C8E6C9",
};

// ── Build Voronoi GeoJSON at module load (pure computation, no browser APIs) ──
// Bounding box covers the full visible map area with padding
const SERVICE_BBOX: [number, number, number, number] = [-77.30, 38.74, -76.90, 38.97];

const points = turf.featureCollection(
  NEIGHBORHOODS.map((n) =>
    turf.point([n.lng, n.lat], { name: n.name, description: n.description })
  )
);

const voronoiCells = turf.voronoi(points, { bbox: SERVICE_BBOX });

// Assign neighbourhood properties + numeric id to each cell (order is preserved)
const neighborhoodGeoJSON = {
  type: "FeatureCollection" as const,
  features: voronoiCells.features.map((cell, i) => ({
    ...cell,
    id: i,
    properties: {
      name:        NEIGHBORHOODS[i]?.name        ?? "",
      description: NEIGHBORHOODS[i]?.description ?? "",
      color:       ZONE_COLORS[NEIGHBORHOODS[i]?.name ?? ""] ?? "#E0E0E0",
    },
  })),
};

// Mapbox match expression: name → fill colour
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colorMatchExpr: any[] = ["match", ["get", "name"]];
NEIGHBORHOODS.forEach((n) => colorMatchExpr.push(n.name, ZONE_COLORS[n.name] ?? "#E0E0E0"));
colorMatchExpr.push("#E0E0E0");

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServiceMapMapboxProto() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef    = useRef<any>(null);
  const hoveredId = useRef<number | null>(null);

  const [selected,  setSelected]  = useState<Neighborhood | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled) return;

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-77.091, 38.875],
        zoom: 11.2,
        scrollZoom: false,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
      mapRef.current = map;

      map.on("load", () => {
        map.addSource("hoods", {
          type: "geojson",
          data: neighborhoodGeoJSON,
          generateId: false,
        });

        // ── Fill ─────────────────────────────────────────────────────────────
        map.addLayer({
          id: "hood-fill",
          type: "fill",
          source: "hoods",
          paint: {
            // @ts-expect-error — valid Mapbox expression
            "fill-color": colorMatchExpr,
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "selected"], false], 0.90,
              ["boolean", ["feature-state", "hovered"],  false], 0.75,
              0.55,
            ],
          },
        });

        // ── Borders between cells ─────────────────────────────────────────────
        map.addLayer({
          id: "hood-outline",
          type: "line",
          source: "hoods",
          paint: {
            "line-color": "#ffffff",
            "line-width": [
              "case",
              ["boolean", ["feature-state", "selected"], false], 3,
              1.5,
            ],
            "line-opacity": 0.9,
          },
        });

        // ── Labels on each cell ───────────────────────────────────────────────
        map.addLayer({
          id: "hood-labels",
          type: "symbol",
          source: "hoods",
          layout: {
            "text-field":      ["get", "name"],
            "text-font":       ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
            "text-size":       11,
            "text-anchor":     "center",
            "text-max-width":  8,
          },
          paint: {
            "text-color":      "#1B2A4A",
            "text-halo-color": "rgba(255,255,255,0.8)",
            "text-halo-width": 1.5,
          },
        });

        // ── Hover ─────────────────────────────────────────────────────────────
        map.on("mousemove", "hood-fill", (e) => {
          map.getCanvas().style.cursor = "pointer";
          if (!e.features?.length) return;
          const id = e.features[0].id as number;
          if (hoveredId.current !== null && hoveredId.current !== id) {
            map.setFeatureState({ source: "hoods", id: hoveredId.current }, { hovered: false });
          }
          hoveredId.current = id;
          map.setFeatureState({ source: "hoods", id }, { hovered: true });
        });

        map.on("mouseleave", "hood-fill", () => {
          map.getCanvas().style.cursor = "";
          if (hoveredId.current !== null) {
            map.setFeatureState({ source: "hoods", id: hoveredId.current }, { hovered: false });
            hoveredId.current = null;
          }
        });

        // ── Click ─────────────────────────────────────────────────────────────
        let selectedId: number | null = null;

        map.on("click", "hood-fill", (e) => {
          if (!e.features?.length) return;
          const id   = e.features[0].id as number;
          const name = e.features[0].properties?.name as string;

          if (selectedId !== null) {
            map.setFeatureState({ source: "hoods", id: selectedId }, { selected: false });
          }
          if (selectedId === id) {
            selectedId = null;
            setSelected(null);
            return;
          }
          selectedId = id;
          map.setFeatureState({ source: "hoods", id }, { selected: true });
          setSelected(NEIGHBORHOODS.find((n) => n.name === name) ?? null);
        });

        map.on("click", (e) => {
          const hits = map.queryRenderedFeatures(e.point, { layers: ["hood-fill"] });
          if (!hits.length && selectedId !== null) {
            map.setFeatureState({ source: "hoods", id: selectedId }, { selected: false });
            selectedId = null;
            setSelected(null);
          }
        });

        setMapLoaded(true);
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] md:h-[560px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div ref={mapContainerRef} className="w-full h-full" />

      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-charcoal/40 text-sm">
          Loading map…
        </div>
      )}

      {selected && (
        <div className="absolute bottom-4 left-4 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-bold text-navy text-lg leading-tight">
              {selected.name}
            </h3>
            <button
              onClick={() => setSelected(null)}
              className="p-1 rounded-md hover:bg-gray-100 text-charcoal/40 hover:text-charcoal transition-colors flex-shrink-0 -mt-0.5"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-charcoal/60 mb-4 leading-relaxed">{selected.description}</p>
          <Link
            href="/book"
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors"
          >
            Book in {selected.name}
          </Link>
        </div>
      )}

      {mapLoaded && !selected && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-charcoal/50 shadow-sm border border-gray-100">
          Click a zone to learn more
        </div>
      )}
    </div>
  );
}
