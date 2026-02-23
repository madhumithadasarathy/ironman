import React from 'react';

const ArcReactorSVG: React.FC<{ size?: number; className?: string }> = ({ size = 120, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Outer thick ring */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="#e5cc8f" strokeWidth="15" />

        {/* Gap ring (inner thin line) */}
        <circle cx="100" cy="100" r="70" fill="none" stroke="#e5cc8f" strokeWidth="4" />

        {/* Middle ring segments / blocks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <line
                key={angle}
                x1={100 + 45 * Math.cos((angle * Math.PI) / 180)}
                y1={100 + 45 * Math.sin((angle * Math.PI) / 180)}
                x2={100 + 65 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 65 * Math.sin((angle * Math.PI) / 180)}
                stroke="#e5cc8f"
                strokeWidth="12"
            />
        ))}

        {/* Inner ring for triangle container */}
        <circle cx="100" cy="100" r="40" fill="none" stroke="#e5cc8f" strokeWidth="6" />

        {/* Triangle element (pointing down like in the screenshot) */}
        <polygon
            points="100,125 125,80 75,80"
            fill="none"
            stroke="#e5cc8f"
            strokeWidth="5"
        />

        {/* Inner small details */}
        <polygon
            points="100,110 112,88 88,88"
            fill="none"
            stroke="#e5cc8f"
            strokeWidth="4"
        />

        {/* Core Dot */}
        <circle cx="100" cy="95" r="8" fill="#e5cc8f" />
    </svg>
);

export default ArcReactorSVG;
