export default function HeroSection() {
  return (
    <section
      id="hero"
      data-floors="61,61"
      data-zone="Crown"
      className="relative flex min-h-screen items-end overflow-hidden px-[clamp(20px,5vw,80px)] pb-14 lg:pr-[clamp(20px,7vw,150px)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 62% 100%, rgba(196,160,106,.20) 0%, rgba(196,160,106,.05) 32%, rgba(10,14,20,0) 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, rgba(122,31,43,.22) 0%, rgba(10,14,20,0) 70%)",
        }}
      />

      <div className="relative z-[2] min-w-0 pt-[120px] lg:pl-[clamp(160px,12vw,196px)]">
        <div data-reveal className="mb-[26px] flex items-center gap-3">
          <div className="h-px w-[34px] bg-[#7A1F2B]" />
          <span className="font-mono text-[9.5px] tracking-[0.34em] text-[#F5F1E8]/60 uppercase">
            Meridian Studio · Concept
          </span>
        </div>

        <h1 data-reveal
          className="m-0 font-display text-[clamp(96px,20vw,270px)] leading-[0.82] font-normal tracking-[0.02em] text-[#F5F1E8] [text-shadow:0_0_90px_rgba(196,160,106,.22)]"
        >
          ALTUS
        </h1>

        <div data-reveal className="mt-[34px] flex flex-wrap items-start gap-[clamp(18px,4vw,56px)]">
          <p className="m-0 max-w-[420px] text-[clamp(15px,1.5vw,19px)] leading-[1.6] font-light text-[#F5F1E8]/78 text-pretty">
            Sixty-one floors above the harbour. A vertical address
            of{" "}
            <span className="font-display text-[1.16em] text-[#F5F1E8] italic">
              glass and stone
            </span>{" "}
            and one horizon — read it from the crown down.
          </p>

          <div className="flex flex-col gap-3 border-l border-[#C4A06A]/28 pl-[22px]">
            {[
              ["03", "Towers"],
              ["6.40", "Acres"],
              ["61", "Floors"],
              ["$3.6M", "Onward"],
            ].map(([num, label]) => (
              <div key={label} className="flex items-baseline gap-[10px]">
                <span className="min-w-[56px] font-mono text-[13px] text-[#C4A06A]">
                  {num}
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.2em] text-[#F5F1E8]/50 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-[clamp(38px,6vh,72px)] flex items-center gap-3">
          <div className="h-[9px] w-[9px] rotate-45 animate-scroll-cue border-r border-b border-[#C4A06A]" />
          <span className="font-mono text-[9px] tracking-[0.26em] text-[#F5F1E8]/45 uppercase">
            Scroll to descend · 214 m to ground
          </span>
        </div>
      </div>
    </section>
  );
}
