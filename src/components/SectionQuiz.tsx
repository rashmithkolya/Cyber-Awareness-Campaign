import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, QUIZ_QUESTIONS } from '../data/translations';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { playSuccessSound, playAlertSound, playClickSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface SectionQuizProps {
  lang: Language;
  onQuizPassed: () => void;
}

export const SectionQuiz: React.FC<SectionQuizProps> = ({ lang, onQuizPassed }) => {
  const t = TRANSLATIONS[lang];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [transitionState, setTransitionState] = useState<'idle' | 'exit' | 'enter'>('idle');

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (optionIdx: number) => {
    if (showExplanation || transitionState !== 'idle') return;
    playClickSound();

    const newAnswers = [...selectedAnswers, optionIdx];
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);

    const isCorrect = optionIdx === currentQ.correctIndex;
    if (isCorrect) {
      playSuccessSound();
    } else {
      playAlertSound();
    }
  };

  const handleNext = () => {
    if (transitionState !== 'idle') return;
    playClickSound();

    // Trigger smooth exit transition
    setTransitionState('exit');

    setTimeout(() => {
      setShowExplanation(false);

      if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setIsFinished(true);
        // Calculate total score
        const totalScore = selectedAnswers.reduce((score, ansIdx, qIdx) => {
          return ansIdx === QUIZ_QUESTIONS[qIdx].correctIndex ? score + 1 : score;
        }, 0);

        // Passing score is 4 out of 5 (80%)
        if (totalScore >= 4) {
          onQuizPassed();

          // Multi-stage performant canvas confetti celebratory burst
          const count = 180;
          const defaults = {
            origin: { y: 0.65 },
            disableForReducedMotion: true,
          };

          const fire = (particleRatio: number, opts: confetti.Options) => {
            confetti({
              ...defaults,
              ...opts,
              particleCount: Math.floor(count * particleRatio),
            });
          };

          // Main center explosion
          fire(0.25, {
            spread: 30,
            startVelocity: 55,
            colors: ['#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'],
          });
          fire(0.2, {
            spread: 60,
            colors: ['#3b82f6', '#ec4899', '#f59e0b'],
          });
          fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            colors: ['#10b981', '#38bdf8', '#a855f7'],
          });
          fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
          });
          fire(0.1, {
            spread: 120,
            startVelocity: 45,
          });

          // Staggered side cannon bursts
          setTimeout(() => {
            confetti({
              particleCount: 45,
              angle: 60,
              spread: 55,
              origin: { x: 0.05, y: 0.7 },
              colors: ['#f59e0b', '#10b981', '#38bdf8'],
              disableForReducedMotion: true,
            });
          }, 250);

          setTimeout(() => {
            confetti({
              particleCount: 45,
              angle: 120,
              spread: 55,
              origin: { x: 0.95, y: 0.7 },
              colors: ['#ec4899', '#8b5cf6', '#10b981'],
              disableForReducedMotion: true,
            });
          }, 500);
        }
      }

      // Trigger enter transition for new question or final score card
      setTransitionState('enter');

      setTimeout(() => {
        setTransitionState('idle');
      }, 350);
    }, 220);
  };

  const handleRetry = () => {
    if (transitionState !== 'idle') return;
    playClickSound();

    setTransitionState('exit');

    setTimeout(() => {
      setCurrentIdx(0);
      setSelectedAnswers([]);
      setShowExplanation(false);
      setIsFinished(false);

      setTransitionState('enter');

      setTimeout(() => {
        setTransitionState('idle');
      }, 350);
    }, 220);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, ansIdx, qIdx) => {
      return ansIdx === QUIZ_QUESTIONS[qIdx].correctIndex ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const passed = score >= 4;

  const getTransitionClass = () => {
    if (transitionState === 'exit') return 'animate-question-exit gpu-layer';
    if (transitionState === 'enter') return 'animate-question-enter gpu-layer';
    return 'gpu-layer';
  };

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Quiz Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
          <HelpCircle className="w-7 h-7 text-amber-400" />
          <span>{t.sec8Title}</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">{t.sec8Sub}</p>
      </div>

      {!isFinished ? (
        <div className={`bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6 ${getTransitionClass()}`}>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{t.quizProgress.replace('{current}', String(currentIdx + 1)).replace('{total}', String(QUIZ_QUESTIONS.length))}</span>
            <div className="w-36 bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {lang === 'en' ? currentQ.questionEn : currentQ.questionKn}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {(lang === 'en' ? currentQ.optionsEn : currentQ.optionsKn).map((opt, oIdx) => {
              const hasSelected = showExplanation;
              const isChosen = selectedAnswers[currentIdx] === oIdx;
              const isCorrectOption = oIdx === currentQ.correctIndex;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800";
              if (hasSelected) {
                if (isCorrectOption) {
                  btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-300";
                } else if (isChosen) {
                  btnStyle = "bg-rose-500/20 border-rose-400 text-rose-300";
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={showExplanation || transitionState !== 'idle'}
                  onClick={() => handleOptionSelect(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border font-medium text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {hasSelected && (
                    isCorrectOption ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" /> :
                    (isChosen ? <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" /> : null)
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4 animate-fade-in">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-400">Explanation: </span>
                {lang === 'en' ? currentQ.explanationEn : currentQ.explanationKn}
              </p>
              <button
                disabled={transitionState !== 'idle'}
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition cursor-pointer"
              >
                {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'View Final Score'}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Score Card */
        <div className={`bg-slate-950 p-8 rounded-xl border border-slate-800 text-center space-y-6 ${getTransitionClass()}`}>
          <div className="w-20 h-20 mx-auto rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-xl">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">
              {t.quizScoreMsg.replace('{score}', String(score)).replace('{total}', String(QUIZ_QUESTIONS.length))}
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              {passed ? t.quizPassMsg : t.quizFailMsg}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              disabled={transitionState !== 'idle'}
              onClick={handleRetry}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retryBtn}</span>
            </button>

            {passed && (
              <a
                href="#certificate-section"
                onClick={() => {
                  playSuccessSound();
                  confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8'],
                    disableForReducedMotion: true,
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{t.unlockCertBtn}</span>
              </a>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
