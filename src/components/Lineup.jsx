import React from 'react';
import { motion } from 'framer-motion';

const acts = [
  { id: 1, name: "Sarah 'The Sledgehammer'", date: "OCT 12", img: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Mike 'Mic Drop'", date: "OCT 15", img: "https://images.unsplash.com/photo-1525373612131-d811d0958d11?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "The Hecklers", date: "OCT 22", img: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Late Night Riot", date: "NOV 01", img: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800" },
];

export default function Lineup() {
  return (
    <section className="bg-zinc-950 min-h-screen py-24 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-20 tracking-tighter uppercase border-b border-zinc-800 pb-8">
                Upcoming <span className="text-[#00eaff]">Chaos</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {acts.map((act, index) => (
                    <motion.div
                        key={act.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                    >
                        <div className="relative overflow-hidden aspect-[3/4] bg-zinc-900 border border-zinc-800">
                            <div className="absolute inset-0 bg-[#00eaff] mix-blend-overlay opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10" />
                            <img 
                                src={act.img} 
                                alt={act.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                            />
                            
                            {/* Date Badge */}
                            <div className="absolute top-0 left-0 bg-white text-black font-black text-xl p-4 z-20">
                                {act.date}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-end border-b border-zinc-800 pb-4">
                            <h3 className="text-2xl md:text-4xl font-bold text-white uppercase max-w-[70%] leading-none">
                                {act.name}
                            </h3>
                            <button className="px-6 py-2 border border-[#00eaff] text-[#00eaff] hover:bg-[#00eaff] hover:text-black transition-colors font-mono text-sm uppercase tracking-wider">
                                Tickets
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
