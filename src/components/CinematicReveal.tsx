import React, { useState, useEffect } from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, ShieldAlert, Lock, Sparkles, Terminal, Shield, HelpCircle, AlertTriangle } from 'lucide-react';
import { playSuccessSound, playFreezeSound } from '../utils/sound';

interface CinematicRevealProps {
  lang: Language;
  userData: UserData;
  onProceed: () => void;
}

export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  lang,
  onProceed,
}) => {
  const t = TRANSLATIONS[lang];
  const [scene, setScene] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isShaking, setIsShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initial audio cue
    playSuccessSound();

    // Smooth Progress Bar Tracker (12 seconds total)
    const totalMs = 12000;
    const intervalMs = 50;
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalMs / totalMs) * 100;
        return next >= 100 ? 100 : next;
      });
    }, intervalMs);

    // Scene 2: "You expected a surprise... And you found one." at 2.4s
    const timer1 = setTimeout(() => {
      setScene(2);
    }, 2400);

    // Scene 3: "Every day, attackers use curiosity to attract victims." at 5.0s with camera shake & audio alert
    const timer2 = setTimeout(() => {
      setScene(3);
      setIsShaking(true);
      playFreezeSound();
      setTimeout(() => setIsShaking(false), 450);
    }, 5000);

    // Scene 4: "A single click can change everything." at 7.6s
    const timer3 = setTimeout(() => {
      setScene(4);
    }, 7600);

    // Scene 5: "THIS IS A CYBER SECURITY LESSON" at 10.0s -> onProceed at 12.0s
    const timer4 = setTimeout(() => {
      setScene(5);
      setIsExiting(true);
    }, 10800);

    const timer5 = setTimeout(() => {
      onProceed();
    }, 12000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onProceed]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-95 blur-sm pointer-events-none' : 'opacity-100 scale-100'
      } ${isShaking ? 'animate-camera-vibrate' : ''}`}
    >
      {/* 1. Dynamic Ambient Background Lighting Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[120px] transition-all duration-1000 gpu-layer ${
            scene === 1
              ? 'bg-purple-500/25 scale-100'
              : scene === 2
              ? 'bg-amber-500/25 scale-110'
              : scene === 3
              ? 'bg-rose-600/30 scale-125'
              : scene === 4
              ? 'bg-cyan-500/25 scale-110'
              : 'bg-emerald-500/25 scale-100'
          }`}
        />
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse gpu-layer" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse gpu-layer" />
      </div>

      {/* 2. Cyber Wireframe Overlay */}
      <div className="absolute inset-0 bg-wireframe-grid opacity-20 pointer-events-none" />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          scene >= 3 ? 'bg-slate-950/70 backdrop-grayscale' : 'bg-slate-950/40'
        }`}
      />

      {/* 3. Horizontal Scanline Beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      {/* Main Content Stage */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-6">
        
        {/* ACT 1: Curiosity made you click */}
        {scene === 1 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-purple-300 shadow-2xl shadow-purple-500/20 animate-stamp-in">
              <HelpCircle className="w-10 h-10 animate-pulse" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight drop-shadow-lg">
              {t.revealVerified}
            </h2>
            <p className="text-base sm:text-xl text-slate-300 font-medium">
              "Curiosity made you click."
            </p>
          </div>
        )}

        {/* ACT 2: You expected a surprise... and you found one */}
        {scene === 2 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-2xl shadow-amber-500/30">
              <Sparkles className="w-10 h-10 animate-spin" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-xl">
              {t.revealCredited}
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wide">
              {t.revealFreeze}
            </p>
          </div>
        )}

        {/* ACT 3: Attackers use curiosity */}
        {scene === 3 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-rose-400 shadow-2xl shadow-rose-500/30">
              <ShieldAlert className="w-10 h-10 animate-bounce" />
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-400 font-mono text-xs uppercase tracking-widest shadow-lg">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>SOCIAL ENGINEERING TACTIC EXPOSED</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-rose-300 tracking-tight max-w-xl mx-auto leading-tight">
              {t.revealTrustMsg}
            </h3>
          </div>
        )}

        {/* ACT 4: A single click can change everything */}
        {scene === 4 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-2xl">
              <AlertTriangle className="w-10 h-10 text-cyan-300" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-cyan-300 drop-shadow-2xl">
              {t.revealBigText}
            </h1>
          </div>
        )}

        {/* ACT 5: High Impact Empowerment & Safety Guarantee */}
        {scene === 5 && (
          <div className="space-y-6 animate-reveal-up gpu-layer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-2xl">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-emerald-400 drop-shadow-2xl">
                {t.revealLessonText}
              </h1>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-medium">
              {t.revealSafeMsg}
            </p>

            {/* Zero-Data Security Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-emerald-400 bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3.5 shadow-xl max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Data Captured</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Ethical Campaign</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Client-Side</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ambient Non-Interruptible Timeline Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-900 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

