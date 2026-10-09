'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useProgress } from '@react-three/drei';
import { TOTAL_FLOORS } from '@/lib/sectionMeta';

// Shortest time the intro plays, so a cached model doesn't just flash it.
const MIN_DURATION = 1.4; // seconds

function floorLabel(pct: number) {
  const floor = Math.round(TOTAL_FLOORS * (1 - pct / 100));
  return floor <= 0 ? 'G' : String(floor).padStart(2, '0');
}

/**
 * Full-screen intro shown while the tower model loads: an elevator-style
 * floor counter descends 61 → G as assets come in, then the panel lifts away.
 * `ready` is the real "scene is usable" signal (model loaded and framed);
 * asset progress only drives the counter, never decides when we're done.
 */
export default function Loader({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const progress = useProgress((s) => s.progress);
  const [gone, setGone] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const shown = useRef({ value: 0 });
  const startedAt = useRef<number | null>(null);
  const finishing = useRef(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const paint = () => {
    const v = shown.current.value;
    if (floorRef.current) floorRef.current.textContent = floorLabel(v);
    if (pctRef.current) pctRef.current.textContent = `${String(Math.round(v)).padStart(3, '0')}%`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
  };

  // Lock page scroll while the intro is up.
  useEffect(() => {
    startedAt.current = performance.now();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Ease the counter toward real progress, holding short of 100 until the
  // scene reports ready.
  useEffect(() => {
    if (finishing.current) return;
    gsap.to(shown.current, {
      value: Math.min(progress, 92),
      duration: 0.8,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: paint,
    });
  }, [progress]);

  useEffect(() => {
    if (!ready || finishing.current) return;
    finishing.current = true;

    const elapsed = (performance.now() - (startedAt.current ?? 0)) / 1000;
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = '';
        setGone(true);
        onDoneRef.current();
      },
    });
    tl.to(shown.current, {
      value: 100,
      duration: Math.max(0.6, MIN_DURATION - elapsed),
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: paint,
    })
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.25');

    return () => {
      tl.kill();
    };
  }, [ready]);

  if (gone) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading the tower"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0e14] px-[clamp(20px,5vw,80px)] py-[clamp(24px,5vh,48px)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 60% at 50% 0%, rgba(122,31,43,.22) 0%, rgba(10,14,20,0) 70%), radial-gradient(80% 60% at 50% 110%, rgba(196,160,106,.14) 0%, rgba(10,14,20,0) 60%)',
        }}
      />

      <div className="relative flex items-baseline justify-between">
        <span className="font-display text-2xl leading-none tracking-[0.14em] text-[#F5F1E8]">ALTUS</span>
        <span className="font-mono text-[10px] tracking-[0.26em] text-[#F5F1E8]/50 uppercase">
          Preparing the ascent
        </span>
      </div>

      <div className="relative flex flex-col items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4A06A]/80 uppercase">Floor</span>
        <span
          ref={floorRef}
          className="font-display text-[clamp(120px,22vw,260px)] leading-[0.8] text-[#F5F1E8] tabular-nums [text-shadow:0_0_80px_rgba(196,160,106,.25)]"
        >
          {floorLabel(0)}
        </span>
      </div>

      <div className="relative flex flex-col gap-3">
        <div className="h-px w-full bg-[#C4A06A]/15">
          <div ref={barRef} className="h-px origin-left bg-[#C4A06A]" style={{ transform: 'scaleX(0)' }} />
        </div>
        <div className="flex justify-between font-mono text-[10px] tracking-[0.22em] text-[#F5F1E8]/50 uppercase">
          <span>Loading tower model</span>
          <span ref={pctRef} className="tabular-nums text-[#C4A06A]">000%</span>
        </div>
      </div>
    </div>
  );
}
