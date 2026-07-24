import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, ShieldCheck, Heart, Instagram, Sparkles, Code2 } from 'lucide-react';

interface FooterAndFeedbackProps {
  lang: Language;
}

export const FooterAndFeedback: React.FC<FooterAndFeedbackProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-16 py-8">
      
      {/* SECTION 10: Google Form Embedded Feedback */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-7 h-7 text-cyan-400" />
            <span>{t.sec10Title}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec10Sub}</p>
        </div>

        {/* Explicit Privacy Notice */}
        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 text-xs flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>{t.feedbackNotice}</span>
        </div>

        {/* Embedded Responsive Form Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden min-h-[480px] relative">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc_sample_feedback_form/viewform?embedded=true"
            width="100%"
            height="520"
            className="w-full h-[520px] border-0"
            title="Student Cyber Awareness Feedback Form"
          >
            Loading Student Feedback Form...
          </iframe>
        </div>

        <p className="text-center text-xs text-emerald-400 font-medium">
          {t.feedbackThx}
        </p>
      </section>

      {/* Cinematic Footer */}
      <footer className="border-t border-slate-800 pt-12 pb-8 text-center space-y-8">
        
        {/* Closing Thought Quote */}
        <div className="max-w-xl mx-auto space-y-2 px-4">
          <p className="text-base sm:text-lg font-serif italic text-amber-300">
            {t.footerQuote}
          </p>
        </div>

        {/* Requested Campaign & Developer Credits Footer Card */}
        <div className="max-w-md mx-auto bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4 animate-highlight-glow backdrop-blur-md">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase">
              Cyber Awareness Campaign
            </h3>
            <p className="text-xs font-semibold text-amber-400">
              An Initiative by the Technical Club
            </p>
            <p className="text-xs text-slate-300 font-medium">
              Department of Computer Science Engineering (CSE)
            </p>
            <p className="text-xs font-bold text-slate-200">
              Government Polytechnic Bantwal
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-2" />

          <div className="space-y-1">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>Designed & Developed by</span>
            </p>
            <p className="text-sm font-extrabold text-amber-300 tracking-wide animate-shimmer-text">
              Rashmith Kolya
            </p>
            <div>
              <a
                href="https://www.instagram.com/rashmith_kolya/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[10px] text-pink-400/90 hover:text-pink-300 font-mono transition hover:underline"
              >
                <Instagram className="w-3 h-3 text-pink-400" />
                <span>@rashmith_kolya</span>
              </a>
            </div>
            <p className="text-xs font-mono text-emerald-400 font-semibold">
              2nd Year – CSE
            </p>
          </div>
        </div>

        {/* Social Follow Links - Official Campaign Instagram Handles */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-2 text-xs text-slate-300 px-4">
          <span className="text-slate-400 font-medium">Official Campaign Instagram Handles:</span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono">
            <a
              href="https://www.instagram.com/gptbantwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 font-bold transition cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@gptbantwal</span>
            </a>
            <a
              href="https://www.instagram.com/blackbyte_cs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 font-bold transition cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@blackbyte_cs</span>
            </a>
          </div>
        </div>

        {/* Back to Top */}
        <div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono text-slate-400 hover:text-amber-400 transition cursor-pointer"
          >
            {t.backToTop}
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-600 font-mono">
          {t.copyRight}
        </div>

      </footer>

    </div>
  );
};
