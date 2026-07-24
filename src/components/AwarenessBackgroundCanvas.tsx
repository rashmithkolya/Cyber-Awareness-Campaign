import React, { useEffect, useRef } from 'react';

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
  color: string;
}

export const AwarenessBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes: NetworkNode[] = [];

    const initScene = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Create calm, smooth ambient network nodes
      const nodeCount = Math.min(Math.floor((width * height) / 24000), 32);
      const colors = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

      nodes = Array.from({ length: nodeCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.4 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    initScene();

    const handleResize = () => {
      initScene();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;
      time += delta;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Calming Radial Lighting
      const lightX = width * 0.5 + Math.sin(time * 0.2) * 60;
      const lightY = height * 0.4 + Math.cos(time * 0.25) * 50;

      const bgGrad = ctx.createRadialGradient(lightX, lightY, 10, lightX, lightY, width * 0.6);
      bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
      bgGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      bgGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Smooth Layered Flowing Sine Light Wave
      const waveY = height * 0.35;
      const waveAmp = 35;
      const waveFreq = 0.002;

      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x <= width; x += 20) {
        const y = waveY + Math.sin(x * waveFreq + time * 0.5) * waveAmp + Math.cos(x * waveFreq * 1.5 - time * 0.3) * (waveAmp * 0.4);
        ctx.lineTo(x, y);
      }

      const waveGrad = ctx.createLinearGradient(0, 0, width, 0);
      waveGrad.addColorStop(0, '#06b6d4');
      waveGrad.addColorStop(0.5, '#10b981');
      waveGrad.addColorStop(1, '#3b82f6');

      ctx.strokeStyle = waveGrad;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // 3. Render Nodes & Soft Proximity Constellation Lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;

          node.pulsePhase += 0.015;
        }

        const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.6;

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw Constellation Lines
        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.14;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 no-print"
      style={{ opacity: 0.9 }}
    />
  );
};
