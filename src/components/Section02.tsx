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

const Section02: React.FC = () => {
    const [headingRef, headingVisible] = useInView(0.2);
    const [bodyRef, bodyVisible] = useInView(0.2);

    return (
        <section className="content-section section-02-bg" id="section-02">
            <div className="section-content left-half" style={{ zIndex: 5 }}>
                <div className={`section-number text-left fade-in-left ${headingVisible ? 'visible' : ''}`}>02</div>

                <div
                    ref={headingRef}
                    className={`fade-in-left ${headingVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-heading">
                        Tony Stark, as the brilliant mind behind Stark Industries
                    </h2>
                </div>
                <div
                    ref={bodyRef}
                    className={`fade-in-left ${bodyVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0.2s' }}
                >
                    <p className="section-body">
                        Tony Stark uses an arc reactor to power his Iron Man suits and also to prevent shrapnel from reaching his heart after being injured.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section02;
