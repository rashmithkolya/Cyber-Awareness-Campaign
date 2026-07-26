import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface GlassShape {
  x: number;
  y: number;
  z: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  type: 'polygon' | 'ring' | 'diamond';
  sides: number;
  color: string;
}

interface LightRay {
  angle: number;
  width: number;
  length: number;
  alpha: number;
  speed: number;
}

export const LandingBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Smooth Mouse Parallax State
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: isMobile ? 120 : 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let particles: Particle[] = [];
    let glassShapes: GlassShape[] = [];
    let lightRays: LightRay[] = [];

    const initScene = () => {
      // Limit DPR on mobile/low-end devices to conserve GPU buffer memory and pixel shading cycles
      const maxDpr = isMobile ? 1 : 1.5;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // 1. Ambient Sparkle Particles - Scaled down for mobile performance
      const baseDivisor = isMobile ? 32000 : 16000;
      const maxParticles = isMobile ? 18 : 50;
      const particleCount = Math.min(Math.floor((width * height) / baseDivisor), maxParticles);
      const colors = ['#f59e0b', '#fbbf24', '#06b6d4', '#a855f7', '#ec4899', '#38bdf8'];

      particles = Array.from({ length: particleCount }).map(() => {
        const baseSize = Math.random() * 2.2 + 1.0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45 - 0.1, // Subtle upward drift
          size: baseSize,
          baseSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.25,
          pulseSpeed: Math.random() * 0.025 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });

      // 2. Floating 3D Glass Geometry - Reduced count on mobile
      const maxGlass = isMobile ? 3 : 7;
      const glassCount = Math.min(Math.floor(width / 280), maxGlass);
      const types: ('polygon' | 'ring' | 'diamond')[] = ['polygon', 'ring', 'diamond'];

      glassShapes = Array.from({ length: glassCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.7 + 0.3,
        size: Math.random() * (isMobile ? 20 : 32) + 16,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.006,
        type: types[Math.floor(Math.random() * types.length)],
        sides: Math.floor(Math.random() * 3) + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      // 3. Volumetric Atmospheric Light Rays (Simplified on mobile)
      lightRays = isMobile
        ? [{ angle: Math.PI * 0.4, width: 80, length: height * 1.1, alpha: 0.03, speed: 0.0005 }]
        : [
            { angle: Math.PI * 0.35, width: 90, length: height * 1.2, alpha: 0.04, speed: 0.0008 },
            { angle: Math.PI * 0.42, width: 140, length: height * 1.4, alpha: 0.03, speed: -0.0005 },
            { angle: Math.PI * 0.48, width: 110, length: height * 1.3, alpha: 0.035, speed: 0.0006 },
          ];
    };

    initScene();

    const handleResize = () => {
      initScene();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Helper: Draw Regular Polygon
    const drawPolygon = (x: number, y: number, radius: number, sides: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    let time = 0;
    let lastFrame = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastFrame) / 1000, 0.033);
      lastFrame = now;
      time += delta;

      // Mouse position lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Ambient Glowing Background Orbs
      const lightX1 = width * 0.3 + Math.sin(time * 0.35) * 70 + (mouse.x - width / 2) * 0.03;
      const lightY1 = height * 0.25 + Math.cos(time * 0.25) * 50 + (mouse.y - height / 2) * 0.03;

      const grad1 = ctx.createRadialGradient(lightX1, lightY1, 20, lightX1, lightY1, width * 0.55);
      grad1.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
      grad1.addColorStop(0.5, 'rgba(245, 158, 11, 0.07)');
      grad1.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const lightX2 = width * 0.7 + Math.cos(time * 0.4) * 80 - (mouse.x - width / 2) * 0.03;
      const lightY2 = height * 0.65 + Math.sin(time * 0.3) * 60 - (mouse.y - height / 2) * 0.03;

      const grad2 = ctx.createRadialGradient(lightX2, lightY2, 20, lightX2, lightY2, width * 0.6);
      grad2.addColorStop(0, 'rgba(6, 182, 212, 0.14)');
      grad2.addColorStop(0.6, 'rgba(59, 130, 246, 0.06)');
      grad2.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Light Shafts / Rays
      lightRays.forEach((ray) => {
        if (!prefersReducedMotion) {
          ray.angle += ray.speed;
        }

        ctx.save();
        ctx.translate(width * 0.5, -50);
        ctx.rotate(ray.angle - Math.PI * 0.4);

        const rayGrad = ctx.createLinearGradient(0, 0, 0, ray.length);
        rayGrad.addColorStop(0, `rgba(255, 255, 255, ${ray.alpha * 1.5})`);
        rayGrad.addColorStop(0.5, `rgba(245, 158, 11, ${ray.alpha})`);
        rayGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(-ray.width / 2, 0);
        ctx.lineTo(ray.width / 2, 0);
        ctx.lineTo(ray.width * 1.8, ray.length);
        ctx.lineTo(-ray.width * 1.8, ray.length);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // 3. Floating Glass Geometry
      glassShapes.forEach((shape) => {
        if (!prefersReducedMotion) {
          shape.x += shape.vx + (mouse.x - width / 2) * 0.00015 * shape.z;
          shape.y += shape.vy + (mouse.y - height / 2) * 0.00015 * shape.z;
          shape.rotation += shape.vRot;

          if (shape.x < -80) shape.x = width + 80;
          if (shape.x > width + 80) shape.x = -80;
          if (shape.y < -80) shape.y = height + 80;
          if (shape.y > height + 80) shape.y = -80;
        }

        ctx.save();
        ctx.translate(shape.x, shape.y);

        if (shape.type === 'ring') {
          ctx.rotate(shape.rotation);
          ctx.beginPath();
          ctx.arc(0, 0, shape.size * 0.8, 0, Math.PI * 2);
          ctx.strokeStyle = `${shape.color}35`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, shape.size * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `${shape.color}20`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (shape.type === 'diamond') {
          ctx.rotate(shape.rotation);
          ctx.beginPath();
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(shape.size * 0.6, 0);
          ctx.lineTo(0, shape.size);
          ctx.lineTo(-shape.size * 0.6, 0);
          ctx.closePath();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
          ctx.fill();
          ctx.strokeStyle = `${shape.color}45`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          drawPolygon(0, 0, shape.size, shape.sides, shape.rotation);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.fill();
          ctx.strokeStyle = `${shape.color}40`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 4. Stardust Particles & Subtle Proximity Lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }

          p.pulsePhase += p.pulseSpeed;
          p.size = p.baseSize + Math.sin(p.pulsePhase) * 0.7;
        }

        // Particle Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Soft Outer Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}20`;
        ctx.fill();

        // Connect nearby particles with subtle laser thread (Skip line checks on small mobile screens to save O(N^2) math)
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pdx = p.x - p2.x;
            const pdy = p.y - p2.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pdist < 100) {
              const lineAlpha = (1 - pdist / 100) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = 0.75;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      if (!prefersReducedMotion && document.visibilityState === 'visible') {
        animId = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !prefersReducedMotion) {
        lastFrame = performance.now();
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 no-print"
      style={{ opacity: 0.95 }}
    />
  );
};
