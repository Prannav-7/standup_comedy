import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import audienceImg from '../images/audience.jpeg';
import micPersonImg from '../images/mic-person.jpeg';
import peopleImg from '../images/people.jpeg';
import stageImg from '../images/stage.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingSections() {
    const pinSectionRef = useRef(null);
    const fillRef = useRef(null);

    useEffect(() => {
        const list = pinSectionRef.current?.querySelector(".list");
        const fill = fillRef.current;
        const listItems = gsap.utils.toArray("li", list);
        const slides = gsap.utils.toArray(".slide", pinSectionRef.current);

        if (!list || !fill || listItems.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinSectionRef.current,
                start: "top top",
                end: "+=" + listItems.length * 50 + "%",
                pin: true,
                scrub: true,
                anticipatePin: 1,
            }
        });

        // Set initial fill marker
        gsap.set(fill, {
            scaleY: 1 / listItems.length,
            transformOrigin: "top left"
        });

        listItems.forEach((item, i) => {
            const previousItem = listItems[i - 1];
            if (previousItem) {
                tl.set(item, { color: "#00eaff" }, 0.5 * i)
                    .to(
                        slides[i],
                        {
                            autoAlpha: 1,
                            duration: 0.2
                        },
                        "<"
                    )
                    .set(previousItem, { color: "#ffffff" }, "<")
                    .to(
                        slides[i - 1],
                        {
                            autoAlpha: 0,
                            duration: 0.2
                        },
                        "<"
                    );
            } else {
                gsap.set(item, { color: "#00eaff" });
                gsap.set(slides[i], { autoAlpha: 1 });
            }
        });

        tl.to(
            fill,
            {
                scaleY: 1,
                transformOrigin: "top left",
                ease: "none",
                duration: tl.duration()
            },
            0
        ).to({}, {}); // add a small pause at the end

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            {/* Pin Section with List and Images */}
            <section className="pin-section" ref={pinSectionRef}>
                <div className="content">
                    <ul className="list">
                        <li>FEEL THE</li>
                        <li>ENERGY</li>
                        <li>RAW</li>
                        <li>TALENT</li>
                    </ul>
                    <div className="fill" ref={fillRef}></div>
                    <div className="right">
                        <div className="slide center">
                            <img src={audienceImg} alt="Comedy audience feeling the energy" />
                            <div className="slide-text">
                                <p className="slide-tagline">Every night is electric ⚡</p>
                            </div>
                        </div>
                        <div className="slide center">
                            <img src={micPersonImg} alt="Comedian with raw energy" />
                            <div className="slide-text">
                                <p className="slide-tagline">Unscripted. Unfiltered. Unstoppable. 🎤</p>
                            </div>
                        </div>
                        <div className="slide center">
                            <img src={peopleImg} alt="Join the collective" />
                            <div className="slide-text">
                                <p className="slide-tagline">Where strangers become friends 🤝</p>
                            </div>
                        </div>
                        <div className="slide center">
                            <img src={stageImg} alt="The spotlight awaits" />
                            <div className="slide-text">
                                <p className="slide-tagline">Your moment to shine ✨</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer Section */}
            <section className="spacer-section"></section>
        </>
    );
}
