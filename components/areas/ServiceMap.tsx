"use client";

import { useEffect, useState } from "react";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

export default function ServiceMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-xl bg-gray-200 flex items-center justify-center text-charcoal/50">
        Loading map...
      </div>
    );
  }

  return <MapInner />;
}

function MapInner() {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");

  useEffect(() => {
    // Fix default marker icons for Leaflet in Next.js
    delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, [L.Icon.Default]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <MapContainer
        center={[38.8816, -77.091]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-[400px] md:h-[500px] rounded-xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {NEIGHBORHOODS.map((n) => (
          <Marker key={n.name} position={[n.lat, n.lng]}>
            <Popup>
              <strong>{n.name}</strong>
              <br />
              <a
                href="/book"
                className="text-sm text-blue-600 underline"
              >
                Book in {n.name}
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
