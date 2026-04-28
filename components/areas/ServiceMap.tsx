"use client";

import { useEffect, useState } from "react";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

type ServiceMapProps = {
  heightClass?: string;
};

export default function ServiceMap({
  heightClass = "h-[400px] md:h-[500px]",
}: ServiceMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-full ${heightClass} rounded-xl bg-gray-200 flex items-center justify-center text-charcoal/50`}>
        Loading map...
      </div>
    );
  }

  return <MapInner heightClass={heightClass} />;
}

function MapInner({ heightClass }: { heightClass: string }) {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const { MapContainer, TileLayer, CircleMarker, Popup } = require("react-leaflet");
  const L = require("leaflet");
  const bounds = NEIGHBORHOODS.map((n) => [n.lat, n.lng]);

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
        bounds={bounds}
        boundsOptions={{ padding: [28, 28] }}
        scrollWheelZoom={false}
        className={`w-full ${heightClass} rounded-xl z-0`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {NEIGHBORHOODS.map((n) => (
          <CircleMarker
            key={n.name}
            center={[n.lat, n.lng]}
            radius={8}
            pathOptions={{
              color: "#1f3152",
              weight: 2,
              fillColor: "#c79a3a",
              fillOpacity: 0.9,
            }}
          >
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
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
}
