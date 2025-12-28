import React, { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import GridScan from './components/GridScan';
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
  const [stage, setStage] = useState(!hasSeenIntro ? 'intro' : 'main'); // 'intro' -> 'gridscan' -> 'main'

  console.log('🚀 App rendered - FORCE_SHOW_INTRO:', FORCE_SHOW_INTRO, 'hasSeenIntro:', hasSeenIntro, 'stage:', stage);

  const handleIntroComplete = () => {
    console.log('✅ Intro completed, showing GridScan transition');
    setStage('gridscan');

    // After 0.8 seconds of GridScan, show main content
    setTimeout(() => {
      console.log('✅ GridScan completed, showing main content');
      sessionStorage.setItem('introShown', 'true');
      setStage('main');
    }, 800);
  };

  return (
    <div className="relative">
      {stage === 'intro' && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {stage === 'gridscan' && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
          />
        </div>
      )}

      {stage === 'main' && (
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
