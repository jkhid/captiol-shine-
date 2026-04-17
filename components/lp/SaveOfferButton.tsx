"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import SaveOfferModal from "./SaveOfferModal";

interface Props {
  className?: string;
  label?: string;
  iconSize?: number;
  source?: string;
}

export default function SaveOfferButton({
  className,
  label = "Save for later",
  iconSize = 15,
  source = "lp",
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <Bookmark size={iconSize} />
        {label}
      </button>
      <SaveOfferModal open={open} onClose={() => setOpen(false)} source={source} />
    </>
  );
}
