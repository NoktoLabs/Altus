// Credit line for the portfolio version of this site. ALTUS is a fictional
// brand, so the footer says so plainly and credits who built it.
const AUTHOR = "Jay Vishnu";

const STACK = ["Next.js", "React Three Fiber", "Three.js", "GSAP", "Lenis", "Tailwind CSS"];

export default function PortfolioFooter() {
  return (
    <footer className="relative border-t border-[#C4A06A]/[0.16] bg-[#0a0e14]/85 px-[clamp(20px,5vw,80px)] py-[clamp(36px,6vh,56px)] backdrop-blur-md lg:pl-[clamp(160px,13vw,210px)]">
      <div data-reveal className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1.4fr_auto] md:items-end">
        <div>
          <div className="mb-3 font-mono text-[10px] tracking-[0.26em] text-[#F5F1E8]/55 uppercase">
            A portfolio concept by
          </div>
          <div className="font-display text-[clamp(30px,3.4vw,42px)] leading-none text-[#F5F1E8]">
            {AUTHOR}
          </div>
          <p className="mt-3 mb-0 max-w-[340px] text-[13.5px] leading-[1.6] font-light text-[#F5F1E8]/60">
            Concept, design and development. ALTUS and Meridian Studio are
            fictional; all figures are illustrative.
          </p>
        </div>

        <div>
          <div className="mb-3 font-mono text-[10px] tracking-[0.26em] text-[#F5F1E8]/55 uppercase">
            Built with
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {STACK.map((tech) => (
              <li
                key={tech}
                className="border border-[#C4A06A]/30 px-3 py-[6px] font-mono text-[10px] tracking-[0.14em] text-[#C4A06A]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#hero"
          className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] whitespace-nowrap uppercase"
        >
          Back to the crown
          <span className="inline-block h-[9px] w-[9px] rotate-[225deg] border-r border-b border-current transition-transform group-hover:-translate-y-[3px]" />
        </a>
      </div>
    </footer>
  );
}
