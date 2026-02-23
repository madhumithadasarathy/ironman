import React from 'react';
import ArcReactorSVG from './ArcReactorSVG';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section" id="hero">
            {/* Background Title Text */}
            <div className="hero-bg-text">
                <span className="hero-title">
                    <span className="hero-title-line">
                        IR
                        <span className="arc-reactor-o">
                            <ArcReactorSVG className="arc-reactor-svg" />
                        </span>
                        N
                    </span>
                    <span className="hero-title-line">MAN</span>
                </span>
            </div>

            {/* Bottom Left Info */}
            <div className="hero-bottom-info">
                <p className="hero-subtitle">
                    Genius. Billionaire. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man.
                </p>
                <div className="learn-more">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mouse-icon">
                        <rect x="5" y="2" width="14" height="20" rx="7" ry="7"></rect>
                        <line x1="12" y1="6" x2="12" y2="10"></line>
                    </svg>
                    <span>Learn More</span>
                </div>
            </div>

            {/* Glow effects */}
            <div className="glow-circle" style={{
                width: 400,
                height: 400,
                right: -100,
                bottom: -100,
                background: 'radial-gradient(circle, rgba(230,126,34,0.25) 0%, transparent 70%)',
            }} />
        </section>
    );
};

export default HeroSection;
