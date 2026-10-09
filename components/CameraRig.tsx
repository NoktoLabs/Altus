'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { floorToY } from '@/lib/towerGeometry';

// One waypoint per page section (lib/sectionMeta.ts order). The page reports
// scroll as a "section progress" value: 0 = hero at the top of the viewport,
// 1 = sky section at the top, ... 5 = visit section. Each waypoint frames the
// floors that section describes.
//
// Tower bounds (recentered): x=[-24, 24]  y=[0, 164]  z=[-25.3, 25.3].
// Footprint half-diagonal is ~35 — the minimum safe horizontal distance.
type Vec3 = [number, number, number];
const WAYPOINTS: { pos: Vec3; look: Vec3 }[] = [
  { pos: [200, 220, 200], look: [0, 80, 0] },                       // hero — wide 3/4 aerial, base to crown
  { pos: [72, floorToY(64), 72], look: [0, floorToY(58), 0] },      // sky — crown, floors 58–61
  { pos: [92, floorToY(46), 92], look: [0, floorToY(36), 0] },      // residences — mid-tower, floors 12–57
  { pos: [84, floorToY(18), 84], look: [0, floorToY(11), 0] },      // club — floors 8–11
  { pos: [92, floorToY(9), 92], look: [0, floorToY(6), 0] },        // foundation — podium / ground
  { pos: [-220, 180, -220], look: [0, 80, 0] },                     // visit — wide pull-back, opposite angle
];

// Ease each section-to-section move so the camera settles on a section while
// you read it and moves decisively in between, instead of drifting linearly.
function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const lerp = THREE.MathUtils.lerp;

// Camera positions are interpolated around the tower's vertical axis (angle,
// radius, height) rather than in a straight line, so moves between shots on
// opposite sides orbit the building instead of cutting through or over it.
function sample(progress: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  const last = WAYPOINTS.length - 1;
  const p = Math.min(Math.max(progress, 0), last);
  const i = Math.min(Math.floor(p), last - 1);
  const t = easeInOut(p - i);
  const [ax, ay, az] = WAYPOINTS[i].pos;
  const [bx, by, bz] = WAYPOINTS[i + 1].pos;

  const angleA = Math.atan2(az, ax);
  let dAngle = Math.atan2(bz, bx) - angleA;
  if (dAngle > Math.PI) dAngle -= Math.PI * 2;
  if (dAngle <= -Math.PI) dAngle += Math.PI * 2;
  const angle = angleA + dAngle * t;
  const radius = lerp(Math.hypot(ax, az), Math.hypot(bx, bz), t);

  outPos.set(Math.cos(angle) * radius, lerp(ay, by, t), Math.sin(angle) * radius);
  outLook.lerpVectors(_a.set(...WAYPOINTS[i].look), _b.set(...WAYPOINTS[i + 1].look), t);
}

// On wide screens the copy sits on the left, so shift the rendered frame to
// push the tower into the right-hand side of the viewport. setViewOffset moves
// the projection window without changing the camera's angle.
const DESKTOP_MIN_WIDTH = 1024;
const DESKTOP_SHIFT = 0.17; // fraction of viewport width

// sectionProgress is a ref updated by the page's scroll handler, read every
// frame so camera motion stays smooth even if React re-renders lag.
export default function CameraRig({ sectionProgress }: { sectionProgress: React.MutableRefObject<number> }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const smoothed = useRef<number | null>(null);
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useEffect(() => {
    const { width, height } = size;
    if (width >= DESKTOP_MIN_WIDTH) {
      camera.setViewOffset(width, height, -width * DESKTOP_SHIFT, 0, width, height);
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((_, delta) => {
    // Damp the scroll value, then sample the path at it, so the camera always
    // stays on the orbit path even when the page jumps (anchor links, fast
    // flicks). Lenis already smooths scrolling; this just takes the edge off.
    const target = sectionProgress.current;
    if (smoothed.current === null) smoothed.current = target;
    const k = 1 - Math.exp(-5 * Math.min(delta, 0.1));
    smoothed.current += (target - smoothed.current) * k;

    sample(smoothed.current, pos.current, look.current);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });

  return null;
}
