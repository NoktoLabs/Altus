import { NAV_LINKS } from "@/lib/sectionMeta";

export default function Nav() {
  return (
    <nav className="pointer-events-auto fixed top-0 left-0 right-0 z-[60] flex h-[66px] items-center justify-between border-b border-[#C4A06A]/[0.16] bg-[#0a0e14]/72 px-[clamp(18px,4vw,44px)] backdrop-blur-[14px]">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl leading-none tracking-[0.14em] text-[#F5F1E8]">
          ALTUS
        </span>
        <span className="hidden font-mono text-[8.5px] tracking-[0.24em] text-[#F5F1E8]/42 uppercase sm:inline">
          by Meridian Studio
        </span>
      </div>

      <div className="flex items-center gap-[clamp(14px,2.4vw,34px)]">
        {NAV_LINKS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="hidden items-center gap-[7px] font-mono text-[9.5px] tracking-[0.18em] text-[#F5F1E8]/62 uppercase md:flex"
          >
            <span className="text-[#C4A06A]/75">{s.navNumber}</span>
            {s.navLabel}
          </a>
        ))}
        <a
          href="#visit"
          className="whitespace-nowrap rounded-[1px] bg-[#C4A06A] px-4 py-[9px] font-mono text-[9.5px] tracking-[0.18em] text-[#0a0e14] uppercase transition-colors hover:bg-[#F5F1E8]"
        >
          Book a Visit
        </a>
      </div>
    </nav>
  );
}
