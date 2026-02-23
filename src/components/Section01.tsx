import React, { useRef, useEffect, useState } from 'react';

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); }, { threshold });
        obs.observe(el);
        return () => obs.unobserve(el);
    }, [threshold]);
    return [ref, visible] as const;
}

const Section01: React.FC = () => {
    const [headingRef, headingVisible] = useInView(0.2);
    const [bodyRef, bodyVisible] = useInView(0.2);

    return (
        <section className="content-section section-01-bg" id="section-01">
            {/* Left Half: Dark rounded background & Image */}
            <div className="s1-left-half">
                <div className="s1-dark-bg"></div>
                <img src="/im1.png" alt="Iron Man" className="s1-ironman-img" />
            </div>

            <div className="section-content right-half" style={{ zIndex: 5 }}>
                <div className={`section-number fade-in-up ${headingVisible ? 'visible' : ''}`}>01</div>

                <div
                    ref={headingRef}
                    className={`fade-in-up ${headingVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-heading">
                        Iron Man's new suit features adaptive camouflage, energy weapons, self-repair, and advanced flight.
                    </h2>
                </div>
                <div
                    ref={bodyRef}
                    className={`fade-in-up ${bodyVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0.2s' }}
                >
                    <p className="section-body">
                        Tony Stark developed the nanotech suit to enhance versatility and adaptability in combat, allowing instant reconfiguration and advanced features to address evolving threats effectively.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section01;
