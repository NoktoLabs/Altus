import { LoungeArt, ObservatoryArt, PoolArt } from "./Illustrations";

const CARDS = [
  {
    level: "L61",
    alt: "214 m",
    Art: ObservatoryArt,
    title: "Observatory Deck",
    body: "A glazed perimeter walk at the crown, oriented to the city skyline and the harbour light-line.",
  },
  {
    level: "L60",
    alt: "210 m",
    Art: PoolArt,
    title: "Infinity Pool",
    body: "Temperature-held water carried to the tower edge, with the lap lane running the long face of the plate.",
  },
  {
    level: "L58 — 59",
    alt: "203 m",
    Art: LoungeArt,
    title: "Sky Lounge",
    body: "Double-height private dining and a bar level, bookable by residents for the evening.",
  },
];

export default function SkyAmenitiesSection() {
  return (
    <section
      id="sky"
      data-floors="61,58"
      data-zone="Sky Amenities"
      className="relative flex min-h-screen flex-col justify-center border-t border-[#C4A06A]/[0.12] px-[clamp(20px,5vw,80px)] py-[clamp(80px,12vh,140px)] lg:pl-[clamp(160px,13vw,210px)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 88% 22%, rgba(196,160,106,.13) 0%, rgba(10,14,20,0) 68%)",
        }}
      />

      <div className="relative mb-[clamp(38px,6vh,64px)] flex flex-wrap items-end justify-between gap-[30px]">
        <div>
          <div data-reveal className="mb-[18px] font-mono text-[9px] tracking-[0.3em] text-[#C4A06A]/80 uppercase">
            Floors 58 — 61 · The Crown
          </div>
          <h2 data-reveal className="m-0 font-display text-[clamp(44px,6.5vw,90px)] leading-[0.98] tracking-[0.005em] text-[#F5F1E8]">
            Sky Amenities
          </h2>
        </div>
        <p data-reveal className="m-0 max-w-[340px] text-[15px] leading-[1.65] font-light text-[#F5F1E8]/62 text-pretty">
          The last four plates are given back to the sky — no residences
          above 57, only air, water and light.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(268px,1fr))]">
        {CARDS.map((c) => (
          <div data-reveal
            key={c.title}
            className="flex flex-col gap-[18px] border border-[#C4A06A]/[0.18] bg-[#0a0e14]/55 px-6 pt-[26px] pb-6 backdrop-blur-md transition-colors hover:bg-[#0a0e14]/70"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#C4A06A]/85">
                {c.level}
              </span>
              <span className="font-mono text-[8px] tracking-[0.18em] text-[#F5F1E8]/34 uppercase">
                {c.alt}
              </span>
            </div>
            <div className="h-[132px] overflow-hidden border border-[#C4A06A]/[0.14] bg-[#0a0e14]/80">
              <c.Art className="block h-full w-full" />
            </div>
            <div>
              <h3 className="mt-0 mb-2 font-display text-[27px] leading-[1.1] text-[#F5F1E8]">
                {c.title}
              </h3>
              <p className="m-0 text-[13.5px] leading-[1.62] font-light text-[#F5F1E8]/58">
                {c.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
