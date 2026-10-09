'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SECTIONS } from '@/lib/sectionMeta';
import { TOWER_FOOTPRINT, floorToY } from '@/lib/towerGeometry';

// Sections whose floor band is worth calling out on the model. Hero and visit
// frame the whole tower, so the band fades out there.
const HIGHLIGHTED = new Set(['sky', 'residences', 'club', 'foundation']);

const BANDS = SECTIONS.map((s) => ({
  bottom: floorToY(Math.max(0, s.lo - 1)),
  top: floorToY(s.hi),
  visible: HIGHLIGHTED.has(s.id),
}));

const PAD = 3; // how far the band stands proud of the facade
const GOLD = new THREE.Color('#C4A06A');

const FILL_OPACITY = 0.09;
const EDGE_OPACITY = 0.85;

// A glowing gold shell around the floors the current section is about. It
// slides and resizes between sections as you scroll, so the page's "you are
// here" readout (ElevationRail) is mirrored on the model itself.
export default function FloorHighlight({ sectionProgress }: { sectionProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const fill = useRef<THREE.MeshBasicMaterial>(null);
  const edges = useRef<THREE.LineBasicMaterial>(null);
  const sweep = useRef<THREE.Mesh>(null);

  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), []);
  const state = useRef({ bottom: BANDS[0].top, top: BANDS[0].top, alpha: 0 });

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g || !fill.current || !edges.current || !sweep.current) return;

    const i = Math.min(Math.max(Math.round(sectionProgress.current), 0), BANDS.length - 1);
    const band = BANDS[i];
    const s = state.current;
    const k = 1 - Math.exp(-4 * Math.min(delta, 0.1));

    // Keep the band where it was while fading out, so it doesn't collapse.
    if (band.visible) {
      s.bottom += (band.bottom - s.bottom) * k;
      s.top += (band.top - s.top) * k;
    }
    s.alpha += ((band.visible ? 1 : 0) - s.alpha) * k;

    const height = Math.max(0.5, s.top - s.bottom);
    g.position.y = s.bottom + height / 2;
    g.scale.set(TOWER_FOOTPRINT.x + PAD * 2, height, TOWER_FOOTPRINT.z + PAD * 2);
    g.visible = s.alpha > 0.01;

    const pulse = 0.8 + 0.2 * Math.sin(clock.elapsedTime * 1.6);
    fill.current.opacity = FILL_OPACITY * s.alpha * pulse;
    edges.current.opacity = EDGE_OPACITY * s.alpha;

    // A thin bright line that sweeps down through the band on a loop.
    const t = (clock.elapsedTime * 0.35) % 1;
    sweep.current.position.y = 0.5 - t;
    (sweep.current.material as THREE.MeshBasicMaterial).opacity =
      0.5 * s.alpha * Math.sin(Math.PI * t);
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          ref={fill}
          color={GOLD}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial ref={edges} color={GOLD} transparent opacity={0} depthWrite={false} />
      </lineSegments>
      <mesh ref={sweep} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
