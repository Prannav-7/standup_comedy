import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import comedyTeamImg from '../gemini/comedy_team_1773552841945.png';

/* ─── Text Scramble Hook ─── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
function useScramble(text, trigger) {
  const [displayed, setDisplayed] = useState(text);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) { setDisplayed(text); return; }
    let frame = 0;
    const totalFrames = 18;
    const run = () => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '\n') return char;
            const reveal = Math.floor((frame / totalFrames) * text.replace(/ /g, '').length);
            const charIdx = text.slice(0, i).replace(/ /g, '').length;
            if (charIdx < reveal) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      frame++;
      if (frame <= totalFrames) rafRef.current = requestAnimationFrame(run);
      else setDisplayed(text);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text]);

  return displayed;
}

/* ─── Scramble Heading ─── */
function ScrambleHeading({ children, className }) {
  const [hovered, setHovered] = useState(false);
  const text = typeof children === 'string' ? children : children.toString();
  const scrambled = useScramble(text, hovered);

  return (
    <h2
      className={`${className} cursor-default select-none`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {scrambled}
    </h2>
  );
}

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === '∞') return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  const display = target === '∞' ? '∞' : `${count}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums">
      {started ? display : '0' + suffix}
    </span>
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 12);
    rotateX.set(-dy * 10);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic element ─── */
function Magnetic({ children, strength = 0.3, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 20 });
  const sy = useSpring(y, { stiffness: 180, damping: 20 });
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Click Ripple ─── */
function useRipples() {
  const [ripples, setRipples] = useState([]);
  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900);
  }, []);
  return [ripples, addRipple];
}

/* ─── Cursor Spotlight ─── */
function CursorSpotlight({ containerRef }) {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    el.addEventListener('mousemove', move);
    return () => el.removeEventListener('mousemove', move);
  }, [containerRef, x, y]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ borderRadius: 'inherit' }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          x: useSpring(x, { stiffness: 120, damping: 20 }),
          y: useSpring(y, { stiffness: 120, damping: 20 }),
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
export default function Manifesto() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [ripples, addRipple] = useRipples();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section
      ref={(el) => { containerRef.current = el; sectionRef.current = el; }}
      className="bg-[#ff0055] min-h-screen flex items-center justify-center overflow-hidden py-24 relative cursor-crosshair"
      onClick={addRipple}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-multiply pointer-events-none" />

      {/* 🌟 Cursor spotlight */}
      <CursorSpotlight containerRef={sectionRef} />

      {/* 💥 Click ripples */}
      {ripples.map(({ id, x, y }) => (
        <motion.div
          key={id}
          className="absolute rounded-full border-2 border-white/60 pointer-events-none z-20"
          style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text side ── */}
          <div className="max-w-2xl">

            <motion.div style={{ x: x1 }} className="mb-10">
              <motion.span
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-xs font-mono tracking-[0.4em] uppercase text-black/60 mb-6"
              >
                ◆ Our Manifesto ◆
              </motion.span>

              {/* Hover to scramble */}
              <div className="group">
                <ScrambleHeading
                  className="text-6xl md:text-8xl font-black text-black uppercase leading-[0.9] tracking-tighter transition-colors duration-150"
                >
                  WE DON&apos;T JUST
                </ScrambleHeading>
                <motion.span
                  whileHover={{ letterSpacing: '0.02em', textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="block text-6xl md:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter cursor-pointer"
                  style={{ WebkitTextStroke: '2px rgba(0,0,0,0.3)' }}
                >
                  TELL JOKES.
                </motion.span>
              </div>
            </motion.div>

            <motion.div style={{ x: x2 }} className="mb-12">
              <ScrambleHeading className="text-6xl md:text-8xl font-black text-black uppercase leading-[0.9] tracking-tighter">
                WE START
              </ScrambleHeading>
              <motion.span
                whileHover={{
                  scale: 1.04,
                  textShadow: '6px 6px 0px rgba(0,0,0,0.4)',
                  letterSpacing: '0.03em',
                }}
                transition={{ duration: 0.2 }}
                className="block text-6xl md:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter cursor-pointer"
                style={{ WebkitTextStroke: '2px rgba(0,0,0,0.3)' }}
              >
                RIOTS.
              </motion.span>
            </motion.div>

            {/* Magnetic quote card */}
            <Magnetic strength={0.15}>
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                whileHover={{ rotate: 0, scale: 1.02, boxShadow: '14px_14px_0px_0px_rgba(0,0,0,0.6)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="bg-black text-white p-8 md:p-10 max-w-xl border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] relative overflow-hidden group cursor-pointer"
              >
                {/* Sheen sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12"
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '220%' }}
                  transition={{ duration: 0.55 }}
                />
                <p className="text-xl md:text-2xl font-bold font-mono leading-relaxed relative z-10">
                  "Comedy is the art of making people laugh without making them puke."
                </p>
                <p className="mt-4 font-mono text-gray-400 relative z-10">— Steve Martin (Probably)</p>
              </motion.div>
            </Magnetic>

            {/* Stats with counter animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex gap-10 mt-10"
            >
              {[
                { target: '50', suffix: '+', label: 'Live Shows' },
                { target: '3', suffix: '', label: 'Comedians' },
                { target: '∞', suffix: '', label: 'Laughs' },
              ].map(({ target, suffix, label }) => (
                <Magnetic key={label} strength={0.25}>
                  <motion.div
                    whileHover={{ scale: 1.12, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col cursor-default group"
                  >
                    <span className="text-4xl md:text-5xl font-black text-black group-hover:text-white transition-colors duration-200">
                      <Counter target={target} suffix={suffix} />
                    </span>
                    <span className="text-sm font-mono uppercase tracking-widest text-black/60 group-hover:text-black/80 transition-colors">
                      {label}
                    </span>
                  </motion.div>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* ── 3D Tilt image card ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <TiltCard className="relative">
              <div
                className="relative overflow-hidden rounded-2xl border-4 border-black/20 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.img
                  style={{ scale: imgScale }}
                  src={comedyTeamImg}
                  alt="The Laugh Riot Comedy Team"
                  className="w-full h-auto object-cover"
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff0055]/60 via-transparent to-transparent" />

                {/* Hover shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur p-4 rounded-xl border border-white/10"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[#ff0055] flex-shrink-0"
                    />
                    <div>
                      <p className="text-white font-black text-lg tracking-tight leading-tight">The Laugh Riot Collective</p>
                      <p className="text-zinc-400 text-sm font-mono">Your new favourite underground comedians</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Rotating sticker — floats above card in 3D */}
              <motion.div
                animate={{ rotate: [0, 6, 0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15, rotate: 15 }}
                className="absolute -top-5 -right-5 bg-white text-black text-xs font-black px-4 py-2 rounded-full shadow-xl uppercase tracking-widest border-2 border-black cursor-pointer z-10"
                style={{ transform: 'translateZ(30px)' }}
              >
                Est. 2025 🎤
              </motion.div>
            </TiltCard>

            {/* Floating decorative dots */}
            {[
              { size: 10, bottom: '12%', left: '-5%', delay: 0 },
              { size: 6, top: '20%', left: '-8%', delay: 0.5 },
              { size: 14, bottom: '30%', right: '-6%', delay: 1 },
            ].map((dot, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
                className="absolute rounded-full bg-black/30 pointer-events-none"
                style={{ width: dot.size, height: dot.size, ...dot }}
              />
            ))}
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full" style={{ display: 'block' }}>
          <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="#09090b" />
        </svg>
      </div>
    </section>
  );
}
