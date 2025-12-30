import React, { useMemo } from 'react';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'radial';
  speed?: number;
  size?: { min: number; max: number };
  className?: string;
  density?: number; // Alternative to count - particles per 10000px²
}

// Generate random but deterministic values for particles
const generateParticles = (count: number, size: { min: number; max: number }) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: size.min + (((i * 7) % 10) / 10) * (size.max - size.min),
    left: ((i * 17) % 100),
    delay: ((i * 13) % 100) / 10, // 0-10s delay
    duration: 8 + ((i * 11) % 8), // 8-16s duration
    opacity: 0.3 + (((i * 19) % 5) / 10), // 0.3-0.8 opacity
  }));
};

const ParticleField: React.FC<ParticleFieldProps> = ({
  count,
  color = '#f59e0b',
  direction = 'up',
  speed = 1,
  size = { min: 2, max: 4 },
  className = '',
  density
}) => {
  // Use density or count, default to 15 particles (reduced from 30)
  const particleCount = density ? Math.min(density, 20) : Math.min(count || 15, 20);

  // Memoize particles to prevent recalculation
  const particles = useMemo(
    () => generateParticles(particleCount, size),
    [particleCount, size.min, size.max]
  );

  // Get animation direction
  const getAnimationName = () => {
    switch (direction) {
      case 'up': return 'particle-float-up';
      case 'down': return 'particle-float-down';
      case 'left': return 'particle-float-left';
      case 'right': return 'particle-float-right';
      default: return 'particle-float-up';
    }
  };

  return (
    <div
      className={`particle-field absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size}px ${color}`,
            left: `${p.left}%`,
            bottom: direction === 'up' ? '-5%' : undefined,
            top: direction === 'down' ? '-5%' : direction !== 'up' ? `${(p.id * 23) % 100}%` : undefined,
            opacity: 0,
            animation: `${getAnimationName()} ${p.duration / speed}s ${p.delay}s ease-out infinite`,
          }}
        />
      ))}

      {/* CSS Keyframes - injected once */}
      <style>{`
        @keyframes particle-float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--particle-opacity, 0.6);
          }
          90% {
            opacity: var(--particle-opacity, 0.4);
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes particle-float-down {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) translateX(-20px);
            opacity: 0;
          }
        }

        @keyframes particle-float-left {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(-100vw) translateY(10px);
            opacity: 0;
          }
        }

        @keyframes particle-float-right {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(100vw) translateY(-10px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleField;
