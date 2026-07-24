import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, HOTSPOTS } from '../data/translations';
import { AlertTriangle, CheckCircle2, Info, Eye } from 'lucide-react';
import { playClickSound, playAlertSound } from '../utils/sound';

interface SectionHotspotsProps {
  lang: Language;
}

export const SectionHotspots: React.FC<SectionHotspotsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedSpot, setSelectedSpot] = useState<string | null>(HOTSPOTS[0].id);
  const [discoveredSpots, setDiscoveredSpots] = useState<string[]>(['h1']);

  const handleSpotClick = (id: string) => {
    setSelectedSpot(id);
    if (!discoveredSpots.includes(id)) {
      setDiscoveredSpots(prev => [...prev, id]);
    }
    playClickSound();
  };

  const activeData = HOTSPOTS.find(h => h.id === selectedSpot);

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
            <span>{t.sec3Title}</span>
          </h2>
          <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
            Discovered: {discoveredSpots.length} / {HOTSPOTS.length}
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">{t.sec3Sub}</p>
      </div>

      {/* Simulated Email Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Email Mockup */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
          
          {/* Email Window Top Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 font-mono ml-2">Inbox — Phishing Email Simulation</span>
            </div>
            <Eye className="w-4 h-4 text-slate-500" />
          </div>

          {/* Email Content Body */}
          <div className="p-5 text-slate-200 space-y-4 text-xs sm:text-sm font-sans relative">
            
            {/* Hotspot 1: Sender */}
            <div
              onClick={() => handleSpotClick('h1')}
              className={`p-2.5 rounded-lg border transition cursor-pointer relative ${selectedSpot === 'h1' ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-400">From: </span>
                  <span className="text-rose-400 font-mono font-bold">GPT Support &lt;admin@gpt-reward-grant.xyz&gt;</span>
                </div>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">HOTSPOT #1</span>
              </div>
            </div>

            {/* Hotspot 2: Urgency Header */}
            <div
              onClick={() => handleSpotClick('h2')}
              className={`p-3 rounded-lg border transition cursor-pointer relative ${selectedSpot === 'h2' ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-amber-400 uppercase tracking-tight">
                  🚨 URGENT: YOUR ₹500 STUDENT GRANT EXPIRES IN 2 HOURS!
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono shrink-0">HOTSPOT #2</span>
              </div>
            </div>

            {/* Hotspot 3: Body & Greeting */}
            <div
              onClick={() => handleSpotClick('h3')}
              className={`p-3 rounded-lg border transition cursor-pointer relative ${selectedSpot === 'h3' ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
            >
              <p className="text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-300 underline">Dear Student,</span>
              </p>
              <p className="text-slate-300 leading-relaxed mt-2">
                Your ₹500 student digital grant from Government Polytechnic Bantwal is ready for disbursement. To complete verification, click the link below before time runs out.
              </p>
              <div className="mt-2 text-[10px] text-amber-300 font-mono">
                Click to inspect greeting red flag
              </div>
            </div>

            {/* Hotspot 4: Action Button */}
            <div
              onClick={() => handleSpotClick('h4')}
              className={`p-3 rounded-lg border transition cursor-pointer text-center relative ${selectedSpot === 'h4' ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs inline-block">
                CLAIM ₹500 NOW (bit.ly/claim-500)
              </div>
              <p className="text-[10px] text-rose-400 font-mono mt-2">
                HOTSPOT #4: Hidden shortened URL
              </p>
            </div>

          </div>

        </div>

        {/* Hotspot Analysis Panel */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold border-b border-slate-800 pb-3">
            <Info className="w-5 h-5" />
            <span>Red Flag Inspector Breakdown</span>
          </div>

          {activeData ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h4 className="text-base font-bold text-white">
                  {lang === 'en' ? activeData.titleEn : activeData.titleKn}
                </h4>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'en' ? activeData.descriptionEn : activeData.descriptionKn}
              </div>

              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-2 text-rose-400 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Always check URLs, domain names, and greetings before trusting links!</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Tap any hotspot on the simulated email to analyze it.</p>
          )}
        </div>

      </div>

    </section>
  );
};
