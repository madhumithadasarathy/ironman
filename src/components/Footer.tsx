import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer-section" id="contact">
            <div className="footer-brand">
                <div className="footer-brand-name">IR<span style={{ color: '#dc2626' }}>O</span>NMAN</div>
                <p className="footer-brand-tagline">
                    Developed by Madhumitha Dasarathy
                </p>
                <a href="https://github.com/madhumithadasarathy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white-muted)', textDecoration: 'none', fontSize: '14px', marginTop: '0px' }}>
                    https://github.com/madhumithadasarathy
                </a>
            </div>

            <div className="footer-links">
                <div className="footer-col">
                    <h4>LINKS</h4>
                    <ul>
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#section-01">Nanotech</a></li>
                        <li><a href="#section-02">Arc Reactor</a></li>
                        <li><a href="#section-03">War Machine</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>SOCIALS</h4>
                    <ul>
                        <li><a href="#">YouTube</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>CREDITS</h4>
                    <ul>
                        <li><a href="https://minhpham.design/" target="_blank" rel="noopener noreferrer">ironman.design</a></li>
                        <li><a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 IRONMAN — Built with React & Three.js</p>
            </div>
        </footer>
    );
};

export default Footer;
