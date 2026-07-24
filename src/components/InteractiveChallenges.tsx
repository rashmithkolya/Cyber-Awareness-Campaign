import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, URL_ITEMS, SORT_ITEMS, SCENARIOS } from '../data/translations';
import { CheckCircle2, XCircle, Shield, KeyRound, AlertTriangle, ArrowRight } from 'lucide-react';
import { playSuccessSound, playAlertSound, playClickSound } from '../utils/sound';

interface InteractiveChallengesProps {
  lang: Language;
}

export const InteractiveChallenges: React.FC<InteractiveChallengesProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  // Challenge A: URL Checker
  const [urlAnswers, setUrlAnswers] = useState<Record<string, boolean>>({});

  // Challenge B: Safe vs Unsafe Sort
  const [sortAnswers, setSortAnswers] = useState<Record<string, boolean>>({});

  // Challenge C: Password Analyzer
  const [password, setPassword] = useState('');

  // Scenarios
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});

  const handleUrlCheck = (id: string, userChoiceIsSafe: boolean, actualIsSafe: boolean) => {
    setUrlAnswers(prev => ({ ...prev, [id]: userChoiceIsSafe === actualIsSafe }));
    if (userChoiceIsSafe === actualIsSafe) {
      playSuccessSound();
    } else {
      playAlertSound();
    }
  };

  const handleSortCheck = (id: string, userChoiceIsSafe: boolean, actualIsSafe: boolean) => {
    setSortAnswers(prev => ({ ...prev, [id]: userChoiceIsSafe === actualIsSafe }));
    if (userChoiceIsSafe === actualIsSafe) {
      playSuccessSound();
    } else {
      playAlertSound();
    }
  };

  const getPasswordEntropyScore = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', time: 'Instant', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 25;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;

    if (score < 40) return { score, label: 'Weak ⚠️', time: '0.001 seconds', color: 'bg-rose-500' };
    if (score < 75) return { score, label: 'Moderate 🟡', time: '3 days', color: 'bg-amber-500' };
    return { score, label: 'Strong Passphrase 🛡️', time: '400+ years', color: 'bg-emerald-500' };
  };

  const passStats = getPasswordEntropyScore(password);

  return (
    <div className="space-y-16 py-8">
      
      {/* SECTION 6: Real Life Scenarios */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.sec6Title}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec6Sub}</p>
        </div>

        <div className="space-y-6">
          {SCENARIOS.map((sc, idx) => {
            const selectedChoiceIdx = scenarioAnswers[sc.id];
            return (
              <div key={sc.id} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-amber-400">
                  {lang === 'en' ? sc.titleEn : sc.titleKn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {lang === 'en' ? sc.situationEn : sc.situationKn}
                </p>

                <div className="space-y-3">
                  {sc.choices.map((choice, cIdx) => {
                    const isSelected = selectedChoiceIdx === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => {
                          setScenarioAnswers(prev => ({ ...prev, [sc.id]: cIdx }));
                          if (choice.isSafe) playSuccessSound(); else playAlertSound();
                        }}
                        className={`w-full text-left p-4 rounded-xl border transition text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${isSelected ? (choice.isSafe ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-rose-500/20 border-rose-400 text-rose-300') : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'}`}
                      >
                        <span>{lang === 'en' ? choice.textEn : choice.textKn}</span>
                        <ArrowRight className="w-4 h-4 shrink-0 ml-2" />
                      </button>
                    );
                  })}
                </div>

                {selectedChoiceIdx !== undefined && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${sc.choices[selectedChoiceIdx].isSafe ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
                    {lang === 'en' ? sc.choices[selectedChoiceIdx].feedbackEn : sc.choices[selectedChoiceIdx].feedbackKn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: Interactive Challenges */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-12">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.sec7Title}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec7Sub}</p>
        </div>

        {/* Challenge A: Domain Inspector */}
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-cyan-400">
              {t.challengeUrlTitle}
            </h3>
            <p className="text-xs text-slate-400">{t.challengeUrlSub}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {URL_ITEMS.map((item) => {
              const result = urlAnswers[item.id];
              return (
                <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-amber-300 bg-slate-900 px-3 py-1 rounded border border-slate-800 inline-block break-all">
                      {item.url}
                    </span>
                    {result !== undefined && (
                      <p className={`text-xs mt-2 ${result ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {lang === 'en' ? item.reasonEn : item.reasonKn}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleUrlCheck(item.id, true, item.isSafe)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold cursor-pointer transition"
                    >
                      Legitimate Safe
                    </button>
                    <button
                      onClick={() => handleUrlCheck(item.id, false, item.isSafe)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-bold cursor-pointer transition"
                    >
                      Phishing Scam
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Challenge B: Safe vs Unsafe Sorting */}
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-amber-400">
              {t.challengeSortTitle}
            </h3>
            <p className="text-xs text-slate-400">{t.challengeSortSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SORT_ITEMS.map((item) => {
              const result = sortAnswers[item.id];
              return (
                <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {lang === 'en' ? item.textEn : item.textKn}
                  </p>

                  {result !== undefined && (
                    <p className={`text-xs ${result ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {lang === 'en' ? item.explanationEn : item.explanationKn}
                    </p>
                  )}

                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleSortCheck(item.id, true, item.isSafe)}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SAFE</span>
                    </button>
                    <button
                      onClick={() => handleSortCheck(item.id, false, item.isSafe)}
                      className="flex-1 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>DANGEROUS</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Challenge C: Password Analyzer */}
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center space-x-2">
              <KeyRound className="w-5 h-5" />
              <span>{t.challengePassTitle}</span>
            </h3>
            <p className="text-xs text-slate-400">{t.challengePassSub}</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 max-w-2xl">
            <input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Type a sample password (e.g. Bantwal@2026!Secured)"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-400 font-mono"
            />

            {password && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Strength Rating:</span>
                  <span className="font-bold text-white">{passStats.label}</span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passStats.color} transition-all duration-300`}
                    style={{ width: `${passStats.score}%` }}
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Estimated Brute-Force Crack Time:</span>
                  <span className="text-emerald-400 font-bold">{passStats.time}</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

    </div>
  );
};
