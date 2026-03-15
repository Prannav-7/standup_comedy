import React, { useState } from 'react';
import { motion } from 'framer-motion';
import stageImg from '../gemini/pro_comedian_stage.png';
import crowdImg from '../gemini/pro_comedy_crowd.png';
import micImg from '../gemini/pro_open_mic.png';
import laughImg from '../images/Laugh at a Comedy Show.jpg';
import standImg from '../images/Home - The Stand Comedy Club.jpg';

/* ─── data ─── */
const shows = [
  {
    id: 1,
    day: 'FRI',
    date: '21',
    month: 'MAR',
    time: '8:00 PM',
    title: 'Open Mic Night',
    billing: 'Hosted by Marcus Webb',
    type: 'Open Mic',
    price: '$15',
    seats: 12,
    highlight: true,
  },
  {
    id: 2,
    day: 'SAT',
    date: '22',
    month: 'MAR',
    time: '7:30 PM',
    title: 'Headline: Rina Okafor',
    billing: 'Special guest TBA',
    type: 'Headline',
    price: '$25',
    seats: 5,
    highlight: false,
  },
  {
    id: 3,
    day: 'SUN',
    date: '23',
    month: 'MAR',
    time: '6:00 PM',
    title: 'Improv Night',
    billing: 'The Loose Cannons Ensemble',
    type: 'Improv',
    price: '$18',
    seats: 22,
    highlight: false,
  },
  {
    id: 4,
    day: 'FRI',
    date: '28',
    month: 'MAR',
    time: '9:30 PM',
    title: 'Late-Night Roast',
    billing: 'Hosted by Dev Sharma',
    type: 'Roast',
    price: '$20',
    seats: 8,
    highlight: false,
  },
];

const galleryItems = [
  { src: stageImg, caption: 'The Stage' },
  { src: crowdImg, caption: 'The Crowd' },
  { src: micImg, caption: 'Open Mic' },
  { src: laughImg, caption: 'The Laughs' },
  { src: standImg, caption: 'The Venue' },
];

const typeColor = {
  'Open Mic': '#e8c96a',
  'Headline': '#ffffff',
  'Improv': '#a3c4e8',
  'Roast': '#e8a3a3',
};

/* ─── Show row ─── */
function ShowRow({ show, index }) {
  const [hov, setHov] = useState(false);
  const accentColor = typeColor[show.type] || '#e8c96a';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative border-b border-white/8 last:border-0 cursor-pointer"
    >
      {/* Hover background */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.025)' }}
      />

      <div className="flex items-center gap-0 py-5 px-6 md:px-8">
        {/* Date block */}
        <div className="flex-shrink-0 w-20 md:w-24 text-center border-r border-white/10 pr-6 mr-6">
          <p className="text-xs font-mono tracking-widest uppercase text-white/40">{show.day} · {show.month}</p>
          <p className="text-4xl font-black text-white leading-none mt-0.5" style={{ color: show.highlight ? accentColor : 'white' }}>{show.date}</p>
          <p className="text-xs font-mono text-white/40 mt-1">{show.time}</p>
        </div>

        {/* Show info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase px-2 py-0.5 border"
              style={{ color: accentColor, borderColor: `${accentColor}40` }}
            >
              {show.type}
            </span>
            {show.seats <= 10 && (
              <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase">
                {show.seats} seats left
              </span>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">{show.title}</h3>
          <p className="text-sm text-white/40 font-mono mt-0.5">{show.billing}</p>
        </div>

        {/* Price + CTA */}
        <div className="flex-shrink-0 flex items-center gap-6 ml-auto pl-4">
          <span className="hidden md:block text-2xl font-black text-white/70">{show.price}</span>
          <motion.button
            animate={{
              backgroundColor: hov ? accentColor : 'transparent',
              color: hov ? '#000' : 'rgba(255,255,255,0.7)',
              borderColor: hov ? accentColor : 'rgba(255,255,255,0.2)',
            }}
            transition={{ duration: 0.2 }}
            className="px-5 py-2.5 border text-xs font-bold tracking-widest uppercase"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Gallery card ─── */
function GalleryCard({ item, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: index === 0 ? '3/4' : '4/3' }}
    >
      <motion.img
        src={item.src}
        alt={item.caption}
        animate={{ scale: hov ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <motion.div
        animate={{ opacity: hov ? 1 : 0.6, y: hov ? 0 : 4 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-4"
      >
        <span className="text-xs font-mono tracking-widest text-white/80 uppercase">{item.caption}</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section heading ─── */
function SectionHead({ label, title, light = false }) {
  return (
    <div className="mb-12">
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-amber-400 text-xs font-mono tracking-[0.4em] uppercase mb-3 flex items-center gap-2"
      >
        <span className="w-5 h-px bg-amber-400" />
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.07 }}
        className={`font-black tracking-tight leading-none ${light ? 'text-black' : 'text-white'}`}
        style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════ */
export default function HomeSection() {
  return (
    <div className="bg-[#0b0b0b] text-white">

      {/* ══ 1. UPCOMING SHOWS ══ */}
      <section id="shows" className="py-24 border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHead label="On Stage This Week" title={"Upcoming\nShows"} />
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ color: '#e8c96a' }}
              className="text-sm font-mono text-white/40 uppercase tracking-widest transition-colors pb-1 border-b border-white/15 hover:border-amber-400/40 self-end mb-1"
            >
              Full Schedule →
            </motion.a>
          </div>

          {/* Shows list */}
          <div className="border border-white/8">
            {shows.map((show, i) => (
              <ShowRow key={show.id} show={show} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ backgroundColor: '#d4a843', scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 bg-amber-400 text-black font-bold text-sm uppercase tracking-widest"
            >
              🎟 Book Your Seats
            </motion.button>
            <motion.a
              href="https://wa.me/1234567890"
              whileHover={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 border border-white/20 text-white/60 font-semibold text-sm uppercase tracking-widest"
            >
              WhatsApp Us
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. ABOUT STRIP ══ */}
      <section className="py-24 border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <SectionHead label="Who We Are" title={"New York's\nUnderground\nStage"} />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/50 leading-relaxed mb-6"
              >
                Since 2019, we've hosted over 500 nights of raw, unscripted comedy in the heart of New York City. No scripts. No suits. Just the most honest laughter you'll find on any stage.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-white/50 leading-relaxed mb-10"
              >
                We've launched the careers of dozens of comedians who've gone on to Netflix specials, Comedy Central appearances, and sold-out tours.
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/8">
                {[
                  { val: '500+', label: 'Live Shows' },
                  { val: '80+', label: 'Comedians' },
                  { val: '6 yrs', label: 'Running' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <p className="text-3xl font-black text-amber-400">{s.val}</p>
                    <p className="text-xs font-mono text-white/35 uppercase tracking-widest mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={stageImg}
                alt="Comedian on stage"
                className="w-full h-[480px] object-cover object-top"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-sm p-5 border-l-2 border-amber-400">
                <p className="text-amber-400 text-xs font-mono tracking-widest uppercase mb-1">Next Show</p>
                <p className="text-white font-bold">Open Mic Night — Fri 21 Mar · 8:00 PM</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 3. GALLERY ══ */}
      <section className="py-24 border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <SectionHead label="The Experience" title={"Inside the\nClub"} />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* First item spans 2 rows */}
            <div className="row-span-2">
              <GalleryCard item={galleryItems[0]} index={0} />
            </div>
            {galleryItems.slice(1).map((item, i) => (
              <GalleryCard key={i} item={item} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ══ */}
      <section className="py-24 bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <SectionHead label="Simple Process" title={"How to\nBook a Show"} light />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Browse Shows', desc: 'Pick from our weekly lineup of open mics, headline sets, and improv nights.' },
              { num: '02', title: 'Reserve Online', desc: 'Secure your seat in under a minute. Pay online or at the door.' },
              { num: '03', title: 'Show Up', desc: 'Doors open 30 minutes before showtime. Drinks available at the bar.' },
              { num: '04', title: 'Just Laugh', desc: "That's it. No tricks, no gimmicks. Pure comedy every single night." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group"
              >
                <p className="text-5xl font-black text-black/10 mb-4 group-hover:text-amber-400 transition-colors duration-300">{step.num}</p>
                <h3 className="font-bold text-black text-lg mb-2">{step.title}</h3>
                <p className="text-black/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. PRESS QUOTES ══ */}
      <section className="py-20 border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: '"The best room in New York for raw comedy. Period."', source: 'The Village Voice' },
              { quote: '"A breeding ground for the next generation of comedy talent."', source: 'Time Out NY' },
              { quote: '"If you only go to one comedy show this year, make it this one."', source: 'NY Times Arts' },
            ].map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="border-t border-white/10 pt-6"
              >
                <p className="text-white/70 text-lg italic leading-relaxed mb-4">{q.quote}</p>
                <p className="text-amber-400 text-xs font-mono tracking-widest uppercase">— {q.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. FINAL CTA ══ */}
      <section className="py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src={crowdImg} alt="" aria-hidden className="w-full h-full object-cover" style={{ filter: 'brightness(0.2) saturate(0.6)' }} />
        </div>
        <div className="absolute inset-0 z-1" style={{ background: 'linear-gradient(to bottom, #0b0b0b 0%, transparent 30%, transparent 70%, #0b0b0b 100%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-400 text-xs font-mono tracking-[0.4em] uppercase mb-5"
          >
            Don't miss a show
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white font-black tracking-tight leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            GET ON THE LIST
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/50 max-w-md mx-auto mb-10 leading-relaxed"
          >
            Subscribe to get early access to show announcements, presale tickets, and exclusive underground events.
          </motion.p>

          {/* Email subscribe */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm font-mono focus:outline-none focus:border-amber-400/60 transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-4 bg-amber-400 text-black font-bold text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors"
            >
              Subscribe
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/25 text-xs font-mono mt-4"
          >
            No spam. Cancel anytime.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
