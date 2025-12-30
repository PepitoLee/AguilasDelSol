import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface ScanlineOverlayProps {
  intensity?: 'light' | 'medium' | 'heavy';
  animated?: boolean;
  color?: string;
  className?: string;
}

const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({
  intensity = 'medium',
  animated = true,
  color = 'rgba(0,0,0,0.5)',
  className = ''
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const intensitySettings = {
    light: { lineHeight: 4, opacity: 0.1 },
    medium: { lineHeight: 3, opacity: 0.2 },
    heavy: { lineHeight: 2, opacity: 0.35 }
  };

  const { lineHeight, opacity } = intensitySettings[intensity];

  useEffect(() => {
    if (!animated || !scannerRef.current) return;

    const animation = anime({
      targets: scannerRef.current,
      translateY: ['0%', '100%'],
      duration: 4000,
      loop: true,
      easing: 'linear'
    });

    return () => animation.pause();
  }, [animated]);

  return (
    <div
      ref={overlayRef}
      className={`scanline-overlay absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Static scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${lineHeight - 1}px,
            ${color} ${lineHeight - 1}px,
            ${color} ${lineHeight}px
          )`,
          opacity: opacity
        }}
      />

      {/* Moving scanner bar */}
      {animated && (
        <div
          ref={scannerRef}
          className="absolute left-0 w-full h-24 -top-24"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent 0%,
              rgba(245, 158, 11, 0.05) 40%,
              rgba(245, 158, 11, 0.1) 50%,
              rgba(245, 158, 11, 0.05) 60%,
              transparent 100%
            )`
          }}
        />
      )}

      {/* CRT vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />

      {/* Subtle flicker */}
      <div
        className="absolute inset-0 animate-flicker"
        style={{
          background: 'rgba(255,255,255,0.01)'
        }}
      />

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          97% { opacity: 0.9; }
          98% { opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
    </div>
  );
};

export default ScanlineOverlay;
