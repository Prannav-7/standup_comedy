import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import heroBg from '../gemini/comedy_hero_bg_1773552807732.png';
import comedyEventImg from '../gemini/comedy_event_1773552859278.png';
import comedianPerformImg from '../gemini/comedian_perform_1773552821577.png';

/* ── Noise texture overlay (pure CSS, no image) ── */
const noiseStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '128px 128px',
};

/* ── Animated line tag ── */
function Tag({ children, delay = 0, color = '#00eaff' }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -3 }}
      style={{ borderColor: `${color}40`, color }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase cursor-default select-none backdrop-blur-sm bg-white/5"
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
      {children}
    </motion.span>
  );
}

/* ── Word-by-word reveal ── */
function WordReveal({ text, className, delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Ticker strip at bottom ── */
/* ── Floating accent image card ── */
function FloatingCard({ src, alt, className, delay, rotate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: rotate * 0.5 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
      className={`absolute overflow-hidden rounded-2xl shadow-2xl border border-white/10 cursor-pointer ${className}`}
      style={{ zIndex: 5 }}
    >
      {/* Subtle float animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 16);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-zinc-950">

      {/* ── Full-bleed background image ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: springX, y: springY, scale: 1.06 }}
      >
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.28) saturate(0.7)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-zinc-950/70 via-transparent to-zinc-950/40" />

      {/* Noise grain */}
      <div className="absolute inset-0 z-2 pointer-events-none opacity-60" style={noiseStyle} />

      {/* Ambient color orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none z-1"
        style={{ background: 'radial-gradient(circle, rgba(0,234,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none z-1"
        style={{ background: 'radial-gradient(circle, rgba(255,0,85,0.09) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* ── Floating image cards (right side) ── */}
      <FloatingCard
        src={comedyEventImg}
        alt="Comedy Event"
        className="w-44 h-56 md:w-56 md:h-72 right-[8%] top-[12%]"
        delay={0.9}
        rotate={4}
      />
      <FloatingCard
        src={comedianPerformImg}
        alt="Comedian Performing"
        className="w-36 h-44 md:w-44 md:h-56 right-[20%] top-[38%]"
        delay={1.1}
        rotate={-3}
      />

      {/* ── Content — left-aligned editorial layout ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-5xl">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[#ff0055]"
          />
          <span className="text-[#ff0055] text-xs font-mono tracking-[0.35em] uppercase">
            Est. 2025 · Underground Comedy Collective
          </span>
        </motion.div>

        {/* Big editorial headline */}
        <div className="mb-6">
          <h1 className="font-black leading-[0.9] tracking-tighter text-white" style={{ fontSize: 'clamp(4.5rem, 12vw, 10rem)' }}>
            <WordReveal text="THE" className="block text-white/20" delay={0.1} />
            <WordReveal
              text="UNDERGROUND"
              delay={0.2}
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fff 0%, #a0a0a0 100%)',
                WebkitBackgroundClip: 'text',
              }}
            />
            <WordReveal
              text="COMEDY"
              delay={0.4}
              className="block"
            />
          </h1>
          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 mt-4 rounded-full origin-left"
            style={{
              width: 'clamp(120px, 20vw, 260px)',
              background: 'linear-gradient(90deg, #ff0055, #00eaff)',
            }}
          />
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-zinc-400 font-mono text-sm md:text-base max-w-md mb-8 leading-relaxed"
        >
          Where jokes hit different, suits stay home, and every night burns a little brighter.
        </motion.p>

        {/* Tag row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <Tag delay={1.0} color="#ff0055">Open Mic</Tag>
          <Tag delay={1.1} color="#00eaff">Improv</Tag>
          <Tag delay={1.2} color="#ffaa00">Headline Acts</Tag>
          <Tag delay={1.3} color="#00ff88">Every Weekend</Tag>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <motion.a
            href="#shows"
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(255,0,85,0.5), 0 0 80px rgba(0,234,255,0.15)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff0055] to-[#ff6b35] text-white font-black text-sm rounded-full uppercase tracking-wider shadow-2xl"
          >
            Book Your Spot
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.a
            href="#about"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white/80 font-bold text-sm rounded-full uppercase tracking-wider hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            Explore Shows
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="flex gap-8 mt-12"
        >
          {[
            { val: '500+', label: 'Shows Performed' },
            { val: '80+', label: 'Comedians' },
            { val: '6 yrs', label: 'Underground Legacy' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white leading-none">{s.val}</span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-14 right-8 md:right-14 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</p>
        <div className="relative w-px h-14 bg-white/10 overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#00eaff] to-transparent"
          />
        </div>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
    </div>
  );
}
