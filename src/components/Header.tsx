import React from 'react';
import { Language, AppStage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Volume2, VolumeX, Sparkles, Globe, Shield, ShieldCheck } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-15 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand & Logos Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {/* Institutional Logo 1 */}
          <div className="relative shrink-0">
            <img
              src="./assets/images/logo-placeholder-1.svg"
              alt="GPT Bantwal Logo"
              className="w-8 h-8 sm:w-9.5 sm:h-9.5 object-contain rounded-lg bg-slate-950/80 p-1 border border-slate-800/90 shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Institutional Title & Club Badge */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs sm:text-sm font-black tracking-tight text-white truncate">
                Government Polytechnic Bantwal
              </span>
              <span className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider shrink-0">
                GPT
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] sm:text-xs font-medium text-slate-400 truncate">
              <span className="text-amber-400 font-semibold">CSE Dept</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 truncate">Technical Club</span>
            </div>
          </div>

          {/* Technical Club Logo 2 */}
          <div className="hidden lg:block shrink-0 ml-0.5">
            <img
              src="./assets/images/logo-placeholder-2.svg"
              alt="CSE Club Logo"
              className="w-8 h-8 object-contain rounded-lg bg-slate-950/80 p-1 border border-slate-800/90 shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Center Stage Badge Indicator (Desktop) */}
        <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>{appStage === 'awareness' ? 'Cyber Security Awareness' : 'Student Grant Portal'}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          {appStage === 'awareness' && onJumpToCert && (
            <button
              onClick={() => {
                playClickSound();
                onJumpToCert();
              }}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition cursor-pointer active:scale-95 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.shareCertificate}</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer flex items-center space-x-1.5 text-xs font-medium active:scale-95"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="hidden md:inline text-[11px] text-slate-400">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden md:inline text-[11px] text-emerald-400">Audio On</span>
              </>
            )}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              onLanguageToggle();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-extrabold tracking-wide transition cursor-pointer active:scale-95 shadow-lg"
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

