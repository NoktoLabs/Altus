'use client';

import { useEffect, useRef } from "react";
import { TOTAL_FLOORS } from "@/lib/sectionMeta";

// TEMP-style dev flag, matching the DEBUG_ORBIT_CONTROLS const-flag pattern
// already used in Scene.tsx — flip to false to hide the rail entirely.
export const SHOW_ELEVATION_RAIL = true;

const FLOOR_PITCH = 3.5; // meters per floor

function pct(floor: number) {
  return ((TOTAL_FLOORS - floor) / TOTAL_FLOORS) * 100;
}

function readout(floor: number, band: [number, number]) {
  const shown = Math.max(0, Math.round(floor));
  const alt = floor * FLOOR_PITCH;
  return {
    floorLabel: shown === 0 ? "G" : String(shown).padStart(2, "0"),
    altLabel: `${Math.round(alt)} m`,
    carTop: `${pct(floor).toFixed(2)}%`,
    bandTop: `${pct(band[0]).toFixed(2)}%`,
    bandHeight: `${Math.max(0.6, pct(band[1]) - pct(band[0])).toFixed(2)}%`,
  };
}

export default function ElevationRail({
  railSide = "left",
}: {
  railSide?: "left" | "right";
}) {
  const carRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  const lastFloor = useRef<number | null>(null);
  const lastZone = useRef<string | null>(null);

  useEffect(() => {
    let raf = 0;

    function paint(floor: number, zone: string, band: [number, number]) {
      const v = readout(floor, band);
      if (bandRef.current) {
        bandRef.current.style.top = v.bandTop;
        bandRef.current.style.height = v.bandHeight;
      }
      if (carRef.current) carRef.current.style.top = v.carTop;
      if (floorRef.current) floorRef.current.textContent = v.floorLabel;
      if (altRef.current) altRef.current.textContent = v.altLabel;
      if (zoneRef.current) zoneRef.current.textContent = zone;
    }

    function measure() {
      const secs = Array.from(
        document.querySelectorAll<HTMLElement>("[data-floors]")
      );
      if (!secs.length) return;

      const mark = window.innerHeight * 0.45;
      let cur = secs[0];
      for (const s of secs) {
        const r = s.getBoundingClientRect();
        if (r.top <= mark && r.bottom > mark) {
          cur = s;
          break;
        }
        if (r.top > mark) break;
        cur = s;
      }

      const r = cur.getBoundingClientRect();
      const [hi, lo] = (cur.dataset.floors ?? "0,0").split(",").map(Number);
      const zone = cur.dataset.zone ?? "";
      const local = Math.min(1, Math.max(0, (mark - r.top) / Math.max(1, r.height)));
      const floor = hi - local * (hi - lo);

      if (
        lastFloor.current !== null &&
        Math.abs(floor - lastFloor.current) < 0.01 &&
        zone === lastZone.current
      ) {
        return;
      }
      lastFloor.current = floor;
      lastZone.current = zone;
      paint(floor, zone, [hi, lo]);
    }

    const tick = () => {
      measure();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!SHOW_ELEVATION_RAIL) return null;

  const initial = readout(61, [61, 61]);
  const ticks = Array.from({ length: TOTAL_FLOORS }, (_, i) => TOTAL_FLOORS - i);
  const sideStyle =
    railSide === "left"
      ? { left: "clamp(14px,3vw,44px)" }
      : { right: "clamp(14px,3vw,44px)" };

  return (
    <div
      className="pointer-events-none fixed top-1/2 z-40 hidden h-[min(66vh,620px)] w-[134px] -translate-y-1/2 lg:block"
      style={sideStyle}
    >
      <div className="absolute left-0 -top-[26px] font-mono text-[8px] tracking-[0.22em] text-[#F5F1E8]/32 uppercase">
        Elevation
      </div>

      <div className="absolute left-0 top-0 bottom-0 flex w-[38px] flex-col justify-between">
        {ticks.map((n) => (
          <div key={n} className="h-px w-[9px] bg-[#C4A06A]/28" />
        ))}
      </div>

      <div
        ref={bandRef}
        className="absolute left-0 w-[38px] border-l border-[#C4A06A]/55 transition-[top,height] duration-[400ms] ease-out"
        style={{
          top: initial.bandTop,
          height: initial.bandHeight,
          background: "linear-gradient(90deg, rgba(196,160,106,.16), rgba(196,160,106,0))",
        }}
      />

      <div
        className="absolute left-[44px] top-0 bottom-0 w-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,160,106,.05), rgba(196,160,106,.4), rgba(196,160,106,.05))",
        }}
      />

      <div
        ref={carRef}
        className="absolute left-0 right-0 flex items-center gap-[10px]"
        style={{ top: initial.carTop }}
      >
        <div className="h-px w-[38px] bg-[#C4A06A]" />
        <div className="-ml-[2px] h-[5px] w-[5px] rounded-full bg-[#C4A06A]" />
        <div className="ml-[2px] flex w-[76px] flex-col gap-px">
          <div
            ref={floorRef}
            className="font-display text-[30px] leading-[0.9] whitespace-nowrap text-[#F5F1E8]"
          >
            {initial.floorLabel}
          </div>
          <div
            ref={altRef}
            className="font-mono text-[8px] tracking-[0.2em] whitespace-nowrap text-[#C4A06A]/85 uppercase"
          >
            {initial.altLabel}
          </div>
          <div
            ref={zoneRef}
            className="font-mono text-[8px] leading-[1.5] tracking-[0.16em] text-[#F5F1E8]/38 uppercase"
          >
            Crown
          </div>
        </div>
      </div>
    </div>
  );
}
