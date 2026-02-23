import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setProgress(window.scrollY / totalHeight);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}

export function useScrollY(): number {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
}

/** Linearly interpolate between a and b */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** Clamp value between min and max */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Given a scrollProgress (0 to 1) and an array of keyframes,
 * returns interpolated [x, y, z] values.
 * Each keyframe: { at: number (0-1), value: [x, y, z] }
 */
export function interpolateKeyframes(
    progress: number,
    keyframes: { at: number; value: [number, number, number] }[]
): [number, number, number] {
    if (keyframes.length === 0) return [0, 0, 0];
    if (keyframes.length === 1) return keyframes[0].value;

    // Find the two keyframes we're between
    let startIdx = 0;
    for (let i = 0; i < keyframes.length - 1; i++) {
        if (progress >= keyframes[i].at) {
            startIdx = i;
        }
    }

    const start = keyframes[startIdx];
    const end = keyframes[Math.min(startIdx + 1, keyframes.length - 1)];

    if (start.at === end.at) return start.value;

    const localT = clamp((progress - start.at) / (end.at - start.at), 0, 1);
    // Smooth easing
    const easedT = localT * localT * (3 - 2 * localT); // smoothstep

    return [
        lerp(start.value[0], end.value[0], easedT),
        lerp(start.value[1], end.value[1], easedT),
        lerp(start.value[2], end.value[2], easedT),
    ];
}
