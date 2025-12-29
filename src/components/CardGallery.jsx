import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { motion } from 'framer-motion';

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

// Animation variants for staggered text reveal
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const textVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        filter: 'blur(15px)'
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

const separatorVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

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

            {/* Content Section with Scroll Animations - Hidden until scrolled */}
            <motion.section
                className="content-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-black text-white mb-6"
                    variants={textVariants}
                >
                    LAUGH RIOT <span className="text-[#00eaff]">GALLERY</span>
                </motion.h2>
                <motion.p
                    className="text-lg text-zinc-300 mb-4"
                    variants={textVariants}
                >
                    Experience the energy, the talent, and the unforgettable moments that make Laugh Riot
                    the ultimate comedy destination. From intimate open mic nights to sold-out shows,
                    every performance is a celebration of laughter and creativity.
                </motion.p>
                <motion.p
                    className="text-lg text-zinc-300 mb-4"
                    variants={textVariants}
                >
                    Our stage has hosted some of the most talented comedians in the industry, each bringing
                    their unique voice and perspective. Whether you're here for observational humor,
                    improv comedy, or bold social commentary, you'll find it all at Laugh Riot.
                </motion.p>
                <motion.p
                    className="text-lg text-zinc-300 mb-4"
                    variants={textVariants}
                >
                    Join us for an evening where strangers become friends, where laughter breaks down barriers,
                    and where every joke lands perfectly. Our community is built on the foundation of
                    authentic humor and genuine connection that goes far beyond the punchline.
                </motion.p>
                <motion.p
                    className="text-lg text-zinc-300"
                    variants={textVariants}
                >
                    Laugh Riot isn't just about watching comedy—it's about experiencing it, living it,
                    and becoming part of a community that celebrates the power of laughter.
                    Join us and discover why we're more than just a comedy club. We're a revolution.
                </motion.p>
            </motion.section>

            {/* Animated Section Separator - Hidden until scrolled */}
            <motion.div
                className="section-separator"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8, margin: "-50px" }}
            >
                <motion.div
                    className="separator-line"
                    variants={separatorVariants}
                />
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
