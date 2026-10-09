const CARDS = [
  {
    level: "L11",
    title: "Fitness Floor",
    body: "Strength, cardio and a glazed yoga box facing the podium gardens.",
  },
  {
    level: "L10",
    title: "Spa & Hammam",
    body: "Wet lounge, steam, cold plunge and four treatment rooms.",
  },
  {
    level: "L09",
    title: "Private Theatre",
    body: "Tiered 40-seat screening room, bookable by the evening.",
  },
  {
    level: "L08",
    title: "Business Centre",
    body: "Boardroom, four focus suites and a residents' lounge for guests.",
  },
];

export default function MidSkyClubSection() {
  return (
    <section
      id="club"
      data-floors="11,8"
      data-zone="Mid-Sky Club"
      className="relative flex min-h-screen flex-col justify-center border-t border-[#C4A06A]/[0.12] px-[clamp(20px,5vw,80px)] py-[clamp(80px,12vh,140px)] lg:pl-[clamp(160px,13vw,210px)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 12% 60%, rgba(122,31,43,.20) 0%, rgba(10,14,20,0) 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-[clamp(34px,5vh,56px)] flex flex-wrap items-end justify-between gap-7">
          <div>
            <div data-reveal className="mb-[18px] font-mono text-[9px] tracking-[0.3em] text-[#C4A06A]/80 uppercase">
              Floors 8 — 11 · Mid-Sky
            </div>
            <h2 data-reveal className="m-0 font-display text-[clamp(44px,6.5vw,90px)] leading-[0.98] text-[#F5F1E8]">
              Mid-Sky Club
            </h2>
          </div>
          <div data-reveal className="text-right">
            <div className="font-display text-[clamp(52px,7vw,96px)] leading-[0.9] text-[#C4A06A]">
              48,000
            </div>
            <div className="mt-[6px] font-mono text-[9px] tracking-[0.26em] text-[#F5F1E8]/50 uppercase">
              Sq ft, four levels
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
          {CARDS.map((c) => (
            <div data-reveal
              key={c.title}
              className="flex min-h-[210px] flex-col gap-[34px] border border-[#C4A06A]/[0.18] bg-[#0a0e14]/55 px-[22px] pt-6 pb-[26px] backdrop-blur-md transition-colors hover:bg-[#0a0e14]/70"
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#C4A06A]/80">
                {c.level}
              </span>
              <div className="mt-auto">
                <h3 className="mt-0 mb-[7px] font-display text-[25px] text-[#F5F1E8]">
                  {c.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.6] font-light text-[#F5F1E8]/55">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
