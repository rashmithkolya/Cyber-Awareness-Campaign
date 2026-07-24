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

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (optionIdx: number) => {
    if (showExplanation) return;
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
    playClickSound();
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
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRetry = () => {
    playClickSound();
    setCurrentIdx(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setIsFinished(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, ansIdx, qIdx) => {
      return ansIdx === QUIZ_QUESTIONS[qIdx].correctIndex ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const passed = score >= 4;

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
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          
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
                  disabled={showExplanation}
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
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition cursor-pointer"
              >
                {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'View Final Score'}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Score Card */
        <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center space-y-6 animate-fade-in">
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
              onClick={handleRetry}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retryBtn}</span>
            </button>

            {passed && (
              <a
                href="#certificate-section"
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
