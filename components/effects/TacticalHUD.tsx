import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface TacticalHUDProps {
  variant?: 'reticle' | 'brackets' | 'scanner' | 'full';
  size?: number;
  color?: string;
  className?: string;
}

const TacticalHUD: React.FC<TacticalHUDProps> = ({
  variant = 'full',
  size = 200,
  color = '#f59e0b',
  className = ''
}) => {
  const hudRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!hudRef.current) return;

    const svg = hudRef.current;

    // Outer ring rotation
    const outerRing = svg.querySelector('.hud-outer-ring');
    if (outerRing) {
      anime({
        targets: outerRing,
        rotate: 360,
        duration: 20000,
        loop: true,
        easing: 'linear'
      });
    }

    // Inner ring counter-rotation
    const innerRing = svg.querySelector('.hud-inner-ring');
    if (innerRing) {
      anime({
        targets: innerRing,
        rotate: -360,
        duration: 15000,
        loop: true,
        easing: 'linear'
      });
    }

    // Scanner line
    const scannerLine = svg.querySelector('.hud-scanner');
    if (scannerLine) {
      anime({
        targets: scannerLine,
        rotate: 360,
        duration: 3000,
        loop: true,
        easing: 'linear'
      });
    }

    // Pulse effect on center
    const center = svg.querySelector('.hud-center');
    if (center) {
      anime({
        targets: center,
        scale: [1, 1.2, 1],
        opacity: [0.8, 1, 0.8],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Brackets animation
    const brackets = svg.querySelectorAll('.hud-bracket');
    if (brackets.length) {
      anime({
        targets: brackets,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1500,
        delay: anime.stagger(200),
        easing: 'easeInOutQuad'
      });
    }

    // Data points blink
    const dataPoints = svg.querySelectorAll('.hud-data');
    if (dataPoints.length) {
      anime({
        targets: dataPoints,
        opacity: [0.3, 1, 0.3],
        duration: 1500,
        delay: anime.stagger(300, { from: 'center' }),
        loop: true,
        easing: 'easeInOutSine'
      });
    }

  }, []);

  const center = size / 2;
  const strokeWidth = 1.5;

  return (
    <svg
      ref={hudRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`tactical-hud ${className}`}
      style={{ filter: `drop-shadow(0 0 10px ${color}40)` }}
    >
      {/* Outer ring with dashes */}
      {(variant === 'reticle' || variant === 'full') && (
        <g className="hud-outer-ring" style={{ transformOrigin: 'center' }}>
          <circle
            cx={center}
            cy={center}
            r={center - 10}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray="8 4"
            opacity={0.6}
          />
          {/* Tick marks */}
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1={center}
              y1={15}
              x2={center}
              y2={25}
              stroke={color}
              strokeWidth={strokeWidth}
              transform={`rotate(${i * 30} ${center} ${center})`}
              opacity={i % 3 === 0 ? 1 : 0.4}
            />
          ))}
        </g>
      )}

      {/* Inner ring with dots */}
      {(variant === 'reticle' || variant === 'full') && (
        <g className="hud-inner-ring" style={{ transformOrigin: 'center' }}>
          <circle
            cx={center}
            cy={center}
            r={center - 35}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray="2 6"
            opacity={0.4}
          />
          {/* Data points */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              className="hud-data"
              cx={center + (center - 35) * Math.cos((i * 45 * Math.PI) / 180)}
              cy={center + (center - 35) * Math.sin((i * 45 * Math.PI) / 180)}
              r={2}
              fill={color}
            />
          ))}
        </g>
      )}

      {/* Corner brackets */}
      {(variant === 'brackets' || variant === 'full') && (
        <g className="hud-brackets">
          {/* Top-left */}
          <path
            className="hud-bracket"
            d={`M ${center - 60} ${center - 50} L ${center - 60} ${center - 60} L ${center - 50} ${center - 60}`}
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
          {/* Top-right */}
          <path
            className="hud-bracket"
            d={`M ${center + 50} ${center - 60} L ${center + 60} ${center - 60} L ${center + 60} ${center - 50}`}
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
          {/* Bottom-left */}
          <path
            className="hud-bracket"
            d={`M ${center - 60} ${center + 50} L ${center - 60} ${center + 60} L ${center - 50} ${center + 60}`}
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
          {/* Bottom-right */}
          <path
            className="hud-bracket"
            d={`M ${center + 50} ${center + 60} L ${center + 60} ${center + 60} L ${center + 60} ${center + 50}`}
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
        </g>
      )}

      {/* Scanner line */}
      {(variant === 'scanner' || variant === 'full') && (
        <g className="hud-scanner" style={{ transformOrigin: 'center' }}>
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - 70}
            stroke={color}
            strokeWidth={1}
            opacity={0.8}
          />
          <defs>
            <linearGradient id="scannerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity={0} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <path
            d={`M ${center} ${center} L ${center - 20} ${center - 70} L ${center + 20} ${center - 70} Z`}
            fill="url(#scannerGradient)"
            opacity={0.3}
          />
        </g>
      )}

      {/* Center crosshair */}
      <g className="hud-center" style={{ transformOrigin: 'center' }}>
        <line
          x1={center - 15}
          y1={center}
          x2={center - 5}
          y2={center}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          x1={center + 5}
          y1={center}
          x2={center + 15}
          y2={center}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          x1={center}
          y1={center - 15}
          x2={center}
          y2={center - 5}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          x1={center}
          y1={center + 5}
          x2={center}
          y2={center + 15}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={2}
          fill={color}
        />
      </g>

      {/* Corner data displays */}
      {variant === 'full' && (
        <g className="hud-displays" fontSize={8} fontFamily="monospace" fill={color}>
          <text x={20} y={25} opacity={0.6}>SYS:ACTIVE</text>
          <text x={size - 60} y={25} opacity={0.6}>TGT:LOCK</text>
          <text x={20} y={size - 15} opacity={0.6}>LAT:---.--</text>
          <text x={size - 60} y={size - 15} opacity={0.6}>LON:---.--</text>
        </g>
      )}
    </svg>
  );
};

export default TacticalHUD;
