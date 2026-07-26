import React, { useRef, useMemo, useState } from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Download, Award, CheckCircle2, Sparkles, Shield, Share2, Instagram, Copy, Check } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface SectionCertificateProps {
  lang: Language;
  userData: UserData;
  isUnlocked: boolean;
}

export const SectionCertificate: React.FC<SectionCertificateProps> = ({
  lang,
  userData,
  isUnlocked
}) => {
  const t = TRANSLATIONS[lang];
  const certRef = useRef<HTMLDivElement>(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCaption = () => {
    playSuccessSound();
    const captionText = `I completed the Cyber Security Awareness Training & Scam Prevention Assessment by @gptbantwal CSE Technical Club (@blackbyte_cs)! Certified digital safety awareness. 🛡️✨`;
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  const certId = useMemo(() => {
    const raw = userData.name ? userData.name.toUpperCase() : 'DIGITAL CITIZEN';
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const num = Math.abs(hash % 899999) + 100000;
    return `GPT-CS-${num}`;
  }, [userData.name]);

  const todayDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const participantName = userData.name ? userData.name.trim() : 'Valued Participant';

  const loadImage = async (src: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            // Fallback: direct src assignment without crossOrigin
            const fallbackImg = new Image();
            fallbackImg.onload = () => resolve(fallbackImg);
            fallbackImg.onerror = () => resolve(null);
            fallbackImg.src = src;
          };
          img.src = url;
        })
        .catch(() => {
          // Fallback: direct src assignment without crossOrigin
          const fallbackImg = new Image();
          fallbackImg.onload = () => resolve(fallbackImg);
          fallbackImg.onerror = () => resolve(null);
          fallbackImg.src = src;
        });
    });
  };

  const handleDownloadPng = async () => {
    playSuccessSound();

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8', '#a855f7'],
      disableForReducedMotion: true,
    });

    try {
      const [logo1Img, logo2Img] = await Promise.all([
        loadImage('./assets/images/logo-placeholder-1.png'),
        loadImage('./assets/images/logo-placeholder-2.png'),
      ]);

      // High-resolution A4 Landscape Canvas (2100 x 1485 px)
      const canvas = document.createElement('canvas');
      const width = 2100;
      const height = 1485;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Crisp Institutional Ivory Canvas Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(0.5, '#fdfcf7');
      bgGrad.addColorStop(1, '#ffffff');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Micro Security Lattice Grid Pattern Background
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.35;
      const step = 32;
      for (let x = -height; x < width + height; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x + height, 0);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Multi-line Frame: Heavy Deep Navy, Royal Gold Accent, Delicate Frame
      // Deep Navy Outer Border
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 16;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // Royal Gold Inner Filigree Accent Line
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 5;
      ctx.strokeRect(58, 58, width - 116, height - 116);

      // Delicate Thin Inner Parallel Slate Frame
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(70, 70, width - 140, height - 140);

      // Corner Filigree Ornaments
      const drawCorner = (x: number, y: number, angle: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);

        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 42);
        ctx.lineTo(0, 0);
        ctx.lineTo(42, 0);
        ctx.stroke();

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(10, 32);
        ctx.lineTo(10, 10);
        ctx.lineTo(32, 10);
        ctx.stroke();

        ctx.restore();
      };
      drawCorner(84, 84, 0);
      drawCorner(width - 84, 84, 90);
      drawCorner(width - 84, height - 84, 180);
      drawCorner(84, height - 84, 270);

      // 4. Faint Security Watermark Shield in Center
      ctx.save();
      ctx.translate(width / 2, height / 2 + 20);
      ctx.globalAlpha = 0.035;
      ctx.strokeStyle = '#0f172a';
      ctx.fillStyle = '#1e3a8a';
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(0, -200);
      ctx.lineTo(180, -125);
      ctx.lineTo(180, 65);
      ctx.quadraticCurveTo(180, 200, 0, 260);
      ctx.quadraticCurveTo(-180, 200, -180, 65);
      ctx.lineTo(-180, -125);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 20, 95, 0, Math.PI * 2);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();

      // 5. Header Section: Institutional Logos & Titles
      if (logo1Img) {
        ctx.drawImage(logo1Img, 130, 95, 210, 210);
      }
      if (logo2Img) {
        ctx.drawImage(logo2Img, width - 340, 95, 210, 210);
      }

      ctx.textAlign = 'center';

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 58px Georgia, serif';
      ctx.fillText('GOVERNMENT POLYTECHNIC BANTWAL', width / 2, 150);

      ctx.fillStyle = '#b45309';
      ctx.font = 'bold 32px monospace';
      ctx.fillText('TECHNICAL CLUB', width / 2, 210);

      ctx.fillStyle = '#475569';
      ctx.font = '600 26px sans-serif';
      ctx.fillText('DEPARTMENT OF COMPUTER SCIENCE ENGINEERING (CSE)', width / 2, 255);

      // Gold Horizontal Separator
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 650, 295);
      ctx.lineTo(width / 2 + 650, 295);
      ctx.stroke();

      // 6. Certificate Main Title
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 84px Georgia, serif';
      ctx.fillText('CERTIFICATE OF PARTICIPATION', width / 2, 420);

      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 38px Georgia, serif';
      ctx.fillText('This is to certify that', width / 2, 500);

      // 7. Recipient Name - Grand Display Typography
      ctx.fillStyle = '#1e3a8a';
      ctx.font = 'bold 112px Georgia, serif';
      ctx.fillText(participantName, width / 2, 660);

      // Gold Accent Bar under Recipient Name
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 680, 705);
      ctx.lineTo(width / 2 + 680, 705);
      ctx.stroke();

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 600, 720);
      ctx.lineTo(width / 2 + 600, 720);
      ctx.stroke();

      // 8. Achievement Description
      ctx.fillStyle = '#334155';
      ctx.font = '32px sans-serif';
      ctx.fillText('has actively completed the Cyber Security Awareness Training, Phishing Prevention Demonstration,', width / 2, 810);
      ctx.fillText('and Scam Verification Assessment conducted by the Department of Computer Science Engineering.', width / 2, 860);

      // 9. Campaign Motto Box
      let currentY = 930;
      ctx.fillStyle = '#fffbeb';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(width / 2 - 720, currentY, 1440, 95, 20);
      } else {
        ctx.rect(width / 2 - 720, currentY, 1440, 95);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#92400e';
      ctx.font = 'italic bold 38px Georgia, serif';
      ctx.fillText('“Think Before You Click. Verify Before You Trust.”', width / 2, currentY + 60);

      // 10. Provision Statement
      currentY = 1110;
      ctx.fillStyle = '#1e293b';
      ctx.font = '600 26px sans-serif';
      ctx.fillText('Provided by Technical Club, Computer Science Engineering (CSE), Government Polytechnic Bantwal.', width / 2, currentY);

      // Separator Line
      currentY = 1180;
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(130, currentY);
      ctx.lineTo(width - 130, currentY);
      ctx.stroke();

      // 11. Footer: Issue Date, Certificate ID, Verification Status
      currentY = 1260;
      ctx.font = 'bold 28px monospace';

      // Left: Issue Date
      ctx.textAlign = 'left';
      ctx.fillStyle = '#475569';
      ctx.fillText(`ISSUE DATE: ${todayDate}`, 130, currentY);

      // Center: Verification Status: Digitally Verified
      ctx.textAlign = 'center';
      ctx.fillStyle = '#047857';
      ctx.fillText(`VERIFICATION STATUS: DIGITALLY VERIFIED`, width / 2, currentY);

      // Right: Certificate ID
      ctx.textAlign = 'right';
      ctx.fillStyle = '#1e3a8a';
      ctx.fillText(`CERTIFICATE ID: ${certId}`, width - 130, currentY);

      // Download PNG
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Cyber_Security_Certificate_${participantName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export certificate image:', err);
    }
  };

  return (
    <section id="certificate-section" className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
      
      {/* Section Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
            <Award className="w-8 h-8 text-amber-400" />
            <span>{t.sec9Title}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">{t.sec9Sub}</p>
        </div>

        {isUnlocked ? (
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>QUIZ PASSED • CERTIFICATE UNLOCKED</span>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>PREVIEW MODE • PASS QUIZ TO UNLOCK</span>
          </span>
        )}
      </div>

      {!isUnlocked && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 text-xs sm:text-sm flex items-start space-x-3 no-print">
          <Sparkles className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <span className="font-bold">How to earn your official certificate: </span>
            <span>Complete the awareness topics above and pass the 5-question quiz with an 80%+ score. You can preview your Certificate of Participation below!</span>
          </div>
        </div>
      )}

      {/* Official A4 Landscape Certificate Display Container */}
      <div className="overflow-x-auto pb-4">
        <div
          id="certificate-frame"
          ref={certRef}
          className="min-w-[900px] max-w-6xl mx-auto bg-gradient-to-br from-white via-slate-50/70 to-amber-50/20 text-slate-900 border-[16px] border-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden text-center aspect-[297/210] flex flex-col justify-between"
        >
          {/* Subtle Security Lattice Pattern SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="security-lattice" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 20 L 40 20 M 20 0 L 20 40 M 0 0 L 40 40 M 0 40 L 40 0" fill="none" stroke="#0f172a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#security-lattice)" />
          </svg>

          {/* Inner Golden & Delicate Accent Border Frame */}
          <div className="absolute inset-3.5 border-2.5 border-amber-600 pointer-events-none rounded-2xl" />
          <div className="absolute inset-5 border border-slate-300 pointer-events-none rounded-xl" />

          {/* Corner Filigree Highlights */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-amber-600 pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-amber-600 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-amber-600 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-amber-600 pointer-events-none" />

          {/* Background Cybersecurity Watermark Shield */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Shield className="w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] text-blue-950 stroke-[0.75]" />
          </div>

          {/* Top Header Row with Logos & Institutions */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between px-4 sm:px-8">
              {/* Left Logo Placeholder */}
              <div className="flex items-center justify-center w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28">
                <img
                  src="./assets/images/logo-placeholder-1.png"
                  alt="Government Polytechnic Bantwal Logo"
                  className="w-full h-full object-contain drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Center Institution Titles */}
              <div className="text-center space-y-1 max-w-2xl mx-auto">
                <h3 className="text-lg sm:text-3xl lg:text-4xl font-black font-serif text-slate-900 tracking-wide uppercase">
                  Government Polytechnic Bantwal
                </h3>
                <p className="text-xs sm:text-base lg:text-lg font-mono font-bold text-amber-700 tracking-wider uppercase">
                  Technical Club
                </p>
                <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Department of Computer Science Engineering (CSE)
                </p>
              </div>

              {/* Right Logo Placeholder */}
              <div className="flex items-center justify-center w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28">
                <img
                  src="./assets/images/logo-placeholder-2.png"
                  alt="CSE Technical Club Logo"
                  className="w-full h-full object-contain drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="w-10/12 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
          </div>

          {/* Certificate Main Title & Recipient Section */}
          <div className="relative z-10 space-y-3 sm:space-y-4 lg:space-y-5 my-auto py-2">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-wider text-slate-900 uppercase">
                Certificate of Participation
              </h1>
              <p className="text-sm sm:text-xl lg:text-2xl text-slate-500 font-serif italic">
                This is to certify that
              </p>
            </div>

            {/* Recipient Name - Grand Display Typography */}
            <div className="py-1">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-blue-950 tracking-tight">
                {participantName}
              </h2>
              <div className="w-3/5 max-w-2xl h-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 mx-auto mt-2 rounded-full" />
            </div>

            {/* Achievement Description Statement */}
            <p className="text-xs sm:text-base lg:text-xl text-slate-700 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-sans px-4 font-medium">
              has actively completed the Cyber Security Awareness Training, Phishing Prevention Demonstration, and Scam Verification Assessment conducted by the Department of Computer Science Engineering.
            </p>

            {/* Campaign Tagline Box */}
            <div>
              <div className="inline-block px-8 sm:px-10 py-2.5 sm:py-3.5 rounded-2xl bg-amber-50/90 border-2 border-amber-300/80 text-amber-950 font-serif italic text-xs sm:text-lg lg:text-xl font-bold shadow-xs">
                “Think Before You Click. Verify Before You Trust.”
              </div>
            </div>

            {/* Explicit Provision Note */}
            <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-slate-700 pt-1">
              Provided by Technical Club, Computer Science Engineering (CSE), Government Polytechnic Bantwal.
            </p>
          </div>

          {/* Clean Digitally Verified Metadata Footer */}
          <div className="relative z-10 pt-3 border-t-2 border-slate-200/90">
            {/* Metadata Footer: Date, Verification ID, Digitally Verified Status */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm lg:text-base font-mono tracking-wider">
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="text-slate-500 font-semibold uppercase">Issue Date:</span>
                <span className="font-bold text-slate-900">{todayDate}</span>
              </div>

              <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verification Status: <strong className="text-emerald-700">Digitally Verified</strong></span>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <span className="text-slate-500 font-semibold uppercase">Certificate ID:</span>
                <span className="font-extrabold text-blue-950">{certId}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Download & Share Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 no-print">
        <button
          type="button"
          onClick={handleDownloadPng}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 active:from-emerald-600 active:to-cyan-600 active:brightness-90 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 transform hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Download className="w-4 h-4" />
          <span>Download Certificate (PNG)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setShowShareModal(true);
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:from-pink-700 active:to-purple-700 text-white font-bold text-xs sm:text-sm transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <Share2 className="w-4 h-4 text-pink-200" />
          <span>Share on Instagram</span>
        </button>
      </div>

      {/* Instagram Story Sharing Modal */}
      {showShareModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in no-print"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                <h3 id="share-modal-title" className="text-base font-bold text-white">
                  Share Your Certificate on Instagram
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-slate-800 rounded-lg transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Show your support for digital safety! Share your downloaded certificate image on Instagram Story and tag our official handles:
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Official Tags:</span>
                  <div className="flex items-center space-x-2">
                    <a
                      href="https://www.instagram.com/gptbantwal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:underline font-bold"
                    >
                      @gptbantwal
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href="https://www.instagram.com/blackbyte_cs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:underline font-bold"
                    >
                      @blackbyte_cs
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono text-xs text-amber-300 flex items-center justify-between gap-2">
                  <span className="truncate">
                    “I completed the Cyber Security Awareness Training by @gptbantwal CSE Technical Club (@blackbyte_cs)! 🛡️”
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCaption}
                    className="px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs shrink-0 flex items-center space-x-1 transition cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tip: Download your certificate image first using the button above, then add it to your Instagram Story!</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition cursor-pointer inline-flex items-center space-x-1.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Open Instagram App</span>
              </a>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
