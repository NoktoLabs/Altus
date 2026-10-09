import { TOTAL_FLOORS } from "./sectionMeta";

// World-space size of the tower after Tower.tsx normalizes the GLB.
// Height is enforced by Tower.tsx; the footprint is what the model measures
// out to at that height (logged by Tower.tsx on load).
export const TOWER_HEIGHT = 164;
export const TOWER_FOOTPRINT = { x: 48, z: 50.5 };

export const FLOOR_HEIGHT = TOWER_HEIGHT / TOTAL_FLOORS;

/** World-space Y of the top of a given floor (0 = ground). */
export function floorToY(floor: number) {
  return floor * FLOOR_HEIGHT;
}
