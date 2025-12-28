import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        seats: '1',
        message: ''
    });

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
            <footer className="relative bg-zinc-950 text-white py-20 md:py-32 px-6 overflow-hidden border-t border-white/10">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 opacity-50" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

                {/* Glow effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00eaff]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff0055]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto relative z-10">
                    {/* Main content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-16">
                        {/* Brand section */}
                        <div className="flex-1">
                            <h2 className="text-6xl md:text-8xl lg:text-9xl leading-none font-black tracking-tighter uppercase mb-6">
                                <span className="text-white">Laugh</span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-purple-500 to-[#00eaff]">
                                    Riot
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-400 font-light max-w-md leading-relaxed mb-8">
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
                        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
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
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-12 md:my-16" />

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
            </footer>

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
