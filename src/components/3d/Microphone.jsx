import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

export function Microphone(props) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
        // Subtle breathing animation
        meshRef.current.rotation.x = Math.cos(t / 4) / 8 + 0.1;
        meshRef.current.rotation.y = Math.sin(t / 4) / 8;
        meshRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group {...props} dispose={null}>
        {/* Mic Head */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial 
            color="#222" 
            roughness={0.4} 
            metalness={0.8} 
            distort={0.3} 
            speed={2} 
            wireframe={true}
          />
        </mesh>
        
        {/* Inner Mic Head (Solid) */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#111" roughness={0.2} metalness={1} />
        </mesh>

        {/* Mic Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.15, 2.5, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Ring detail */}
        <mesh position={[0, 1.25, 0]}>
            <torusGeometry args={[0.22, 0.02, 16, 32]} />
            <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}
