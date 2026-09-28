import React, { useEffect, useRef } from 'react';

interface SparksCanvasProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant';
}

export const SparksCanvas: React.FC<SparksCanvasProps> = ({ 
  className = "", 
  intensity = 'subtle' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const sparks: Spark[] = [];
    const maxSparks = intensity === 'vibrant' ? 65 : 35;
    const colors = ['#f59e0b', '#fbbf24', '#f97316', '#ffedd5', '#38bdf8']; // glowing amber, electric orange, hot white, arc-blue spark

    const spawnSpark = () => {
      if (sparks.length >= maxSparks) return;
      // Arc welding epicenter near bottom-center/right
      const originX = width * 0.72 + (Math.random() - 0.5) * 80;
      const originY = height * 0.78 + (Math.random() - 0.5) * 40;

      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8; // spray upwards and sideways
      const speed = Math.random() * 5 + 2;

      sparks.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2 + 1,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 45 + 30,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Random sparks burst occasionally
      if (tick % 2 === 0) {
        spawnSpark();
      }
      if (Math.random() < 0.2) {
        spawnSpark();
        spawnSpark();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.12; // gravity pulling sparks down
        s.vx *= 0.985; // drag
        s.life++;
        s.alpha = Math.max(0, 1 - (s.life / s.maxLife));

        ctx.save();
        ctx.globalAlpha = s.alpha * 0.85;
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (s.life >= s.maxLife || s.y > height) {
          sparks.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pointer-events-none absolute inset-0 z-10 w-full h-full ${className}`} 
      aria-hidden="true"
    />
  );
};
