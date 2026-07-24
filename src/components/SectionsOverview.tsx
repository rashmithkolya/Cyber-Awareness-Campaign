import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HelpCircle, Sparkles, ChevronDown } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface SectionsOverviewProps {
  lang: Language;
}

export const SectionsOverview: React.FC<SectionsOverviewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeTrigger, setActiveTrigger] = useState<string | null>('urgency');

  const triggers = [
    {
      id: 'urgency',
      title: t.triggerUrgencyTitle,
      desc: t.triggerUrgencyDesc,
      bg: 'from-amber-500/10 to-orange-500/10',
      border: 'border-amber-500/30'
    },
    {
      id: 'authority',
      title: t.triggerAuthorityTitle,
      desc: t.triggerAuthorityDesc,
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/30'
    },
    {
      id: 'greed',
      title: t.triggerGreedTitle,
      desc: t.triggerGreedDesc,
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/30'
    },
    {
      id: 'fear',
      title: t.triggerFearTitle,
      desc: t.triggerFearDesc,
      bg: 'from-rose-500/10 to-pink-500/10',
      border: 'border-rose-500/30'
    }
  ];

  return (
    <div id="learning-start" className="space-y-16 py-8">
      
      {/* SECTION 1: What Just Happened */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
            <span>{t.sec1Title}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec1Sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-amber-400 font-bold text-base flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.sec1Card1Title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.sec1Card1Desc}
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-emerald-400 font-bold text-base flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>{t.sec1Card2Title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.sec1Card2Desc}
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-cyan-400 font-bold text-base flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.sec1Card3Title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.sec1Card3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Why People Trust Scams */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.sec2Title}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec2Sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {triggers.map(item => {
            const isOpen = activeTrigger === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  playClickSound();
                  setActiveTrigger(isOpen ? null : item.id);
                }}
                className={`bg-gradient-to-br ${item.bg} border ${item.border} rounded-xl p-5 cursor-pointer transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    {item.title}
                  </h3>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <p className="text-xs text-slate-200 mt-3 pt-3 border-t border-slate-800 leading-relaxed animate-fade-in">
                    {item.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: 4-Step Verification Checklist */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.sec4Title}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec4Sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 text-sm">{t.rule1Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{t.rule1Desc}</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 text-sm">{t.rule2Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{t.rule2Desc}</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-cyan-400 text-sm">{t.rule3Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{t.rule3Desc}</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-indigo-400 text-sm">{t.rule4Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{t.rule4Desc}</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Essential Cyber Defense */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.sec5Title}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec5Sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-emerald-400 text-sm">{t.passTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{t.passDesc}</p>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-400 text-sm">{t.otpTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{t.otpDesc}</p>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-cyan-400 text-sm">{t.qrTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{t.qrDesc}</p>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-rose-400 text-sm">{t.wifiTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{t.wifiDesc}</p>
          </div>
        </div>
      </section>

    </div>
  );
};
