import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
  UserCheck,
  Coins,
  ShieldAlert,
  Flame,
  Zap,
  HelpCircle,
  KeyRound,
  AlertTriangle,
  MessageSquare,
  Bot,
  Volume2,
  QrCode,
  Smartphone,
  Eye,
  Info,
  Check,
  Share2,
  Instagram,
  Heart,
  Home,
  ArrowDown
} from 'lucide-react';
import { playClickSound, playSuccessSound, playAlertSound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { SectionQuiz } from './SectionQuiz';
import { SectionCertificate } from './SectionCertificate';
import { FooterAndFeedback } from './FooterAndFeedback';

// Step transition motion variants optimized for performance & high-end cybersecurity portal feel
// Incorporates scaling circular mask clipPath animations for cyber-glitch portal entry/exit
const stepTransitionVariants: Record<number, {
  initial: any;
  animate: any;
  exit: any;
  transition: any;
  portalTag: string;
  portalColor: string;
}> = {
  1: {
    initial: { opacity: 0, scale: 0.88, y: 15, clipPath: 'circle(0% at 50% 50%)', filter: 'hue-rotate(60deg) brightness(1.5) blur(4px)' },
    animate: { opacity: 1, scale: 1, y: 0, clipPath: 'circle(150% at 50% 50%)', filter: 'hue-rotate(0deg) brightness(1) blur(0px)' },
    exit: { opacity: 0, scale: 1.08, clipPath: 'circle(0% at 50% 50%)', filter: 'brightness(2) blur(6px)' },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    portalTag: 'PORTAL_WARP :: STEP_01_PSYCHOLOGY',
    portalColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
  },
  2: {
    initial: { opacity: 0, rotateX: 20, scale: 0.88, clipPath: 'circle(0% at 50% 50%)', filter: 'contrast(1.3) blur(3px)' },
    animate: { opacity: 1, rotateX: 0, scale: 1, clipPath: 'circle(150% at 50% 50%)', filter: 'contrast(1) blur(0px)' },
    exit: { opacity: 0, rotateX: -20, scale: 0.95, clipPath: 'circle(0% at 50% 50%)', filter: 'blur(5px)' },
    transition: { duration: 0.38, ease: 'easeOut' },
    portalTag: 'PORTAL_WARP :: STEP_02_DECONSTRUCT_LURES',
    portalColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
  3: {
    initial: { opacity: 0, x: -35, clipPath: 'circle(0% at 50% 50%)', filter: 'brightness(1.5) blur(3px)' },
    animate: { opacity: 1, x: 0, clipPath: 'circle(150% at 50% 50%)', filter: 'brightness(1) blur(0px)' },
    exit: { opacity: 0, x: 35, clipPath: 'circle(0% at 50% 50%)', filter: 'blur(4px)' },
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
    portalTag: 'PORTAL_WARP :: STEP_03_DOMAIN_INSPECTOR',
    portalColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
  },
  4: {
    initial: { opacity: 0, scale: 0.82, clipPath: 'circle(0% at 50% 50%)', filter: 'contrast(1.4) blur(5px)' },
    animate: { opacity: 1, scale: 1, clipPath: 'circle(150% at 50% 50%)', filter: 'contrast(1) blur(0px)' },
    exit: { opacity: 0, scale: 0.92, clipPath: 'circle(0% at 50% 50%)', filter: 'blur(4px)' },
    transition: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] },
    portalTag: 'PORTAL_WARP :: STEP_04_UPI_PAYMENT_VAULT',
    portalColor: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
  },
  5: {
    initial: { opacity: 0, x: 45, skewX: -3, clipPath: 'circle(0% at 50% 50%)' },
    animate: { opacity: 1, x: 0, skewX: 0, clipPath: 'circle(150% at 50% 50%)' },
    exit: { opacity: 0, x: -45, skewX: 3, clipPath: 'circle(0% at 50% 50%)' },
    transition: { duration: 0.35, ease: 'easeOut' },
    portalTag: 'PORTAL_WARP :: STEP_05_WHATSAPP_SIMULATOR',
    portalColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
  6: {
    initial: { opacity: 0, scaleY: 0.85, clipPath: 'circle(0% at 50% 50%)', filter: 'hue-rotate(120deg) blur(4px)' },
    animate: { opacity: 1, scaleY: 1, clipPath: 'circle(150% at 50% 50%)', filter: 'hue-rotate(0deg) blur(0px)' },
    exit: { opacity: 0, scaleY: 0.9, clipPath: 'circle(0% at 50% 50%)', filter: 'blur(5px)' },
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
    portalTag: 'PORTAL_WARP :: STEP_06_AI_VOICE_CLONE',
    portalColor: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
  },
  7: {
    initial: { opacity: 0, y: -30, scale: 0.92, clipPath: 'circle(0% at 50% 50%)' },
    animate: { opacity: 1, y: 0, scale: 1, clipPath: 'circle(150% at 50% 50%)' },
    exit: { opacity: 0, y: 30, scale: 0.95, clipPath: 'circle(0% at 50% 50%)' },
    transition: { duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] },
    portalTag: 'PORTAL_WARP :: STEP_07_PASSWORD_CRACK_METER',
    portalColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
  },
  8: {
    initial: { opacity: 0, x: 50, scale: 0.9, clipPath: 'circle(0% at 50% 50%)' },
    animate: { opacity: 1, x: 0, scale: 1, clipPath: 'circle(150% at 50% 50%)' },
    exit: { opacity: 0, x: -50, scale: 0.9, clipPath: 'circle(0% at 50% 50%)' },
    transition: { duration: 0.35, ease: 'backOut' },
    portalTag: 'PORTAL_WARP :: STEP_08_GAMIFIED_QUIZ',
    portalColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
  },
  9: {
    initial: { opacity: 0, scale: 0.72, clipPath: 'circle(0% at 50% 50%)', filter: 'brightness(2) contrast(1.3) blur(6px)' },
    animate: { opacity: 1, scale: 1, clipPath: 'circle(150% at 50% 50%)', filter: 'brightness(1) contrast(1) blur(0px)' },
    exit: { opacity: 0, scale: 0.88, clipPath: 'circle(0% at 50% 50%)', filter: 'blur(6px)' },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    portalTag: 'PORTAL_WARP :: STEP_09_CERTIFICATE_100%',
    portalColor: 'text-amber-300 border-amber-400/60 bg-amber-500/20',
  },
  10: {
    initial: { opacity: 0, y: 35, scale: 0.9, clipPath: 'circle(0% at 50% 50%)', filter: 'blur(3px)' },
    animate: { opacity: 1, y: 0, scale: 1, clipPath: 'circle(150% at 50% 50%)', filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, scale: 0.95, clipPath: 'circle(0% at 50% 50%)' },
    transition: { duration: 0.38, ease: 'easeOut' },
    portalTag: 'PORTAL_WARP :: STEP_10_FEEDBACK_SHARE',
    portalColor: 'text-cyan-300 border-cyan-400/50 bg-cyan-500/15',
  },
};

interface AwarenessJourneyProps {
  lang: Language;
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
}

export const AwarenessJourney: React.FC<AwarenessJourneyProps> = ({
  lang,
  userData,
  onUpdateUserData,
}) => {
  const t = TRANSLATIONS[lang];

  // Mode: 'onboarding' (First Page Overview) or 'stepView' (Full-Screen Immersive Step View)
  const [viewMode, setViewMode] = useState<'onboarding' | 'stepView'>('onboarding');

  // Current Journey Step (1 to 10)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  // Step 1 State: Emotional Manipulation Classifier
  const [step1Flipped, setStep1Flipped] = useState<string[]>([]);

  // Step 2 State: Spot Red Flags Voucher
  const [step2FoundFlags, setStep2FoundFlags] = useState<string[]>([]);

  // Step 3 State: Phishing Domain Inspector
  const [step3Quarantined, setStep3Quarantined] = useState<string[]>([]);
  const [step3VerifiedSafe, setStep3VerifiedSafe] = useState<boolean>(false);

  // Step 4 State: UPI & QR Code Simulator
  const [step4UpiDecision, setStep4UpiDecision] = useState<'safe' | 'unsafe' | null>(null);
  const [step4QrDecision, setStep4QrDecision] = useState<'safe' | 'unsafe' | null>(null);

  // Step 5 State: WhatsApp Simulator
  const [step5ChatDecision, setStep5ChatDecision] = useState<number | null>(null);

  // Step 6 State: AI Voice & Codeword Keypad
  const [step6FilterActive, setStep6FilterActive] = useState<boolean>(false);
  const [step6Codeword, setStep6Codeword] = useState<string>('SHIELD2026');
  const [step6CodewordSaved, setStep6CodewordSaved] = useState<boolean>(false);

  // Step 7 State: Password & Defense Switchboard
  const [step7Password, setStep7Password] = useState<string>('');
  const [step7Toggles, setStep7Toggles] = useState<Record<string, boolean>>({
    mfa: true,
    wifi: true,
    privacy: true,
  });

  // Calculate Progress Percentage
  // Step 1: 10%, Step 2: 20%, Step 3: 30%, Step 4: 40%, Step 5: 50%, Step 6: 60%, Step 7: 70%, Step 8: 85%, Step 9: 100%, Step 10: 100%
  const getProgressPercentage = (step: number) => {
    switch (step) {
      case 1: return 10;
      case 2: return 20;
      case 3: return 30;
      case 4: return 40;
      case 5: return 50;
      case 6: return 60;
      case 7: return 70;
      case 8: return 85;
      case 9: return 100;
      case 10: return 100;
      default: return 10;
    }
  };

  const currentProgress = getProgressPercentage(currentStep);

  // Milestone confetti & sound effect when reaching key steps
  useEffect(() => {
    if (currentStep > maxUnlockedStep) {
      setMaxUnlockedStep(currentStep);

      if (currentStep === 9) {
        playSuccessSound();
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#38bdf8', '#a855f7'],
        });
      } else if (currentStep === 5 || currentStep === 8) {
        playSuccessSound();
      }
    }
  }, [currentStep, maxUnlockedStep]);

  // Handle Step Advance
  const startJourneyAt = (stepNum: number) => {
    playClickSound();
    setCurrentStep(stepNum);
    setViewMode('stepView');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (stepNum: number) => {
    if (stepNum < 1 || stepNum > 10) return;
    if (stepNum > maxUnlockedStep && stepNum > currentStep + 1) return;

    playClickSound();
    setCurrentStep(stepNum);
    setViewMode('stepView');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (currentStep < 10) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // 10 Steps Metadata
  const stepsList = [
    { num: 1, titleEn: "How Scammers Think", titleKn: "ವಂಚಕರ ಆಲೋಚನಾ ಶೈಲಿ", icon: Flame, desc: "Psychology of emotional manipulation & urgency traps." },
    { num: 2, titleEn: "Fake Rewards & Giveaways", titleKn: "ನಕಲಿ ಬಹುಮಾನ ಮತ್ತು ಕೊಡುಗೆಗಳು", icon: Coins, desc: "Spotting 3 red flags inside fake vouchers & rewards." },
    { num: 3, titleEn: "Phishing & Fake Websites", titleKn: "ಫಿಶಿಂಗ್ ಮತ್ತು ನಕಲಿ ವೆಬ್‌ಸೈಟ್‌ಗಳು", icon: Eye, desc: "Inspect domain spoofing & suspicious URL extensions." },
    { num: 4, titleEn: "OTP & Banking Scams", titleKn: "ಒಟಿಪಿ ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ವಂಚನೆಗಳು", icon: Smartphone, desc: "Interactive UPI Collect Request simulator & PIN safety." },
    { num: 5, titleEn: "Social Media & WhatsApp", titleKn: "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ವಂಚನೆಗಳು", icon: MessageSquare, desc: "WhatsApp emergency impersonation chat simulator." },
    { num: 6, titleEn: "AI Deepfakes & Voice", titleKn: "ಎಐ ಡೀಪ್‌ಫೇಕ್ ಮತ್ತು ಧ್ವನಿ", icon: Bot, desc: "AI audio cloning equalizer & family codeword protocol." },
    { num: 7, titleEn: "Passwords & Digital Safety", titleKn: "ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಸುರಕ್ಷತೆ", icon: KeyRound, desc: "Realtime password crack-time meter & safety switches." },
    { num: 8, titleEn: "Interactive Quiz Challenge", titleKn: "ಸವಾಲಿನ ಕ್ವಿಜ್", icon: HelpCircle, desc: "Gamified 5-question speed test to earn certificate." },
    { num: 9, titleEn: "Certificate Generation", titleKn: "ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ", icon: Award, desc: "Verified 100% complete Certificate of Participation." },
    { num: 10, titleEn: "Feedback & Share", titleKn: "ಅಭಿಪ್ರಾಯ ಹಂಚಿಕೊಳ್ಳಿ", icon: Share2, desc: "Share certificate on Instagram & submit student feedback." },
  ];

  // Helper for password entropy score
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
    return { score, label: 'Strong Passphrase 🛡️', time: '4,000+ years', color: 'bg-emerald-500' };
  };

  /* ======================================================================== */
  /* VIEW 1: FIRST PAGE ONBOARDING SCREEN (Shown ONCE at entry)              */
  /* ======================================================================== */
  if (viewMode === 'onboarding') {
    return (
      <div className="space-y-10 py-6 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Onboarding Hero Header */}
        <div className="text-center space-y-5 animate-reveal-up">
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-[0.2em] shadow-lg backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>OFFICIAL CYBERSECURITY AWARENESS CAMPAIGN</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              CYBER SECURITY AWARENESS & DIGITAL SAFETY JOURNEY
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A 10-Step Gamified Interactive Experience by Technical Club (CSE), Government Polytechnic Bantwal.
            </p>
          </div>
        </div>

        {/* Unified Welcome & Initiative Explanation Card */}
        <div className="bg-slate-900/95 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md animate-reveal-delay-1">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Heart className="w-6 h-6 fill-amber-500/30" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Welcome, <span className="text-amber-400">{userData?.name || 'Curious Explorer'}</span>!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Department of Computer Science & Engineering • GPT Bantwal
                </p>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 self-start sm:self-center">
              Digital Safety First
            </span>
          </div>

          {/* Initiative Explanation */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>About this Initiative:</strong> What started as an intriguing "Unknown Surprise" on our landing page was a hands-on cybersecurity demonstration showing how curiosity, mystery, and tempting offers lure everyday users into risky online clicks.
            </p>
            <p className="text-emerald-300 font-medium flex items-center space-x-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 inline" />
              <span>Rest assured: Zero personal information was collected on the landing page. Your session is 100% ethical and safe.</span>
            </p>
          </div>

          {/* 3-Step Path to Certificate */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Earn Your Verified Cyber Security Certificate in 3 Steps:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Step 01</span>
                <h4 className="text-xs font-bold text-white">Interactive Journey</h4>
                <p className="text-[11px] text-slate-400">Complete 7 interactive scam simulation scenarios.</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">Step 02</span>
                <h4 className="text-xs font-bold text-white">Pass 5-Q Quiz</h4>
                <p className="text-[11px] text-slate-400">Score 80%+ on the gamified challenge (Step 8).</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Step 03</span>
                <h4 className="text-xs font-bold text-white">100% Certificate</h4>
                <p className="text-[11px] text-slate-400">Download certificate & share on Instagram story!</p>
              </div>
            </div>
          </div>

          {/* Social Tagging Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs border-t border-slate-800/80">
            <div className="flex items-center space-x-2 text-slate-300">
              <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Instagram Handles:</span>
              <a
                href="https://www.instagram.com/gptbantwal/"
                target="_blank"
                rel="noreferrer"
                className="text-pink-400 hover:text-pink-300 font-mono font-bold hover:underline"
              >
                @gptbantwal
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="https://www.instagram.com/blackbyte_cs/"
                target="_blank"
                rel="noreferrer"
                className="text-pink-400 hover:text-pink-300 font-mono font-bold hover:underline"
              >
                @blackbyte_cs
              </a>
            </div>

            <button
              type="button"
              onClick={() => startJourneyAt(9)}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold transition-all cursor-pointer active:scale-95 shadow-sm group"
            >
              <Award className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform shrink-0" />
              <span>Direct Certificate Fast-Track</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            </button>
          </div>
        </div>

        {/* Primary Start Journey Prominent CTA */}
        <div className="text-center py-2 animate-reveal-delay-2">
          <button
            type="button"
            onClick={() => startJourneyAt(1)}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center space-x-3 group ring-4 ring-amber-400/20"
          >
            <Flame className="w-5 h-5 text-slate-950 group-hover:scale-125 transition-transform" />
            <span>START INTERACTIVE JOURNEY (STEP 1 OF 10)</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    );
  }

  /* ======================================================================== */
  /* VIEW 2: FULL-SCREEN IMMERSIVE STEP WORKSPACE (Steps 1 to 10)            */
  /* ======================================================================== */
  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* ========================================== */}
      {/* PERSISTENT COMPACT STEP HEADER & PROGRESS */}
      {/* ========================================== */}
      <div className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-4 shadow-2xl space-y-3 transition-all">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode('onboarding');
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-400/50 text-xs font-mono font-bold flex items-center space-x-1.5 transition cursor-pointer shrink-0"
              title="Return to Onboarding Overview"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Overview</span>
            </button>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shrink-0">
              {currentStep < 10 ? `0${currentStep}` : currentStep}
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                STEP {currentStep} OF 10
              </span>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center space-x-2">
                <span>{lang === 'en' ? stepsList[currentStep - 1].titleEn : stepsList[currentStep - 1].titleKn}</span>
                {currentStep === 9 && <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />}
              </h2>
            </div>
          </div>

          {/* Progress Percentage Badge */}
          <div className="flex items-center space-x-2 self-start sm:self-center">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-black tracking-wider uppercase border shadow-md ${
              currentProgress === 100 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' 
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}>
              {currentProgress}% {currentProgress === 100 ? 'COMPLETE 🎉' : 'PROGRESS'}
            </span>
          </div>
        </div>

        {/* Animated Progress Bar Track */}
        <div className="space-y-1">
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-lg relative"
              style={{ width: `${currentProgress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full blur-[1px] animate-pulse" />
            </div>
          </div>

          {/* 10 Clickable Step Nodes */}
          <div className="hidden sm:flex items-center justify-between pt-1 px-1 text-[11px] font-mono">
            {stepsList.map((st) => {
              const isCurrent = st.num === currentStep;
              const isDone = st.num <= maxUnlockedStep;
              const isLocked = st.num > maxUnlockedStep && st.num > currentStep + 1;

              return (
                <button
                  key={st.num}
                  type="button"
                  disabled={isLocked}
                  onClick={() => goToStep(st.num)}
                  className={`flex flex-col items-center transition-all cursor-pointer ${
                    isCurrent ? 'scale-125' : 'hover:scale-110'
                  }`}
                  title={`${st.num}. ${st.titleEn}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                    isCurrent 
                      ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/20 font-black' 
                      : isDone 
                      ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50' 
                      : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}>
                    {isDone && !isCurrent ? '✓' : st.num}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* IMMERSIVE MODULE VIEWPORT */}
      {/* ========================================== */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[460px] relative overflow-hidden backdrop-blur-md transition-all">
        
        {/* Background Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={stepTransitionVariants[currentStep]?.initial || { opacity: 0, y: 20 }}
            animate={stepTransitionVariants[currentStep]?.animate || { opacity: 1, y: 0 }}
            exit={stepTransitionVariants[currentStep]?.exit || { opacity: 0, y: -20 }}
            transition={stepTransitionVariants[currentStep]?.transition || { duration: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
            className="space-y-8 relative z-10"
          >
            {/* Cyber Portal HUD Indicator Tag */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-[10px] font-mono tracking-widest uppercase">
              <span className={`px-2.5 py-1 rounded-full border font-bold flex items-center space-x-1.5 ${stepTransitionVariants[currentStep]?.portalColor}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                <span>{stepTransitionVariants[currentStep]?.portalTag}</span>
              </span>
              <span className="text-slate-500 hidden sm:inline-block">
                [CYBER_STATION_v2.6 :: DATA_PORTAL_ACTIVE]
              </span>
            </div>

            {/* ========================================== */}
            {/* STEP 1: HOOK - HOW SCAMMERS THINK */}
            {/* ========================================== */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-amber-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Flame className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #01 • PSYCHOLOGY CLASSIFIER
                      </span>
                      <h4 className="text-sm font-black text-white">Identify 4 Emotional Manipulation Traps</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-amber-300">
                      CHALLENGE: {step1Flipped.length} / 4 REVEALED
                    </div>
                    {step1Flipped.length === 4 && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                        <span>EMOTION SHIELD UNLOCKED</span>
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    How Scammers Think: Emotional Manipulation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    Scammers don't hack your phone's operating system — they hack human emotions. Tap all 4 trigger cards below to uncover how cybercriminals bypass logical evaluation!
                  </p>
                </div>

                {/* 4 Interactive Trigger Flip Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'urgency',
                      title: '🔥 Artificial Urgency',
                      subtitle: 'Panic & Time Pressure',
                      desc: '"Act now in 5 minutes or your account will be blocked!" forces split-second panic decisions before logic kicks in.',
                      icon: Clock,
                      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
                    },
                    {
                      id: 'authority',
                      title: '🏛️ Fake Authority',
                      subtitle: 'Police / College / Tax Officer',
                      desc: 'Impersonating police officers, college directors, or tax departments triggers instant compliance and fear of penalties.',
                      icon: UserCheck,
                      color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
                    },
                    {
                      id: 'greed',
                      title: '🎁 Unearned Rewards',
                      subtitle: 'Free Cash & iPhone Lures',
                      desc: 'Promising ₹500 instant cash or lottery wins triggers reward anticipation that overrides healthy skepticism.',
                      icon: Coins,
                      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
                    },
                    {
                      id: 'fear',
                      title: '⚠️ Panic & Security Threats',
                      subtitle: 'Fake Security Warnings',
                      desc: '"Unauthorized login detected!" induces fear, driving victims to tap malicious links to "fix" fake problems.',
                      icon: ShieldAlert,
                      color: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
                    },
                  ].map((card) => {
                    const isFlipped = step1Flipped.includes(card.id);
                    const IconComp = card.icon;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          if (!step1Flipped.includes(card.id)) {
                            const updated = [...step1Flipped, card.id];
                            setStep1Flipped(updated);
                            playSuccessSound();
                            if (updated.length === 4) {
                              confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
                            }
                          }
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                          isFlipped
                            ? 'bg-slate-950 border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                            : `${card.color} hover:scale-[1.02] active:scale-95`
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-xl ${card.color} shrink-0`}>
                              <IconComp className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-white text-sm sm:text-base">
                                {card.title}
                              </h4>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {card.subtitle}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-bold ${
                            isFlipped ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-amber-300'
                          }`}>
                            {isFlipped ? 'DISCOVERED ✓' : 'TAP TO INSPECT'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                          {card.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Victory Explanation */}
                {step1Flipped.length === 4 && (
                  <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl flex items-start space-x-3 text-emerald-300 text-xs sm:text-sm animate-reveal-up shadow-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>CHALLENGE PASSED:</strong> Scammers manipulate emotions like urgency, fear, and excitement to bypass critical evaluation. Always pause when you feel an emotional spike!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* STEP 2: FAKE REWARDS & GIVEAWAYS */}
            {/* ========================================== */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-emerald-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Coins className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #02 • VOUCHER LASER INSPECTOR
                      </span>
                      <h4 className="text-sm font-black text-white">Find All 3 Red Flags inside Fake Voucher</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-emerald-300">
                      RED FLAGS: {step2FoundFlags.length} / 3 FOUND
                    </div>
                    {step2FoundFlags.length === 3 && (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                        <span>LURE DECONSTRUCTOR BADGE</span>
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Fake Rewards & Giveaway Voucher Red Flags
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    The "Free ₹500 Reward" lure on WhatsApp is a classic trap. Tap all 3 hidden red flag zones on the voucher below!
                  </p>
                </div>

                {/* Spot 3 Red Flags Voucher Inspector */}
                <div className="bg-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-5 h-5 text-amber-400" />
                      <span className="font-black text-white text-sm sm:text-base">CONGRATULATIONS! ₹500 DIGITAL GRANT</span>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-bold">
                      Progress: {step2FoundFlags.length} / 3
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Flag 1: Fake URL */}
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        if (!step2FoundFlags.includes('url')) {
                          const updated = [...step2FoundFlags, 'url'];
                          setStep2FoundFlags(updated);
                          playSuccessSound();
                          if (updated.length === 3) {
                            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                          }
                        }
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        step2FoundFlags.includes('url')
                          ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/40'
                          : 'bg-slate-900 border-slate-800 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400 uppercase">RED FLAG #1</span>
                      <p className="font-mono text-xs text-rose-300 font-bold mt-1 break-all">
                        http://gpt-reward-grant-2026.xyz
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {step2FoundFlags.includes('url') ? '✓ Unregistered fake .xyz domain, not .ac.in!' : 'Tap to inspect URL'}
                      </p>
                    </button>

                    {/* Flag 2: Timer */}
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        if (!step2FoundFlags.includes('timer')) {
                          const updated = [...step2FoundFlags, 'timer'];
                          setStep2FoundFlags(updated);
                          playSuccessSound();
                          if (updated.length === 3) {
                            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                          }
                        }
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        step2FoundFlags.includes('timer')
                          ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/40'
                          : 'bg-slate-900 border-slate-800 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400 uppercase">RED FLAG #2</span>
                      <p className="font-extrabold text-xs text-amber-400 mt-1">
                        ⏰ EXPIRES IN 02 MIN 45 SEC!
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {step2FoundFlags.includes('timer') ? '✓ Artificial countdown creates fake urgency!' : 'Tap to inspect urgency'}
                      </p>
                    </button>

                    {/* Flag 3: Share Requirement */}
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        if (!step2FoundFlags.includes('share')) {
                          const updated = [...step2FoundFlags, 'share'];
                          setStep2FoundFlags(updated);
                          playSuccessSound();
                          if (updated.length === 3) {
                            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                          }
                        }
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        step2FoundFlags.includes('share')
                          ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/40'
                          : 'bg-slate-900 border-slate-800 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400 uppercase">RED FLAG #3</span>
                      <p className="font-bold text-xs text-cyan-300 mt-1">
                        📲 Share with 10 WhatsApp groups to claim!
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {step2FoundFlags.includes('share') ? '✓ Real government programs NEVER demand WhatsApp spam!' : 'Tap to inspect share requirement'}
                      </p>
                    </button>

                  </div>

                  {step2FoundFlags.length === 3 && (
                    <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-reveal-up shadow-xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>CHALLENGE PASSED: Official government and educational grants NEVER use cheap .xyz domains or demand WhatsApp spam shares!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* STEP 3: PHISHING & FAKE WEBSITES */}
            {/* ========================================== */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-cyan-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      <Eye className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #03 • DOMAIN SECURITY INSPECTOR
                      </span>
                      <h4 className="text-sm font-black text-white">Quarantine Phishing Sites & Verify Official Portal</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-cyan-300">
                      PROGRESS: {step3Quarantined.length + (step3VerifiedSafe ? 1 : 0)} / 3 CLASSIFIED
                    </div>
                    {step3Quarantined.length >= 2 && step3VerifiedSafe && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                        <span>DOMAIN MASTER BADGE</span>
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Phishing URL & Domain Extension Inspector
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    Inspect the 3 web links below. Quarantine the fake phishing clones and verify the single official government portal!
                  </p>
                </div>

                {/* 3 Domain Inspection Cards */}
                <div className="space-y-4">
                  {[
                    {
                      id: 'd1',
                      url: 'https://gptbantwal.ac.in/student-portal/login',
                      isGenuine: true,
                      ext: '.ac.in',
                      tag: 'OFFICIAL EDUCATIONAL PORTAL',
                      desc: 'Official Government Polytechnic Bantwal domain ending with .ac.in (Academic India).',
                    },
                    {
                      id: 'd2',
                      url: 'http://gpt-bantwal-login.xyz/scholarship/claim',
                      isGenuine: false,
                      ext: '.xyz',
                      tag: 'MALICIOUS PHISHING CLONE',
                      desc: 'Unregistered cheap .xyz domain bought to steal student login credentials.',
                    },
                    {
                      id: 'd3',
                      url: 'https://gptbantwal-verify.top/reward-grant',
                      isGenuine: false,
                      ext: '.top',
                      tag: 'MALICIOUS PHISHING CLONE',
                      desc: 'Typosquatted .top extension designed to trick fast-typing students.',
                    },
                  ].map((item) => {
                    const isQuarantined = step3Quarantined.includes(item.id);
                    const isVerified = item.isGenuine && step3VerifiedSafe;

                    return (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isVerified
                            ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-400/30'
                            : isQuarantined
                            ? 'bg-rose-950/60 border-rose-400 ring-2 ring-rose-400/30'
                            : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                              item.isGenuine ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                            }`}>
                              {item.tag}
                            </span>
                            <p className="font-mono text-sm sm:text-base font-bold text-white break-all">
                              {item.url}
                            </p>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                          </div>

                          <div className="shrink-0 space-x-2">
                            {item.isGenuine ? (
                              <button
                                type="button"
                                onClick={() => {
                                  playSuccessSound();
                                  setStep3VerifiedSafe(true);
                                  if (step3Quarantined.length >= 2) {
                                    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                                  }
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                                  isVerified
                                    ? 'bg-emerald-500 text-slate-950 shadow-lg'
                                    : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                                }`}
                              >
                                {isVerified ? 'VERIFIED OFFICIAL ✓' : 'VERIFY PORTAL (.ac.in)'}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  playClickSound();
                                  if (!step3Quarantined.includes(item.id)) {
                                    const updated = [...step3Quarantined, item.id];
                                    setStep3Quarantined(updated);
                                    playSuccessSound();
                                    if (updated.length >= 2 && step3VerifiedSafe) {
                                      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                                    }
                                  }
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                                  isQuarantined
                                    ? 'bg-rose-500 text-white shadow-lg'
                                    : 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30'
                                }`}
                              >
                                {isQuarantined ? 'QUARANTINED 🔒' : 'QUARANTINE PHISH'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {step3Quarantined.length >= 2 && step3VerifiedSafe && (
                  <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-reveal-up shadow-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>CHALLENGE PASSED: Official Indian educational portals exclusively use .ac.in or .gov.in domains. Never enter passwords on .xyz or .top sites!</span>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* STEP 4: OTP, UPI & BANKING SCAMS */}
            {/* ========================================== */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-rose-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      <Smartphone className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #04 • PAYMENT VAULT DEFENDER
                      </span>
                      <h4 className="text-sm font-black text-white">Defend Against UPI Collect & QR Traps</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-rose-300">
                      SCENARIOS: {(step4UpiDecision === 'safe' ? 1 : 0) + (step4QrDecision === 'safe' ? 1 : 0)} / 2 RESOLVED
                    </div>
                    {step4UpiDecision === 'safe' && step4QrDecision === 'safe' && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                        <span>UPI VAULT DEFENDER BADGE</span>
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    UPI Collect & QR Code Payment Traps
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    Golden Rule of UPI: <strong className="text-amber-400">Entering a UPI PIN or scanning a QR code is ALWAYS for SENDING money out!</strong> Resolve both payment scenarios safely below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Scenario 1: UPI Collect Request */}
                  <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">SCENARIO 1: UPI COLLECT REQUEST</span>
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl space-y-2 text-center border border-slate-800">
                      <p className="font-extrabold text-white text-sm">OLX Buyer "Rajesh Kumar"</p>
                      <p className="text-xs text-amber-300 font-mono">Requesting ₹5,000 via UPI Collect</p>
                      <p className="text-[11px] text-slate-400">"Enter UPI PIN to accept ₹5,000 credit into account"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playAlertSound();
                          setStep4UpiDecision('unsafe');
                        }}
                        className={`p-3 rounded-xl border font-bold text-xs transition cursor-pointer ${
                          step4UpiDecision === 'unsafe'
                            ? 'bg-rose-500/30 border-rose-400 text-rose-300 ring-2 ring-rose-400/40'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-500/40'
                        }`}
                      >
                        ENTER UPI PIN
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playSuccessSound();
                          setStep4UpiDecision('safe');
                          if (step4QrDecision === 'safe') {
                            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                          }
                        }}
                        className={`p-3 rounded-xl border font-bold text-xs transition cursor-pointer ${
                          step4UpiDecision === 'safe'
                            ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40'
                            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        REJECT & REPORT
                      </button>
                    </div>

                    {step4UpiDecision === 'unsafe' && (
                      <p className="text-xs text-rose-300 font-bold p-2 bg-rose-500/10 rounded-xl border border-rose-500/30">
                        ❌ SCAM ALERT! Entering a PIN debits ₹5,000 from your account!
                      </p>
                    )}
                    {step4UpiDecision === 'safe' && (
                      <p className="text-xs text-emerald-300 font-bold p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                        ✓ CORRECT! You protected your account balance.
                      </p>
                    )}
                  </div>

                  {/* Scenario 2: QR Code Scan Trap */}
                  <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">SCENARIO 2: QR CODE PAYMENT TRAP</span>
                      <QrCode className="w-4 h-4 text-cyan-400" />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl space-y-2 text-center border border-slate-800">
                      <p className="font-extrabold text-white text-sm">Stranger at Bus Stand</p>
                      <p className="text-xs text-cyan-300 font-mono">Presents QR Code on Mobile</p>
                      <p className="text-[11px] text-slate-400">"Scan this QR code to accept ₹1,000 cash reward!"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playAlertSound();
                          setStep4QrDecision('unsafe');
                        }}
                        className={`p-3 rounded-xl border font-bold text-xs transition cursor-pointer ${
                          step4QrDecision === 'unsafe'
                            ? 'bg-rose-500/30 border-rose-400 text-rose-300 ring-2 ring-rose-400/40'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-500/40'
                        }`}
                      >
                        SCAN QR CODE
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playSuccessSound();
                          setStep4QrDecision('safe');
                          if (step4UpiDecision === 'safe') {
                            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                          }
                        }}
                        className={`p-3 rounded-xl border font-bold text-xs transition cursor-pointer ${
                          step4QrDecision === 'safe'
                            ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40'
                            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        REFUSE SCAN
                      </button>
                    </div>

                    {step4QrDecision === 'unsafe' && (
                      <p className="text-xs text-rose-300 font-bold p-2 bg-rose-500/10 rounded-xl border border-rose-500/30">
                        ❌ SCAM ALERT! Scanning QR codes is strictly for paying out money, never for receiving!
                      </p>
                    )}
                    {step4QrDecision === 'safe' && (
                      <p className="text-xs text-emerald-300 font-bold p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                        ✓ CORRECT! You avoided a QR code payment scam.
                      </p>
                    )}
                  </div>
                </div>

                {step4UpiDecision === 'safe' && step4QrDecision === 'safe' && (
                  <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-reveal-up shadow-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>CHALLENGE PASSED: Entering a UPI PIN or scanning a QR code ALWAYS sends money out of your bank account. You never enter a PIN to receive money!</span>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* STEP 5: SOCIAL MEDIA & WHATSAPP SCAMS */}
            {/* ========================================== */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-emerald-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <MessageSquare className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #05 • WHATSAPP IMPERSONATION CHAT
                      </span>
                      <h4 className="text-sm font-black text-white">Navigate Emergency Impersonation Chat</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-emerald-300">
                      STATUS: {step5ChatDecision === 3 ? 'IDENTITY VERIFIED ✓' : 'ACTION NEEDED'}
                    </div>
                    {step5ChatDecision === 3 && (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                        <span>WHATSAPP SHIELD BADGE</span>
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    WhatsApp Emergency Impersonation Scams
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    Scammers copy friend profile photos to send urgent emergency messages. Choose the correct response below!
                  </p>
                </div>

                {/* WhatsApp Chat Simulator */}
                <div className="max-w-md mx-auto bg-slate-950 border-4 border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="bg-emerald-950/80 p-3 rounded-2xl border border-emerald-500/30 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center font-extrabold text-emerald-300 text-sm">
                      R
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Unknown Number (+91 98765...)</h4>
                      <p className="text-[10px] text-emerald-400 font-mono">online • Profile pic of Rahul</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs sm:text-sm text-slate-200">
                    <p className="font-bold text-amber-400 text-xs">Rahul (Classmate):</p>
                    <p className="leading-relaxed">
                      "Hey! I lost my phone and wallet at the bus station. I'm using a stranger's phone right now. Urgent! Can you GPay me ₹2,000 for a ticket? I will return it tonight!"
                    </p>
                    <span className="text-[10px] text-slate-500 block text-right font-mono">10:42 AM • Delivered</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {[
                      { id: 1, text: "A. Send ₹2,000 immediately to help your friend.", isSafe: false, feedback: "❌ UNSAFE: Scammers frequently hijack accounts or fake friend profiles to steal money!" },
                      { id: 2, text: "B. Ask for their bank account details.", isSafe: false, feedback: "❌ UNSAFE: Bank details provided will belong to the scammer's mule account." },
                      { id: 3, text: "C. Call Rahul's original phone number or ask a private personal question first!", isSafe: true, feedback: "✅ CORRECT: Always verify emergency money requests via a direct voice call to their primary number!" },
                    ].map((opt) => {
                      const isSelected = step5ChatDecision === opt.id;

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setStep5ChatDecision(opt.id);
                            if (opt.isSafe) {
                              playSuccessSound();
                              confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
                            } else {
                              playAlertSound();
                            }
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition cursor-pointer ${
                            isSelected
                              ? opt.isSafe
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30'
                                : 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400/30'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <p>{opt.text}</p>
                          {isSelected && (
                            <p className={`mt-2 text-xs font-bold pt-2 border-t border-slate-800 ${opt.isSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {opt.feedback}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {step5ChatDecision === 3 && (
                  <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-reveal-up shadow-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>CHALLENGE PASSED: Never send money to anyone claiming an emergency over messaging apps without speaking directly on a voice call first!</span>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* STEP 6: AI DEEPFAKES & VOICE SCAMS */}
            {/* ========================================== */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-purple-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      <Bot className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #06 • DEEPFAKE VOICE & CODEWORD VAULT
                      </span>
                      <h4 className="text-sm font-black text-white">Detect AI Audio Glitches & Lock Family Codeword</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-purple-300">
                      STATUS: {step6CodewordSaved ? 'CODEWORD LOCKED 🔒' : 'CODEWORD PENDING'}
                    </div>
                    {step6CodewordSaved && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                        <span>DEEPFAKE DEFENDER BADGE</span>
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    AI Voice Cloning & Deepfake Scams
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    Modern AI can clone voices using a 3-second social clip. Toggle the audio filter and set up your family's secret 1-word codeword!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Module A: Voice Equalizer */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-white text-sm flex items-center space-x-2">
                        <Volume2 className="w-4 h-4 text-purple-400" />
                        <span>AI Synthetic Audio Inspector</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setStep6FilterActive(!step6FilterActive);
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border transition cursor-pointer ${
                          step6FilterActive
                            ? 'bg-purple-500 text-white border-purple-400'
                            : 'bg-slate-900 text-purple-300 border-slate-800 hover:border-purple-500'
                        }`}
                      >
                        {step6FilterActive ? 'FILTER ACTIVE ✓' : 'TOGGLE AI FILTER'}
                      </button>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Frequency Analysis</span>
                        <span className="text-purple-400 font-bold">
                          {step6FilterActive ? 'SYNTHETIC ARTIFACTS DETECTED' : 'ANALYZING AUDIO...'}
                        </span>
                      </div>
                      <div className="flex items-center justify-center space-x-1.5 h-12 bg-slate-950 rounded-xl p-2 border border-slate-800">
                        {[40, 70, 25, 90, 60, 30, 85, 45, 95, 20, 65, 80, 35, 90, 50].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1.5 rounded-full transition-all duration-300 ${
                              step6FilterActive
                                ? 'bg-gradient-to-t from-rose-500 via-purple-400 to-amber-300 animate-bounce'
                                : 'bg-slate-700'
                            }`}
                            style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                      <p className="font-bold text-amber-400">AI Voice Glitch Indicators:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                        <li>Unnatural robotic cadence or missing natural breath pauses</li>
                        <li>Unusually quiet background noise or flat room tone</li>
                      </ul>
                    </div>
                  </div>

                  {/* Module B: Cyber Codeword Keypad */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
                    <h4 className="font-extrabold text-white text-sm flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-emerald-400" />
                      <span>Family Emergency Codeword Vault</span>
                    </h4>

                    <div className="space-y-3">
                      <label className="text-xs text-slate-400 block">Enter 1-Word Secret Family Codeword:</label>
                      <input
                        type="text"
                        value={step6Codeword}
                        onChange={(e) => setStep6Codeword(e.target.value.toUpperCase())}
                        placeholder="e.g. MANGO2026"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm uppercase focus:outline-none focus:border-purple-400"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          playSuccessSound();
                          setStep6CodewordSaved(true);
                          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
                        }}
                        className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition cursor-pointer ${
                          step6CodewordSaved
                            ? 'bg-emerald-500 text-slate-950 shadow-lg'
                            : 'bg-purple-600 hover:bg-purple-500 text-white'
                        }`}
                      >
                        {step6CodewordSaved ? 'CODEWORD LOCKED IN VAULT 🔒' : 'SAVE FAMILY CODEWORD'}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      If anyone calls claiming a family emergency, ask for this secret codeword. AI clones cannot guess private offline family words!
                    </p>
                  </div>
                </div>

                {step6CodewordSaved && (
                  <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-reveal-up shadow-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>CHALLENGE PASSED: A secret 1-word family codeword renders AI voice cloning completely useless during panic calls!</span>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* STEP 7: PASSWORDS, PRIVACY & SAFETY */}
            {/* ========================================== */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-reveal-up relative z-10">
                {/* Mini-Game HUD Header */}
                <div className="p-4 bg-slate-950 border-2 border-cyan-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      <KeyRound className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                        MINI-GAME #07 • SUPERCOMPUTER CRACK METER
                      </span>
                      <h4 className="text-sm font-black text-white">Test Passphrase Strength & Activate Defense Switches</h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-cyan-300">
                      DEFENSE LEVEL: 100% MAXIMUM
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1 animate-bounce">
                      <span>CYBER FORTRESS BADGE</span>
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Realtime Password Strength & Defense Switchboard
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    Test how fast supercomputers crack passwords and toggle your essential digital defense switches!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password Strength Meter */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
                    <h4 className="font-extrabold text-white text-sm flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Supercomputer Crack-Time Meter</span>
                    </h4>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={step7Password}
                        onChange={(e) => setStep7Password(e.target.value)}
                        placeholder="Type password (e.g. coffee-blue-elephant-sunset)"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                      />

                      {/* Presets */}
                      <div className="flex flex-wrap gap-1.5">
                        {['123456', 'Rahul@2026', 'coffee-blue-elephant-sunset'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setStep7Password(preset);
                            }}
                            className="text-[10px] font-mono px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 rounded-lg cursor-pointer"
                          >
                            TRY: {preset.substring(0, 12)}...
                          </button>
                        ))}
                      </div>

                      {(() => {
                        const passRes = getPasswordEntropyScore(step7Password);
                        return (
                          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-400 font-mono">Crack Time:</span>
                              <span className="font-bold text-white font-mono">{passRes.time}</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${passRes.color}`}
                                style={{ width: `${Math.max(passRes.score, 5)}%` }}
                              />
                            </div>
                            <div className="text-[11px] font-bold text-amber-300 text-right">
                              Rating: {passRes.label}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Defense Switchboard */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
                    <h4 className="font-extrabold text-white text-sm flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Essential Defense Switchboard</span>
                    </h4>

                    <div className="space-y-3">
                      {[
                        { key: 'mfa', label: 'Two-Factor Authentication (2FA)', desc: 'Blocks 99.9% of automated account attacks.' },
                        { key: 'wifi', label: 'Avoid Unsecured Public Wi-Fi', desc: 'Prevents man-in-the-middle packet sniffing.' },
                        { key: 'privacy', label: 'Lock Social Profile Privacy', desc: 'Prevents scammers from scraping personal info.' },
                      ].map((sw) => {
                        const isVal = step7Toggles[sw.key];

                        return (
                          <div key={sw.key} className="flex items-center justify-between p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                            <div>
                              <h5 className="font-bold text-white text-xs">{sw.label}</h5>
                              <p className="text-[11px] text-slate-400">{sw.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                playClickSound();
                                setStep7Toggles(prev => ({ ...prev, [sw.key]: !prev[sw.key] }));
                              }}
                              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                                isVal ? 'bg-emerald-500' : 'bg-slate-800'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                                isVal ? 'translate-x-6' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-cyan-500/15 border-2 border-cyan-500/40 rounded-2xl text-cyan-300 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-reveal-up shadow-xl">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>CHALLENGE PASSED: A 4-word passphrase like coffee-blue-elephant-sunset takes thousands of years to crack and is super easy to remember!</span>
                </div>
              </div>
            )}

        {/* ========================================== */}
        {/* STEP 8: GAMIFIED QUIZ CHALLENGE */}
        {/* ========================================== */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-reveal-up relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>STEP 08 • SPEED QUIZ CHALLENGE</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Cyber Awareness Quiz Challenge
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                Test your knowledge across 5 scenario questions. Score 80%+ to unlock your official Certificate of Participation!
              </p>
            </div>

            {/* Embedded Gamified SectionQuiz Component */}
            <SectionQuiz
              lang={lang}
              onQuizPassed={() => {
                setQuizPassed(true);
                playSuccessSound();
              }}
            />
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 9: CERTIFICATE GENERATION (100% MILESTONE) */}
        {/* ========================================== */}
        {currentStep === 9 && (
          <div className="space-y-6 animate-reveal-up relative z-10">
            {/* Milestone Celebration Banner */}
            <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 border-2 border-amber-400/60 rounded-3xl p-6 text-center space-y-3 shadow-2xl relative overflow-hidden">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-widest shadow-lg">
                <Award className="w-4 h-4 text-slate-950" />
                <span>100% JOURNEY COMPLETE</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Official Certificate of Participation
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Congratulations on completing the Cyber Security Awareness Journey! Enter your name below to instantly issue and download your official digitally verified certificate.
              </p>
            </div>

            {/* Embedded SectionCertificate Generator */}
            <SectionCertificate
              lang={lang}
              userData={userData}
              isUnlocked={true}
              onUpdateUserData={onUpdateUserData}
            />
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 10: FEEDBACK & SHARE */}
        {/* ========================================== */}
        {currentStep === 10 && (
          <div className="space-y-6 animate-reveal-up relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest">
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>STEP 10 • FEEDBACK & COMMUNITY SPREAD</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Share Your Achievement & Feedback
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                Thank you for being a responsible digital citizen! Help us reach more students by sharing your certificate on Instagram and submitting your feedback below.
              </p>
            </div>

            {/* Embedded FooterAndFeedback Component */}
            <FooterAndFeedback lang={lang} />
          </div>
        )}

          </motion.div>
        </AnimatePresence>

      </div>

      {/* ========================================== */}
      {/* FLOATING / FIXED BOTTOM NAVIGATION CONTROL BAR */}
      {/* ========================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={handlePrevStep}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-2 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>PREVIOUS STEP</span>
        </button>

        <div className="text-xs font-mono text-slate-400 text-center">
          Step {currentStep} of 10
        </div>

        {currentStep < 10 && (
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center space-x-2.5 group"
          >
            <span>
              {currentStep === 8 && !quizPassed
                ? 'SKIP TO CERTIFICATE (100%) →'
                : `CONTINUE TO STEP 0${currentStep + 1} →`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

    </div>
  );
};
