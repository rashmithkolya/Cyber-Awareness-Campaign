import React, { useState, useEffect, useRef } from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Gift, Zap, ShieldCheck, ArrowRight, Sparkles, AlertCircle, Users, Award, Lock, CheckCircle2 } from 'lucide-react';
import { playClickSound, playAlertSound } from '../utils/sound';

interface LandingPageProps {
  lang: Language;
  onSubmit: (userData: UserData) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onSubmit }) => {
  const t = TRANSLATIONS[lang];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [claimedCount, setClaimedCount] = useState(89);
  const [errorMsg, setErrorMsg] = useState('');

  // Ripple Effects for CTA
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // 3D Tilt Card State (GPU translate/rotate)
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Magnetic Button State (GPU translate3d)
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Subtle live social proof ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setClaimedCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Card Mouse Move for 3D Tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 6; // Max 6deg
    const rotateX = -(y / (rect.height / 2)) * 6;
    setCardTilt({ rotateX, rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  // Magnetic CTA Mouse Move
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    setBtnOffset({ x, y });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  // Create CTA Ripple on Click
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      playAlertSound();
      setErrorMsg('Please enter your student name.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      playAlertSound();
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      playAlertSound();
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    playClickSound();
    setIsLoading(true);

    setTimeout(() => {
      onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/12 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        
        {/* Official Institutional Logo Showcase */}
        <div className="flex items-center justify-center mb-6 animate-reveal-up">
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-amber-500/30 shadow-xl shadow-amber-500/10 backdrop-blur-md group-hover:scale-105 group-hover:border-amber-400 transition duration-300">
              <img
                src="/gpt.svg"
                alt="Government Polytechnic Bantwal"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider text-center">
              Government Polytechnic Bantwal
            </span>
          </div>
        </div>

        {/* Top Tagline Badge */}
        <div className="text-center mb-6 animate-reveal-up">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-widest shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>{t.landingTagline}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
          </span>
        </div>

        {/* Hero Banner Title */}
        <div className="text-center space-y-4 mb-8 animate-reveal-delay-1">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
            {t.landingTitle}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            {t.landingSub}
          </p>
        </div>

        {/* 3D Perspective Interactive Reward Showcase */}
        <div className="perspective-1000 mb-8 animate-reveal-delay-2 relative">
          
          {/* Floating Celebratory Badges around card */}
          <div className="hidden md:flex absolute -top-4 -left-6 z-20 items-center space-x-1.5 px-3 py-1.5 bg-slate-900/90 border border-amber-500/40 rounded-xl text-[11px] font-bold text-amber-300 shadow-xl backdrop-blur-md animate-bounce">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Grant</span>
          </div>

          <div className="hidden md:flex absolute -bottom-3 -right-6 z-20 items-center space-x-1.5 px-3 py-1.5 bg-slate-900/90 border border-cyan-500/40 rounded-xl text-[11px] font-bold text-cyan-300 shadow-xl backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Instant Credit</span>
          </div>

          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg) translateZ(0)`,
              transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)',
            }}
            className="gpu-layer bg-gradient-to-r from-purple-900/70 via-slate-900/90 to-indigo-900/70 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group cursor-pointer"
          >
            {/* Holographic Light Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
                  <Gift className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-300 inline" />
                    <span>{t.rewardBadge}</span>
                  </span>
                  <div className="text-4xl font-black text-white tracking-tight">
                    {t.rewardAmount}
                  </div>
                </div>
              </div>

              {/* Animated Live Social Proof Counter */}
              <div className="flex items-center space-x-2.5 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800/80 text-xs text-emerald-400 font-mono shadow-inner backdrop-blur-md">
                <Users className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{claimedCount.toLocaleString()} {t.claimedCount.replace(/[\d,]+/, '')}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

            </div>

            {/* Quick Perks Bar */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 relative z-10">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.quickVerify}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.studentOnly}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{t.instantCredit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Form Container */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">
              {t.formTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.formSubtitle}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-2 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                />
              </div>
            </div>

            {/* Magnetic CTA Submit Button with Ripple Effect */}
            <button
              ref={btnRef}
              type="submit"
              disabled={isLoading}
              onClick={handleCtaClick}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              style={{
                transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                transition: btnOffset.x === 0 && btnOffset.y === 0 ? 'transform 0.3s ease-out' : 'none',
              }}
              className="gpu-layer w-full mt-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-75 relative overflow-hidden group"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              
              {/* Ripple circles */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  style={{
                    left: `${ripple.x}px`,
                    top: `${ripple.y}px`,
                  }}
                  className="absolute w-2 h-2 -ml-1 -mt-1 bg-white/40 rounded-full animate-ping pointer-events-none"
                />
              ))}

              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Student Portal...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">{t.claimBtn}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Safeguard Note */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span className="text-amber-400/90 font-medium">{t.privacyNotice}</span>
            <span>{t.termsNotice}</span>
          </div>

        </div>

      </div>

      {/* Footer Branding */}
      <div className="relative z-10 py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        Government Polytechnic Bantwal • Student Technical Club Demonstration
      </div>

    </div>
  );
};
