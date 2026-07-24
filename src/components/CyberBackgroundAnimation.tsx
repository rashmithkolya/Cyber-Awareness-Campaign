import React, { useMemo } from 'react';
import { AppStage } from '../types';
import { LandingBackgroundCanvas } from './LandingBackgroundCanvas';
import { AwarenessBackgroundCanvas } from './AwarenessBackgroundCanvas';

interface CyberBackgroundAnimationProps {
  appStage?: AppStage;
}

interface FloatingToken {
  id: number;
  text: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  color: string;
}

export const CyberBackgroundAnimation: React.FC<CyberBackgroundAnimationProps> = ({
  appStage = 'landing'
}) => {
  const isLanding = appStage === 'landing' || appStage === 'reveal';

  // Floating tokens for landing / reveal page only
  const tokens: FloatingToken[] = useMemo(() => {
    if (!isLanding) return [];

    const items = ['⚡', '🔒', '💎', '0x7F', 'CSE', 'GPT', '100%'];
    const colors = ['text-amber-400', 'text-cyan-400', 'text-purple-400', 'text-emerald-400'];

    return Array.from({ length: 16 }).map((_, index) => ({
      id: index,
      text: items[Math.floor(Math.random() * items.length)],
      left: Math.floor(Math.random() * 92) + 4,
      duration: Math.floor(Math.random() * 10) + 12,
      delay: Math.floor(Math.random() * 10),
      size: Math.floor(Math.random() * 6) + 12,
      opacity: Math.random() * 0.25 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [isLanding]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 no-print" aria-hidden="true">
      {/* 1. GPU Accelerated High-FPS Canvas Background System */}
      {isLanding ? <LandingBackgroundCanvas /> : <AwarenessBackgroundCanvas />}

      {/* 2. Glassmorphism Accent Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {isLanding ? (
          <>
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-500/10 to-purple-600/10 rounded-full blur-3xl animate-orb-1" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-orb-2" />
          </>
        ) : (
          <>
            <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-600/6 rounded-full blur-3xl animate-orb-3" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-emerald-600/6 rounded-full blur-3xl animate-orb-1" />
          </>
        )}
      </div>

      {/* 3. Floating Lightweight Ambient Tokens (Landing Page Only) */}
      {isLanding && tokens.map((p) => (
        <span
          key={p.id}
          className={`absolute font-mono font-bold select-none ${p.color} transition-all duration-700`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatParticleRise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
};
