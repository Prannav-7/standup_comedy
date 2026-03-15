import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { motion, useInView } from 'framer-motion';

// Import images
import micPersonImg from '../images/Mike Epps_ Don\'t Take it Personal.jpg';
import personImg from '../images/person.jpeg';
import person1Img from '../images/Sketch Paris theatre Humour Humoriste.jpg';
import audienceImg from '../images/Laugh at a Comedy Show.jpg';
import peopleImg from '../images/Home - The Stand Comedy Club.jpg';
import people1Img from '../images/people1.jpeg';
import stageImg from '../images/Stand-up Comedy.jpg';
import micImg from '../images/intromic.webp';

gsap.registerPlugin(ScrollTrigger, Flip);

const separatorVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const steps = 60;
        const increment = target / steps;
        const intervalMs = (duration * 1000) / steps;
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, intervalMs);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, desc, accentColor, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="showcase-feature-card"
            style={{ '--accent': accentColor }}
        >
            <div className="showcase-feature-icon">{icon}</div>
            <h4 className="showcase-feature-title">{title}</h4>
            <p className="showcase-feature-desc">{desc}</p>
            <div className="showcase-feature-bar" />
        </motion.div>
    );
}

export default function CardGallery() {
    const galleryRef = useRef(null);
    const wrapperRef = useRef(null);
    const flipCtxRef = useRef(null);

    const galleryItems = [
        { img: micPersonImg, title: "Raw Energy", subtitle: "Unfiltered comedy 🔥", accent: '#ff0055' },
        { img: personImg, title: "Main Stage", subtitle: "Where legends perform 🎤", accent: '#00eaff' },
        { img: person1Img, title: "Paris Nights", subtitle: "Comedy without borders 🌍", accent: '#ffaa00' },
        { img: audienceImg, title: "Crowd Energy", subtitle: "Feel the laughter 😂", accent: '#00ff88' },
        { img: peopleImg, title: "The Stand", subtitle: "Underground vibes ✨", accent: '#ff9ffc' },
        { img: people1Img, title: "Community", subtitle: "Strangers become friends 🤝", accent: '#a78bfa' },
        { img: stageImg, title: "Spotlight", subtitle: "Your moment awaits 💫", accent: '#00eaff' },
        { img: micImg, title: "The Mic", subtitle: "Where it all begins 🎙️", accent: '#ff0055' },
    ];

    const stats = [
        { value: 500, suffix: '+', label: 'Live Shows', color: '#00eaff' },
        { value: 12000, suffix: '+', label: 'Audience Members', color: '#ff0055' },
        { value: 80, suffix: '+', label: 'Comedians', color: '#ffaa00' },
        { value: 6, suffix: ' yrs', label: 'Underground Legacy', color: '#00ff88' },
    ];

    const features = [
        { icon: '🎤', title: 'Open Mic Nights', desc: 'Every Wednesday. Any voice. No filters.', accentColor: '#00eaff' },
        { icon: '🎭', title: 'Improv Sessions', desc: 'Raw, unscripted chaos that hits different.', accentColor: '#ff0055' },
        { icon: '🔥', title: 'Headline Acts', desc: 'The biggest names. The wildest sets.', accentColor: '#ffaa00' },
        { icon: '🤝', title: 'The Collective', desc: 'A community where strangers become legends.', accentColor: '#00ff88' },
        { icon: '🌍', title: 'Global Voices', desc: 'Comedy without borders or boundaries.', accentColor: '#ff9ffc' },
        { icon: '✨', title: 'Rising Stars', desc: 'Where tomorrow\'s icons find their stage today.', accentColor: '#a78bfa' },
    ];

    useEffect(() => {
        const createTween = () => {
            const galleryElement = galleryRef.current;
            const items = galleryElement?.querySelectorAll('.gallery__item');

            if (!galleryElement || !items) return;

            const isMobile = window.innerWidth < 640;
            if (isMobile) {
                if (flipCtxRef.current) flipCtxRef.current.revert();
                galleryElement.classList.remove('gallery--final');
                return;
            }

            if (flipCtxRef.current) flipCtxRef.current.revert();
            galleryElement.classList.remove('gallery--final');

            flipCtxRef.current = gsap.context(() => {
                galleryElement.classList.add('gallery--final');
                const flipState = Flip.getState(items);
                galleryElement.classList.remove('gallery--final');

                // Use power2.inOut — lighter than expoScale, still dramatic
                const flip = Flip.to(flipState, {
                    simple: true,
                    ease: 'power2.inOut',
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: galleryElement,
                        start: 'center center',
                        end: '+=100%',
                        // scrub: number = smoothing lag (seconds). 1.5 gives butter-smooth feel
                        scrub: 1.5,
                        pin: wrapperRef.current,
                        anticipatePin: 1,
                        // Only update on scroll end axes to reduce compositing calls
                        fastScrollEnd: true,
                        preventOverlaps: true,
                    },
                });

                tl.add(flip);
                return () => gsap.set(items, { clearProps: 'all' });
            });
        };

        createTween();
        window.addEventListener('resize', createTween);

        return () => {
            window.removeEventListener('resize', createTween);
            if (flipCtxRef.current) flipCtxRef.current.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <>
            <div className="gallery-wrap" ref={wrapperRef}>
                <div className="gallery gallery--bento" ref={galleryRef}>
                    {galleryItems.map((item, index) => (
                        <div key={index} className="gallery__item" style={{ '--item-accent': item.accent }}>
                            {/* Ken Burns slow zoom on idle, fast zoom on hover */}
                            <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                decoding="async"
                            />
                            {/* Shimmer sweep overlay on hover */}
                            <div className="gallery__item-shimmer" />
                            {/* Accent glow on hover */}
                            <div className="gallery__item-glow" />
                            <div className="gallery__item-content">
                                <span className="gallery__item-number">0{index + 1}</span>
                                <h3 className="gallery__item-title">{item.title}</h3>
                                <p className="gallery__item-subtitle">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── SHOWCASE SECTION ── */}
            <section className="showcase-section">

                {/* Orbs use CSS animation only — NO blur() during scroll (set will-change) */}
                <div className="showcase-orb showcase-orb--cyan" />
                <div className="showcase-orb showcase-orb--red" />
                <div className="showcase-orb showcase-orb--purple" />

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45 }}
                    className="showcase-badge"
                >
                    <span className="showcase-badge-dot" />
                    MEDAI COMEDY COLLECTIVE — EST. 2018
                    <span className="showcase-badge-dot" />
                </motion.div>

                {/* Headline */}
                <div className="showcase-headline-wrap">
                    <motion.h2
                        className="showcase-headline"
                        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    >
                        WHERE <em>LAUGHTER</em>
                    </motion.h2>
                    <motion.h2
                        className="showcase-headline showcase-headline--outline"
                        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        BECOMES ART
                    </motion.h2>
                </div>

                {/* Stats Row */}
                <div className="showcase-stats-row">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            className="showcase-stat"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="showcase-stat-value" style={{ color: s.color }}>
                                <AnimatedCounter target={s.value} suffix={s.suffix} />
                            </div>
                            <div className="showcase-stat-label">{s.label}</div>
                            <div className="showcase-stat-line" style={{ background: s.color }} />
                        </motion.div>
                    ))}
                </div>

                {/* Divider */}
                <motion.div
                    className="showcase-divider"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Feature Grid */}
                <div className="showcase-features-grid">
                    {features.map((f, i) => (
                        <FeatureCard key={i} {...f} index={i} />
                    ))}
                </div>

                {/* Quote */}
                <motion.blockquote
                    className="showcase-quote"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <span className="showcase-quote-mark">"</span>
                    We don't just tell jokes — we burn the script&nbsp;and&nbsp;rewrite the rules.
                    <span className="showcase-quote-mark">"</span>
                    <cite>— Medai Collective</cite>
                </motion.blockquote>

            </section>

            {/* Section Separator */}
            <motion.div
                className="section-separator"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8, margin: "-50px" }}
            >
                <motion.div className="separator-line" variants={separatorVariants} />
                <motion.div
                    className="separator-glow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.span
                    className="separator-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    ✦ CONNECT WITH US ✦
                </motion.span>
            </motion.div>
        </>
    );
}
