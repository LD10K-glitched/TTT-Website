"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.025;
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function FloatingCrystal({
  position,
  scale,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
    mesh.current.rotation.y += 0.004 * speed;
    mesh.current.rotation.z =
      Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.15;
  });

  return (
    <Float
      speed={speed * 1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
    >
      <mesh ref={mesh} position={position} scale={scale} castShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.75}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function FloatingBox({
  position,
  scale,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.003 * speed;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4 * speed) * 0.2;
  });

  return (
    <Float speed={speed} floatIntensity={0.6} rotationIntensity={0.2}>
      <mesh ref={mesh} position={position} scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function CityBuildings() {
  const buildings = useMemo(() => {
    const result = [];
    const seed = [
      [-8, -4, -3],
      [-6, -4, -5],
      [-4, -4, -4],
      [4, -4, -4],
      [6, -4, -5],
      [8, -4, -3],
      [-9, -4, -6],
      [9, -4, -6],
      [-12, -4, -7],
      [12, -4, -7],
    ] as [number, number, number][];

    const heights = [2, 3.5, 2.5, 3, 4, 2, 1.5, 3.5, 2, 1.8];
    const widths = [1.2, 0.8, 1.0, 1.0, 0.8, 1.2, 1.4, 0.8, 1.2, 1.0];

    for (let i = 0; i < seed.length; i++) {
      result.push({
        position: seed[i] as [number, number, number],
        height: heights[i],
        width: widths[i],
      });
    }
    return result;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh
          key={i}
          position={[b.position[0], b.position[1] + b.height / 2, b.position[2]]}
        >
          <boxGeometry args={[b.width, b.height, b.width]} />
          <meshStandardMaterial
            color="#123c69"
            metalness={0.8}
            roughness={0.3}
            transparent
            opacity={0.5}
            emissive="#5fa8d3"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
      <mesh position={[0, -4, -5]}>
        <boxGeometry args={[30, 0.1, 6]} />
        <meshStandardMaterial
          color="#0a2540"
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.15;
      ring2.current.rotation.z = t * 0.25;
    }
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.3;
      ring3.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={ring1} position={[-3, 1.5, -2]}>
        <torusGeometry args={[1.2, 0.04, 16, 80]} />
        <meshStandardMaterial
          color="#5fa8d3"
          emissive="#5fa8d3"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0}
        />
      </mesh>
      <mesh ref={ring2} position={[3, -0.5, -3]}>
        <torusGeometry args={[0.9, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#d9e2ec"
          emissive="#d9e2ec"
          emissiveIntensity={0.2}
          metalness={1}
          roughness={0}
        />
      </mesh>
      <mesh ref={ring3} position={[0, 2.5, -4]}>
        <torusGeometry args={[0.6, 0.025, 16, 60]} />
        <meshStandardMaterial
          color="#5fa8d3"
          emissive="#5fa8d3"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

function AnimatedLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.4) * 6;
      light1.current.position.y = Math.cos(t * 0.3) * 3;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.35) * 5;
      light2.current.position.z = Math.sin(t * 0.45) * 3;
    }
  });

  return (
    <>
      <pointLight
        ref={light1}
        position={[5, 3, 2]}
        color="#5fa8d3"
        intensity={40}
        distance={20}
      />
      <pointLight
        ref={light2}
        position={[-5, -2, 3]}
        color="#123c69"
        intensity={30}
        distance={18}
      />
      <pointLight position={[0, 5, -5]} color="#d9e2ec" intensity={15} distance={15} />
    </>
  );
}

function Scene() {
  return (
    <>
      <CameraRig />

      <fog attach="fog" args={["#0a2540", 12, 35]} />
      <ambientLight intensity={0.15} />

      <AnimatedLights />

      <FloatingCrystal position={[-4, 1, 0]} scale={0.8} color="#5fa8d3" speed={1.2} />
      <FloatingCrystal position={[4, -0.5, -1]} scale={0.6} color="#d9e2ec" speed={0.8} />
      <FloatingCrystal position={[-2, -1.5, -2]} scale={0.5} color="#5fa8d3" speed={1.5} />
      <FloatingCrystal position={[5, 2, -3]} scale={0.7} color="#bcccdc" speed={0.9} />
      <FloatingCrystal position={[-6, 0, -2]} scale={0.45} color="#5fa8d3" speed={1.3} />

      <FloatingBox
        position={[-1, 2.5, -2]}
        scale={[0.5, 0.5, 0.5]}
        color="#123c69"
        speed={0.7}
      />
      <FloatingBox
        position={[2, -2, -1]}
        scale={[0.4, 0.8, 0.4]}
        color="#0a2540"
        speed={1.1}
      />
      <FloatingBox
        position={[6, 1, -4]}
        scale={[0.6, 0.3, 0.6]}
        color="#5fa8d3"
        speed={0.85}
      />

      <FloatingRings />
      <CityBuildings />

      <Sparkles
        count={180}
        scale={[20, 12, 15]}
        size={1.2}
        speed={0.3}
        color="#5fa8d3"
        opacity={0.7}
      />
      <Sparkles
        count={80}
        scale={[15, 8, 10]}
        size={0.8}
        speed={0.2}
        color="#ffffff"
        opacity={0.4}
      />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
      dpr={[1, 1.5]}
      style={{ background: "#0a2540" }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
