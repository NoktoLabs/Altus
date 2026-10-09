import { SitePlan } from "./Illustrations";

const COMMUTES = [
  { time: "3 min", place: "Harbour Expressway · Exit 9" },
  { time: "6 min", place: "Northgate Metro terminal" },
  { time: "12 min", place: "Tech Park · University campus" },
  { time: "25 min", place: "International airport" },
];

export default function FoundationSection() {
  return (
    <section
      id="foundation"
      data-floors="7,0"
      data-zone="Ground"
      className="relative flex min-h-screen flex-col justify-center border-t border-[#C4A06A]/[0.12] px-[clamp(20px,5vw,80px)] py-[clamp(80px,12vh,140px)] lg:pl-[clamp(160px,13vw,210px)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,20,0) 0%, rgba(196,160,106,.07) 78%, rgba(10,14,20,0) 100%)",
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-[clamp(30px,5vw,80px)] lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div data-reveal className="mb-[18px] font-mono text-[9px] tracking-[0.3em] text-[#C4A06A]/80 uppercase">
            Level 00 · 6.40 Acres
          </div>
          <h2 data-reveal className="mt-0 mb-[26px] font-display text-[clamp(44px,6.5vw,90px)] leading-[0.98] text-[#F5F1E8]">
            The Foundation
          </h2>
          <p data-reveal className="m-0 mb-8 max-w-[440px] text-[clamp(14.5px,1.4vw,17px)] leading-[1.65] font-light text-[#F5F1E8]/70 text-pretty">
            Harbour Quarter, Northgate — where the old docks meet the new
            business district. Three towers set back on six acres, so the
            ground stays open.
          </p>

          <div data-reveal className="flex flex-col">
            {COMMUTES.map((c, i) => (
              <div
                key={c.time}
                className={`grid grid-cols-[64px_1fr] gap-4 border-t border-[#C4A06A]/[0.16] py-[15px] ${
                  i === COMMUTES.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-mono text-[12px] text-[#C4A06A]">{c.time}</span>
                <span className="text-[14px] font-light text-[#F5F1E8]/68">
                  {c.place}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-[14px]">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[8.5px] tracking-[0.22em] text-[#F5F1E8]/40 uppercase">
              Site plan · 3 towers
            </span>
            <span className="font-mono text-[8.5px] tracking-[0.22em] text-[#C4A06A]/80 uppercase">
              6.40 acres
            </span>
          </div>
          <div className="border border-[#C4A06A]/22 bg-[#0a0e14]/92 backdrop-blur-md">
            <SitePlan className="block h-auto w-full" />
          </div>
          <p className="m-0 font-mono text-[8.5px] leading-[1.9] tracking-[0.14em] text-[#F5F1E8]/32 uppercase">
            Concept site · Northgate — indicative layout
          </p>
        </div>
      </div>
    </section>
  );
}
