import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import micImage from '../images/intromic.webp';

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState('image'); // 'image' -> 'text' -> 'complete'
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    console.log('🎬 IntroAnimation mounted!');

    // Stage 1: Show image for 2.5 seconds
    const timer1 = setTimeout(() => {
      console.log('Stage: Image dissolving with powder effect');
      // Generate particles for powder effect
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        delay: Math.random() * 0.3,
        duration: 0.8 + Math.random() * 0.4,
      }));
      setParticles(newParticles);

      // Transition to text after powder effect starts
      setTimeout(() => {
        setStage('text');
      }, 400);
    }, 2500);

    // Stage 2: Show text for 2.5 seconds
    const timer2 = setTimeout(() => {
      console.log('Stage: Text dissolving');
      setStage('complete');
    }, 5500);

    // Complete intro
    const timer3 = setTimeout(() => {
      console.log('✅ Intro complete');
      if (onComplete) onComplete();
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {/* STAGE 1: Image Only */}
        {stage === 'image' && (
          <motion.div
            key="image-stage"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 50% 50%, rgba(255, 0, 85, 0.2) 0%, rgba(0, 0, 0, 1) 60%)',
                  'radial-gradient(circle at 50% 50%, rgba(0, 234, 255, 0.2) 0%, rgba(0, 0, 0, 1) 60%)',
                  'radial-gradient(circle at 50% 50%, rgba(255, 0, 85, 0.2) 0%, rgba(0, 0, 0, 1) 60%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Pulsing rings */}
            <motion.div
              className="absolute w-96 h-96 rounded-full border-2 border-cyan-500/20"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />

            <motion.div
              className="absolute w-96 h-96 rounded-full border-2 border-pink-500/20"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 1.25 }}
            />

            {/* Main image container */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{
                scale: 0.8,
                opacity: 0,
                filter: 'blur(20px)',
              }}
              transition={{
                initial: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
                exit: { duration: 0.6 }
              }}
            >
              {/* Glow effect behind image */}
              <motion.div
                className="absolute inset-0 -m-8 blur-3xl opacity-60 rounded-full"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(255, 0, 85, 0.6) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(0, 234, 255, 0.6) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(255, 0, 85, 0.6) 0%, transparent 70%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Image with gradient border */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-1.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-black border-4 border-black">
                  <motion.img
                    src={micImage}
                    alt="Microphone"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Powder particles on exit */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    delay: particle.delay,
                    duration: particle.duration,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: Text Only */}
        {stage === 'text' && (
          <motion.div
            key="text-stage"
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dark background */}
            <div className="absolute inset-0 bg-black" />

            {/* Subtle spotlight */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 70%)',
              }}
            />

            {/* Text container */}
            <div className="relative z-10 flex flex-col items-center max-w-6xl">
              {/* PUNCH */}
              <motion.div
                className="overflow-hidden mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-none"
                  style={{
                    background: 'linear-gradient(to bottom, #ffffff 0%, #71717a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 80px rgba(255,255,255,0.1)',
                  }}
                  initial={{ y: 120, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{
                    y: -50,
                    opacity: 0,
                    filter: 'blur(20px)',
                    scale: 0.9
                  }}
                  transition={{
                    initial: { duration: 0.9, ease: [0.6, 0.05, 0.01, 0.9] },
                    exit: { duration: 0.5 }
                  }}
                >
                  PUNCH
                </motion.h1>

                {/* Shine effect on PUNCH */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>

              {/* LINE */}
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.h1
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-none"
                  style={{
                    background: 'linear-gradient(to top, #ffffff 0%, #71717a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 80px rgba(255,255,255,0.1)',
                  }}
                  initial={{ y: 120, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{
                    y: -50,
                    opacity: 0,
                    filter: 'blur(20px)',
                    scale: 0.9
                  }}
                  transition={{
                    initial: { duration: 0.9, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] },
                    exit: { duration: 0.5 }
                  }}
                >
                  LINE
                </motion.h1>

                {/* Shine effect on LINE */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </motion.div>

              {/* Divider line */}
              <motion.div
                className="w-32 md:w-40 h-1 mt-8 md:mt-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{
                  initial: { duration: 0.8, delay: 0.8 },
                  exit: { duration: 0.3 }
                }}
              />

              {/* Tagline - properly spaced below */}
              <motion.p
                className="text-white/60 text-base sm:text-lg md:text-xl font-light tracking-[0.3em] uppercase mt-6 md:mt-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  initial: { duration: 0.8, delay: 1 },
                  exit: { duration: 0.3 }
                }}
              >
                Underground Comedy Collective
              </motion.p>
            </div>

            {/* Ambient sparkles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Powder particles on text exit */}
            {stage === 'complete' && [...Array(40)].map((_, i) => (
              <motion.div
                key={`text-particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-white/60"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  delay: Math.random() * 0.2,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
