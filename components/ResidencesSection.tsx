const STATS = [
  { value: "4 Bed", suffix: " + study", label: "Configuration" },
  { value: "3,400", suffix: " — 3,520", label: "Sq ft, interior" },
  { value: "04", suffix: "", label: "Apartments / floor" },
  { value: "01", suffix: "", label: "Personal elevator" },
];

const UNITS = [
  { id: "A · NE", sqft: "3,520", justify: "justify-start", items: "items-start" },
  { id: "B · NW", sqft: "3,400", justify: "justify-start", items: "items-end" },
  { id: "C · SE", sqft: "3,400", justify: "justify-end", items: "items-start" },
  { id: "D · SW", sqft: "3,520", justify: "justify-end", items: "items-end" },
];

export default function ResidencesSection() {
  return (
    <section
      id="residences"
      data-floors="57,12"
      data-zone="Residences"
      className="relative flex min-h-screen flex-col justify-center border-t border-[#C4A06A]/[0.12] px-[clamp(20px,5vw,80px)] py-[clamp(80px,12vh,140px)] lg:pl-[clamp(160px,13vw,210px)]"
    >
      <div className="relative grid grid-cols-1 items-center gap-[clamp(30px,5vw,84px)] lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div data-reveal className="mb-[18px] font-mono text-[9px] tracking-[0.3em] text-[#C4A06A]/80 uppercase">
            Floors 12 — 57 · 46 Plates
          </div>
          <h2 data-reveal className="mt-0 mb-[26px] font-display text-[clamp(44px,6.5vw,90px)] leading-[0.98] text-[#F5F1E8]">
            The Residences
          </h2>
          <p data-reveal className="m-0 mb-[34px] max-w-[470px] text-[clamp(14.5px,1.4vw,17px)] leading-[1.65] font-light text-[#F5F1E8]/70 text-pretty">
            Four apartments to a floor, each arriving at its own private
            lobby. No shared corridor, no borrowed view —{" "}
            <span className="font-display text-[1.14em] text-[#F5F1E8] italic">
              one corner each.
            </span>
          </p>

          <div data-reveal className="grid max-w-[560px] grid-cols-2 gap-px border border-[#C4A06A]/[0.18] bg-[#C4A06A]/[0.18]">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0a0e14]/55 px-[22px] py-5 backdrop-blur-sm">
                <div className="font-display text-[clamp(26px,7vw,34px)] leading-none text-[#F5F1E8]">
                  {s.value}
                  <span className="text-[0.6em] text-[#F5F1E8]/50">{s.suffix}</span>
                </div>
                <div className="mt-[7px] font-mono text-[8.5px] tracking-[0.2em] text-[#F5F1E8]/45 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-[14px]">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[8.5px] tracking-[0.22em] text-[#F5F1E8]/40 uppercase">
              Typical floor plate
            </span>
            <span className="font-mono text-[8.5px] tracking-[0.22em] text-[#C4A06A]/80 uppercase">
              L34 shown
            </span>
          </div>

          <div
            className="relative grid aspect-square grid-cols-2 grid-rows-2 gap-[clamp(10px,1.6vw,20px)] border border-[#C4A06A]/22 p-[clamp(10px,1.6vw,20px)]"
            style={{
              background:
                "linear-gradient(140deg, rgba(196,160,106,.05), rgba(10,14,20,0) 60%)",
            }}
          >
            {UNITS.map((u) => (
              <div
                key={u.id}
                className={`hatch-pattern flex flex-col gap-[5px] border border-[#C4A06A]/30 p-3 ${u.justify} ${u.items}`}
              >
                <span className="font-mono text-[8.5px] tracking-[0.16em] whitespace-nowrap text-[#F5F1E8]/55">
                  {u.id}
                </span>
                <span className="font-mono text-[8.5px] whitespace-nowrap text-[#C4A06A]/85">
                  {u.sqft}
                </span>
              </div>
            ))}
            <div className="absolute top-1/2 left-1/2 flex h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#7A1F2B]/85 bg-[#0a0e14]/70">
              <span className="font-mono text-[7.5px] tracking-[0.1em] text-[#F5F1E8]/60">
                CORE
              </span>
            </div>
          </div>
          <p className="m-0 font-mono text-[8.5px] leading-[1.9] tracking-[0.14em] text-[#F5F1E8]/32 uppercase">
            Diagram — indicative plate, not to scale
          </p>
        </div>
      </div>
    </section>
  );
}
