import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import heroBg from '../gemini/pro_comedy_hero.png';

const NEXT_SHOW = { date: 'Friday, 21 March 2025', time: '8:00 PM', venue: 'The Underground — 42 Laugh Street, NYC' };

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.45)' }}
        />
      </div>

      {/* ── Dark vignettes ── */}
      <div className="absolute inset-0 z-1" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />
      <div className="absolute inset-0 z-1" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24 max-w-screen-xl mx-auto">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-amber-400" />
          <span className="text-amber-400 text-xs font-semibold tracking-[0.35em] uppercase">
            Est. 2019 &nbsp;·&nbsp; New York City
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
        >
          THE UNDERGROUND<br />
          <span style={{ color: '#e8c96a' }}>COMEDY CLUB</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-white/60 text-lg md:text-xl font-normal max-w-xl mb-10 leading-relaxed"
        >
          New York's most intimate comedy venue. Unscripted nights, legendary laughs.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <motion.a
            href="#shows"
            whileHover={{ backgroundColor: '#d4a843' }}
            transition={{ duration: 0.2 }}
            className="px-8 py-4 bg-amber-400 text-black font-bold text-sm uppercase tracking-widest rounded-none"
          >
            View This Week's Shows
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ borderColor: 'rgba(255,255,255,0.8)', color: 'rgba(255,255,255,1)' }}
            transition={{ duration: 0.2 }}
            className="px-8 py-4 border border-white/40 text-white/70 font-semibold text-sm uppercase tracking-widest rounded-none"
          >
            About the Club
          </motion.a>
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 pt-6 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-2 items-center"
        >
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xs">📅</span>
            <span className="text-white/50 text-xs font-mono tracking-widest uppercase">{NEXT_SHOW.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xs">🕗</span>
            <span className="text-white/50 text-xs font-mono tracking-widest uppercase">{NEXT_SHOW.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xs">📍</span>
            <span className="text-white/50 text-xs font-mono tracking-widest uppercase">{NEXT_SHOW.venue}</span>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 font-mono text-[10px] tracking-[0.4em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-px h-12 bg-white/15 overflow-hidden relative">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-amber-400 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}
