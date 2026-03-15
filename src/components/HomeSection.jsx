import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import comedyEventImg from '../gemini/comedy_event_1773552859278.png';
import comedianPerformImg from '../gemini/comedian_perform_1773552821577.png';
import comedyTeamImg from '../gemini/comedy_team_1773552841945.png';
import stageImg from '../images/Stand-up Comedy.jpg';

/* ─────────── Marquee ticker ─────────── */
function Marquee({ items }) {
    return (
        <div className="overflow-hidden whitespace-nowrap py-4 border-t border-b border-white/10 my-16 relative">
            <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
            <motion.div
                animate={{ x: [0, '-50%'] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="inline-flex gap-12"
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-4">
                        <span className="text-[#00eaff] text-xs">◆</span>
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

/* ─────────── Image Carousel ─────────── */
const slides = [
    {
        src: comedyEventImg,
        alt: 'Packed comedy theatre',
        title: 'FEEL THE ENERGY',
        subtitle: 'Thousands of laughs every night ⚡',
        accent: 'from-[#ff0055] to-[#ff9ffc]',
        tag: 'Live Shows',
    },
    {
        src: comedianPerformImg,
        alt: 'Comedian on stage',
        title: 'RAW TALENT',
        subtitle: 'Unscripted. Unfiltered. Unstoppable. 🎤',
        accent: 'from-[#00eaff] to-[#0099cc]',
        tag: 'Open Mic',
    },
    {
        src: comedyTeamImg,
        alt: 'Comedy collective team',
        title: 'JOIN THE COLLECTIVE',
        subtitle: 'Where strangers become friends 🤝',
        accent: 'from-[#ffaa00] to-[#ff6600]',
        tag: 'Community',
    },
    {
        src: stageImg,
        alt: 'Comedy stage spotlight',
        title: 'THE SPOTLIGHT AWAITS',
        subtitle: 'Your moment to shine ✨',
        accent: 'from-[#00ff88] to-[#00cc66]',
        tag: 'Perform',
    },
];

function Carousel() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const intervalRef = useRef(null);
    const total = slides.length;

    const go = useCallback((idx, dir) => {
        setDirection(dir);
        setCurrent((idx + total) % total);
    }, [total]);

    const next = useCallback(() => go(current + 1, 1), [current, go]);
    const prev = useCallback(() => go(current - 1, -1), [current, go]);

    // Auto‑play
    useEffect(() => {
        intervalRef.current = setInterval(next, 4500);
        return () => clearInterval(intervalRef.current);
    }, [next]);

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(next, 4500);
    }, [next]);

    const handleNext = () => { next(); resetTimer(); };
    const handlePrev = () => { prev(); resetTimer(); };
    const handleDot = (i) => { go(i, i > current ? 1 : -1); resetTimer(); };

    // Drag / swipe
    const onDragStart = (e) => {
        setIsDragging(false);
        dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    };
    const onDragEnd = (e) => {
        const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX.current - endX;
        if (Math.abs(diff) > 40) { diff > 0 ? handleNext() : handlePrev(); }
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.96 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.96 }),
    };

    const slide = slides[current];

    return (
        <div className="relative w-full mb-16 select-none">
            {/* Main slide */}
            <div
                className="relative h-[480px] md:h-[560px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={onDragStart}
                onMouseUp={onDragEnd}
                onTouchStart={onDragStart}
                onTouchEnd={onDragEnd}
            >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0"
                    >
                        {/* Image */}
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover object-top"
                            draggable={false}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        {/* Tag badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className={`absolute top-6 left-6 px-3 py-1 rounded-full bg-gradient-to-r ${slide.accent} text-white text-xs font-mono tracking-widest uppercase`}
                        >
                            {slide.tag}
                        </motion.div>

                        {/* Text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <motion.h3
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3 drop-shadow-lg"
                            >
                                {slide.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="text-zinc-200 text-lg md:text-xl font-mono"
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Accent line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className={`h-1 mt-4 rounded-full bg-gradient-to-r ${slide.accent} origin-left w-24`}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 group"
                >
                    <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Dots + counter row */}
            <div className="flex items-center justify-between mt-5 px-1">
                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDot(i)}
                            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                            style={{ width: i === current ? 36 : 12, background: i === current ? 'transparent' : 'rgba(255,255,255,0.2)' }}
                        >
                            {i === current && (
                                <motion.div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${slide.accent}`}
                                    layoutId="activeDot"
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Slide counter */}
                <span className="text-zinc-600 font-mono text-xs tracking-widest">
                    <span className="text-white">{String(current + 1).padStart(2, '0')}</span>
                    &nbsp;/&nbsp;
                    {String(total).padStart(2, '0')}
                </span>
            </div>


        </div>
    );
}

/* ─────────── Catchphrase card ─────────── */
function CatchCard({ text, color, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? -1.2 : 1.2, y: -4 }}
            className="relative group cursor-default"
        >
            <div className={`relative bg-gradient-to-br ${color} p-8 rounded-2xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors duration-300`}>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    initial={{ x: '-120%', y: '-120%' }}
                    whileHover={{ x: '120%', y: '120%' }}
                    transition={{ duration: 0.55 }}
                />
                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight relative z-10">{text}</h4>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
        </motion.div>
    );
}

const marqueeTicker = [
    'Stand-Up Comedy', 'Open Mic Nights', 'Underground Vibes', 'No Suits Allowed',
    'Raw Talent', 'Laugh Riot', 'Unfiltered Laughs', 'Join The Collective',
];

const catchphrases = [
    { text: 'Where Jokes Hit Different', color: 'from-[#ff0055] to-[#ff6b9d]' },
    { text: 'Laughter Is Our Language', color: 'from-[#00eaff] to-[#0099cc]' },
    { text: 'Underground. Unfiltered. Unforgettable.', color: 'from-[#ffaa00] to-[#ff6600]' },
    { text: 'Raw Comedy, Real Vibes', color: 'from-[#00ff88] to-[#00cc66]' },
];

export default function HomeSection() {
    const containerRef = useRef(null);

    // Smooth scroll progress — used only for subtle bg, NOT for element positions
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Very subtle scale on the catch cards section — no y transform to avoid jank
    const catchScale = useTransform(scrollYProgress, [0.4, 0.7], [0.96, 1]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-zinc-950 py-24 overflow-hidden"
        >
            {/* Animated ambient bg — GPU-composited, no layout shifts */}
            <motion.div
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 55% at 15% 25%, rgba(0,234,255,0.07) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 85% 75%, rgba(255,0,85,0.07) 0%, transparent 65%)',
                    willChange: 'opacity',
                }}
            />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Floating emojis — CSS animation for perf */}
            {[
                { emoji: '😂', style: { top: '14%', right: '5%' }, delay: '0s', dur: '4s' },
                { emoji: '🎤', style: { bottom: '18%', left: '3%' }, delay: '1s', dur: '5s' },
                { emoji: '🎭', style: { top: '54%', right: '4%' }, delay: '2s', dur: '6s' },
                { emoji: '🔥', style: { top: '32%', left: '5%' }, delay: '0.5s', dur: '4.5s' },
            ].map(({ emoji, style, delay, dur }, i) => (
                <div
                    key={i}
                    className="absolute text-5xl opacity-[0.12] pointer-events-none select-none"
                    style={{
                        ...style,
                        animation: `floatY ${dur} ease-in-out ${delay} infinite`,
                        willChange: 'transform',
                    }}
                >
                    {emoji}
                </div>
            ))}

            <div className="container mx-auto px-4 relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-10 relative"
                >

                    <span className="inline-block text-xs font-mono tracking-[0.4em] uppercase text-[#00eaff] mb-4">
                        ◆ The Collective ◆
                    </span>

                    <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter relative z-10 leading-none">
                        THIS IS{' '}
                        <span
                            className="text-transparent bg-clip-text text-shimmer"
                        >
                            LAUGH RIOT
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-mono max-w-3xl mx-auto relative z-10">
                        The underground comedy collective where boundaries don't exist and laughter is mandatory
                    </p>
                </motion.div>



                {/* ── Carousel ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Carousel />
                </motion.div>

                {/* ── Catchphrase cards ── */}
                <motion.div style={{ scale: catchScale }} className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {catchphrases.map((phrase, i) => (
                            <CatchCard key={i} {...phrase} index={i} />
                        ))}
                    </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mt-24"
                >
                    <motion.button
                        whileHover={{ scale: 1.07, boxShadow: '0 0 50px rgba(255,0,85,0.45), 0 0 90px rgba(0,234,255,0.18)' }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: [
                                '0 0 0px rgba(255,0,85,0)',
                                '0 0 28px rgba(255,0,85,0.28)',
                                '0 0 0px rgba(255,0,85,0)',
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="px-14 py-6 bg-gradient-to-r from-[#ff0055] to-[#00eaff] text-white font-black text-xl rounded-full uppercase tracking-wider shadow-2xl"
                    >
                        Experience The Underground
                    </motion.button>
                    <motion.p
                        animate={{ opacity: [0.35, 0.7, 0.35] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="mt-6 text-zinc-500 font-mono text-sm"
                    >
                        No suits. No scripts. Just pure comedy chaos.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
