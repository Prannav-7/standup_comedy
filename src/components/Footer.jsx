import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Generate floating ambient particles
const generateAmbientParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `ambient-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
        color: Math.random() > 0.5 ? '#00eaff' : '#ff0055'
    }));
};

// Generate burst particles that explode outward when footer appears
const generateBurstParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `burst-${i}`,
        startX: 50 + (Math.random() - 0.5) * 20, // Start near center
        startY: 100, // Start from bottom
        endX: Math.random() * 100, // Spread across width
        endY: Math.random() * 80, // Float upward
        size: Math.random() * 6 + 3,
        duration: Math.random() * 1.5 + 1,
        delay: Math.random() * 0.5,
        color: ['#00eaff', '#ff0055', '#ffaa00', '#00ff88', '#ff6b9d', '#8b5cf6'][Math.floor(Math.random() * 6)]
    }));
};

// Generate sparkle particles
const generateSparkles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `sparkle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 1.5,
    }));
};

export default function Footer() {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [ambientParticles, setAmbientParticles] = useState([]);
    const [burstParticles, setBurstParticles] = useState([]);
    const [sparkles, setSparkles] = useState([]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, amount: 0.3 });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        seats: '1',
        message: ''
    });

    useEffect(() => {
        setAmbientParticles(generateAmbientParticles(25));
        setBurstParticles(generateBurstParticles(40));
        setSparkles(generateSparkles(20));
    }, []);

    // Trigger burst animation when footer comes into view
    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Booking submitted:', formData);
        alert('Booking request submitted! We\'ll contact you soon.');
        setShowBookingModal(false);
        setFormData({ name: '', email: '', phone: '', date: '', seats: '1', message: '' });
    };

    return (
        <>
            <motion.footer
                ref={footerRef}
                className="relative bg-zinc-950 text-white py-12 md:py-16 px-6 overflow-hidden border-t border-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* === ENHANCED POWDERING EFFECT === */}

                {/* 1. Burst Particles - Explode outward when footer appears */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {hasAnimated && burstParticles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                backgroundColor: particle.color,
                                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}`,
                            }}
                            initial={{
                                left: `${particle.startX}%`,
                                bottom: '0%',
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                left: `${particle.endX}%`,
                                bottom: `${particle.endY}%`,
                                opacity: [0, 1, 0.8, 0],
                                scale: [0, 1.5, 1, 0]
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        />
                    ))}
                </div>

                {/* 2. Ambient Floating Particles - Continuous floating effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {ambientParticles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                left: `${particle.x}%`,
                                bottom: `${particle.y}%`,
                                width: particle.size,
                                height: particle.size,
                                backgroundColor: particle.color,
                                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                            }}
                            initial={{ opacity: 0, y: 0, scale: 0 }}
                            animate={hasAnimated ? {
                                opacity: [0, 0.7, 0.5, 0],
                                y: [-10, -60, -120],
                                scale: [0.3, 1, 0.2],
                            } : {}}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay + 0.5,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>

                {/* 3. Sparkle Particles - Twinkling stars effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {sparkles.map((sparkle) => (
                        <motion.div
                            key={sparkle.id}
                            className="absolute"
                            style={{
                                left: `${sparkle.x}%`,
                                top: `${sparkle.y}%`,
                                width: sparkle.size,
                                height: sparkle.size,
                            }}
                            initial={{ opacity: 0, scale: 0, rotate: 0 }}
                            animate={hasAnimated ? {
                                opacity: [0, 1, 0.5, 1, 0],
                                scale: [0, 1, 0.5, 1, 0],
                                rotate: [0, 180, 360]
                            } : {}}
                            transition={{
                                duration: sparkle.duration,
                                delay: sparkle.delay + 0.3,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut"
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path
                                    d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
                                    fill="url(#sparkleGradient)"
                                />
                                <defs>
                                    <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00eaff" />
                                        <stop offset="100%" stopColor="#ff0055" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* 4. Bottom Wave Powder Effect */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={hasAnimated ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`wave-${i}`}
                            className="absolute rounded-full"
                            style={{
                                left: `${(i / 15) * 100 + Math.random() * 5}%`,
                                bottom: 0,
                                width: Math.random() * 8 + 4,
                                height: Math.random() * 8 + 4,
                                backgroundColor: i % 2 === 0 ? '#00eaff' : '#ff0055',
                                boxShadow: `0 0 15px ${i % 2 === 0 ? '#00eaff' : '#ff0055'}`,
                            }}
                            animate={{
                                y: [0, -(Math.random() * 100 + 50)],
                                opacity: [0.8, 0],
                                scale: [1, 0.3]
                            }}
                            transition={{
                                duration: Math.random() * 2 + 2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 opacity-50" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

                {/* Glow effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00eaff]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff0055]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto relative z-10">
                    {/* Main content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
                        {/* Brand section */}
                        <div className="flex-1">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl leading-none font-black tracking-tighter uppercase mb-4">
                                <span className="text-white">Laugh</span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-purple-500 to-[#00eaff]">
                                    Riot
                                </span>
                            </h2>
                            <p className="text-base md:text-lg text-zinc-400 font-light max-w-md leading-relaxed mb-6">
                                An underground collective of comedians, artists, and troublemakers bringing chaos to the stage.
                            </p>

                            {/* Book Seats Button */}
                            <motion.button
                                onClick={() => setShowBookingModal(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-[#ff0055] to-[#00eaff] text-white font-black text-lg rounded-full uppercase tracking-wider shadow-2xl hover:shadow-[#ff0055]/50 transition-all duration-300"
                            >
                                🎟️ Book Your Seats
                            </motion.button>
                        </div>

                        {/* Links section */}
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                            {/* Social links */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-2">
                                    Follow Us
                                </h3>
                                <a
                                    href="#"
                                    className="text-lg font-mono text-white/80 hover:text-[#00eaff] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#00eaff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Instagram
                                </a>
                                <a
                                    href="#"
                                    className="text-lg font-mono text-white/80 hover:text-[#00eaff] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#00eaff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Twitter
                                </a>
                                <a
                                    href="#"
                                    className="text-lg font-mono text-white/80 hover:text-[#00eaff] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#00eaff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    YouTube
                                </a>
                            </div>

                            {/* Contact */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-2">
                                    Get in Touch
                                </h3>
                                <a
                                    href="mailto:hello@laughriot.com"
                                    className="text-lg font-mono text-white/80 hover:text-[#ff0055] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#ff0055] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    📧 hello@laughriot.com
                                </a>
                                <a
                                    href="mailto:booking@laughriot.com"
                                    className="text-lg font-mono text-white/80 hover:text-[#ff0055] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#ff0055] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    📩 booking@laughriot.com
                                </a>
                                <a
                                    href="#"
                                    className="text-lg font-mono text-white/80 hover:text-[#ff0055] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#ff0055] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Join Us
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-8 md:my-10" />

                    {/* Bottom bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm text-zinc-500">
                        <span>© 2025 Laugh Riot Comedy Collective</span>
                        <div className="flex items-center gap-6">
                            <a href="#" className="hover:text-white transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Terms
                            </a>
                            <span className="flex items-center gap-2">
                                Made with <span className="text-[#ff0055]">♥</span> and Chaos
                            </span>
                        </div>
                    </div>
                </div>
            </motion.footer>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBookingModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowBookingModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative bg-zinc-900 border-2 border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                            >
                                ✕
                            </button>

                            {/* Modal header */}
                            <div className="mb-8">
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                    Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#00eaff]">Seats</span>
                                </h3>
                                <p className="text-zinc-400 font-mono">
                                    Fill in your details and we'll get back to you soon!
                                </p>
                            </div>

                            {/* Booking form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-white font-mono text-sm mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#00eaff] transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-mono text-sm mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#00eaff] transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-mono text-sm mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#00eaff] transition-colors"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>

                                {/* Date & Seats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-mono text-sm mb-2">
                                            Preferred Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00eaff] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-mono text-sm mb-2">
                                            Number of Seats *
                                        </label>
                                        <select
                                            name="seats"
                                            value={formData.seats}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00eaff] transition-colors"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Seat' : 'Seats'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-white font-mono text-sm mb-2">
                                        Additional Message (Optional)
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#00eaff] transition-colors resize-none"
                                        placeholder="Any special requests or questions?"
                                    />
                                </div>

                                {/* Submit button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-[#ff0055] to-[#00eaff] text-white font-black text-lg rounded-full uppercase tracking-wider shadow-2xl hover:shadow-[#ff0055]/50 transition-all duration-300"
                                >
                                    Submit Booking Request
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
