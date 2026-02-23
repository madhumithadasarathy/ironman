import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Section01 from './components/Section01';
import Section02 from './components/Section02';
import Section03 from './components/Section03';
import BigStatement from './components/BigStatement';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import LoadingScreen from './components/LoadingScreen';
import ScrollCanvas from './components/ScrollCanvas';

const App: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <SocialSidebar />
      {/* Single persistent 3D canvas that follows scroll */}
      <ScrollCanvas />
      <main>
        <HeroSection />
        <Section01 />
        <Section02 />
        <Section03 />
        <BigStatement />
      </main>
      <Footer />
    </>
  );
};

export default App;
