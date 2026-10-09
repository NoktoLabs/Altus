// Line-art vignettes standing in for renders. Drawn in the site palette so
// they read as architectural studies rather than missing images. Each SVG
// uses its own gradient ids (they share one document).

const GOLD = '#C4A06A';
const CREAM = '#F5F1E8';
const MAROON = '#7A1F2B';
const INK = '#0a0e14';

type ArtProps = { className?: string };

// Deterministic pseudo-random so server and client render the same markup.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/* Observatory: night skyline seen through the crown's glazed perimeter. */
export function ObservatoryArt({ className }: ArtProps) {
  const skyline = Array.from({ length: 26 }, (_, i) => {
    const w = 8 + Math.round(rand(i) * 10);
    const h = 10 + Math.round(rand(i + 40) * 30);
    return { x: i * 12.5 - 4, w, h };
  });
  const stars = Array.from({ length: 22 }, (_, i) => ({
    x: Math.round(rand(i + 100) * 320),
    y: Math.round(rand(i + 200) * 70) + 6,
    r: rand(i + 300) > 0.8 ? 1.1 : 0.6,
  }));

  return (
    <svg viewBox="0 0 320 132" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="obs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={MAROON} stopOpacity="0.28" />
          <stop offset="0.75" stopColor={GOLD} stopOpacity="0.1" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="132" fill="url(#obs-sky)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={CREAM} opacity={0.5} />
      ))}
      {/* Distant city, with a few lit windows */}
      {skyline.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={104 - b.h} width={b.w} height={b.h} fill={GOLD} opacity={0.14} />
          {rand(i + 500) > 0.45 && (
            <rect x={b.x + 2} y={104 - b.h + 4} width={1.6} height={1.6} fill={GOLD} opacity={0.8} />
          )}
        </g>
      ))}
      <line x1="0" y1="104" x2="320" y2="104" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
      {/* Glazed perimeter: mullions, transom, sill */}
      <line x1="0" y1="12" x2="320" y2="12" stroke={GOLD} strokeOpacity="0.5" strokeWidth="2" />
      <line x1="0" y1="36" x2="320" y2="36" stroke={GOLD} strokeOpacity="0.18" strokeWidth="0.8" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 40} y1="12" x2={i * 40} y2="118" stroke={GOLD} strokeOpacity="0.38" strokeWidth="1.2" />
      ))}
      <rect x="0" y="118" width="320" height="14" fill={INK} />
      <line x1="0" y1="118" x2="320" y2="118" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.5" />
      {/* Glass reflection streaks */}
      <path d="M58 20 L88 20 L48 110 L18 110 Z" fill={CREAM} opacity="0.035" />
      <path d="M210 20 L224 20 L184 110 L170 110 Z" fill={CREAM} opacity="0.03" />
    </svg>
  );
}

/* Infinity pool: lap lanes running to an edge that meets the horizon. */
export function PoolArt({ className }: ArtProps) {
  const vx = 160;
  const horizon = 66;
  const lanes = [-260, -160, -70, 20, 110, 200, 300, 400, 580];

  return (
    <svg viewBox="0 0 320 132" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pool-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity="0" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="pool-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.2" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pool-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height={horizon} fill="url(#pool-sky)" />
      <circle cx="236" cy={horizon - 14} r="30" fill="url(#pool-sun)" opacity="0.35" />
      <circle cx="236" cy={horizon - 14} r="9" fill={GOLD} opacity="0.75" />
      <rect y={horizon} width="320" height={132 - horizon} fill="url(#pool-water)" />
      {/* Infinity edge */}
      <line x1="0" y1={horizon} x2="320" y2={horizon} stroke={GOLD} strokeOpacity="0.85" strokeWidth="1" />
      {/* Lane lines converging on the vanishing point */}
      {lanes.map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="132"
          x2={vx + (x - vx) * 0.12}
          y2={horizon}
          stroke={GOLD}
          strokeOpacity="0.28"
          strokeWidth="0.8"
        />
      ))}
      {/* Ripples, closer together toward the horizon */}
      {[4, 10, 18, 29, 44, 62].map((d, i) => (
        <line
          key={i}
          x1="0"
          y1={horizon + d}
          x2="320"
          y2={horizon + d}
          stroke={GOLD}
          strokeOpacity={0.08 + i * 0.02}
          strokeWidth="0.6"
        />
      ))}
      {/* Sun reflection */}
      {[6, 12, 19, 27].map((d, i) => (
        <line
          key={i}
          x1={236 - 12 + i * 2}
          y1={horizon + d}
          x2={236 + 12 - i * 2}
          y2={horizon + d}
          stroke={GOLD}
          strokeOpacity={0.7 - i * 0.14}
          strokeWidth="1.2"
        />
      ))}
      {/* Deck edge in the foreground */}
      <path d="M0 132 L0 114 L70 104 L96 132 Z" fill={INK} opacity="0.9" />
      <path d="M0 114 L70 104 L96 132" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  );
}

/* Sky lounge: a section through the double-height bar and dining levels. */
export function LoungeArt({ className }: ArtProps) {
  const pendants = [36, 66, 96, 126];

  return (
    <svg viewBox="0 0 320 132" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="lounge-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.7" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lounge-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={MAROON} stopOpacity="0.3" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Double-height glazing on the right, with the skyline beyond */}
      <rect x="196" y="14" width="124" height="108" fill="url(#lounge-glass)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={200 + i * 20}
          y={92 - Math.round(rand(i + 700) * 30)}
          width="12"
          height={30 + Math.round(rand(i + 700) * 30)}
          fill={GOLD}
          opacity="0.1"
        />
      ))}
      {[196, 220, 244, 268, 292, 316].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="122" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />
      ))}

      {/* Slabs: roof, mezzanine (bar level), floor */}
      <line x1="0" y1="14" x2="320" y2="14" stroke={GOLD} strokeOpacity="0.6" strokeWidth="2" />
      <path d="M0 72 L176 72" stroke={GOLD} strokeOpacity="0.6" strokeWidth="2" />
      <line x1="0" y1="122" x2="320" y2="122" stroke={GOLD} strokeOpacity="0.6" strokeWidth="2" />
      <line x1="176" y1="72" x2="176" y2="66" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1" />
      <line x1="150" y1="66" x2="176" y2="66" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1" />

      {/* Bar counter and stools on the mezzanine */}
      <rect x="22" y="56" width="104" height="16" fill={MAROON} opacity="0.45" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
      {[30, 54, 78, 102].map((x) => (
        <line key={x} x1={x} y1="62" x2={x} y2="72" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.8" />
      ))}

      {/* Long pendant lights dropping through the void to the dining level */}
      {pendants.map((x, i) => {
        const y = 92 + (i % 2) * 6;
        return (
          <g key={x}>
            <line x1={x + 60} y1="14" x2={x + 60} y2={y} stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.6" />
            <circle cx={x + 60} cy={y} r="11" fill="url(#lounge-glow)" opacity="0.6" />
            <circle cx={x + 60} cy={y} r="2.2" fill={GOLD} />
          </g>
        );
      })}

      {/* Dining table below */}
      <rect x="84" y="106" width="104" height="4" fill={GOLD} opacity="0.45" />
      {[92, 180].map((x) => (
        <line key={x} x1={x} y1="110" x2={x} y2="122" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />
      ))}

      {/* Height callout */}
      <line x1="10" y1="76" x2="10" y2="118" stroke={CREAM} strokeOpacity="0.3" strokeWidth="0.6" />
      <line x1="6" y1="76" x2="14" y2="76" stroke={CREAM} strokeOpacity="0.3" strokeWidth="0.6" />
      <line x1="6" y1="118" x2="14" y2="118" stroke={CREAM} strokeOpacity="0.3" strokeWidth="0.6" />
    </svg>
  );
}

/* Site plan: three towers on a landscaped harbour-side plot. */
export function SitePlan({ className }: ArtProps) {
  const trees = Array.from({ length: 34 }, (_, i) => ({
    x: 70 + Math.round(rand(i + 900) * 270),
    y: 90 + Math.round(rand(i + 950) * 160),
    r: 4 + Math.round(rand(i + 990) * 4),
  })).filter((t) => !(t.x > 150 && t.x < 270 && t.y > 130 && t.y < 210)); // keep the lawn clear

  const towers: { x: number; y: number; label: string; name?: string; highlight?: boolean; labelRight?: boolean }[] = [
    { x: 92, y: 96, label: 'T1', name: 'ALTUS', highlight: true },
    { x: 268, y: 96, label: 'T2' },
    { x: 196, y: 214, label: 'T3', labelRight: true },
  ];

  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Indicative site plan: three towers around a central lawn, harbour to the north">
      <defs>
        <pattern id="site-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 L0 0 0 20" fill="none" stroke={GOLD} strokeOpacity="0.06" strokeWidth="0.6" />
        </pattern>
        <linearGradient id="site-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.16" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="site-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.45" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill="url(#site-grid)" />

      {/* Harbour to the north */}
      <path d="M0 0 H400 V44 C330 56 270 38 200 48 C130 58 70 40 0 50 Z" fill="url(#site-water)" />
      {[18, 30].map((y) => (
        <path
          key={y}
          d={`M10 ${y} q 15 -4 30 0 t 30 0 t 30 0 M220 ${y + 4} q 15 -4 30 0 t 30 0 t 30 0`}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />
      ))}
      <text x="352" y="22" fill={CREAM} fillOpacity="0.4" fontSize="7" letterSpacing="2" fontFamily="var(--font-plex-mono), monospace">
        HARBOUR
      </text>

      {/* Expressway along the south edge */}
      <rect x="0" y="276" width="400" height="24" fill={GOLD} opacity="0.06" />
      <line x1="0" y1="288" x2="400" y2="288" stroke={GOLD} strokeOpacity="0.35" strokeDasharray="8 6" strokeWidth="0.8" />
      <text x="14" y="296" fill={CREAM} fillOpacity="0.35" fontSize="6" letterSpacing="2" fontFamily="var(--font-plex-mono), monospace">
        HARBOUR EXPRESSWAY
      </text>

      {/* Site boundary */}
      <path
        d="M48 70 L356 62 L370 262 L40 268 Z"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.7"
        strokeWidth="1"
        strokeDasharray="5 4"
      />

      {/* Internal loop road and arrival court */}
      <path
        d="M196 268 L196 250 M70 238 C70 120 70 92 140 88 L320 84 C340 84 344 100 344 130 L344 236 C344 250 332 250 318 250 L80 250 C72 250 70 246 70 238 Z"
        fill="none"
        stroke={CREAM}
        strokeOpacity="0.14"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <circle cx="196" cy="250" r="13" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="196" cy="250" r="5" fill={GOLD} opacity="0.35" />

      {/* Central lawn */}
      <ellipse cx="210" cy="170" rx="58" ry="38" fill={GOLD} opacity="0.07" stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.8" />
      <text x="210" y="173" textAnchor="middle" fill={CREAM} fillOpacity="0.4" fontSize="6.5" letterSpacing="2" fontFamily="var(--font-plex-mono), monospace">
        CENTRAL LAWN
      </text>

      {trees.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={GOLD} fillOpacity="0.06" stroke={GOLD} strokeOpacity="0.22" strokeWidth="0.6" />
      ))}

      {/* Towers */}
      {towers.map((t) => (
        <g key={t.label}>
          {t.highlight && <circle cx={t.x} cy={t.y} r="44" fill="url(#site-glow)" />}
          <rect
            x={t.x - 20}
            y={t.y - 21}
            width="40"
            height="42"
            fill={t.highlight ? GOLD : MAROON}
            fillOpacity={t.highlight ? 0.28 : 0.4}
            stroke={GOLD}
            strokeOpacity={t.highlight ? 1 : 0.55}
            strokeWidth={t.highlight ? 1.4 : 1}
          />
          <rect x={t.x - 6} y={t.y - 6} width="12" height="12" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.7" />
          <text x={t.labelRight ? t.x + 28 : t.x} y={t.labelRight ? t.y + 3 : t.y + 34} textAnchor={t.labelRight ? 'start' : 'middle'} fill={t.highlight ? GOLD : CREAM} fillOpacity={t.highlight ? 1 : 0.55} fontSize="7.5" letterSpacing="1.5" fontFamily="var(--font-plex-mono), monospace">
            {t.name ? `${t.label} · ${t.name}` : t.label}
          </text>
        </g>
      ))}

      {/* North arrow */}
      <g transform="translate(372 92)">
        <circle r="10" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeWidth="0.7" />
        <path d="M0 -8 L4 4 L0 1 L-4 4 Z" fill={GOLD} opacity="0.85" />
        <text y="-14" textAnchor="middle" fill={CREAM} fillOpacity="0.55" fontSize="7" fontFamily="var(--font-plex-mono), monospace">
          N
        </text>
      </g>

      {/* Scale bar */}
      <g transform="translate(10 62)" fontFamily="var(--font-plex-mono), monospace" fontSize="5.5" fill={CREAM} fillOpacity="0.45">
        <rect width="20" height="3" fill={GOLD} opacity="0.7" />
        <rect x="20" width="20" height="3" fill="none" stroke={GOLD} strokeOpacity="0.7" strokeWidth="0.6" />
        <text y="-3">0</text>
        <text x="17" y="-3">50</text>
        <text x="34" y="-3">100 M</text>
      </g>
    </svg>
  );
}
