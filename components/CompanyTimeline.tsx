import React, { useRef, useState, useEffect } from 'react';
import anime from 'animejs';
import { Calendar, Award, Users, Building2, Rocket, Shield } from 'lucide-react';

// ============================================
// COMPANY TIMELINE COMPONENT
// ============================================

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  highlight?: boolean;
}

const timelineData: TimelineEvent[] = [
  {
    year: '2012',
    title: 'Fundacion',
    description: 'Nace Corporacion Aguilas del Sol S.A.C. con una vision clara de seguridad integral.',
    icon: Building2
  },
  {
    year: '2015',
    title: 'Expansion',
    description: 'Crecemos a mas de 50 colaboradores y expandimos operaciones a nivel nacional.',
    icon: Users
  },
  {
    year: '2018',
    title: 'Certificacion RNP',
    description: 'Obtenemos certificacion del Registro Nacional de Proveedores para contratos estatales.',
    icon: Award,
    highlight: true
  },
  {
    year: '2021',
    title: 'Innovacion Tecnologica',
    description: 'Implementamos drones y centros de monitoreo con tecnologia de punta.',
    icon: Rocket
  },
  {
    year: '2024',
    title: 'Liderazgo',
    description: '140+ colaboradores y presencia consolidada en mineria e industria.',
    icon: Shield,
    highlight: true
  }
];

const CompanyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Line draw animation
  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate the SVG line
            anime({
              targets: line,
              strokeDashoffset: [anime.setDashoffset, 0],
              duration: 2000,
              easing: 'easeInOutQuad'
            });

            // Animate timeline points with stagger
            anime({
              targets: container.querySelectorAll('.timeline-point'),
              scale: [0, 1],
              opacity: [0, 1],
              delay: anime.stagger(300, { start: 500 }),
              duration: 600,
              easing: 'easeOutBack'
            });

            // Animate timeline cards with stagger
            anime({
              targets: container.querySelectorAll('.timeline-card'),
              translateY: [30, 0],
              opacity: [0, 1],
              delay: anime.stagger(300, { start: 700 }),
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Reveal events one by one
            timelineData.forEach((_, idx) => {
              setTimeout(() => setActiveIndex(idx), 700 + idx * 300);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Point pulse animation on hover
  const handlePointHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const point = e.currentTarget.querySelector('.point-inner');
    const glow = e.currentTarget.querySelector('.point-glow');

    if (entering) {
      anime({
        targets: point,
        scale: 1.3,
        duration: 300,
        easing: 'easeOutBack'
      });
      anime({
        targets: glow,
        scale: 1.5,
        opacity: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
    } else {
      anime({
        targets: point,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
      anime({
        targets: glow,
        scale: 1,
        opacity: 0.5,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  return (
    <div ref={containerRef} className="relative py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-brand-500/10 border border-brand-500/30">
          <Calendar className="w-4 h-4 text-brand-500" />
          <span className="text-brand-500 font-mono text-sm uppercase tracking-wider">
            Nuestra Historia
          </span>
        </div>
        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
          TRAYECTORIA DE <span className="text-brand-500">EXCELENCIA</span>
        </h3>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* SVG Line (Desktop - horizontal) */}
        <svg
          className="hidden md:block absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            ref={lineRef}
            d="M 0,8 L 1000,8"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            className="w-full"
            style={{ strokeDasharray: '1000', strokeDashoffset: '1000' }}
          />
        </svg>

        {/* SVG Line (Mobile - vertical) */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-500 to-brand-500/20" />

        {/* Timeline Events */}
        <div className="grid md:grid-cols-5 gap-8 md:gap-4 relative">
          {timelineData.map((event, idx) => (
            <div
              key={event.year}
              className={`relative flex md:flex-col items-start md:items-center ${
                idx % 2 === 0 ? 'md:flex-col' : 'md:flex-col-reverse'
              }`}
            >
              {/* Point */}
              <div
                className="timeline-point relative z-10 opacity-0 cursor-pointer ml-4 md:ml-0"
                onMouseEnter={(e) => handlePointHover(e, true)}
                onMouseLeave={(e) => handlePointHover(e, false)}
              >
                {/* Glow effect */}
                <div
                  className={`point-glow absolute -inset-4 rounded-full opacity-50 ${
                    event.highlight ? 'bg-brand-500/30' : 'bg-neutral-500/20'
                  }`}
                />

                {/* Point inner */}
                <div
                  className={`point-inner relative w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    event.highlight
                      ? 'bg-brand-500 border-brand-400'
                      : 'bg-neutral-800 border-brand-500'
                  }`}
                >
                  <event.icon className={`w-4 h-4 ${event.highlight ? 'text-black' : 'text-brand-500'}`} />
                </div>

                {/* Year badge */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-brand-500 whitespace-nowrap">
                  {event.year}
                </div>
              </div>

              {/* Card */}
              <div
                className={`timeline-card ml-8 md:ml-0 opacity-0 ${
                  idx % 2 === 0 ? 'md:mt-16' : 'md:mb-16'
                }`}
              >
                <div
                  className={`relative p-4 bg-neutral-900/80 border transition-all duration-300 ${
                    activeIndex >= idx
                      ? event.highlight
                        ? 'border-brand-500/50'
                        : 'border-neutral-700'
                      : 'border-neutral-800'
                  } ${activeIndex >= idx ? '' : 'opacity-50'}`}
                >
                  {/* Card corner accents */}
                  {event.highlight && (
                    <>
                      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-brand-500" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-brand-500" />
                    </>
                  )}

                  <h4 className={`font-display font-bold uppercase tracking-wider mb-2 ${
                    event.highlight ? 'text-brand-500' : 'text-white'
                  }`}>
                    {event.title}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTimeline;
