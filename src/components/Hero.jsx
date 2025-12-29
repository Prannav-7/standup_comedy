import React from 'react';
import { motion } from 'framer-motion';
import StageScene from './3d/StageScene';
import LightRays from './LightRays';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950">
      {/* Light Rays Background Effect */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="hero-light-rays"
        />
      </div>

      <StageScene />

      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[15vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 tracking-tighter mix-blend-difference select-none"
        >
          LAUGH
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[15vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-t from-white to-zinc-800 tracking-tighter mix-blend-difference select-none mt-[-4vw]"
        >
          RIOT
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-12 text-white text-sm md:text-base font-mono tracking-widest uppercase flex flex-col gap-2"
        >
          <span>Est. 2025</span>
          <span>Underground Comedy Collective</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 right-6 md:right-12 text-white text-right font-mono text-xs md:text-sm"
        >
          <p>Scroll to Enter</p>
          <div className="w-full h-[1px] bg-white mt-2 animate-pulse origin-right scale-x-50" />
        </motion.div>
      </div>
    </div>
  );
}
