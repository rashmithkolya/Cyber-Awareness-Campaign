import React, { useState, useEffect } from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, ShieldAlert, CheckCircle2, Lock, Sparkles, Terminal, Shield } from 'lucide-react';
import { playSuccessSound, playFreezeSound } from '../utils/sound';

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
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Scene 1: Verified chime
    playSuccessSound();

    // Smooth Progress Bar Tracker (9.8 seconds total)
    const totalMs = 9800;
    const intervalMs = 50;
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalMs / totalMs) * 100;
        return next >= 100 ? 100 : next;
      });
    }, intervalMs);

    // Scene 2: Freeze after 2.2s with camera shake & audio alert
    const timer1 = setTimeout(() => {
      setScene(2);
      setIsShaking(true);
      playFreezeSound();
      setTimeout(() => setIsShaking(false), 450);
    }, 2200);

    // Scene 3: Reflection message after 4.4s
    const timer2 = setTimeout(() => {
      setScene(3);
    }, 4400);

    // Scene 4: "This wasn't a scam, it was a lesson" after 6.6s
    const timer3 = setTimeout(() => {
      setScene(4);
    }, 6600);

    // Scene 5: Auto Curtain Transition at 8.8s -> onProceed at 9.8s
    const timer4 = setTimeout(() => {
      setScene(5);
      setIsExiting(true);
    }, 8800);

    const timer5 = setTimeout(() => {
      onProceed();
    }, 9800);

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
              ? 'bg-emerald-500/25 scale-100'
              : scene === 2
              ? 'bg-rose-600/30 scale-125'
              : scene === 3
              ? 'bg-amber-500/25 scale-110'
              : 'bg-teal-500/25 scale-100'
          }`}
        />
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse gpu-layer" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse gpu-layer" />
      </div>

      {/* 2. Cyber Wireframe Overlay */}
      <div className="absolute inset-0 bg-wireframe-grid opacity-20 pointer-events-none" />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          scene >= 2 ? 'bg-slate-950/70 backdrop-grayscale' : 'bg-emerald-950/15'
        }`}
      />

      {/* 3. Horizontal Scanline Beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      {/* Main Content Stage */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-6">
        {/* ACT 1: Claim Verified */}
        {scene === 1 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-stamp-in">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              {t.revealVerified}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              {t.revealCredited}
            </p>
          </div>
        )}

        {/* ACT 2: Security Breach Freeze */}
        {scene === 2 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-2xl shadow-amber-500/30">
              <ShieldAlert className="w-10 h-10 animate-spin" />
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-400 font-mono text-xs uppercase tracking-widest shadow-lg">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>SECURITY OVERRIDE DETECTED</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-amber-400 tracking-widest uppercase drop-shadow-xl">
              {t.revealFreeze}
            </h2>
          </div>
        )}

        {/* ACT 3: Personal Reflection */}
        {scene === 3 && (
          <div className="space-y-4 animate-reveal-up gpu-layer">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-300 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>PAUSE & REFLECT</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-amber-300 tracking-tight">
              {t.revealReflect.replace('{name}', userData.name || 'Student')}
            </h3>
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-medium max-w-xl mx-auto">
              {t.revealTrustMsg}
            </p>
          </div>
        )}

        {/* ACT 4: High Impact Empowerment & Safety Guarantee */}
        {(scene === 4 || scene === 5) && (
          <div className="space-y-6 animate-reveal-up gpu-layer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-2xl">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-500 line-through decoration-rose-500 decoration-4">
                {t.revealBigText}
              </h1>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-amber-400 drop-shadow-2xl">
                {t.revealLessonText}
              </h1>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {t.revealSafeMsg}
            </p>

            {/* Zero-Data Security Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-emerald-400 bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3.5 shadow-xl max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Data Stored</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Server Uploads</span>
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
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-cyan-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

