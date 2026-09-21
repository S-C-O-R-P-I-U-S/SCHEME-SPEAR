'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create randomized positions & scales for coins, rupee signs, and document cubes
  const items = useMemo(() => {
    const temp = [];
    const types = ['coin', 'rupee', 'doc'];
    for (let i = 0; i < 45; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 28,
          (Math.random() - 0.5) * 28,
          (Math.random() - 0.5) * 15 - 5,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: Math.random() * 0.4 + 0.2,
        speed: Math.random() * 0.4 + 0.2,
        type: types[i % 3],
        color: i % 2 === 0 ? '#FFB800' : '#00E5CC',
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Parallax mouse follow
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.03;

    // Rotate individual items
    groupRef.current.children.forEach((child, idx) => {
      child.rotation.x += delta * 0.3 * (idx % 2 === 0 ? 1 : -1);
      child.rotation.y += delta * 0.4 * (idx % 3 === 0 ? 1 : -1);
      child.position.y += Math.sin(state.clock.elapsedTime * 0.8 + idx) * 0.005;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => (
        <group key={idx} position={item.position} rotation={item.rotation} scale={item.scale}>
          {item.type === 'coin' && (
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.9, 0.9, 0.18, 32]} />
              <meshStandardMaterial
                color="#FFB800"
                metalness={0.85}
                roughness={0.2}
                emissive="#664900"
                emissiveIntensity={0.2}
              />
            </mesh>
          )}

          {item.type === 'rupee' && (
            <mesh>
              <torusGeometry args={[0.7, 0.18, 16, 32]} />
              <meshStandardMaterial
                color="#00E5CC"
                metalness={0.9}
                roughness={0.1}
                emissive="#004D44"
                emissiveIntensity={0.4}
              />
            </mesh>
          )}

          {item.type === 'doc' && (
            <mesh>
              <boxGeometry args={[0.9, 1.2, 0.1]} />
              <meshPhysicalMaterial
                color="#1E293B"
                transmission={0.6}
                opacity={0.85}
                transparent
                roughness={0.1}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

function Starfield() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#FFB800"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0E1A]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#FFB800" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#00E5CC" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#FFFFFF" />
        <FloatingObjects />
        <Starfield />
      </Canvas>
      {/* Radial vignette gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(10,14,26,0.2)_0%,rgba(10,14,26,0.85)_75%,rgba(10,14,26,1)_100%)] pointer-events-none" />
    </div>
  );
}
