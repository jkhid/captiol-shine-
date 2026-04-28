import { NEIGHBORHOODS } from "@/lib/neighborhoods";

const BOUNDS = {
  north: 38.95,
  south: 38.79,
  west: -77.19,
  east: -77.03,
};

function pointToPercent(lat: number, lng: number) {
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * 100;
  return { x, y };
}

const ACTIVE_PINS = NEIGHBORHOODS.map((neighborhood) => ({
  ...neighborhood,
  ...pointToPercent(neighborhood.lat, neighborhood.lng),
}));

const ARLINGTON_BOUNDARY = [
  [-77.152, 38.915],
  [-77.13, 38.921],
  [-77.101, 38.918],
  [-77.076, 38.904],
  [-77.069, 38.885],
  [-77.073, 38.862],
  [-77.086, 38.838],
  [-77.101, 38.818],
  [-77.118, 38.809],
  [-77.136, 38.814],
  [-77.147, 38.832],
  [-77.152, 38.853],
  [-77.148, 38.877],
  [-77.139, 38.896],
] as const;

const SERVICE_ENVELOPE = [
  [-77.171, 38.926],
  [-77.122, 38.938],
  [-77.082, 38.93],
  [-77.044, 38.901],
  [-77.038, 38.852],
  [-77.049, 38.819],
  [-77.073, 38.792],
  [-77.112, 38.783],
  [-77.152, 38.799],
  [-77.175, 38.84],
  [-77.181, 38.883],
] as const;

function polygonPath(points: readonly (readonly [number, number])[]) {
  return points
    .map(([lng, lat], index) => {
      const { x, y } = pointToPercent(lat, lng);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ")
    .concat(" Z");
}

const ARLINGTON_PATH = polygonPath(ARLINGTON_BOUNDARY);
const SERVICE_PATH = polygonPath(SERVICE_ENVELOPE);

export default function ServiceAreaGraphic() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M84 6 C81 13 77 18 74 24 C71 31 68 39 65 46 C63 54 61 63 59 72 C57 80 54 89 52 98"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="0.01 4"
        />

        <path
          d={SERVICE_PATH}
          fill="rgba(227,192,122,0.10)"
          stroke="rgba(227,192,122,0.55)"
          strokeWidth="0.45"
        />

        <path
          d={ARLINGTON_PATH}
          fill="rgba(227,192,122,0.18)"
          stroke="rgba(255,245,220,0.38)"
          strokeWidth="0.35"
        />

        <path
          d="M20 76 C28 67 37 59 48 51 C60 42 73 34 87 24"
          fill="none"
          stroke="rgba(227,192,122,0.34)"
          strokeWidth="0.55"
          strokeDasharray="2.2 2.2"
        />

        <text
          x="36"
          y="50"
          fill="rgba(255,255,255,0.82)"
          fontSize="3.2"
          letterSpacing="0.24em"
          textAnchor="middle"
        >
          ARLINGTON
        </text>
        <text x="18" y="22" fill="rgba(255,255,255,0.45)" fontSize="2.4" letterSpacing="0.18em">
          FALLS CHURCH
        </text>
        <text x="18" y="86" fill="rgba(255,255,255,0.45)" fontSize="2.4" letterSpacing="0.18em">
          ALEXANDRIA
        </text>
        <text x="61" y="20" fill="rgba(255,255,255,0.45)" fontSize="2.4" letterSpacing="0.18em">
          MCLEAN
        </text>
        <text
          x="75"
          y="59"
          fill="rgba(255,255,255,0.4)"
          fontSize="2.3"
          letterSpacing="0.18em"
          transform="rotate(-67 75 59)"
        >
          POTOMAC
        </text>
      </svg>

      {ACTIVE_PINS.map((pin) => (
        <span
          key={pin.name}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
            pin.name === "Courthouse"
              ? "h-5 w-5 bg-gold-2 shadow-[0_0_0_8px_rgba(227,192,122,0.2),0_0_0_18px_rgba(227,192,122,0.08)]"
              : "h-3 w-3 bg-gold shadow-[0_0_0_5px_rgba(199,154,58,0.22)]"
          }`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        />
      ))}

      <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur">
        Arlington + nearby NoVA routes
      </div>
    </div>
  );
}
