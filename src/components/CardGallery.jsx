import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Import images
import micPersonImg from '../images/WhatsApp Image 2025-12-26 at 10.02.04 AM.jpeg';
import personImg from '../images/person.jpeg';
import person1Img from '../images/Sketch Paris theatre Humour Humoriste.jpg';
import audienceImg from '../images/people.jpeg';
import peopleImg from '../images/people.jpeg';
import people1Img from '../images/people1.jpeg';
import stageImg from '../images/Stand-up Comedy.jpg';
import micImg from '../images/intromic.webp';

gsap.registerPlugin(ScrollTrigger, Flip);

export default function CardGallery() {
    const galleryRef = useRef(null);
    const wrapperRef = useRef(null);
    const flipCtxRef = useRef(null);

    const images = [
        micPersonImg,
        personImg,
        person1Img,
        audienceImg,
        peopleImg,
        people1Img,
        stageImg,
        micImg,
    ];

    useEffect(() => {
        const createTween = () => {
            const galleryElement = galleryRef.current;
            const galleryItems = galleryElement?.querySelectorAll('.gallery__item');

            if (!galleryElement || !galleryItems) return;

            // Revert previous animation
            if (flipCtxRef.current) {
                flipCtxRef.current.revert();
            }
            galleryElement.classList.remove('gallery--final');

            flipCtxRef.current = gsap.context(() => {
                // Temporarily add the final class to capture the final state
                galleryElement.classList.add('gallery--final');
                const flipState = Flip.getState(galleryItems);
                galleryElement.classList.remove('gallery--final');

                const flip = Flip.to(flipState, {
                    simple: true,
                    ease: 'expoScale(1, 5)',
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: galleryElement,
                        start: 'center center',
                        end: '+=100%',
                        scrub: true,
                        pin: wrapperRef.current,
                        anticipatePin: 1,
                    },
                });

                tl.add(flip);

                return () => gsap.set(galleryItems, { clearProps: 'all' });
            });
        };

        createTween();

        const handleResize = () => {
            createTween();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (flipCtxRef.current) {
                flipCtxRef.current.revert();
            }
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <>
            <div className="gallery-wrap" ref={wrapperRef}>
                <div className="gallery gallery--bento" ref={galleryRef}>
                    {images.map((img, index) => (
                        <div key={index} className="gallery__item">
                            <img src={img} alt={`Comedy scene ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            <section className="content-section">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                    LAUGH RIOT <span className="text-[#00eaff]">GALLERY</span>
                </h2>
                <p className="text-lg text-zinc-300 mb-4">
                    Experience the energy, the talent, and the unforgettable moments that make Laugh Riot
                    the ultimate comedy destination. From intimate open mic nights to sold-out shows,
                    every performance is a celebration of laughter and creativity.
                </p>
                <p className="text-lg text-zinc-300 mb-4">
                    Our stage has hosted some of the most talented comedians in the industry, each bringing
                    their unique voice and perspective. Whether you're here for observational humor,
                    improv comedy, or bold social commentary, you'll find it all at Laugh Riot.
                </p>
                <p className="text-lg text-zinc-300 mb-4">
                    Join us for an evening where strangers become friends, where laughter breaks down barriers,
                    and where every joke lands perfectly. This isn't just a comedy club—it's a movement.
                </p>
                <p className="text-lg text-zinc-300 mb-4">
                    Our community is built on the foundation of authentic humor and genuine connection.
                    We believe comedy has the power to unite people, challenge perspectives, and create
                    lasting memories that go far beyond the punchline.
                </p>
                <p className="text-lg text-zinc-300 mb-4">
                    From our state-of-the-art sound system to our intimate seating arrangements, every detail
                    is designed to enhance your experience. We've created a space where comedians can thrive
                    and audiences can fully immerse themselves in the art of stand-up.
                </p>
                <p className="text-lg text-zinc-300 mb-4">
                    Whether you're a comedy veteran or experiencing live stand-up for the first time,
                    Laugh Riot welcomes you with open arms. Our diverse lineup ensures there's something
                    for everyone, from clean family-friendly shows to late-night adult comedy.
                </p>
                <p className="text-lg text-zinc-300 mb-4">
                    The spotlight is waiting. The microphone is ready. The audience is eager.
                    All that's missing is you. Come be part of the laughter, the energy, and the magic
                    that happens when comedy comes alive.
                </p>
                <p className="text-lg text-zinc-300">
                    Laugh Riot isn't just about watching comedy—it's about experiencing it, living it,
                    and becoming part of a community that celebrates the power of laughter.
                    Join us and discover why we're more than just a comedy club. We're a revolution.
                </p>
            </section>
        </>
    );
}
