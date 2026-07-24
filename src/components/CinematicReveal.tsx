import React, { useState, useEffect } from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, ShieldAlert, CheckCircle2, Lock, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { playSuccessSound, playFreezeSound, playClickSound } from '../utils/sound';

interface CinematicRevealProps {
  lang: Language;
  userData: UserData;
  onProceed: () => void;
}

export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  lang,
  userData,
  onProceed,
}) => {
  const t = TRANSLATIONS[lang];
  const [scene, setScene] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Scene 1: Verified chime
    playSuccessSound();

    // Scene 2: Freeze after 2.5s with camera shake
    const timer1 = setTimeout(() => {
      setScene(2);
      setIsShaking(true);
      playFreezeSound();
      setTimeout(() => setIsShaking(false), 450);
    }, 2500);

    // Scene 3: Reflection message after 4.8s
    const timer2 = setTimeout(() => {
      setScene(3);
    }, 4800);

    // Scene 4: "This wasn't a scam, it was a lesson" after 7.8s
    const timer3 = setTimeout(() => {
      setScene(4);
    }, 7800);

    // Scene 5: Full privacy reassurance & CTA after 10.8s
    const timer4 = setTimeout(() => {
      setScene(5);
    }, 10800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden ${isShaking ? 'animate-camera-vibrate' : ''}`}>
      
      {/* 1. Wireframe Grid & Atmospheric Desaturation Overlay */}
      <div className="absolute inset-0 bg-wireframe-grid opacity-20 pointer-events-none" />
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${scene >= 2 ? 'bg-slate-950/90 backdrop-grayscale' : 'bg-emerald-950/30'}`} />
      
      {/* 2. Horizontal Cyber Laser Sweep Line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-6">
        
        {/* SCENE 1: Verified */}
        {scene === 1 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-emerald-400 tracking-tight">
              {t.revealVerified}
            </h2>
            <p className="text-lg text-slate-300">
              {t.revealCredited}
            </p>
          </div>
        )}

        {/* SCENE 2: The Freeze & Security Override */}
        {scene === 2 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-2xl shadow-amber-500/30">
              <ShieldAlert className="w-10 h-10 animate-spin" />
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-400 font-mono text-xs uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>SECURITY OVERRIDE DETECTED</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-amber-400 tracking-widest uppercase drop-shadow-xl">
              {t.revealFreeze}
            </h2>
          </div>
        )}

        {/* SCENE 3: Personal Reflection */}
        {scene === 3 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <h3 className="text-3xl font-bold text-amber-300">
              {t.revealReflect.replace('{name}', userData.name || 'Student')}
            </h3>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium max-w-xl mx-auto">
              {t.revealTrustMsg}
            </p>
          </div>
        )}

        {/* SCENE 4: The Lesson Banner */}
        {scene === 4 && (
          <div className="space-y-6 animate-reveal-up gpu-layer">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-500 line-through decoration-rose-500 decoration-4">
                {t.revealBigText}
              </h1>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-amber-400 drop-shadow-xl">
                {t.revealLessonText}
              </h1>
            </div>
          </div>
        )}

        {/* SCENE 5: Privacy Reassurance & Proceed CTA */}
        {scene >= 5 && (
          <div className="space-y-8 animate-reveal-up gpu-layer">
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-amber-400">
                {t.revealLessonText}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                {t.revealSafeMsg}
              </p>
            </div>

            {/* Privacy Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-emerald-400 bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Zero Data Stored</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Server Uploads</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side</span>
              </div>
            </div>

            {/* Proceed CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  onProceed();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-[0.98] transition cursor-pointer flex items-center justify-center space-x-2 mx-auto group"
              >
                <span>{t.revealActionBtn}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
