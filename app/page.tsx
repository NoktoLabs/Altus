'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEBUG_ORBIT_CONTROLS } from '@/components/Scene';
import { SECTIONS } from '@/lib/sectionMeta';
import Nav from '@/components/Nav';
import Loader from '@/components/Loader';
import ElevationRail from '@/components/ElevationRail';
import HeroSection from '@/components/HeroSection';
import SkyAmenitiesSection from '@/components/SkyAmenitiesSection';
import ResidencesSection from '@/components/ResidencesSection';
import MidSkyClubSection from '@/components/MidSkyClubSection';
import FoundationSection from '@/components/FoundationSection';
import VisitSection from '@/components/VisitSection';
import PortfolioFooter from '@/components/PortfolioFooter';

// Scene uses WebGL / browser APIs only — load it client-side, no SSR.
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const INTRO_MAX_WAIT_MS = 12000;

/**
 * Scroll position expressed in sections: 0 when the hero's top is at the top
 * of the viewport, 1 when the sky section's is, and so on. Fractional values
 * mean "between two sections". The camera and floor highlight key off this,
 * so each section gets its own camera shot regardless of how tall it is.
 */
function measureSectionProgress() {
  const y = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const anchors: number[] = [];
  for (const s of SECTIONS) {
    const el = document.getElementById(s.id);
    if (!el) return 0;
    anchors.push(Math.min(el.getBoundingClientRect().top + y, maxScroll));
  }

  for (let i = 0; i < anchors.length - 1; i++) {
    if (y <= anchors[i + 1]) {
      const span = anchors[i + 1] - anchors[i];
      return span > 0 ? i + (y - anchors[i]) / span : i + 1;
    }
  }
  return anchors.length - 1;
}

export default function Home() {
  const sectionProgress = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      sectionProgress.current = measureSectionProgress();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // Smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis
    // stay in lockstep. `anchors` makes the nav's #links glide too.
    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (!reduceMotion) {
      lenis = new Lenis({ anchors: true, autoRaf: false });
      lenis.stop(); // held until the intro loader finishes
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // Hide reveal targets up front; they're animated in once the intro ends.
    const ctx = gsap.context(() => {
      if (!reduceMotion) gsap.set('[data-reveal]', { autoAlpha: 0, y: 28 });
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisRef.current = null;
      ctx.revert();
    };
  }, []);

  // Never trap visitors behind the intro: if the model can't load (no WebGL,
  // network failure), open the page anyway after a generous wait.
  useEffect(() => {
    const fallback = window.setTimeout(handleSceneReady, INTRO_MAX_WAIT_MS);
    return () => window.clearTimeout(fallback);
  }, [handleSceneReady]);

  useEffect(() => {
    if (!introDone) return;
    lenisRef.current?.start();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Reveal-on-scroll: anything marked data-reveal fades up once as it
    // enters, staggered with its neighbours.
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
      });
    });

    return () => ctx.revert();
  }, [introDone]);

  return (
    <main className="relative">
      {/* Fixed 3D background — camera moves as the page scrolls */}
      <Scene sectionProgress={sectionProgress} onReady={handleSceneReady} />
      {!introDone && <Loader ready={sceneReady} onDone={handleIntroDone} />}

      {/* Readability scrim between the canvas and the copy: a uniform dim on
          small screens (copy spans the full width over the model), a
          left-side fade on desktop (copy left, tower framed right). */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[#0a0e14]/60 lg:hidden" />
      <div
        className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,14,20,.88) 0%, rgba(10,14,20,.7) 32%, rgba(10,14,20,.15) 58%, rgba(10,14,20,0) 72%)',
        }}
      />

      <Nav />
      <ElevationRail railSide="left" />

      {/* Scrollable HTML content sitting on top of the fixed canvas.
          TEMP: pointer-events-none while DEBUG_ORBIT_CONTROLS is on, so
          mouse drags reach the canvas below for OrbitControls instead of
          being swallowed by this full-viewport overlay. */}
      <div className={`relative z-10 ${DEBUG_ORBIT_CONTROLS ? 'pointer-events-none' : ''}`}>
        <HeroSection />
        <SkyAmenitiesSection />
        <ResidencesSection />
        <MidSkyClubSection />
        <FoundationSection />
        <VisitSection />
        <PortfolioFooter />
      </div>
    </main>
  );
}
