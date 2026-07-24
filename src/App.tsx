import React, { useState, useEffect } from 'react';
import { Language, AppStage, UserData } from './types';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CinematicReveal } from './components/CinematicReveal';
import { AwarenessHero } from './components/AwarenessHero';
import { SectionsOverview } from './components/SectionsOverview';
import { SectionHotspots } from './components/SectionHotspots';
import { InteractiveChallenges } from './components/InteractiveChallenges';
import { SectionQuiz } from './components/SectionQuiz';
import { SectionCertificate } from './components/SectionCertificate';
import { FooterAndFeedback } from './components/FooterAndFeedback';
import { AwarenessPopup } from './components/AwarenessPopup';
import { CyberBackgroundAnimation } from './components/CyberBackgroundAnimation';
import { getAudioMute, toggleAudioMute } from './utils/sound';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [appStage, setAppStage] = useState<AppStage>('landing');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '', email: '' });
  const [quizPassed, setQuizPassed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(getAudioMute());
  const [showPopup, setShowPopup] = useState(false);

  // Trigger popup on entering awareness stage
  useEffect(() => {
    if (appStage === 'awareness') {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [appStage]);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageToggle = () => {
    setLang(prev => (prev === 'en' ? 'kn' : 'en'));
  };

  const handleToggleMute = () => {
    const nextMute = toggleAudioMute();
    setIsMuted(nextMute);
  };

  const handleLandingSubmit = (data: UserData) => {
    setUserData(data);
    setAppStage('reveal');
  };

  const handleRevealProceed = () => {
    setAppStage('awareness');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCert = () => {
    const elem = document.getElementById('certificate-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLearning = () => {
    const elem = document.getElementById('learning-start');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Dynamic Cyber Background Particle & Scanline Animation */}
      <CyberBackgroundAnimation appStage={appStage} />
      
      {/* Sticky Header Nav */}
      <Header
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        appStage={appStage}
        scrollProgress={scrollProgress}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onJumpToCert={scrollToCert}
      />

      {/* Stage 1: GPT Reward Hunt Landing Page */}
      {appStage === 'landing' && (
        <LandingPage
          lang={lang}
          onSubmit={handleLandingSubmit}
        />
      )}

      {/* Stage 2: 15-Second Cinematic Reveal */}
      {appStage === 'reveal' && (
        <CinematicReveal
          lang={lang}
          userData={userData}
          onProceed={handleRevealProceed}
        />
      )}

      {/* Stage 3: Cyber Awareness Campaign Modules */}
      {appStage === 'awareness' && (
        <main className="space-y-12">
          {/* Certificate Awareness Popup Modal */}
          <AwarenessPopup
            lang={lang}
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            onStartLearning={scrollToLearning}
          />
          
          {/* Awareness Hero */}
          <AwarenessHero
            lang={lang}
            onStartLearning={scrollToLearning}
            onJumpToCert={scrollToCert}
          />

          {/* Main Content Sections Container */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Sections 1, 2, 4, 5 */}
            <SectionsOverview lang={lang} />

            {/* Section 3: Spot the Warning Signs (Interactive Hotspots) */}
            <SectionHotspots lang={lang} />

            {/* Sections 6 & 7: Real Life Scenarios & Interactive Mini-Games */}
            <InteractiveChallenges lang={lang} />

            {/* Section 8: Quiz */}
            <SectionQuiz
              lang={lang}
              onQuizPassed={() => setQuizPassed(true)}
            />

            {/* Section 9: Local Certificate Generator */}
            <SectionCertificate
              lang={lang}
              userData={userData}
              isUnlocked={quizPassed}
            />

            {/* Section 10 & Footer */}
            <FooterAndFeedback lang={lang} />

          </div>

        </main>
      )}

    </div>
  );
}
