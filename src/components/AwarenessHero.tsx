import React from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, Award, Instagram, ArrowDown, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface AwarenessHeroProps {
  lang: Language;
  userData?: UserData;
  onStartLearning: () => void;
  onJumpToCert: () => void;
}

export const AwarenessHero: React.FC<AwarenessHeroProps> = ({
  lang,
  userData,
  onStartLearning,
  onJumpToCert
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-10 sm:py-14 border-b border-slate-800">
      
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 animate-reveal-up gpu-layer">
        
        {/* Campaign Tag Badge */}
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-[0.2em] shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{t.awarenessHeroTag}</span>
          </span>
        </div>

        {/* Main Title Composition */}
        <div className="space-y-3 animate-reveal-delay-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-composition-title leading-tight">
            {t.awarenessHeroTitle}
          </h1>
          <p className="text-composition-sub text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t.awarenessHeroSub}
          </p>
        </div>

        {/* Unified Welcome & Initiative Card (Merged Overview + Certificate Details) */}
        <div className="bg-slate-900/90 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-6 relative overflow-hidden backdrop-blur-md animate-reveal-delay-2">
          <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Heart className="w-6 h-6 fill-amber-500/30" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Welcome, <span className="text-amber-400">{userData?.name || 'Student'}</span>!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Government Polytechnic Bantwal & CSE Technical Club Initiative
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0 self-start sm:self-center">
              Student Safety First
            </span>
          </div>

          {/* Short Initiative Explanation */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>About this Initiative:</strong> What started as a simulated ₹500 reward offer was a hands-on cybersecurity exercise to demonstrate how phishing lures trick students.
            </p>
            <p className="text-emerald-300 font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 inline" />
              <span>Rest assured: Zero personal data was stored or transmitted. All input remained 100% private to your browser.</span>
            </p>
          </div>

          {/* 3-Step Journey to Certificate */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-4 h-4" />
              <span>Earn Your Verified Cyber Security Certificate in 3 Steps:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Step 01</span>
                <h4 className="text-xs font-bold text-white">Learn Red Flags</h4>
                <p className="text-[11px] text-slate-400">Identify how phishing lures manipulate human trust.</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">Step 02</span>
                <h4 className="text-xs font-bold text-white">Pass 5-Q Quiz</h4>
                <p className="text-[11px] text-slate-400">Score 80%+ to unlock your official certificate.</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Step 03</span>
                <h4 className="text-xs font-bold text-white">Share & Tag</h4>
                <p className="text-[11px] text-slate-400">Download & post on Instagram Story tagging us.</p>
              </div>
            </div>
          </div>

          {/* Social Tagging Footer inside Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-800/80">
            <div className="flex items-center space-x-2 text-slate-300">
              <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Instagram Tags:</span>
              <a
                href="https://www.instagram.com/gptbantwal/"
                target="_blank"
                rel="noreferrer"
                className="text-pink-400 hover:text-pink-300 font-mono font-bold hover:underline"
              >
                @gptbantwal
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="https://www.instagram.com/blackbyte_cs/"
                target="_blank"
                rel="noreferrer"
                className="text-pink-400 hover:text-pink-300 font-mono font-bold hover:underline"
              >
                @blackbyte_cs
              </a>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onJumpToCert();
              }}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition cursor-pointer"
            >
              <span>Jump to Certificate</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2 animate-reveal-delay-2">
          <button
            onClick={() => {
              playClickSound();
              onStartLearning();
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.startLearning}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </div>

    </div>
  );
};


