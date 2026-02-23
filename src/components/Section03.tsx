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

const Section03: React.FC = () => {
    const [headingRef, headingVisible] = useInView(0.2);
    const [bodyRef, bodyVisible] = useInView(0.2);

    return (
        <section className="content-section section-03-bg" id="section-03">
            {/* Left Half: Dark rounded background & Image */}
            <div className="s1-left-half">
                <div className="s3-dark-bg"></div>
                <img src="/rhodey.png" alt="War Machine Rhodey" className="s1-ironman-img" />
            </div>

            <div className="section-content right-half" style={{ zIndex: 5 }}>
                <div className={`section-number fade-in-up ${headingVisible ? 'visible' : ''}`}>03</div>

                <div
                    ref={headingRef}
                    className={`fade-in-up ${headingVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-heading">
                        War Machine, aka James "Rhodey" Rhodes, is Iron Man's loyal ally.
                    </h2>
                </div>
                <div
                    ref={bodyRef}
                    className={`fade-in-up ${bodyVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0.2s' }}
                >
                    <p className="section-body">
                        After the events of Civil War, Rhodey suffered a serious injury during a battle, leaving him paralyzed. He was later fitted with mechanical leg braces and continued to serve as War Machine.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section03;
