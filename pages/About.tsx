import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import anime from 'animejs';
import PageTransition from '../components/PageTransition';
import VideoTheater from '../components/VideoTheater';
import {
  Target,
  Eye,
  Shield,
  Users,
  FileCheck,
  Award,
  Clock,
  ArrowRight,
  Phone
} from 'lucide-react';
import {
  GlitchText,
  ParticleField,
  TacticalHUD,
  MagneticElement,
  ScanlineOverlay
} from '../components/effects';
import {
  useTilt,
  useCounter,
  useReveal,
  useLineDraw,
  useGlowPulse
} from '../hooks/useAnimeEffects';

// ============================================
// ABOUT HERO SECTION
// ============================================
const AboutHero: React.FC = () => {
  const decorLineRef = useLineDraw(2000, 500);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
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
          }, 25);
        }
      });
    }
  }, []);

  return (
    <div className="relative mb-16 overflow-hidden">
      {/* Particle Background - reduced density for performance */}
      <div className="absolute inset-0 opacity-30">
        <ParticleField density={12} color="#f59e0b" speed={0.5} />
      </div>

      {/* Scanline Effect */}
      <ScanlineOverlay opacity={0.03} />

      {/* Content */}
      <div className="relative z-10 py-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-500/10 border border-brand-500/30"
        >
          <Shield className="w-4 h-4 text-brand-500" />
          <span className="text-brand-500 font-mono text-sm uppercase tracking-wider">
            Corporacion Aguilas del Sol S.A.C.
          </span>
        </motion.div>

        {/* Main Title with Glitch */}
        <div className="mb-6">
          <GlitchText
            text="QUIENES SOMOS"
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
          Su socio estrategico en seguridad privada. Mas de 12 anos protegiendo lo que mas importa.
        </p>

        {/* Corner Decorations */}
        <TacticalHUD variant="corners" className="absolute inset-4 pointer-events-none" />
      </div>
    </div>
  );
};

// ============================================
// VIDEO SECTION
// ============================================
const VideoSection: React.FC = () => {
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

            anime({
              targets: section.querySelector('.video-container'),
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 1000,
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-4">
            VIDEO <span className="text-brand-500">INSTITUCIONAL</span>
          </h3>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Conozca nuestra operacion, equipo y compromiso con la excelencia en seguridad.
          </p>
        </motion.div>
      </div>

      {/* Video Theater */}
      <div className="video-container opacity-0">
        <VideoTheater
          videoUrl="/videos/video-institucional.mp4"
          posterUrl="https://images.unsplash.com/photo-1551808525-51a943718d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          title="ADS SECURITY - VIDEO INSTITUCIONAL 2025"
        />
      </div>
    </section>
  );
};

// ============================================
// COMPANY CARDS SECTION (MISION/VISION/VALORES)
// ============================================
interface CompanyCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ icon: Icon, title, description, index }) => {
  const tiltRef = useTilt({ maxAngle: 10, perspective: 1000, scale: 1.03 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || hasRevealed) return;

    anime.set(card, { opacity: 0, translateY: 40, scale: 0.95 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasRevealed) {
            setHasRevealed(true);

            anime({
              targets: card,
              opacity: 1,
              translateY: 0,
              scale: 1,
              duration: 800,
              delay: index * 150,
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index, hasRevealed]);

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current?.querySelector('.card-icon'),
      scale: [1, 1.2, 1.1],
      rotate: [0, -10, 10, 0],
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
  };

  return (
    <div ref={cardRef} className="opacity-0">
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        onMouseEnter={handleMouseEnter}
        className="group relative h-full p-8 bg-neutral-900/70 backdrop-blur border border-neutral-800 hover:border-brand-500/30 transition-all duration-500"
      >
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />

        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="card-icon relative w-16 h-16 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:bg-brand-500/20 transition-all">
            <Icon className="w-8 h-8 text-brand-500" />
          </div>
        </div>

        {/* Content */}
        <h4 className="text-xl font-display font-bold text-white uppercase mb-4 group-hover:text-brand-400 transition-colors">
          {title}
        </h4>
        <p className="text-neutral-400 text-sm leading-relaxed">
          {description}
        </p>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

const CompanyCardsSection: React.FC = () => {
  const cards = [
    {
      icon: Target,
      title: 'Mision',
      description: 'Acompañar a nuestros clientes en cada paso, aportando valor real y seguridad personalizada que garantice la continuidad de sus operaciones.'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'Ser la empresa lider en seguridad integral del Peru, reconocida por nuestra excelencia operativa, innovacion tecnologica y compromiso con el cliente.'
    },
    {
      icon: Shield,
      title: 'Valores',
      description: 'Integridad, profesionalismo, responsabilidad y compromiso. Operamos con los mas altos estandares eticos y de calidad en cada servicio.'
    }
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <CompanyCard key={card.title} {...card} index={idx} />
        ))}
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  index: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix, label, icon: Icon, index }) => {
  const counterRef = useCounter(value, { duration: 2000, delay: index * 150, suffix });
  const glowRef = useGlowPulse({ color: '#f59e0b', intensity: 15, duration: 3000 });

  return (
    <div className="stat-item relative p-6 bg-neutral-900/50 border border-neutral-800 hover:border-brand-500/30 transition-colors duration-500 overflow-hidden group opacity-0">
      {/* Icon Background */}
      <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-16 h-16 text-brand-500" />
      </div>

      {/* Glow */}
      <div
        ref={glowRef as React.RefObject<HTMLDivElement>}
        className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Counter */}
      <p
        ref={counterRef as React.RefObject<HTMLParagraphElement>}
        className="text-3xl md:text-4xl font-display font-bold text-brand-500 mb-2 relative z-10"
      >
        0{suffix}
      </p>

      {/* Label */}
      <p className="text-neutral-500 text-xs uppercase tracking-wider relative z-10">
        {label}
      </p>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { value: 140, suffix: '+', label: 'Colaboradores', icon: Users },
    { value: 100, suffix: '%', label: 'Formalidad RNP', icon: FileCheck },
    { value: 12, suffix: '+', label: 'Anos Experiencia', icon: Award },
    { value: 24, suffix: '/7', label: 'Operacion Continua', icon: Clock }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            anime({
              targets: container.querySelectorAll('.stat-item'),
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
    <section ref={containerRef} className="py-16">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest">Estadisticas</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatItem key={stat.label} {...stat} index={idx} />
        ))}
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
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
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Background - reduced particles for performance */}
      <div className="absolute inset-0 bg-neutral-900">
        <ParticleField density={10} color="#f59e0b" speed={0.4} />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-transparent to-brand-500/10" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 via-brand-400 to-brand-500" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <div className="lg:max-w-xl">
            <h3 className="cta-title text-2xl md:text-3xl font-display font-bold text-white mb-3 uppercase opacity-0">
              Proteja su Negocio Hoy
            </h3>
            <p className="cta-description text-neutral-400 leading-relaxed opacity-0">
              Solicite una evaluacion gratuita y descubra como podemos fortalecer la seguridad de su empresa con soluciones personalizadas.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticElement strength={0.2}>
              <Link to="/contacto" className="cta-button group relative flex items-center gap-4 opacity-0">
                <div className="absolute -inset-2 bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center">
                  <div className="w-3 h-14 border-l-2 border-t-2 border-b-2 border-brand-500 group-hover:border-brand-400 transition-colors" />
                  <div className="relative px-6 py-4 bg-brand-500 group-hover:bg-brand-400 transition-colors">
                    <span className="flex items-center gap-3 text-black font-display font-bold uppercase tracking-wider whitespace-nowrap">
                      Contactar Ahora
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="w-3 h-14 border-r-2 border-t-2 border-b-2 border-brand-500 group-hover:border-brand-400 transition-colors" />
                </div>
              </Link>
            </MagneticElement>

            <MagneticElement strength={0.15}>
              <a href="tel:+51999999999" className="cta-button group relative flex items-center gap-4 opacity-0">
                <div className="relative flex items-center">
                  <div className="w-3 h-14 border-l-2 border-t-2 border-b-2 border-neutral-600 group-hover:border-brand-500 transition-colors" />
                  <div className="relative px-6 py-4 bg-neutral-800 group-hover:bg-neutral-700 border-y border-neutral-600 group-hover:border-brand-500/50 transition-all">
                    <span className="flex items-center gap-3 text-white font-display font-bold uppercase tracking-wider whitespace-nowrap">
                      <Phone className="w-5 h-5 text-brand-500" />
                      Llamar
                    </span>
                  </div>
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
    </section>
  );
};

// ============================================
// MAIN ABOUT PAGE
// ============================================
const About: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <AboutHero />

      {/* Video Section */}
      <VideoSection />

      {/* Company Cards */}
      <CompanyCardsSection />

      {/* Stats */}
      <StatsSection />

      {/* CTA */}
      <CTASection />
    </PageTransition>
  );
};

export default About;
