import React, { useState, useEffect } from 'react';
import ArcReactorSVG from './ArcReactorSVG';

const LoadingScreen: React.FC = () => {
    const [hidden, setHidden] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setHidden(true), 400);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    if (hidden) return null;

    return (
        <div className={`loading-screen ${progress >= 100 ? 'hidden' : ''}`}>
            <ArcReactorSVG size={80} className="loading-arc-reactor" />
            <div className="loading-text">INITIALIZING</div>
            <div style={{
                marginTop: 20,
                width: 200,
                height: 3,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #4ecdff, #d4a843)',
                    borderRadius: 2,
                    transition: 'width 0.1s ease',
                }} />
            </div>
        </div>
    );
};

export default LoadingScreen;
