import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

// Import images
import micPersonImg from '../images/mic-person.jpeg';
import personImg from '../images/person.jpeg';
import person1Img from '../images/person1.jpeg';
import audienceImg from '../images/audience.jpeg';
import peopleImg from '../images/people.jpeg';
import people1Img from '../images/people1.jpeg';
import stageImg from '../images/stage.jpeg';

gsap.registerPlugin(ScrollTrigger, Draggable);

// Artist data with local images
const artists = [
    { id: 1, image: micPersonImg, name: "The Mic Master", role: "Stand-up Comedian" },
    { id: 2, image: personImg, name: "Sarah Laughs", role: "Improv Artist" },
    { id: 3, image: person1Img, name: "Mike Thunder", role: "Comedy Writer" },
    { id: 4, image: audienceImg, name: "The Collective", role: "Open Mic Night" },
    { id: 5, image: peopleImg, name: "Laugh Riot", role: "Comedy Troupe" },
    { id: 6, image: people1Img, name: "The Jokers", role: "Sketch Comedy" },
    { id: 7, image: stageImg, name: "Main Stage", role: "Featured Acts" },
    { id: 8, image: micPersonImg, name: "The Mic Master", role: "Stand-up Comedian" },
    { id: 9, image: personImg, name: "Sarah Laughs", role: "Improv Artist" },
    { id: 10, image: person1Img, name: "Mike Thunder", role: "Comedy Writer" },
    { id: 11, image: audienceImg, name: "The Collective", role: "Open Mic Night" },
    { id: 12, image: peopleImg, name: "Laugh Riot", role: "Comedy Troupe" },
    { id: 13, image: people1Img, name: "The Jokers", role: "Sketch Comedy" },
    { id: 14, image: stageImg, name: "Main Stage", role: "Featured Acts" },
];

function buildSeamlessLoop(items, spacing, animateFunc) {
    let overlap = Math.ceil(1 / spacing);
    let startTime = items.length * spacing + 0.5;
    let loopTime = (items.length + overlap) * spacing + 1;
    let rawSequence = gsap.timeline({ paused: true });
    let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
            this._time === this._dur && (this._tTime += this._dur - 0.01);
        }
    });

    let l = items.length + overlap * 2;
    let time, i, index;

    for (i = 0; i < l; i++) {
        index = i % items.length;
        time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        i <= items.length && seamlessLoop.add("label" + i, time);
    }

    rawSequence.time(startTime);
    seamlessLoop
        .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none"
        })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none"
            }
        );
    return seamlessLoop;
}

export default function CardGallery() {
    const galleryRef = useRef(null);
    const cardsRef = useRef([]);
    const dragProxyRef = useRef(null);
    const seamlessLoopRef = useRef(null);
    const scrubRef = useRef(null);
    const triggerRef = useRef(null);
    const iterationRef = useRef(0);
    const playheadRef = useRef({ offset: 0 });

    useEffect(() => {
        const cards = cardsRef.current;
        const spacing = 0.1;
        const snapTime = gsap.utils.snap(spacing);

        // Set initial state
        gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

        // Animation function for each card
        const animateFunc = (element) => {
            const tl = gsap.timeline();
            tl.fromTo(
                element,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.in",
                    immediateRender: false
                }
            ).fromTo(
                element,
                { xPercent: 400 },
                {
                    xPercent: -400,
                    duration: 1,
                    ease: "none",
                    immediateRender: false
                },
                0
            );
            return tl;
        };

        // Build seamless loop
        const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
        seamlessLoopRef.current = seamlessLoop;

        const playhead = playheadRef.current;
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

        // Scrub animation
        const scrub = gsap.to(playhead, {
            offset: 0,
            onUpdate() {
                seamlessLoop.time(wrapTime(playhead.offset));
            },
            duration: 0.5,
            ease: "power3",
            paused: true
        });
        scrubRef.current = scrub;

        const wrap = (iterationDelta, scrollTo) => {
            iterationRef.current += iterationDelta;
            triggerRef.current.scroll(scrollTo);
            triggerRef.current.update();
        };

        // ScrollTrigger
        const trigger = ScrollTrigger.create({
            trigger: galleryRef.current,
            start: "top top",
            scroller: window,
            onUpdate(self) {
                let scroll = self.scroll();
                if (scroll > self.end - 1) {
                    wrap(1, 2);
                } else if (scroll < 1 && self.direction < 0) {
                    wrap(-1, self.end - 2);
                } else {
                    scrub.vars.offset = (iterationRef.current + self.progress) * seamlessLoop.duration();
                    scrub.invalidate().restart();
                }
            },
            end: "+=3000",
            pin: galleryRef.current
        });
        triggerRef.current = trigger;

        const progressToScroll = (progress) =>
            gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);

        const scrollToOffset = (offset) => {
            let snappedTime = snapTime(offset);
            let progress =
                (snappedTime - seamlessLoop.duration() * iterationRef.current) / seamlessLoop.duration();
            let scroll = progressToScroll(progress);
            if (progress >= 1 || progress < 0) {
                return wrap(Math.floor(progress), scroll);
            }
            trigger.scroll(scroll);
        };

        // Scroll end snap - only within the trigger's own callback
        // Removed global scrollEnd listener to prevent interference with page scroll


        // Button handlers
        const nextBtn = document.querySelector(".card-gallery-next");
        const prevBtn = document.querySelector(".card-gallery-prev");

        const nextHandler = () => scrollToOffset(scrub.vars.offset + spacing);
        const prevHandler = () => scrollToOffset(scrub.vars.offset - spacing);

        if (nextBtn) nextBtn.addEventListener("click", nextHandler);
        if (prevBtn) prevBtn.addEventListener("click", prevHandler);

        // Draggable
        const draggable = Draggable.create(dragProxyRef.current, {
            type: "x",
            trigger: ".cards-container",
            onPress() {
                this.startOffset = scrub.vars.offset;
            },
            onDrag() {
                scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
                scrub.invalidate().restart();
            },
            onDragEnd() {
                scrollToOffset(scrub.vars.offset);
            }
        });

        // Cleanup
        return () => {
            if (nextBtn) nextBtn.removeEventListener("click", nextHandler);
            if (prevBtn) prevBtn.removeEventListener("click", prevHandler);
            trigger.kill();
            scrub.kill();
            seamlessLoop.kill();
            if (draggable[0]) draggable[0].kill();
        };
    }, []);

    return (
        <section
            ref={galleryRef}
            className="relative w-full h-screen overflow-hidden bg-zinc-950"
            style={{ position: 'relative' }}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Title */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                    Upcoming <span className="text-[#00eaff]">Chaos</span>
                </h2>
                <p className="text-zinc-400 font-mono mt-2 text-sm md:text-base">
                    Swipe or scroll to explore our artists
                </p>
            </div>

            {/* Cards Container */}
            <div className="cards-container relative w-56 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ position: 'absolute' }}>
                <ul className="cards-list list-none p-0 m-0">
                    {artists.map((artist, index) => (
                        <li
                            key={artist.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="absolute top-0 left-0 w-56 aspect-[9/16] rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl"
                        >
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                                style={{ backgroundImage: `url(${artist.image})` }}
                            >
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Artist info */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                                    <h3 className="text-xl font-black tracking-tight mb-1">{artist.name}</h3>
                                    <p className="text-sm text-zinc-300 font-mono">{artist.role}</p>
                                </div>

                                {/* Neon glow effect */}
                                <div className="absolute inset-0 border-2 border-[#00eaff]/0 hover:border-[#00eaff]/50 transition-all duration-300" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-50">
                <button className="card-gallery-prev px-6 py-3 bg-white/10 hover:bg-[#00eaff] text-white font-black uppercase tracking-wider rounded-full border-2 border-white/20 hover:border-[#00eaff] transition-all duration-300 backdrop-blur-sm">
                    Prev
                </button>
                <button className="card-gallery-next px-6 py-3 bg-white/10 hover:bg-[#00eaff] text-white font-black uppercase tracking-wider rounded-full border-2 border-white/20 hover:border-[#00eaff] transition-all duration-300 backdrop-blur-sm">
                    Next
                </button>
            </div>

            {/* Drag proxy (invisible) */}
            <div ref={dragProxyRef} className="drag-proxy invisible absolute" />
        </section>
    );
}
