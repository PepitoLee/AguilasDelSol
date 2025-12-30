import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'auto' | 'hover' | 'inView';
  interval?: number;
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  intensity = 'medium',
  trigger = 'auto',
  interval = 4000,
  as: Component = 'span'
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  const intensitySettings = {
    low: { offset: 2, duration: 80 },
    medium: { offset: 4, duration: 120 },
    high: { offset: 8, duration: 180 }
  };

  const triggerGlitch = () => {
    if (!containerRef.current) return;
    setIsActive(true);

    const { offset, duration } = intensitySettings[intensity];
    const layers = containerRef.current.querySelectorAll('.glitch-layer');
    const main = containerRef.current.querySelector('.glitch-main');

    anime.timeline({
      complete: () => setIsActive(false)
    })
      .add({
        targets: main,
        translateX: [
          { value: -offset, duration: duration / 4 },
          { value: offset, duration: duration / 4 },
          { value: -offset / 2, duration: duration / 4 },
          { value: 0, duration: duration / 4 }
        ],
        easing: 'steps(1)'
      })
      .add({
        targets: layers[0], // Red layer
        opacity: [0, 0.8, 0.6, 0.8, 0],
        translateX: [0, offset, -offset / 2, offset / 2, 0],
        duration: duration,
        easing: 'steps(4)'
      }, 0)
      .add({
        targets: layers[1], // Cyan layer
        opacity: [0, 0.8, 0.6, 0.8, 0],
        translateX: [0, -offset, offset / 2, -offset / 2, 0],
        duration: duration,
        easing: 'steps(4)'
      }, 0);
  };

  // Auto trigger
  useEffect(() => {
    if (trigger !== 'auto') return;

    const intervalId = setInterval(triggerGlitch, interval);
    setTimeout(triggerGlitch, 500); // Initial trigger

    return () => clearInterval(intervalId);
  }, [trigger, interval]);

  // InView trigger
  useEffect(() => {
    if (trigger !== 'inView' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerGlitch();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      triggerGlitch();
    }
  };

  return (
    <Component
      ref={containerRef as any}
      className={`glitch-container relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={text}
    >
      {/* Main text */}
      <span className="glitch-main relative z-10">{text}</span>

      {/* Red offset layer */}
      <span
        className="glitch-layer absolute top-0 left-0 w-full h-full text-[#ff0040] opacity-0 pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          mixBlendMode: 'screen'
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Cyan offset layer */}
      <span
        className="glitch-layer absolute top-0 left-0 w-full h-full text-[#00ffff] opacity-0 pointer-events-none"
        style={{
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          mixBlendMode: 'screen'
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Scanline effect when active */}
      {isActive && (
        <span
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            animation: 'glitch-scanline 0.1s linear infinite'
          }}
          aria-hidden="true"
        />
      )}

      <style>{`
        @keyframes glitch-scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </Component>
  );
};

export default GlitchText;
