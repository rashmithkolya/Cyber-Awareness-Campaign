import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HelpCircle, Sparkles, ChevronDown, Shield, Zap, Lock, QrCode, Wifi, AlertTriangle, CheckCircle2, Clock, UserCheck, Coins, ShieldAlert, KeyRound, SearchCheck, FileCheck } from 'lucide-react';
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
      icon: Clock,
      bg: 'from-amber-500/10 via-amber-500/5 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-400/60',
      badgeColor: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'authority',
      title: t.triggerAuthorityTitle,
      desc: t.triggerAuthorityDesc,
      icon: UserCheck,
      bg: 'from-blue-500/10 via-blue-500/5 to-transparent',
      border: 'border-blue-500/30 hover:border-blue-400/60',
      badgeColor: 'bg-blue-500/20 text-blue-300'
    },
    {
      id: 'greed',
      title: t.triggerGreedTitle,
      desc: t.triggerGreedDesc,
      icon: Coins,
      bg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      badgeColor: 'bg-emerald-500/20 text-emerald-300'
    },
    {
      id: 'fear',
      title: t.triggerFearTitle,
      desc: t.triggerFearDesc,
      icon: ShieldAlert,
      bg: 'from-rose-500/10 via-rose-500/5 to-transparent',
      border: 'border-rose-500/30 hover:border-rose-400/60',
      badgeColor: 'bg-rose-500/20 text-rose-300'
    }
  ];

  return (
    <div id="learning-start" className="space-y-12 sm:space-y-16 py-6 sm:py-8">
      
      {/* SECTION 1: What Just Happened */}
      <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-slate-700/80">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Section 01</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.sec1Title}
          </h2>
          <p className="text-sm text-slate-300/90 mt-1 font-normal leading-relaxed">{t.sec1Sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/40 space-y-2.5 transition-all duration-200 group hover:shadow-lg hover:shadow-amber-500/5">
            <div className="text-amber-400 font-bold text-base flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>{t.sec1Card1Title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.sec1Card1Desc}
            </p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 space-y-2.5 transition-all duration-200 group hover:shadow-lg hover:shadow-emerald-500/5">
            <div className="text-emerald-400 font-bold text-base flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>{t.sec1Card2Title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.sec1Card2Desc}
            </p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 space-y-2.5 transition-all duration-200 group hover:shadow-lg hover:shadow-cyan-500/5">
            <div className="text-cyan-400 font-bold text-base flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>{t.sec1Card3Title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.sec1Card3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Why People Trust Scams */}
      <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-slate-700/80">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Section 02</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.sec2Title}
          </h2>
          <p className="text-sm text-slate-300/90 mt-1 font-normal leading-relaxed">{t.sec2Sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {triggers.map(item => {
            const isOpen = activeTrigger === item.id;
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  playClickSound();
                  setActiveTrigger(isOpen ? null : item.id);
                }}
                className={`bg-gradient-to-br ${item.bg} border ${item.border} rounded-xl p-5 text-left cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 shadow-md ${isOpen ? 'ring-1 ring-amber-400/30' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${item.badgeColor} shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-base tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </div>
                {isOpen && (
                  <p className="text-xs text-slate-200 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed font-normal animate-fade-in">
                    {item.desc}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: 4-Step Verification Checklist */}
      <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-slate-700/80">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Section 04</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.sec4Title}
          </h2>
          <p className="text-sm text-slate-300/90 mt-1 font-normal leading-relaxed">{t.sec4Sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/40 space-y-2.5 transition-all duration-200 group">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">RULE 1</span>
              <h4 className="font-bold text-amber-400 text-sm">{t.rule1Title}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">{t.rule1Desc}</p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 space-y-2.5 transition-all duration-200 group">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">RULE 2</span>
              <h4 className="font-bold text-emerald-400 text-sm">{t.rule2Title}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">{t.rule2Desc}</p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 space-y-2.5 transition-all duration-200 group">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">RULE 3</span>
              <h4 className="font-bold text-cyan-400 text-sm">{t.rule3Title}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">{t.rule3Desc}</p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 space-y-2.5 transition-all duration-200 group">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">RULE 4</span>
              <h4 className="font-bold text-indigo-400 text-sm">{t.rule4Title}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">{t.rule4Desc}</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Essential Cyber Defense */}
      <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-slate-700/80">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Section 05</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.sec5Title}
          </h2>
          <p className="text-sm text-slate-300/90 mt-1 font-normal leading-relaxed">{t.sec5Sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 space-y-2 transition-all duration-200 group">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-emerald-400 text-sm tracking-tight">{t.passTitle}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal pt-1">{t.passDesc}</p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/40 space-y-2 transition-all duration-200 group">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-amber-400 text-sm tracking-tight">{t.otpTitle}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal pt-1">{t.otpDesc}</p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 space-y-2 transition-all duration-200 group">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <QrCode className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-cyan-400 text-sm tracking-tight">{t.qrTitle}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal pt-1">{t.qrDesc}</p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800/80 hover:border-rose-500/40 space-y-2 transition-all duration-200 group">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <Wifi className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-rose-400 text-sm tracking-tight">{t.wifiTitle}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal pt-1">{t.wifiDesc}</p>
          </div>
        </div>
      </section>

    </div>
  );
};

