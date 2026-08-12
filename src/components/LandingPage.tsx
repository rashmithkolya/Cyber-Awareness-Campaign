import React, { useState, useRef, useEffect } from 'react';
import { Language, UserData } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface LandingPageProps {
  lang: Language;
  onSubmit: (userData: UserData) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSubmit }) => {
  const [isEntering, setIsEntering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  // Parallax / Magnetic button coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Smooth mouse movement tracking across screen for atmospheric depth
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) / centerX;
      const y = (e.clientY - centerY) / centerY;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setBtnOffset({ x, y });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEntering) return;

    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);
    }

    playClickSound();
    setIsEntering(true);

    setTimeout(() => {
      onSubmit({ name: '' });
    }, 750);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden select-none font-sans">
      
      {/* Dynamic Atmospheric Parallax Ambient Orbs */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-indigo-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px] animate-orb-1" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-amber-400/8 rounded-full blur-[130px] animate-orb-2" />
      </div>

      {/* Floating Geometric Wireframes & Subtle Lighting Nodes */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out z-0"
        style={{
          transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
        }}
      >
        <div className="absolute top-1/4 left-1/5 w-16 h-16 border border-amber-400/10 rounded-2xl rotate-45 animate-float" />
        <div className="absolute bottom-1/4 right-1/5 w-24 h-24 border border-cyan-400/10 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 border border-purple-400/10 rotate-12 animate-pulse" />
      </div>

      {/* Central Focal Node with One Single Centered Button */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Breathing Halo Effect behind button */}
        <div 
          className={`absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-400/15 to-purple-500/20 blur-3xl transition-all duration-700 ${
            isEntering ? 'scale-150 opacity-90' : 'scale-100 opacity-60 animate-pulse'
          }`} 
        />

        {/* The One Centered CTA Button */}
        <button
          ref={btnRef}
          type="button"
          disabled={isEntering}
          onClick={handleClick}
          onMouseMove={handleBtnMouseMove}
          onMouseLeave={handleBtnMouseLeave}
          style={{
            transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0) scale(${isEntering ? 0.96 : 1})`,
            transition: btnOffset.x === 0 && btnOffset.y === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
          className="relative group px-10 py-5 sm:px-14 sm:py-6 rounded-full bg-slate-900/80 backdrop-blur-2xl border border-amber-400/30 hover:border-amber-400/80 text-white font-extrabold text-sm sm:text-base tracking-[0.3em] uppercase shadow-[0_0_50px_rgba(245,158,11,0.15)] hover:shadow-[0_0_80px_rgba(245,158,11,0.35)] transition-all duration-300 cursor-pointer overflow-hidden flex items-center space-x-3 group active:scale-95"
        >
          {/* Subtle Shimmer Ray */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Click Ripples */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
              }}
              className="absolute w-3 h-3 -ml-1.5 -mt-1.5 bg-amber-300/60 rounded-full animate-ping pointer-events-none"
            />
          ))}

          {isEntering ? (
            <div className="flex items-center space-x-3">
              <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-amber-300 tracking-[0.35em]">Entering</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400/80 group-hover:text-amber-300 group-hover:rotate-12 transition-all duration-300" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent group-hover:to-amber-300">
                Discover
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400/80 group-hover:text-amber-300 group-hover:translate-x-1.5 transition-all duration-300" />
            </>
          )}
        </button>

      </div>

    </div>
  );
};

