import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section
      ref={containerRef}
      className="bg-[#ff0055] min-h-screen flex items-center justify-center overflow-hidden py-24 relative"
      style={{ position: 'relative' }}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div style={{ x: x1 }} className="mb-12">
            <h2 className="text-6xl md:text-8xl font-black text-black uppercase leading-[0.9] tracking-tighter">
              We don't just <br />
              <span className="text-white outline-text">tell jokes.</span>
            </h2>
          </motion.div>

          <motion.div style={{ x: x2 }} className="flex justify-end mb-12">
            <h2 className="text-6xl md:text-8xl font-black text-black uppercase leading-[0.9] tracking-tighter text-right">
              We start <br />
              <span className="text-white outline-text">Riots.</span>
            </h2>
          </motion.div>

          <motion.div
            style={{ rotate }}
            className="bg-black text-white p-8 md:p-12 max-w-xl mx-auto transform -rotate-3 border-4 border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,1)]"
          >
            <p className="text-xl md:text-2xl font-bold font-mono leading-relaxed">
              "Comedy is the art of making people laugh without making them puke."
            </p>
            <p className="mt-4 font-mono text-gray-400">— Steve Martin (Probably)</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
