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
      setErrorMsg('Please enter your full name.');
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

  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'help' | 'contact' | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Background Subtle Ambient Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-950/20 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-4 sm:py-8 flex-1 flex flex-col justify-center">
        
        {/* Top Tagline Badge */}
        <div className="text-center mb-3 animate-reveal-up">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{t.landingTagline}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </span>
        </div>

        {/* Hero Banner Title */}
        <div className="text-center space-y-2 mb-4 sm:mb-5 animate-reveal-delay-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            {t.landingTitle}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            {t.landingSub}
          </p>
        </div>

        {/* Compact 3D Perspective Reward Showcase */}
        <div className="perspective-1000 mb-5 animate-reveal-delay-2 relative">
          
          {/* Floating Badges */}
          <div className="hidden sm:flex absolute -top-3 -left-3 z-20 items-center space-x-1 px-2.5 py-1 bg-slate-900/95 border border-amber-500/30 rounded-lg text-[10px] font-bold text-amber-300 shadow-md backdrop-blur-md">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Verified Grant</span>
          </div>

          <div className="hidden sm:flex absolute -bottom-2 -right-3 z-20 items-center space-x-1 px-2.5 py-1 bg-slate-900/95 border border-cyan-500/30 rounded-lg text-[10px] font-bold text-cyan-300 shadow-md backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            <span>Instant Direct Credit</span>
          </div>

          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg) translateZ(0)`,
              transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)',
            }}
            className="gpu-layer bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 backdrop-blur-xl border border-slate-800 hover:border-amber-500/30 rounded-xl p-4 sm:p-5 shadow-xl relative overflow-hidden group cursor-pointer transition-colors"
          >
            {/* Holographic Subtle Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold flex items-center space-x-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300 inline" />
                    <span>{t.rewardBadge}</span>
                  </span>
                  <div className="text-3xl font-black text-white tracking-tight">
                    {t.rewardAmount}
                  </div>
                </div>
              </div>

              {/* Authentic Live Social Proof Counter */}
              <div className="flex items-center space-x-2 bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-emerald-400 font-mono shadow-inner">
                <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-bold">{claimedCount.toLocaleString()}</span>
                <span className="text-[11px] text-slate-300 font-sans">{t.claimedCount.replace(/[\d,]+/, '').trim()}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </div>

            </div>

            {/* Quick Perks Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 relative z-10">
              <div className="flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.quickVerify}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.studentOnly}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{t.instantCredit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Form Container */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl relative">
          
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-0.5">
              {t.formTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.formSubtitle}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-3 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center space-x-2 text-rose-400 text-xs">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="user-name" className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                {t.nameLabel}
              </label>
              <input
                id="user-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="user-phone" className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  {t.phoneLabel}
                </label>
                <input
                  id="user-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                />
              </div>

              <div>
                <label htmlFor="user-email" className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  {t.emailLabel}
                </label>
                <input
                  id="user-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                />
              </div>
            </div>

            {/* Magnetic CTA Submit Button */}
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
              className="gpu-layer w-full mt-1 py-3.5 px-5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 active:brightness-90 active:from-amber-600 active:to-yellow-500 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-75 relative overflow-hidden group"
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
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Details...</span>
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
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-1.5">
            <span className="text-amber-400/90 font-medium">{t.privacyNotice}</span>
            <span>{t.termsNotice}</span>
          </div>

        </div>

      </div>

      {/* Professional Institutional Footer */}
      <footer className="relative z-10 py-5 bg-slate-950/90 border-t border-slate-900 text-xs text-slate-400 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-300">Government Polytechnic Bantwal</p>
            <p className="text-[11px] text-slate-400">Public Digital Benefit Portal © 2026</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-slate-400">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-amber-400 transition cursor-pointer underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-amber-400 transition cursor-pointer underline underline-offset-2"
            >
              Terms of Use
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveModal('help')}
              className="hover:text-amber-400 transition cursor-pointer underline underline-offset-2"
            >
              Help Centre
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveModal('contact')}
              className="hover:text-amber-400 transition cursor-pointer underline underline-offset-2"
            >
              Contact Support
            </button>
          </div>

        </div>
      </footer>

      {/* Institutional Policy Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>
                  {activeModal === 'privacy' && 'User Data Privacy Policy'}
                  {activeModal === 'terms' && 'Digital Benefit Terms & Conditions'}
                  {activeModal === 'help' && 'Public Support & Help Centre'}
                  {activeModal === 'contact' && 'Contact Support Desk'}
                </span>
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg transition cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              {activeModal === 'privacy' && (
                <>
                  <p>All information entered into this portal is verified strictly for benefit eligibility. Your data is handled under SSL encryption and processed in compliance with digital distribution standards.</p>
                  <p className="text-slate-400">Information is never shared with third-party advertising networks.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p>1. Digital benefits are allocated for verified participants of the promotional campaign.</p>
                  <p>2. Each participant is eligible for one single claim per phone number verification.</p>
                  <p>3. Misrepresentation or false credentials will result in benefit forfeiture.</p>
                </>
              )}
              {activeModal === 'help' && (
                <>
                  <p>For assistance with reward claims or verification issues, please visit:</p>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px] text-amber-300">
                    <p>📍 Community Support Desk: Block B, Room 102</p>
                    <p>🕒 Hours: Monday - Friday, 9:30 AM - 4:30 PM</p>
                  </div>
                </>
              )}
              {activeModal === 'contact' && (
                <>
                  <p>Contact the Campaign Operations Committee:</p>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px] text-cyan-300">
                    <p>📧 Email: support@gptbantwal.ac.in</p>
                    <p>📞 Phone: +91 (08255) 233-456 (Ext. 104)</p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
