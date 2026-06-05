"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function LogoGeometry() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.4;
      ring1.current.rotation.z = t * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.35;
      ring2.current.rotation.x = t * 0.2;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.3;
      ring3.current.rotation.y = t * 0.25;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.1}>
      <group ref={group}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial
            color="#5fa8d3"
            metalness={0.9}
            roughness={0.1}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#d9e2ec"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.7}
          />
        </mesh>

        <mesh ref={ring1} position={[0, 0, 0]}>
          <torusGeometry args={[1.1, 0.025, 12, 80]} />
          <meshStandardMaterial
            color="#5fa8d3"
            emissive="#5fa8d3"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>

        <mesh ref={ring2} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.025, 12, 80]} />
          <meshStandardMaterial
            color="#bcccdc"
            emissive="#bcccdc"
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0}
          />
        </mesh>

        <mesh ref={ring3} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.1, 0.018, 12, 80]} />
          <meshStandardMaterial
            color="#5fa8d3"
            emissive="#5fa8d3"
            emissiveIntensity={0.4}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function FooterLogo() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color="#5fa8d3" intensity={20} />
      <pointLight position={[-3, -2, 2]} color="#d9e2ec" intensity={10} />
      <Suspense fallback={null}>
        <LogoGeometry />
      </Suspense>
    </Canvas>
  );
}
