import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, Award, Instagram, ArrowDown, Sparkles, Code2 } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface AwarenessHeroProps {
  lang: Language;
  onStartLearning: () => void;
  onJumpToCert: () => void;
}

export const AwarenessHero: React.FC<AwarenessHeroProps> = ({
  lang,
  onStartLearning,
  onJumpToCert
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-16 border-b border-slate-800">
      
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 animate-reveal-up">
        
        {/* Campaign Tag Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-[0.2em] shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{t.awarenessHeroTag}</span>
          </span>
        </div>

        {/* Main Title Composition */}
        <div className="space-y-4 animate-reveal-delay-1">
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-composition-title leading-tight">
            {t.awarenessHeroTitle}
          </h1>
          <p className="text-composition-sub text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {t.awarenessHeroSub}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-reveal-delay-2">
          <button
            onClick={() => {
              playClickSound();
              onStartLearning();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.startLearning}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Certificate Teaser Banner */}
        <div className="mt-8 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-start space-x-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{t.certHighlightTitle}</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t.certHighlightDesc}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                <span className="text-slate-300 flex items-center space-x-1">
                  <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>Share Story & Tag:</span>
                </span>
                <a
                  href="https://www.instagram.com/gptbantwal/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-400 hover:text-pink-300 font-mono hover:underline"
                >
                  @gptbantwal
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="https://www.instagram.com/blackbyte_cs/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-400 hover:text-pink-300 font-mono hover:underline"
                >
                  @blackbyte_cs
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onJumpToCert();
            }}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition cursor-pointer shrink-0 text-center"
          >
            Jump to Certificate ↓
          </button>
        </div>

      </div>

    </div>
  );
};
