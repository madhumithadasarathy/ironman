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

const BigStatement: React.FC = () => {
    const [textRef, textVisible] = useInView(0.3);

    return (
        <section className="big-statement" id="statement">
            <div
                ref={textRef}
                className={`fade-in-left ${textVisible ? 'visible' : ''}`}
                style={{ zIndex: 2 }}
            >
                <h2 className="big-statement-text">I AM IRON MAN</h2>
            </div>
        </section>
    );
};

export default BigStatement;
