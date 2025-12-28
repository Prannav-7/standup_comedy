import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import introImage from '../images/Stand Up Comedy LED Light, Microphone Wall Art for Club Stage Bar Decor.jpg';

export default function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('🎬 IntroAnimation mounted!');

    // Start fade out after 3 seconds of display
    const fadeOutTimer = setTimeout(() => {
      console.log('🎬 Starting fade out...');
      setIsVisible(false);
    }, 3000);

    // Complete intro after fade out animation (3s display + 0.8s fade out)
    const completeTimer = setTimeout(() => {
      console.log('✅ Intro complete');
      if (onComplete) onComplete();
    }, 3800);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="intro-image"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <img
              src={introImage}
              alt="Stand Up Comedy"
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'crisp-edges',
                WebkitFontSmoothing: 'antialiased',
                filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
