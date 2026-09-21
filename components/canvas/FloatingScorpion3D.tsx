'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ScorpionEmblemMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
      ringRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Glowing Energy Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#00E5CC"
          emissive="#00E5CC"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Central Metallic Octahedron Shield Core */}
      <mesh castShadow receiveShadow scale={[1.3, 1.6, 1.3]}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial
          color="#FFB800"
          metalness={0.95}
          roughness={0.15}
          emissive="#7A5800"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#00E5CC"
          emissive="#00E5CC"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Scorpion Tail Stinger representation (Top Cone) */}
      <mesh position={[0, 1.9, 0]} rotation={[0, 0, 0]} scale={[0.4, 0.8, 0.4]}>
        <coneGeometry args={[1, 2, 16]} />
        <meshStandardMaterial
          color="#FFB800"
          metalness={1.0}
          roughness={0.1}
          emissive="#FFB800"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function FloatingScorpion3D() {
  return (
    <div className="w-full h-[320px] md:h-[420px] relative flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} color="#FFB800" />
        <pointLight position={[-5, -5, 5]} intensity={1.5} color="#00E5CC" />
        <ScorpionEmblemMesh />
      </Canvas>
    </div>
  );
}
