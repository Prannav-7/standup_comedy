import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = ['Shows', 'About', 'Comedians', 'Gallery', 'Blog', 'Contact'];
const CONTACT = [
  { icon: '✉', label: 'hello@undergroundcomedy.com', href: 'mailto:hello@undergroundcomedy.com' },
  { icon: '✉', label: 'booking@undergroundcomedy.com', href: 'mailto:booking@undergroundcomedy.com' },
  { icon: '📞', label: '+1 (212) 555-7820', href: 'tel:+12125557820' },
  { icon: '📍', label: '42 Laugh Street, TriBeCa, NYC', href: '#' },
];

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'WhatsApp', href: 'https://wa.me/12125557820' },
];

/* ─── Booking Modal ─── */
function BookingModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', seats: '2', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#111] border border-white/10 max-w-xl w-full max-h-[92vh] overflow-y-auto p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top amber stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white text-lg transition-colors"
        >✕</button>

        {!submitted ? (
          <>
            <p className="text-amber-400 text-xs font-mono tracking-[0.35em] uppercase mb-2">Reserve Your Seat</p>
            <h2 className="text-3xl font-black text-white tracking-tight mb-1">Book a Show</h2>
            <p className="text-white/40 text-sm font-mono mb-8">We'll confirm your booking within 24 hours.</p>

            <form onSubmit={submit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handle} required
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} required
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-1.5">Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handle} required
                    placeholder="+1 212 555 0000"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-1.5">Preferred Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handle} required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-amber-400/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-1.5">Seats *</label>
                <select name="seats" value={form.seats} onChange={handle}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-amber-400/50 transition-colors">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n} className="bg-[#111]">{n} {n === 1 ? 'Seat' : 'Seats'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-1.5">Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handle} rows="3"
                  placeholder="Special requests or questions?"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full py-4 bg-amber-400 text-black font-bold text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors">
                Submit Booking Request
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <p className="text-4xl mb-4">🎟</p>
            <h3 className="text-2xl font-black text-white mb-2">You're on the list.</h3>
            <p className="text-white/40 font-mono text-sm">We'll send confirmation to {form.email} within 24 hours.</p>
            <button onClick={onClose} className="mt-8 px-8 py-3 border border-white/15 text-white/60 text-sm font-mono uppercase tracking-widest hover:border-white/35 transition-colors">
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Footer ── */
export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer className="bg-[#080808] text-white border-t border-white/8">

        {/* ── Upper CTA band ─── */}
        <div className="border-b border-white/8 py-14">
          <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-amber-400 text-xs font-mono tracking-[0.4em] uppercase mb-2">Reserve Your Spot</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Ready to laugh?<br />
                <span className="text-white/40 font-normal text-xl md:text-2xl">Seats fill up fast every weekend.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ backgroundColor: '#d4a843' }}
                transition={{ duration: 0.2 }}
                className="px-8 py-4 bg-amber-400 text-black font-bold text-sm uppercase tracking-widest"
              >
                🎟 Book Your Seats
              </motion.button>
              <a
                href="https://wa.me/12125557820"
                className="px-8 py-4 border border-white/15 text-white/60 font-semibold text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-all duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* ── Main footer columns ── */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black tracking-tight text-white mb-1">
              LAUGH<span style={{ color: '#e8c96a' }}>RIOT</span>
            </h3>
            <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-5">Comedy Club · Est. 2019</p>
            <p className="text-white/40 text-sm leading-relaxed">
              New York's underground comedy venue. Raw, real, and running every weekend.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-white/30 mb-5">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4, color: '#e8c96a' }}
                    transition={{ duration: 0.15 }}
                    className="text-sm text-white/50 font-mono hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-white/30 mb-5">Contact</h4>
            <ul className="space-y-3">
              {CONTACT.map((c, i) => (
                <li key={i}>
                  <a href={c.href} className="text-sm text-white/50 font-mono hover:text-white transition-colors flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5 text-xs flex-shrink-0">{c.icon}</span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials + Schedule */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-white/30 mb-5">Follow Us</h4>
            <ul className="space-y-3 mb-8">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-white/50 font-mono hover:text-white hover:text-amber-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-px bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* This week */}
            <div className="border-t border-white/8 pt-6">
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">This Week</p>
              {[
                { day: 'Fri', date: '21 Mar', show: 'Open Mic Night' },
                { day: 'Sat', date: '22 Mar', show: 'Headline: Rina Okafor' },
                { day: 'Sun', date: '23 Mar', show: 'Improv Night' },
              ].map((s) => (
                <div key={s.date} className="flex gap-3 py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-mono text-amber-400 w-7">{s.day}</span>
                  <span className="text-[10px] font-mono text-white/30 w-14">{s.date}</span>
                  <span className="text-[10px] font-mono text-white/60 truncate">{s.show}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/5 py-6">
          <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/25 font-mono text-xs">© 2025 Laugh Riot Comedy Collective. All rights reserved.</p>
            <div className="flex items-center gap-6 text-white/25 font-mono text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Live Every Weekend</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking modal */}
      <AnimatePresence>
        {showModal && <BookingModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}
