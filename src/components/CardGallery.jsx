import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images
import micPersonImg from '../images/mic-person.jpeg';
import personImg from '../images/person.jpeg';
import person1Img from '../images/person1.jpeg';
import audienceImg from '../images/audience.jpeg';
import peopleImg from '../images/people.jpeg';
import people1Img from '../images/people1.jpeg';
import stageImg from '../images/stage.jpeg';

gsap.registerPlugin(ScrollTrigger);

// Artist data with local images
const artists = [
    { id: 1, image: micPersonImg, name: "The Mic Master", role: "Stand-up Comedian" },
    { id: 2, image: personImg, name: "Sarah Laughs", role: "Improv Artist" },
    { id: 3, image: person1Img, name: "Mike Thunder", role: "Comedy Writer" },
    { id: 4, image: audienceImg, name: "The Collective", role: "Open Mic Night" },
    { id: 5, image: peopleImg, name: "Laugh Riot", role: "Comedy Troupe" },
    { id: 6, image: people1Img, name: "The Jokers", role: "Sketch Comedy" },
    { id: 7, image: stageImg, name: "Main Stage", role: "Featured Acts" },
];

export default function CardGallery() {
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const totalSlides = artists.length;

        // Create ScrollTrigger with faster, smoother scroll
        const trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${totalSlides * 800}`, // Reduced for faster scroll transitions
            pin: true,
            scrub: 0.5, // Faster, more responsive scrubbing
            onUpdate: (self) => {
                // Calculate which slide should be visible based on scroll progress
                const newIndex = Math.min(
                    Math.floor(self.progress * totalSlides),
                    totalSlides - 1
                );
                setCurrentIndex(newIndex);
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-black"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

            {/* Title */}
            <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-50 text-center px-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase">
                    Upcoming <span className="text-[#00eaff]">Chaos</span>
                </h2>
                <p className="text-zinc-400 font-mono mt-2 text-xs md:text-sm">
                    Scroll to explore our artists
                </p>
            </div>

            {/* Progress indicator */}
            <div className="absolute top-32 md:top-36 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                {artists.map((_, index) => (
                    <div
                        key={index}
                        className={`w-8 md:w-12 h-1 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-[#00eaff] shadow-[0_0_10px_#00eaff]'
                            : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>

            {/* Full-screen image display - ONE AT A TIME */}
            <div className="absolute inset-0 flex items-center justify-center">
                {artists.map((artist, index) => (
                    <div
                        key={artist.id}
                        className={`absolute inset-0 transition-all duration-700 ${index === currentIndex
                            ? 'opacity-100 scale-100 z-10'
                            : 'opacity-0 scale-95 z-0 pointer-events-none'
                            }`}
                    >
                        {/* Full-screen image container */}
                        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                            {/* Image card - centered and large */}
                            <div className="relative w-full max-w-2xl lg:max-w-4xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                                {/* High-quality image */}
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                    decoding="sync"
                                    style={{
                                        imageRendering: '-webkit-optimize-contrast',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />

                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                {/* Neon glow border */}
                                <div className="absolute inset-0 border-4 border-[#00eaff]/30 rounded-2xl pointer-events-none" />

                                {/* Animated glow effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-50 blur-xl bg-gradient-to-r from-[#ff0055]/20 via-[#00eaff]/20 to-[#ff0055]/20 animate-pulse pointer-events-none" />

                                {/* Artist info - bottom */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-20">
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 md:mb-3">
                                        {artist.name}
                                    </h3>
                                    <p className="text-lg md:text-2xl text-zinc-300 font-mono tracking-wide">
                                        {artist.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll hint - bottom center */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 text-center">
                <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-wider">
                        {currentIndex < artists.length - 1 ? 'Scroll Down' : 'Keep Scrolling'}
                    </span>
                    <svg
                        className="w-6 h-6 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-50 text-white/40 font-mono text-sm md:text-base">
                {String(currentIndex + 1).padStart(2, '0')} / {String(artists.length).padStart(2, '0')}
            </div>
        </section>
    );
}
