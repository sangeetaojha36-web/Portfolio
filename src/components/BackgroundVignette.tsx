import React, { useEffect, useRef } from 'react';

interface BackgroundVignetteProps {
  darkMode: boolean;
}

export const BackgroundVignette: React.FC<BackgroundVignetteProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // normalized mouse from -1 to 1
      mouse.current.targetX = (e.clientX / width - 0.5) * 50;
      mouse.current.targetY = (e.clientY / height - 0.5) * 50;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Organic light circles that drift smoothly with parallax
    const orbs = [
      {
        baseX: width * 0.25,
        baseY: height * 0.3,
        x: width * 0.25,
        y: height * 0.3,
        r: 360,
        vx: 0.18,
        vy: 0.12,
        parallaxFactor: 0.6,
        colorLight: 'rgba(235, 218, 201, 0.45)',
        colorDark: 'rgba(68, 112, 85, 0.16)',
      },
      {
        baseX: width * 0.75,
        baseY: height * 0.45,
        x: width * 0.75,
        y: height * 0.45,
        r: 420,
        vx: -0.14,
        vy: 0.16,
        parallaxFactor: -0.8,
        colorLight: 'rgba(214, 228, 240, 0.45)',
        colorDark: 'rgba(62, 107, 153, 0.18)',
      },
      {
        baseX: width * 0.5,
        baseY: height * 0.75,
        x: width * 0.5,
        y: height * 0.75,
        r: 390,
        vx: 0.1,
        vy: -0.15,
        parallaxFactor: 0.4,
        colorLight: 'rgba(245, 230, 218, 0.4)',
        colorDark: 'rgba(196, 109, 78, 0.15)',
      },
    ];

    const render = () => {
      // Smooth lerp mouse parallax
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      orbs.forEach((orb) => {
        orb.baseX += orb.vx;
        orb.baseY += orb.vy;

        if (orb.baseX - orb.r < 0 || orb.baseX + orb.r > width) orb.vx *= -1;
        if (orb.baseY - orb.r < 0 || orb.baseY + orb.r > height) orb.vy *= -1;

        orb.x = orb.baseX + mouse.current.x * orb.parallaxFactor;
        orb.y = orb.baseY + mouse.current.y * orb.parallaxFactor;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        const color = darkMode ? orb.colorDark : orb.colorLight;
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
};
