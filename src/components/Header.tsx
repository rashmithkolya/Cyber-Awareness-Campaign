import React from 'react';
import { Language, AppStage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Volume2, VolumeX, Sparkles, Globe, Shield, ShieldCheck, Award } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface HeaderProps {
  lang: Language;
  onLanguageToggle: () => void;
  appStage: AppStage;
  scrollProgress: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onJumpToCert?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageToggle,
  appStage,
  scrollProgress,
  isMuted,
  onToggleMute,
  onJumpToCert
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 md:h-22 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand & Logos Section */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          {/* Institutional Logo 1 */}
          <div className="relative shrink-0 flex items-center">
            <img
              src="./assets/images/logo-placeholder-1.png"
              alt="GPT Bantwal Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl bg-slate-950 p-1 border border-slate-800 shadow-md transition-transform hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Institutional Title & Subtitle */}
          <div className="flex flex-col min-w-0 justify-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight text-white truncate drop-shadow-sm">
                Government Polytechnic Bantwal
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider shrink-0">
                GPT
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-400 truncate mt-0.5">
              <span className="text-amber-400 font-bold">CSE Dept</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200 font-semibold truncate">Technical Club</span>
            </div>
          </div>

          {/* Technical Club Logo 2 */}
          <div className="hidden lg:flex shrink-0 items-center pl-2 border-l border-slate-800">
            <img
              src="./assets/images/logo-placeholder-2.png"
              alt="CSE Club Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl bg-slate-950 p-1 border border-slate-800 shadow-md transition-transform hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Center Stage Badge Indicator (Desktop) */}
        <div className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-slate-800/90 text-xs font-mono text-slate-300 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-slate-200">
            {appStage === 'awareness' ? 'Cyber Security Awareness' : 'Public Reward Portal'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          {appStage === 'awareness' && onJumpToCert && (
            <button
              onClick={() => {
                playClickSound();
                onJumpToCert();
              }}
              className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/40 hover:from-emerald-900/90 hover:to-amber-900/50 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 active:from-emerald-900 active:to-amber-900 active:border-emerald-300 active:text-emerald-100 shadow-md shadow-emerald-950/40 group"
            >
              <div className="relative flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="tracking-tight">{t.shareCertificate}</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="px-2.5 sm:px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-700/95 text-slate-300 border border-slate-700/80 active:border-slate-500 transition-all duration-150 cursor-pointer flex items-center space-x-1.5 text-xs font-medium active:scale-95"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="hidden md:inline text-[11px] text-slate-400">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden md:inline text-[11px] text-emerald-400 font-semibold">Audio On</span>
              </>
            )}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              onLanguageToggle();
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 active:bg-indigo-600/50 text-indigo-300 active:text-indigo-100 border border-indigo-500/40 active:border-indigo-400 text-xs font-extrabold tracking-wide transition-all duration-150 cursor-pointer active:scale-95 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{t.switchLanguage}</span>
          </button>
        </div>
      </div>

      {/* Reading Progress Bar (Awareness stage) */}
      {appStage === 'awareness' && (
        <div className="w-full bg-slate-800/80 h-1">
          <div
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 h-1 transition-all duration-150 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
          />
        </div>
      )}
    </header>
  );
};

