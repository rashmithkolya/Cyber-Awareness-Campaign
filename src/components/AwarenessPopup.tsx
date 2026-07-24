import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Award, ShieldCheck, CheckCircle2, Sparkles, X, ArrowRight, BookOpen, Instagram } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface AwarenessPopupProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: () => void;
}

export const AwarenessPopup: React.FC<AwarenessPopupProps> = ({
  lang,
  isOpen,
  onClose,
  onStartLearning
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  const handleStart = () => {
    playClickSound();
    onClose();
    onStartLearning();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-lg w-full bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-highlight-glow overflow-hidden">
        
        {/* Background Decorative Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400" />
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          title="Close Popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Icon Header */}
        <div className="flex justify-center pt-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-cyan-500 p-1 shadow-xl flex items-center justify-center animate-bounce">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Award className="w-10 h-10 text-amber-400" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Titles & Badge */}
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.popupBadge}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            {t.popupTitle}
          </h2>

          <p className="text-xs text-slate-400 font-medium">
            {t.popupSubtitle}
          </p>
        </div>

        {/* Description & Key Highlights */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {t.popupDesc}
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Explore real-world phishing scenarios & interactive warning spots.</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Pass the 5-question quiz (80%+ score) to unlock your certificate.</span>
            </div>
          </div>

          {/* Instagram Story Tagging Box with Direct Open Links */}
          <div className="p-3 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 rounded-xl space-y-2 text-xs text-pink-300">
            <div className="flex items-center space-x-2">
              <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Share Certificate on Instagram Story & Tag Us:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono">
              <a
                href="https://www.instagram.com/gptbantwal/"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/40 text-[11px] font-bold transition cursor-pointer flex items-center space-x-1"
              >
                <span>@gptbantwal ↗</span>
              </a>
              <a
                href="https://www.instagram.com/blackbyte_cs/"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/40 text-[11px] font-bold transition cursor-pointer flex items-center space-x-1"
              >
                <span>@blackbyte_cs ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>{t.popupBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
