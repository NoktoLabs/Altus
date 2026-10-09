// Single source of truth for the page's 6 sections. Consumed by:
// - Nav.tsx (anchor links + floor-number prefixes)
// - Each section component (stamps data-floors/data-zone on its <section> root,
//   which ElevationRail.tsx queries to compute the live floor/altitude readout)
export const TOTAL_FLOORS = 61;

export type SectionMeta = {
  id: string;
  hi: number;
  lo: number;
  zone: string;
  navLabel: string;
  /** Number prefix shown in the nav link — matches the design's own labels,
   *  which aren't always literally `hi` (e.g. foundation shows "00" for
   *  "Level 00", not its floor range's "07"). */
  navNumber: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: "hero", hi: 61, lo: 61, zone: "Crown", navLabel: "", navNumber: "" },
  { id: "sky", hi: 61, lo: 58, zone: "Sky Amenities", navLabel: "Sky", navNumber: "61" },
  { id: "residences", hi: 57, lo: 12, zone: "Residences", navLabel: "Residences", navNumber: "57" },
  { id: "club", hi: 11, lo: 8, zone: "Mid-Sky Club", navLabel: "Club", navNumber: "11" },
  { id: "foundation", hi: 7, lo: 0, zone: "Ground", navLabel: "Site", navNumber: "00" },
  { id: "visit", hi: 0, lo: 0, zone: "Arrival", navLabel: "", navNumber: "" },
];

// Nav only shows links for sections that have a label (hero/visit are reached
// by scrolling, not by nav link, matching the design's 4 nav links + CTA).
export const NAV_LINKS = SECTIONS.filter((s) => s.navLabel);
