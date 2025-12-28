import React, { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import HomeSection from './components/HomeSection';
import Manifesto from './components/Manifesto';
import CardGallery from './components/CardGallery';
import Footer from './components/Footer';

function App() {
  // Set to true to always show intro (for testing)
  // Set to false to show intro only once per session
  const FORCE_SHOW_INTRO = true;

  const hasSeenIntro = !FORCE_SHOW_INTRO && sessionStorage.getItem('introShown');
  const [showIntro, setShowIntro] = useState(!hasSeenIntro);

  console.log('🚀 App rendered - FORCE_SHOW_INTRO:', FORCE_SHOW_INTRO, 'hasSeenIntro:', hasSeenIntro, 'showIntro:', showIntro);

  const handleIntroComplete = () => {
    console.log('✅ Intro completed, showing main content');
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
  };

  return (
    <div className="relative">
      {showIntro ? (
        <IntroAnimation onComplete={handleIntroComplete} />
      ) : (
        <main
          className="bg-zinc-950 min-h-screen w-full overflow-x-hidden selection:bg-[#00eaff] selection:text-black"
          style={{ position: 'relative' }}
        >
          <Hero />
          <HomeSection />
          <Manifesto />
          <CardGallery />
          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;
