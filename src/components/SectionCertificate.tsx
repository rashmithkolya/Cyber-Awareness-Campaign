import React, { useRef, useMemo } from 'react';
import { Language, UserData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Download, Printer, Award, CheckCircle2, Sparkles, Shield, QrCode, Building2, Terminal } from 'lucide-react';
import { playClickSound } from '../utils/sound';

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

  // Stable Certificate ID based on user name or fallback
  const certId = useMemo(() => {
    const raw = userData.name ? userData.name.toUpperCase() : 'STUDENT';
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

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const handleDownloadPng = async () => {
    playClickSound();

    try {
      const [gptImg, clubImg] = await Promise.all([
        loadImage('/gpt.svg'),
        loadImage('/club.svg'),
      ]);

      const canvas = document.createElement('canvas');
      const width = 2100;
      const height = 1485;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Clean Crisp White Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(0.5, '#fdfbf7');
      bgGrad.addColorStop(1, '#ffffff');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Outer Decorative Deep Navy Blue Border
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 14;
      ctx.strokeRect(45, 45, width - 90, height - 90);

      // Inner Royal Gold Accent Border
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4;
      ctx.strokeRect(62, 62, width - 124, height - 124);

      // Delicate Thin Inner Navy Frame
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(74, 74, width - 148, height - 148);

      // Corner Filigree Ornaments
      const drawCorner = (x: number, y: number, angle: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 45);
        ctx.lineTo(0, 0);
        ctx.lineTo(45, 0);
        ctx.stroke();
        ctx.restore();
      };
      drawCorner(88, 88, 0);
      drawCorner(width - 88, 88, 90);
      drawCorner(width - 88, height - 88, 180);
      drawCorner(88, height - 88, 270);

      // 3. Faint Cybersecurity Watermark in Center Background
      ctx.save();
      ctx.translate(width / 2, height / 2 + 30);
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(0, -180);
      ctx.lineTo(160, -110);
      ctx.lineTo(160, 60);
      ctx.quadraticCurveTo(160, 180, 0, 240);
      ctx.quadraticCurveTo(-160, 180, -160, 60);
      ctx.lineTo(-160, -110);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 20, 90, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // 4. Header Section: Logos & Titles
      // Left Logo: Government Polytechnic Bantwal (gpt.svg)
      ctx.drawImage(gptImg, 180, 120, 190, 190);

      // Right Logo: CSE Technical Club (club.svg)
      ctx.drawImage(clubImg, width - 370, 120, 190, 190);

      // Center Institution Header Text
      ctx.textAlign = 'center';

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 48px Georgia, serif';
      ctx.fillText('GOVERNMENT POLYTECHNIC BANTWAL', width / 2, 165);

      ctx.fillStyle = '#b45309';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('TECHNICAL CLUB', width / 2, 218);

      ctx.fillStyle = '#475569';
      ctx.font = '600 24px sans-serif';
      ctx.fillText('DEPARTMENT OF COMPUTER SCIENCE ENGINEERING (CSE)', width / 2, 260);

      // Decorative Horizontal Gold Line
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 480, 300);
      ctx.lineTo(width / 2 + 480, 300);
      ctx.stroke();

      // 5. Main Title: CERTIFICATE OF PARTICIPATION
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 72px Georgia, serif';
      ctx.fillText('CERTIFICATE OF PARTICIPATION', width / 2, 410);

      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 32px Georgia, serif';
      ctx.fillText('This is to certify that', width / 2, 490);

      // 6. Recipient Name
      ctx.fillStyle = '#1e3a8a';
      ctx.font = 'bold 92px Georgia, serif';
      ctx.fillText(participantName, width / 2, 620);

      // Underline Bar beneath Name
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 530, 660);
      ctx.lineTo(width / 2 + 530, 660);
      ctx.stroke();

      // 7. Participation Citation
      ctx.fillStyle = '#334155';
      ctx.font = '30px sans-serif';
      ctx.fillText('has actively participated in the Cyber Security Awareness Training,', width / 2, 755);
      ctx.fillText('Phishing Prevention Demonstration, and Scam Verification Assessment.', width / 2, 805);

      // 8. Quiz Score & Completion Badge (if passed)
      let currentY = 875;
      if (isUnlocked) {
        ctx.fillStyle = '#ecfdf5';
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (typeof (ctx as any).roundRect === 'function') {
          (ctx as any).roundRect(width / 2 - 360, currentY, 720, 64, 32);
        } else {
          ctx.rect(width / 2 - 360, currentY, 720, 64);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#047857';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('✓ Quiz Score: 100% • Verified Pass', width / 2, currentY + 42);

        currentY += 95;
      } else {
        currentY += 20;
      }

      // 9. Campaign Tagline Box
      ctx.fillStyle = '#fffbe2';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(width / 2 - 600, currentY, 1200, 80, 18);
      } else {
        ctx.rect(width / 2 - 600, currentY, 1200, 80);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#92400e';
      ctx.font = 'italic bold 34px Georgia, serif';
      ctx.fillText('“Think Before You Click. Verify Before You Trust.”', width / 2, currentY + 51);

      // 10. Provision Statement
      currentY += 130;
      ctx.fillStyle = '#1e293b';
      ctx.font = '600 25px sans-serif';
      ctx.fillText('Provided by Technical Club, Computer Science Engineering (CSE), Government Polytechnic Bantwal.', width / 2, currentY);

      // Separator Line
      currentY += 50;
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(180, currentY);
      ctx.lineTo(width - 180, currentY);
      ctx.stroke();

      // 11. Footer: Date & Certificate ID
      currentY += 65;
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 26px monospace';

      ctx.textAlign = 'left';
      ctx.fillText(`DATE: ${todayDate}`, 180, currentY);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#b45309';
      ctx.fillText(`STATUS: VERIFIED CREDENTIAL`, width / 2, currentY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#1e3a8a';
      ctx.fillText(`CERTIFICATE ID: ${certId}`, width - 180, currentY);

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
          className="min-w-[850px] max-w-5xl mx-auto bg-white text-slate-900 border-[12px] border-slate-900 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden text-center space-y-6 aspect-[297/210] flex flex-col justify-between"
        >
          {/* Inner Golden Accent Border Frame */}
          <div className="absolute inset-3 border-2 border-amber-600 pointer-events-none rounded-xl" />
          <div className="absolute inset-4 border border-slate-300 pointer-events-none rounded-lg" />

          {/* Corner Filigree Highlights */}
          <div className="absolute top-5 left-5 w-10 h-10 border-t-4 border-l-4 border-amber-600 pointer-events-none" />
          <div className="absolute top-5 right-5 w-10 h-10 border-t-4 border-r-4 border-amber-600 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-10 h-10 border-b-4 border-l-4 border-amber-600 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b-4 border-r-4 border-amber-600 pointer-events-none" />

          {/* Background Cybersecurity Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <Shield className="w-[450px] h-[450px] text-blue-900 stroke-[1]" />
          </div>

          {/* Top Header Row with Official Logos & Institutions */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between px-4 sm:px-8">
              {/* Left Logo: Government Polytechnic Bantwal */}
              <div className="flex items-center space-x-2">
                <img
                  src="/gpt.svg"
                  alt="Government Polytechnic Bantwal Emblem"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Center Institution Titles */}
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-3xl font-black font-serif text-slate-900 tracking-wide uppercase">
                  Government Polytechnic Bantwal
                </h3>
                <p className="text-xs sm:text-base font-mono font-bold text-amber-700 tracking-wider uppercase">
                  Technical Club
                </p>
                <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  Department of Computer Science Engineering (CSE)
                </p>
              </div>

              {/* Right Logo: CSE Technical Club */}
              <div className="flex items-center space-x-2">
                <img
                  src="/club.svg"
                  alt="CSE Technical Club Emblem"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="w-4/5 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
          </div>

          {/* Certificate Main Title & Recipient Section */}
          <div className="relative z-10 space-y-4 my-auto">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-wider text-slate-900 uppercase">
                Certificate of Participation
              </h1>
              <p className="text-sm sm:text-lg text-slate-500 font-serif italic">
                This is to certify that
              </p>
            </div>

            {/* Recipient Name */}
            <div className="py-2">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-blue-900 tracking-tight">
                {participantName}
              </h2>
              <div className="w-3/5 h-1.5 bg-amber-600 mx-auto mt-2 rounded-full" />
            </div>

            {/* Participation Citation Statement */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-sans px-4">
              has actively participated in the Cyber Security Awareness Training, Phishing Prevention Demonstration, and Scam Verification Assessment.
            </p>

            {/* Optional Quiz Score Badge */}
            {isUnlocked && (
              <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Quiz Score: 100% • Verified Pass</span>
              </div>
            )}

            {/* Campaign Tagline Box */}
            <div className="inline-block px-8 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-serif italic text-xs sm:text-base lg:text-lg font-semibold shadow-sm">
              “Think Before You Click. Verify Before You Trust.”
            </div>
          </div>

          {/* Provision & Verification Footer Section */}
          <div className="relative z-10 space-y-3 pt-3 border-t border-slate-200">
            {/* Explicit Provision Note */}
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Provided by Technical Club, Computer Science Engineering (CSE), Government Polytechnic Bantwal.
            </p>

            {/* Metadata Footer: Date, Verification ID */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-600 pt-1">
              <div className="flex items-center space-x-1">
                <span className="text-slate-400">Date:</span>
                <span className="font-bold text-slate-800">{todayDate}</span>
              </div>

              <div className="flex items-center space-x-1 text-amber-700 font-bold">
                <Shield className="w-4 h-4" />
                <span>Verified Credential</span>
              </div>

              <div className="flex items-center space-x-1 text-blue-900 font-bold">
                <QrCode className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Certificate ID:</span>
                <span className="font-extrabold">{certId}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Download & Print Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 no-print">
        <button
          onClick={handleDownloadPng}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center space-x-2 shadow-xl"
        >
          <Download className="w-5 h-5" />
          <span>Download Certificate (PNG)</span>
        </button>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
        >
          <Printer className="w-5 h-5" />
          <span>Print / Save PDF Certificate</span>
        </button>
      </div>

    </section>
  );
};
