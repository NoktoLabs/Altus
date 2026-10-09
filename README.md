# Altus

A scroll-driven 3D landing page for **ALTUS**, a fictional 61-floor residential tower.
The tower model stays fixed behind the page while the camera descends from the crown to
the ground as you scroll, with each section framing the floors it describes.

> ALTUS and Meridian Studio are fictional. All names, places and figures are illustrative.
> Concept, design and development by Jay Vishnu.

## Highlights

- **Camera that follows the story.** Each section has its own camera shot. Scroll
  progress is measured per section, and the camera eases between shots and orbits
  around the tower rather than cutting through it.
- **Floor highlight.** A gold band on the model tracks the floors the current section
  is about (crown, residences, club, podium), mirroring the elevation readout on the left.
- **Elevation rail.** A live floor / altitude / zone indicator driven by the sections'
  `data-floors` ranges.
- **Intro loader.** An elevator-style counter descends 61 → G while the model loads,
  and the page unlocks only once the tower is loaded and framed.
- **Smooth scroll and reveals.** Lenis smooth scrolling on GSAP's ticker, with
  ScrollTrigger reveal-on-scroll. Both are disabled for `prefers-reduced-motion`.
- **Hand-drawn SVG illustrations** for the amenities and the site plan, in the site palette.
- **Responsive.** The tower is framed to the right of the copy on desktop; a readability
  scrim keeps text legible over the model on phones.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) and React 19
- [Three.js](https://threejs.org) with [React Three Fiber](https://r3f.docs.pmnd.rs) and [drei](https://drei.docs.pmnd.rs)
- [GSAP](https://gsap.com) (ScrollTrigger) and [Lenis](https://lenis.darkroom.engineering)
- [Tailwind CSS v4](https://tailwindcss.com) and TypeScript

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

```
app/
  layout.tsx          fonts and metadata
  page.tsx            scroll handling, Lenis, reveal animations, page layout
  globals.css         Tailwind theme tokens and base styles
components/
  Scene.tsx           R3F canvas, lights, fog, stars
  Tower.tsx           loads and normalizes public/models/tower.glb
  CameraRig.tsx       per-section camera waypoints and orbital interpolation
  FloorHighlight.tsx  gold band that tracks the current section's floors
  ElevationRail.tsx   live floor / altitude readout
  Loader.tsx          intro loading screen
  Illustrations.tsx   SVG amenity vignettes and site plan
  *Section.tsx        page sections, crown to ground
  PortfolioFooter.tsx credits
lib/
  sectionMeta.ts      single source of truth for sections and floor ranges
  towerGeometry.ts    tower dimensions and floor → world-height mapping
```

Set `DEBUG_ORBIT_CONTROLS` in `components/Scene.tsx` to `true` to swap the scroll camera
for free orbit controls while tuning shots.
