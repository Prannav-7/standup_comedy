import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import audienceImg from '../images/audience.jpeg';
import micPersonImg from '../images/mic-person.jpeg';
import peopleImg from '../images/people.jpeg';
import stageImg from '../images/stage.jpeg';
import micImg from '../images/mic.jpeg';

export default function HomeSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    const catchphrases = [
        { text: "Where Jokes Hit Different", color: "from-[#ff0055] to-[#ff6b9d]" },
        { text: "Laughter Is Our Language", color: "from-[#00eaff] to-[#0099cc]" },
        { text: "Underground. Unfiltered. Unforgettable.", color: "from-[#ffaa00] to-[#ff6600]" },
        { text: "Raw Comedy, Real Vibes", color: "from-[#00ff88] to-[#00cc66]" }
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-zinc-950 py-24 overflow-hidden"
            style={{ position: 'relative' }}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 opacity-50" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header with Microphone Background */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 relative"
                >
                    {/* Large Microphone Background Image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-10 pointer-events-none">
                        <img
                            src={micImg}
                            alt="Microphone"
                            className="w-full h-full object-contain"
                            style={{ filter: 'grayscale(100%) contrast(1.5)' }}
                        />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter relative z-10">
                        THIS IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#00eaff]">PUNCHLINE</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-mono max-w-3xl mx-auto relative z-10">
                        The underground comedy collective where boundaries don't exist and laughter is mandatory
                    </p>
                </motion.div>

                {/* Image Grid with Catchphrases */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {/* Image 1 - Audience */}
                    <motion.div
                        style={{ y: y1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl"
                    >
                        <div className="relative h-[400px] overflow-hidden">
                            <img
                                src={audienceImg}
                                alt="Comedy audience"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                                FEEL THE ENERGY
                            </h3>
                            <p className="text-zinc-200 text-lg font-mono">
                                Every night is electric ⚡
                            </p>
                        </div>
                    </motion.div>

                    {/* Image 2 - Mic Person */}
                    <motion.div
                        style={{ y: y2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl"
                    >
                        <div className="relative h-[400px] overflow-hidden">
                            <img
                                src={micPersonImg}
                                alt="Comedian performing"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                                RAW TALENT
                            </h3>
                            <p className="text-zinc-200 text-lg font-mono">
                                Unscripted. Unfiltered. Unstoppable. 🎤
                            </p>
                        </div>
                    </motion.div>

                    {/* Image 3 - People */}
                    <motion.div
                        style={{ y: y2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl"
                    >
                        <div className="relative h-[400px] overflow-hidden">
                            <img
                                src={peopleImg}
                                alt="Comedy crowd"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                                JOIN THE COLLECTIVE
                            </h3>
                            <p className="text-zinc-200 text-lg font-mono">
                                Where strangers become friends 🤝
                            </p>
                        </div>
                    </motion.div>

                    {/* Image 4 - Stage */}
                    <motion.div
                        style={{ y: y1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl"
                    >
                        <div className="relative h-[400px] overflow-hidden">
                            <img
                                src={stageImg}
                                alt="Comedy stage"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                                THE SPOTLIGHT AWAITS
                            </h3>
                            <p className="text-zinc-200 text-lg font-mono">
                                Your moment to shine ✨
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Catchphrase Carousel */}
                <motion.div
                    style={{ scale }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {catchphrases.map((phrase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: index % 2 === 0 ? -2 : 2,
                                }}
                                className="relative group"
                            >
                                <div className={`bg-gradient-to-br ${phrase.color} p-8 rounded-xl shadow-2xl border-2 border-white/10 hover:border-white/30 transition-all duration-300`}>
                                    <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                        {phrase.text}
                                    </h4>

                                    {/* Decorative element */}
                                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-24"
                >
                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255, 0, 85, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-6 bg-gradient-to-r from-[#ff0055] to-[#00eaff] text-white font-black text-xl rounded-full uppercase tracking-wider shadow-2xl hover:shadow-[#ff0055]/50 transition-all duration-300"
                    >
                        Experience The Underground
                    </motion.button>

                    <p className="mt-6 text-zinc-500 font-mono text-sm">
                        No suits. No scripts. Just pure comedy chaos.
                    </p>
                </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 right-10 text-6xl opacity-20"
            >
                😂
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-20 left-10 text-6xl opacity-20"
            >
                🎤
            </motion.div>
        </section>
    );
}
