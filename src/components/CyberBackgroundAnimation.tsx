import React from 'react';
import { AppStage } from '../types';
import { LandingBackgroundCanvas } from './LandingBackgroundCanvas';
import { AwarenessBackgroundCanvas } from './AwarenessBackgroundCanvas';

interface CyberBackgroundAnimationProps {
  appStage?: AppStage;
}

export const CyberBackgroundAnimation: React.FC<CyberBackgroundAnimationProps> = ({
  appStage = 'landing'
}) => {
  const isLanding = appStage === 'landing' || appStage === 'reveal';

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
    </div>
  );
};
