'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_HEIGHT } from '@/lib/towerGeometry';

useGLTF.preload('/models/tower.glb');

// CameraRig's waypoints assume a tower TOWER_HEIGHT tall, centered at the
// origin. The raw GLB's export units don't match that (raw height comes in
// around 5000+ units), so the model is rescaled to fit before framing.

export default function Tower({
  onBoundsReady,
}: {
  onBoundsReady?: (center: [number, number, number]) => void;
}) {
  const { scene } = useGLTF('/models/tower.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const group = groupRef.current;

    // Model is Y-up on export already — no rotation needed here.

    // Normalize scale: the raw export's units don't match the scene's unit
    // assumptions (CameraRig places the camera only ~50-350 units from the
    // origin, expecting a ~164-unit-tall tower). Without this, the model is
    // 30-100x too large, so the camera ends up embedded inside the geometry
    // and most of the mesh sits beyond the canvas's far clipping plane.
    const rawBox = new THREE.Box3().setFromObject(group);
    const rawSize = rawBox.getSize(new THREE.Vector3());
    const scale = rawSize.y > 0 ? TOWER_HEIGHT / rawSize.y : 1;
    group.scale.setScalar(scale);

    // Recompute bounds AFTER scaling, then recenter on X/Z and drop the
    // base to y = 0 so the tower sits on the "ground" plane.
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    const min = box.min;
    const size = box.getSize(new THREE.Vector3());

    group.position.x -= center.x;
    group.position.z -= center.z;
    group.position.y -= min.y;

    // After recentering, the box is symmetric about x=0/z=0 and spans
    // y=[0, size.y] — so its center is exactly (0, size.y/2, 0). Reported
    // up so OrbitControls (Scene.tsx) can orbit around the actual model
    // instead of a hardcoded guess.
    onBoundsReady?.([0, size.y / 2, 0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally
    // tied to `scene` only; including onBoundsReady would re-run this on
    // every parent render if it's not memoized (it calls setState, which
    // would create a render loop).
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
