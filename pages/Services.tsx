import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import anime from 'animejs';
import PageTransition from '../components/PageTransition';
import { ChevronRight, ArrowRight, Phone, Shield, Target, Users, Clock } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import {
  GlitchText,
  ParticleField,
  TacticalHUD,
  MagneticElement,
  ScanlineOverlay
} from '../components/effects';
import {
  useTilt,
  useScramble,
  useCounter,
  useReveal,
  useGlowPulse,
  useLineDraw
} from '../hooks/useAnimeEffects';

// ============================================
// SERVICES HERO SECTION
// ============================================
const ServicesHero: React.FC = () => {
  const decorLineRef = useLineDraw(2000, 500);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Animate subtitle with typewriter effect
    if (subtitleRef.current) {
      const text = subtitleRef.current.textContent || '';
      subtitleRef.current.textContent = '';

      anime({
        targets: subtitleRef.current,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          let i = 0;
          const interval = setInterval(() => {
            if (subtitleRef.current) {
              subtitleRef.current.textContent = text.slice(0, i);
              i++;
              if (i > text.length) clearInterval(interval);
            }
          }, 20);
        }
      });
    }
  }, []);

  return (
    <div className="relative mb-16 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-30">
        <ParticleField density={40} color="#f59e0b" speed={0.3} />
      </div>

      {/* Scanline Effect */}
      <ScanlineOverlay opacity={0.03} />

      {/* Content */}
      <div className="relative z-10 py-16 text-center">
        {/* Service Count Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-500/10 border border-brand-500/30"
        >
          <Shield className="w-4 h-4 text-brand-500" />
          <span className="text-brand-500 font-mono text-sm uppercase tracking-wider">
            {servicesData.length} Servicios Especializados
          </span>
        </motion.div>

        {/* Main Title with Glitch */}
        <div className="mb-6">
          <GlitchText
            text="NUESTROS SERVICIOS"
            className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-wider"
            intensity="medium"
            glitchInterval={4000}
          />
        </div>

        {/* Decorative SVG Line */}
        <svg className="w-64 h-4 mx-auto mb-6" viewBox="0 0 256 16">
          <path
            ref={decorLineRef}
            d="M0,8 L80,8 L88,2 L168,2 L176,8 L256,8"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-neutral-400 text-lg max-w-2xl mx-auto font-light"
        >
          Soluciones operativas especializadas para enfrentar desafios en mineria e industria.
        </p>

        {/* Corner Decorations */}
        <TacticalHUD variant="corners" className="absolute inset-4 pointer-events-none" />
      </div>
    </div>
  );
};

// ============================================
// ENHANCED SERVICE CARD
// ============================================
interface ServiceCardProps {
  service: typeof servicesData[0];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useTilt({ maxAngle: 8, perspective: 1200, scale: 1.02 });
  const numberRef = useScramble(String(index + 1).padStart(2, '0'), {
    chars: '0123456789',
    speed: 40,
    delay: index * 150
  });
  const [isHovered, setIsHovered] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const borderRef = useRef<SVGRectElement>(null);

  // Scroll reveal animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial state
    anime.set(card, {
      opacity: 0,
      scale: 0.9,
      translateY: 40
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasRevealed) {
            setHasRevealed(true);

            anime({
              targets: card,
              opacity: 1,
              scale: 1,
              translateY: 0,
              duration: 800,
              delay: index * 100,
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index, hasRevealed]);

  // Border animation on hover
  useEffect(() => {
    if (!borderRef.current) return;

    if (isHovered) {
      anime({
        targets: borderRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 600,
        easing: 'easeInOutQuad'
      });
    } else {
      anime({
        targets: borderRef.current,
        strokeDashoffset: anime.setDashoffset,
        duration: 400,
        easing: 'easeOutQuad'
      });
    }
  }, [isHovered]);

  // Icon glow animation on hover
  const handleMouseEnter = () => {
    setIsHovered(true);

    // Icon animation
    anime({
      targets: cardRef.current?.querySelector('.service-icon'),
      scale: [1, 1.15, 1.1],
      rotate: [0, -5, 5, 0],
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });

    // Features list stagger
    anime({
      targets: cardRef.current?.querySelectorAll('.feature-item'),
      translateX: [0, 5],
      opacity: [0.6, 1],
      delay: anime.stagger(50),
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    anime({
      targets: cardRef.current?.querySelector('.service-icon'),
      scale: 1,
      rotate: 0,
      duration: 400,
      easing: 'easeOutQuad'
    });

    anime({
      targets: cardRef.current?.querySelectorAll('.feature-item'),
      translateX: 0,
      opacity: 0.6,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  return (
    <div ref={cardRef} className="h-full">
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full"
      >
        <Link
          to={`/servicios/${service.slug}`}
          className="block relative h-full bg-neutral-900/70 backdrop-blur-sm overflow-hidden"
        >
          {/* Animated Border SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <rect
              ref={borderRef}
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              className="w-[calc(100%-2px)] h-[calc(100%-2px)]"
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: '1000'
              }}
            />
          </svg>

          {/* Background Image with Parallax */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isHovered ? 'opacity-25 scale-110' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={service.heroImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-8 h-full flex flex-col">
            {/* Service Number with Scramble Effect */}
            <div className="absolute top-4 right-4 z-10">
              <span
                ref={numberRef as React.RefObject<HTMLSpanElement>}
                className="font-mono text-3xl font-bold text-brand-500/30 group-hover:text-brand-500/60 transition-colors duration-500"
              >
                00
              </span>
            </div>

            {/* HUD Corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />

            {/* Icon with Glow */}
            <div className="relative mb-6">
              <div
                className={`absolute inset-0 bg-brand-500/30 blur-xl transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="service-icon relative w-16 h-16 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:bg-brand-500/20 group-hover:border-brand-500/50 transition-all duration-300">
                <service.icon className="w-8 h-8 text-brand-500" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-white uppercase mb-3 group-hover:text-brand-400 transition-colors duration-300">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
              {service.description}
            </p>

            {/* Features Preview */}
            <div className="space-y-2 mb-6">
              {service.features.slice(0, 3).map((feature, fidx) => (
                <div
                  key={fidx}
                  className="feature-item flex items-center gap-2 text-xs text-neutral-500 opacity-60"
                >
                  <ChevronRight className="w-3 h-3 text-brand-500 flex-shrink-0" />
                  <span className="truncate">{feature.title}</span>
                </div>
              ))}
            </div>

            {/* Link with animated arrow */}
            <div className="flex items-center gap-2 text-brand-500 text-sm font-display uppercase tracking-wider mt-auto">
              <span>Ver detalles</span>
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  isHovered ? 'translate-x-2' : ''
                }`}
              />
            </div>
          </div>

          {/* Hover Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-brand-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Scan Line Effect on Hover */}
          <div
            className={`absolute inset-0 pointer-events-none overflow-hidden ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          >
            <div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent"
              style={{
                animation: isHovered ? 'scan-line 2s linear infinite' : 'none',
                top: '0%'
              }}
            />
          </div>
        </Link>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// STATS SECTION WITH ANIMATED COUNTERS
// ============================================
const StatsSection: React.FC = () => {
  const stats = [
    { value: 6, suffix: '', label: 'Servicios Especializados', icon: Target },
    { value: 140, suffix: '+', label: 'Agentes Certificados', icon: Users },
    { value: 24, suffix: '/7', label: 'Operacion Continua', icon: Clock },
    { value: 12, suffix: '+', label: 'Anos de Experiencia', icon: Shield }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Stagger animation for stat cards
            anime({
              targets: container.querySelectorAll('.stat-card'),
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              delay: anime.stagger(100, { from: 'center' }),
              duration: 600,
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="mt-20">
      {/* Section Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest">Estadisticas</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} index={idx} />
        ))}
      </div>
    </div>
  );
};

// Individual Stat Card Component
interface StatCardProps {
  stat: {
    value: number;
    suffix: string;
    label: string;
    icon: React.ElementType;
  };
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const counterRef = useCounter(stat.value, {
    duration: 2000,
    delay: index * 150,
    suffix: stat.suffix
  });
  const glowRef = useGlowPulse({ color: '#f59e0b', intensity: 15, duration: 3000 });

  return (
    <div
      className="stat-card relative p-6 bg-neutral-900/50 border border-neutral-800 hover:border-brand-500/30 transition-colors duration-500 overflow-hidden group opacity-0"
    >
      {/* Icon Background */}
      <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <stat.icon className="w-16 h-16 text-brand-500" />
      </div>

      {/* Glow Effect on Icon */}
      <div
        ref={glowRef as React.RefObject<HTMLDivElement>}
        className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Counter Value */}
      <p
        ref={counterRef as React.RefObject<HTMLParagraphElement>}
        className="text-3xl md:text-4xl font-display font-bold text-brand-500 mb-2 relative z-10"
      >
        0{stat.suffix}
      </p>

      {/* Label */}
      <p className="text-neutral-500 text-xs uppercase tracking-wider relative z-10">
        {stat.label}
      </p>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Animate section elements
            anime.timeline()
              .add({
                targets: section.querySelector('.cta-title'),
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 600,
                easing: 'easeOutExpo'
              })
              .add({
                targets: section.querySelector('.cta-description'),
                opacity: [0, 1],
                translateX: [-20, 0],
                duration: 500,
                easing: 'easeOutQuad'
              }, '-=400')
              .add({
                targets: section.querySelectorAll('.cta-button'),
                opacity: [0, 1],
                translateY: [20, 0],
                scale: [0.95, 1],
                delay: anime.stagger(100),
                duration: 500,
                easing: 'easeOutBack'
              }, '-=300');

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative mt-20 overflow-hidden"
    >
      {/* Background with Particles */}
      <div className="absolute inset-0 bg-neutral-900">
        <ParticleField density={25} color="#f59e0b" speed={0.2} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-transparent to-brand-500/10" />
      <div className="absolute top-0 left-0 w-64 h-full bg-brand-500/5 -skew-x-12 transform -translate-x-20" />
      <div className="absolute top-0 right-0 w-64 h-full bg-brand-500/5 -skew-x-12 transform translate-x-20" />

      {/* Border Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 via-brand-400 to-brand-500" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="lg:max-w-xl">
            <h3 className="cta-title text-2xl md:text-3xl font-display font-bold text-white mb-3 uppercase opacity-0">
              Tecnologia + Estrategia
            </h3>
            <p className="cta-description text-neutral-400 leading-relaxed opacity-0">
              Nuestros drones y centros de control operan 24/7 para garantizar la continuidad de su negocio.
              Contamos con equipos de respuesta rapida y tecnologia de punta.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary CTA Button */}
            <MagneticElement strength={0.2}>
              <Link
                to="/contacto"
                className="cta-button group relative flex items-center gap-4 opacity-0"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Button with Brackets */}
                <div className="relative flex items-center">
                  {/* Left Bracket */}
                  <div className="w-3 h-14 border-l-2 border-t-2 border-b-2 border-brand-500 group-hover:border-brand-400 transition-colors" />

                  {/* Main Button Body */}
                  <div className="relative px-6 py-4 bg-brand-500 group-hover:bg-brand-400 transition-colors">
                    <span className="flex items-center gap-3 text-black font-display font-bold uppercase tracking-wider whitespace-nowrap">
                      Solicitar Cotizacion
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Right Bracket */}
                  <div className="w-3 h-14 border-r-2 border-t-2 border-b-2 border-brand-500 group-hover:border-brand-400 transition-colors" />
                </div>
              </Link>
            </MagneticElement>

            {/* Secondary Phone Button */}
            <MagneticElement strength={0.15}>
              <a
                href="tel:+51999999999"
                className="cta-button group relative flex items-center gap-4 opacity-0"
              >
                {/* Button with Brackets */}
                <div className="relative flex items-center">
                  {/* Left Bracket */}
                  <div className="w-3 h-14 border-l-2 border-t-2 border-b-2 border-neutral-600 group-hover:border-brand-500 transition-colors" />

                  {/* Main Button Body */}
                  <div className="relative px-6 py-4 bg-neutral-800 group-hover:bg-neutral-700 border-y border-neutral-600 group-hover:border-brand-500/50 transition-all">
                    <span className="flex items-center gap-3 text-white font-display font-bold uppercase tracking-wider whitespace-nowrap">
                      <Phone className="w-5 h-5 text-brand-500" />
                      Llamar Ahora
                    </span>
                  </div>

                  {/* Right Bracket */}
                  <div className="w-3 h-14 border-r-2 border-t-2 border-b-2 border-neutral-600 group-hover:border-brand-500 transition-colors" />
                </div>
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-500/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-brand-500/30" />
    </div>
  );
};

// ============================================
// MAIN SERVICES PAGE
// ============================================
const Services: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Grid stagger animation from center
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // The individual cards handle their own reveal animations
    // This is just for additional grid-level effects if needed
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <ServicesHero />

      {/* Services Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {servicesData.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </PageTransition>
  );
};

export default Services;
