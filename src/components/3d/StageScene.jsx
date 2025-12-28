import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, SpotLight } from '@react-three/drei';
import { Microphone } from './Microphone';

function Rig() {
  useFrame((state) => {
    state.camera.position.lerp({ x: -state.pointer.x * 2, y: -state.pointer.y * 2 + 1, z: 6 }, 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function StageScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        
        {/* Dramatic Spotlight */}
        <SpotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={200}
          castShadow
          shadow-mapSize={1024}
          color="#ff0055"
        />
        <SpotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={200}
          castShadow
          shadow-mapSize={1024}
          color="#00eaff"
        />

        <Microphone position={[0, -0.5, 0]} />
        
        <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
        <Environment preset="city" />
        <Rig />
      </Canvas>
    </div>
  );
}
