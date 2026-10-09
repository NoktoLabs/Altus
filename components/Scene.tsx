'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Suspense, useCallback, useState } from 'react';
import Tower from './Tower';
import CameraRig from './CameraRig';
import FloorHighlight from './FloorHighlight';

// TEMP: flip to false (or delete this + the <OrbitControls> block below)
// once the CameraRig waypoints are locked in. While true, CameraRig is
// disabled since both would fight over the camera every frame. Also read
// by app/page.tsx to let mouse events pass through the HTML overlay to
// the canvas so OrbitControls can actually receive drags.
export const DEBUG_ORBIT_CONTROLS = false;

function TowerFallback() {
  return (
    <mesh>
      <boxGeometry args={[40, 200, 40]} />
      <meshBasicMaterial color="#ff00ff" wireframe />
    </mesh>
  );
}

export default function Scene({
  sectionProgress,
  onReady,
}: {
  sectionProgress: React.MutableRefObject<number>;
  /** Fired once the tower model is loaded and framed. */
  onReady?: () => void;
}) {
  // Starting guess for the OrbitControls target, matching the t=0 waypoint;
  // Tower reports the model's real bounding-box center once it loads, via
  // setState (referentially stable, safe to pass straight into the effect
  // dep below without re-render loops).
  const [orbitTarget, setOrbitTarget] = useState<[number, number, number]>([0, 80, 0]);
  const handleBounds = useCallback(
    (center: [number, number, number]) => {
      setOrbitTarget(center);
      onReady?.();
    },
    [onReady]
  );

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ fov: 45, near: 0.1, far: 2000, position: [200, 220, 200] }}
      style={{ position: 'fixed', inset: 0 }}
    >
      {/* Recolored to match the landing page design (Claude Design import):
          near-black background/fog, warm gold key light, maroon-tinted rim
          light — the palette this whole redesign is built around. Camera
          architecture/waypoints are untouched; only color values changed. */}
      <color attach="background" args={['#0a0e14']} />
      <fog attach="fog" args={['#0a0e14', 100, 500]} />

      <ambientLight intensity={0.5} color="#3a2f28" />
      <directionalLight
        position={[100, 200, 100]}
        intensity={1.4}
        color="#C4A06A"
        castShadow
      />
      <directionalLight position={[-100, 80, -100]} intensity={0.4} color="#7A1F2B" />
      <hemisphereLight args={['#C4A06A', '#0a0e14', 0.4]} />

      <Suspense fallback={<TowerFallback />}>
        <Tower onBoundsReady={handleBounds} />
        <FloorHighlight sectionProgress={sectionProgress} />
      </Suspense>

      <Stars radius={300} depth={80} count={2000} factor={4} saturation={0} fade speed={0.5} />

      {DEBUG_ORBIT_CONTROLS ? (
        <OrbitControls makeDefault target={orbitTarget} />
      ) : (
        <CameraRig sectionProgress={sectionProgress} />
      )}
    </Canvas>
  );
}
