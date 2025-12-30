import React, { useState, useEffect } from 'react';
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
  const [stage, setStage] = useState(!hasSeenIntro ? 'intro' : 'main');

  console.log('🚀 App rendered - FORCE_SHOW_INTRO:', FORCE_SHOW_INTRO, 'hasSeenIntro:', hasSeenIntro, 'stage:', stage);

  useEffect(() => {
    if (stage === 'intro') {
      // Transition to main content after 5 seconds
      const mainTimer = setTimeout(() => {
        console.log('✅ GridScan intro completed, showing main content');
        sessionStorage.setItem('introShown', 'true');
        setStage('main');
      }, 5000);

      return () => {
        clearTimeout(mainTimer);
      };
    }
  }, [stage]);

  return (
    <div className="relative">
      {stage === 'intro' && (
        <div className="fixed inset-0 z-[9999] bg-black">
          {/* GridScan Background with slower animation - includes text */}
          <GridScan
            sensitivity={0.35}
            lineThickness={1.2}
            linesColor="#4a1f5c"
            gridScale={0.08}
            scanColor="#FF9FFC"
            scanOpacity={0.5}
            enablePost
            bloomIntensity={0.7}
            chromaticAberration={0.003}
            noiseIntensity={0.008}
            scanGlow={0.6}
            scanSoftness={3}
            scanDuration={3.5}
            scanDelay={1.0}
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

