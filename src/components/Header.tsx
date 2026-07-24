import React from 'react';
import { Language, AppStage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Volume2, VolumeX, Sparkles, Globe, Shield } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand with Official Logos */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <img
            src="/gpt.svg"
            alt="Government Polytechnic Bantwal Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow hover:scale-105 transition-transform shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-100">
                Government Polytechnic Bantwal
              </span>
              <span className="hidden sm:inline text-slate-600 text-xs">•</span>
              <span className="inline-block text-[11px] font-medium text-amber-400/90">
                CSE Department • Technical Club
              </span>
            </div>
          </div>
          <img
            src="/club.svg"
            alt="Technical Club Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow hover:scale-105 transition-transform shrink-0"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {appStage === 'awareness' && onJumpToCert && (
            <button
              onClick={() => {
                playClickSound();
                onJumpToCert();
              }}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.shareCertificate}</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              onLanguageToggle();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold tracking-wide transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.switchLanguage}</span>
          </button>
        </div>
      </div>

      {/* Reading Progress Bar (Awareness stage) */}
      {appStage === 'awareness' && (
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 h-1 transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
          />
        </div>
      )}
    </header>
  );
};
