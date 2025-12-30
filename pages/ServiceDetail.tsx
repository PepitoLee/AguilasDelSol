import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Play,
  X,
  Quote,
  TrendingUp,
  Target,
  Zap,
  Phone,
  Shield,
  Eye
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { getServiceBySlug, getRelatedServices, ServiceDetail as ServiceType } from '../data/servicesData';
import { GlitchText, ParticleField, TacticalHUD, MagneticElement, ScanlineOverlay } from '../components/effects';
import { useTilt, useCounter, useReveal, useStaggerReveal, useGlowPulse, useParallax, useScramble } from '../hooks/useAnimeEffects';

// ============================================
// HERO SECTION - TACTICAL BREACH
// ============================================
const ServiceHero: React.FC<{ service: ServiceType }> = ({ service }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useParallax({ speed: 0.3 });
  const [isLoaded, setIsLoaded] = useState(false);
  const hudRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  // Entrance animations
  useEffect(() => {
    // Breadcrumb slide in
    if (breadcrumbRef.current) {
      anime({
        targets: breadcrumbRef.current,
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 200,
        easing: 'easeOutExpo'
      });
    }

    // Icon badge entrance
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        scale: [0, 1],
        rotate: [-180, 0],
        duration: 1000,
        delay: 400,
        easing: 'easeOutElastic(1, .5)'
      });
    }

    // Decorative line
    if (lineRef.current) {
      anime({
        targets: lineRef.current,
        scaleX: [0, 1],
        duration: 1200,
        delay: 800,
        easing: 'easeOutExpo'
      });
    }

    // HUD entrance
    if (hudRef.current) {
      anime({
        targets: hudRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1500,
        delay: 600,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background with Parallax */}
      <div
        ref={parallaxRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 scale-110"
      >
        {service.heroVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-50' : 'opacity-0'}`}
          >
            <source src={service.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-50"
          />
        )}
      </div>

      {/* Multiple Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Scanline Overlay */}
      <ScanlineOverlay intensity="medium" animated={true} />

      {/* Particle Field */}
      <ParticleField
        count={40}
        color="#f59e0b"
        direction="up"
        speed={0.5}
        size={{ min: 1, max: 3 }}
        className="opacity-60"
      />

      {/* Tactical Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* HUD Element */}
      <div
        ref={hudRef}
        className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block opacity-0"
      >
        <TacticalHUD variant="full" size={250} color="#f59e0b" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
        {/* Breadcrumb */}
        <nav
          ref={breadcrumbRef}
          className="absolute top-8 left-4 sm:left-6 lg:left-8 opacity-0"
        >
          <Link
            to="/servicios"
            className="flex items-center gap-2 text-neutral-400 hover:text-brand-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider font-display">Volver a Servicios</span>
          </Link>
        </nav>

        {/* Status Badge */}
        <div className="absolute top-8 right-4 sm:right-6 lg:right-8">
          <div className="flex items-center gap-2 text-brand-500 text-xs font-mono">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
            <span>SISTEMA ACTIVO</span>
          </div>
        </div>

        {/* Icon Badge */}
        <div
          ref={iconRef}
          className="mb-8 opacity-0"
          style={{ transform: 'scale(0) rotate(-180deg)' }}
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-brand-500/20 border border-brand-500/50 rotate-45" />
            <div className="absolute inset-2 bg-black/50 border border-brand-500/30 rotate-45 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <service.icon className="w-10 h-10 text-brand-500" />
            </div>
          </div>
        </div>

        {/* Title with Glitch */}
        <div className="mb-4">
          <GlitchText
            text={service.title}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight"
            intensity="medium"
            trigger="inView"
          />
        </div>

        {/* Subtitle with Typewriter Effect */}
        <p className="text-xl md:text-2xl text-brand-400/90 font-light max-w-2xl font-display tracking-wide">
          {service.subtitle}
        </p>

        {/* Decorative Line */}
        <div
          ref={lineRef}
          className="mt-10 h-1 w-48 bg-gradient-to-r from-brand-500 via-brand-400 to-transparent origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Floating Data Points */}
        <div className="absolute bottom-8 right-8 text-right hidden md:block">
          <div className="space-y-2 font-mono text-xs text-neutral-500">
            <div>LAT: -12.0464</div>
            <div>LON: -77.0428</div>
            <div className="text-brand-500">STATUS: OPERATIONAL</div>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 right-4 w-32 h-32 border-t-2 border-r-2 border-brand-500/20" />
      <div className="absolute bottom-4 left-4 w-32 h-32 border-b-2 border-l-2 border-brand-500/20" />
      <div className="absolute top-20 left-20 w-4 h-4 border border-brand-500/40 rotate-45" />
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-brand-500/30" />
    </section>
  );
};

// ============================================
// FEATURES GRID - TACTICAL MODULES
// ============================================
const TiltCard: React.FC<{
  feature: { title: string; description: string };
  index: number;
}> = ({ feature, index }) => {
  const tiltRef = useTilt({ maxAngle: 12, scale: 1.02 });
  const numberRef = useScramble(String(index + 1).padStart(2, '0'), { speed: 40 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 800,
              delay: index * 150,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    anime.set(cardRef.current, { opacity: 0, translateY: 60 });
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef}>
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        className="group relative p-8 bg-neutral-900/50 border border-neutral-800 hover:border-brand-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Number Badge */}
        <div className="absolute -top-4 -left-4 w-14 h-14 bg-brand-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
          <span
            ref={numberRef as React.RefObject<HTMLSpanElement>}
            className="text-black font-display font-bold text-xl font-mono"
          >
            00
          </span>
        </div>

        {/* Circuit Lines */}
        <svg className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-30 transition-opacity">
          <path
            d="M0 0 L32 0 L32 32"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
            className="circuit-line"
          />
          <circle cx="32" cy="32" r="3" fill="#f59e0b" />
        </svg>

        <h3
          className="text-xl font-display font-bold text-white uppercase mb-4 pl-8 group-hover:text-brand-400 transition-colors"
          style={{ transform: 'translateZ(20px)' }}
        >
          {feature.title}
        </h3>
        <p
          className="text-neutral-400 leading-relaxed"
          style={{ transform: 'translateZ(10px)' }}
        >
          {feature.description}
        </p>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/5 to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Corner Brackets on Hover */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-brand-500/0 group-hover:border-brand-500/50 transition-colors duration-300" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-brand-500/0 group-hover:border-brand-500/50 transition-colors duration-300" />
      </div>
    </div>
  );
};

const FeaturesGrid: React.FC<{ features: ServiceType['features'] }> = ({ features }) => {
  const titleRef = useReveal({ direction: 'up', duration: 800 });

  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-brand-500" />
            <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
              Capacidades
            </span>
            <div className="w-8 h-[1px] bg-brand-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Modulos del Sistema
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <TiltCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SPECIFICATIONS - SYSTEM STATS
// ============================================
const SpecificationsPanel: React.FC<{ specs: ServiceType['specifications'] }> = ({ specs }) => {
  const containerRef = useStaggerReveal({ delay: 100, duration: 800 });
  const leftRef = useReveal({ direction: 'left', duration: 1000 });

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Hex Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-brand-500/20 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Math.random().toString(16).substr(2, 8).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Title & Description */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>}>
            <div className="inline-flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-brand-500" />
              <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
                Datos Tecnicos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-8 tracking-tight">
              Especificaciones
            </h2>
            <p className="text-neutral-400 leading-relaxed text-lg mb-10">
              Nuestros servicios cuentan con los mas altos estandares de calidad
              y equipamiento de ultima generacion para garantizar resultados
              excepcionales en cada operacion.
            </p>

            {/* Certification Badge */}
            <div className="flex items-center gap-6 p-6 bg-neutral-900/50 border border-neutral-800">
              <div className="w-20 h-20 border-2 border-brand-500 flex items-center justify-center relative">
                <Target className="w-10 h-10 text-brand-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500" />
              </div>
              <div>
                <p className="text-white font-display font-bold uppercase text-lg">Precision Operativa</p>
                <p className="text-neutral-500 text-sm font-mono">ISO 27001:2022 CERTIFIED</p>
              </div>
            </div>
          </div>

          {/* Right: Specs Grid */}
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-2 gap-4"
          >
            {specs.map((spec, idx) => (
              <SpecCard key={idx} spec={spec} index={idx} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

const SpecCard: React.FC<{ spec: { label: string; value: string }; index: number }> = ({ spec, index }) => {
  const valueRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!valueRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Typing effect for value
            const text = spec.value;
            let current = 0;
            valueRef.current!.textContent = '';

            const type = setInterval(() => {
              if (current < text.length) {
                valueRef.current!.textContent = text.slice(0, current + 1) + '█';
                current++;
              } else {
                valueRef.current!.textContent = text;
                clearInterval(type);
              }
            }, 50);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(valueRef.current);
    return () => observer.disconnect();
  }, [spec.value]);

  return (
    <div className="p-6 bg-neutral-900/50 border border-neutral-800 relative overflow-hidden group hover:border-brand-500/30 transition-all duration-300">
      {/* Left accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-neutral-700 group-hover:border-brand-500/50 transition-colors" />

      <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3 font-mono">
        {spec.label}
      </p>
      <p
        ref={valueRef}
        className="text-white font-display font-bold text-lg"
      >
        {spec.value}
      </p>

      {/* Scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/0 via-brand-500/5 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ animation: 'scanVertical 2s linear infinite' }} />
    </div>
  );
};

// ============================================
// GALLERY - SURVEILLANCE FEED
// ============================================
const GallerySection: React.FC<{ gallery: ServiceType['gallery'], title: string }> = ({ gallery, title }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useReveal({ direction: 'up' });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <>
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-brand-500" />
              <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
                Feed de Vigilancia
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              {title} en Accion
            </h2>
          </div>

          <div
            ref={galleryRef}
            onMouseMove={handleMouseMove}
            className="relative grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.8) 100%)`
            }}
          >
            {gallery.map((item, idx) => (
              <GalleryItem
                key={idx}
                item={item}
                index={idx}
                onClick={() => setSelectedImage(idx)}
              />
            ))}

            {/* REC indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-red-500 text-sm font-mono z-10">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              REC
            </div>

            {/* Timestamp */}
            <div className="absolute bottom-4 right-4 text-brand-500/50 text-xs font-mono z-10">
              {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-brand-500 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={gallery[selectedImage].url}
              alt={gallery[selectedImage].alt}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80';
              }}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {/* Lightbox scanlines */}
            <ScanlineOverlay intensity="light" animated={false} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const GalleryItem: React.FC<{
  item: { url: string; alt: string };
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(item.url);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to a placeholder image
      setImgSrc('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80');
    }
  };

  useEffect(() => {
    if (!itemRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: itemRef.current,
              scale: [0.8, 1],
              opacity: [0, 1],
              duration: 600,
              delay: index * 100,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    anime.set(itemRef.current, { opacity: 0, scale: 0.8 });
    observer.observe(itemRef.current);

    return () => observer.disconnect();
  }, [index]);

  const handleHover = () => {
    if (!itemRef.current) return;
    const img = itemRef.current.querySelector('img');

    anime({
      targets: img,
      filter: ['hue-rotate(0deg)', 'hue-rotate(20deg)', 'hue-rotate(0deg)'],
      duration: 200,
      easing: 'steps(3)'
    });
  };

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={handleHover}
      className="relative aspect-square overflow-hidden cursor-pointer group"
    >
      <img
        src={imgSrc}
        alt={item.alt}
        onError={handleImageError}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-12 h-12 text-white/80" />
        </div>
      </div>

      {/* Scanlines on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-full h-full" style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`
        }} />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-brand-500/0 group-hover:border-brand-500 transition-colors duration-300" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-brand-500/0 group-hover:border-brand-500 transition-colors duration-300" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-sm truncate font-mono">{item.alt}</p>
      </div>
    </div>
  );
};

// ============================================
// CASE STUDY - MISSION REPORT
// ============================================
const CaseStudySection: React.FC<{ caseStudy: ServiceType['caseStudy'] }> = ({ caseStudy }) => {
  const containerRef = useReveal({ direction: 'up', duration: 1000 });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate timeline line
            anime({
              targets: '.timeline-line',
              height: ['0%', '100%'],
              duration: 1500,
              easing: 'easeInOutQuad'
            });

            // Animate timeline dots
            anime({
              targets: '.timeline-dot',
              scale: [0, 1],
              delay: anime.stagger(300, { start: 500 }),
              duration: 400,
              easing: 'easeOutBack'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Classified Stamp */}
      <div className="absolute top-10 right-10 rotate-12 opacity-10">
        <div className="border-4 border-red-500 px-6 py-2">
          <span className="text-red-500 font-display font-bold text-2xl uppercase tracking-widest">
            Classified
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-brand-500" />
            <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
              Informe de Mision
            </span>
            <div className="w-8 h-[1px] bg-brand-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Caso de Exito
          </h2>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="bg-neutral-900/80 border border-neutral-800 p-8 md:p-12 relative"
        >
          {/* Quote Icon */}
          <Quote className="absolute top-6 right-6 w-20 h-20 text-brand-500/10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Client Info with Timeline */}
            <div ref={timelineRef} className="relative lg:border-r border-neutral-800 pr-8">
              {/* Timeline */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-800">
                <div className="timeline-line absolute top-0 left-0 w-full bg-brand-500" style={{ height: 0 }} />
              </div>

              <div className="space-y-8 pl-6">
                <div className="relative">
                  <div className="timeline-dot absolute -left-8 top-1 w-4 h-4 bg-brand-500 rounded-full transform scale-0" />
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2 font-mono">Cliente</p>
                  <p className="text-white font-display font-bold text-xl">{caseStudy.client}</p>
                </div>

                <div className="relative">
                  <div className="timeline-dot absolute -left-8 top-1 w-4 h-4 bg-brand-500 rounded-full transform scale-0" />
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2 font-mono">Industria</p>
                  <p className="text-brand-400">{caseStudy.industry}</p>
                </div>

                <div className="relative">
                  <div className="timeline-dot absolute -left-8 top-1 w-4 h-4 bg-brand-500 rounded-full transform scale-0" />
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2 font-mono">Estado</p>
                  <p className="text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    COMPLETADO
                  </p>
                </div>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-6 bg-neutral-900/50 border-l-2 border-red-500/50">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-red-500" />
                  <p className="text-red-400 text-sm font-display uppercase tracking-wider">El Desafio</p>
                </div>
                <p className="text-neutral-300 leading-relaxed">{caseStudy.challenge}</p>
              </div>

              <div className="p-6 bg-neutral-900/50 border-l-2 border-brand-500/50">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-brand-500" />
                  <p className="text-brand-400 text-sm font-display uppercase tracking-wider">Nuestra Solucion</p>
                </div>
                <p className="text-neutral-300 leading-relaxed">{caseStudy.solution}</p>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-500/10 to-transparent border-l-2 border-green-500">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <p className="text-green-400 text-sm font-display uppercase tracking-wider">Resultado</p>
                </div>
                <p className="text-white font-display font-bold text-xl">{caseStudy.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BENEFITS - WHY CHOOSE US
// ============================================
const BenefitsSection: React.FC<{ benefits: string[] }> = ({ benefits }) => {
  const containerRef = useStaggerReveal({ delay: 80, duration: 600, from: 'first' });
  const leftRef = useReveal({ direction: 'left', duration: 800 });

  return (
    <section className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={leftRef as React.RefObject<HTMLDivElement>}>
            <div className="inline-flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-brand-500" />
              <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
                Ventajas Competitivas
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-8 tracking-tight">
              Por que Elegirnos
            </h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              Cada servicio de ADS Security viene respaldado por mas de una decada
              de experiencia, certificaciones internacionales y un compromiso
              inquebrantable con la excelencia operativa.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <StatCounter value={15} suffix="+" label="Anos de Experiencia" />
              <StatCounter value={500} suffix="+" label="Clientes Protegidos" />
            </div>
          </div>

          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="space-y-4"
          >
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 bg-neutral-900/30 border-l-2 border-brand-500 hover:bg-neutral-900/50 hover:border-l-4 transition-all group"
              >
                <CheckCircle2 className="w-6 h-6 text-brand-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-white group-hover:text-brand-100 transition-colors">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const counterRef = useCounter(value, { duration: 2500, suffix });

  return (
    <div className="text-center p-6 border border-neutral-800 bg-neutral-900/30">
      <p
        ref={counterRef as React.RefObject<HTMLParagraphElement>}
        className="text-4xl font-display font-bold text-brand-500"
      >
        0{suffix}
      </p>
      <p className="text-neutral-500 text-sm uppercase tracking-wider mt-2">{label}</p>
    </div>
  );
};

// ============================================
// RELATED SERVICES
// ============================================
const RelatedServicesSection: React.FC<{ currentId: string }> = ({ currentId }) => {
  const relatedServices = getRelatedServices(currentId);
  const containerRef = useStaggerReveal({ delay: 150 });

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
            Servicios Complementarios
          </span>
          <h2 className="mt-4 text-4xl font-display font-bold text-white uppercase tracking-tight">
            Tambien te puede interesar
          </h2>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {relatedServices.map((service) => (
            <Link
              key={service.id}
              to={`/servicios/${service.slug}`}
              className="block group relative overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <ScanlineOverlay intensity="light" animated={false} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <service.icon className="w-5 h-5 text-brand-500" />
                  <span className="text-brand-500 text-xs uppercase tracking-wider font-mono">
                    {service.shortTitle}
                  </span>
                </div>
                <h3 className="text-white font-display font-bold text-lg uppercase group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-neutral-400 group-hover:text-brand-500 transition-colors">
                  <span className="text-sm">Ver detalles</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA BUTTON WITH TACTICAL DESIGN
// ============================================
const CTAButton: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        translateX: [0, 6],
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
    if (glowRef.current) {
      anime({
        targets: glowRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 400,
        easing: 'easeOutCubic'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        translateX: [6, 0],
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
    if (glowRef.current) {
      anime({
        targets: glowRef.current,
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
  };

  return (
    <MagneticElement strength={0.2}>
      <Link
        to="/contacto"
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        {/* Glow effect */}
        <div
          ref={glowRef}
          className="absolute -inset-2 bg-brand-500/30 blur-xl opacity-0"
        />

        {/* Button container */}
        <div className={`relative flex items-center transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
          {/* Left bracket */}
          <div className="relative">
            <div className={`w-3 h-14 border-l-2 border-t-2 border-b-2 transition-colors duration-300 ${isHovered ? 'border-brand-400' : 'border-brand-500'}`} />
          </div>

          {/* Main button body */}
          <div className={`relative px-8 py-4 transition-colors duration-300 ${isHovered ? 'bg-brand-400' : 'bg-brand-500'}`}>
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 transition-colors duration-300 ${isHovered ? 'bg-brand-300' : 'bg-brand-400'}`} />

            <span className="relative z-10 flex items-center gap-4 text-black font-display font-bold uppercase tracking-wider text-sm">
              {text}
              <svg
                ref={iconRef}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300 ${isHovered ? 'bg-brand-600' : 'bg-brand-600/50'}`} />
          </div>

          {/* Right bracket */}
          <div className="relative">
            <div className={`w-3 h-14 border-r-2 border-t-2 border-b-2 transition-colors duration-300 ${isHovered ? 'border-brand-400' : 'border-brand-500'}`} />
          </div>
        </div>
      </Link>
    </MagneticElement>
  );
};

const CTAPhoneButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        rotate: [0, 15],
        scale: [1, 1.1],
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        rotate: [15, 0],
        scale: [1.1, 1],
        duration: 300,
        easing: 'easeOutCubic'
      });
    }
  };

  return (
    <MagneticElement strength={0.2}>
      <a
        href="tel:+51999999999"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <div className={`flex items-center gap-4 px-8 py-4 border-2 font-display uppercase tracking-wider text-sm transition-all duration-300 ${isHovered ? 'border-brand-500 text-brand-500 bg-brand-500/5' : 'border-neutral-700 text-white'}`}>
          <svg
            ref={iconRef}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="font-bold">Llamar Ahora</span>
        </div>

        {/* Corner accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 ${isHovered ? 'border-brand-500' : 'border-transparent'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${isHovered ? 'border-brand-500' : 'border-transparent'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors duration-300 ${isHovered ? 'border-brand-500' : 'border-transparent'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300 ${isHovered ? 'border-brand-500' : 'border-transparent'}`} />
      </a>
    </MagneticElement>
  );
};

// ============================================
// CTA SECTION - INITIATE CONTACT
// ============================================
const CTASection: React.FC<{ ctaText: string, ctaSubtext: string }> = ({ ctaText, ctaSubtext }) => {
  const containerRef = useReveal({ direction: 'up', duration: 1000 });

  return (
    <section className="py-28 bg-gradient-to-b from-neutral-950 to-black relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Particles */}
      <ParticleField
        count={25}
        color="#f59e0b"
        direction="radial"
        speed={0.3}
        size={{ min: 1, max: 2 }}
        className="opacity-40"
      />

      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <GlitchText
          text="Proteja sus Operaciones"
          className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6"
          intensity="low"
          trigger="inView"
        />

        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {ctaSubtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <CTAButton text={ctaText} />
          <CTAPhoneButton />
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex items-center justify-center gap-8 text-neutral-600 text-sm font-mono">
          <span>ISO 27001</span>
          <span className="w-1 h-1 bg-brand-500 rounded-full" />
          <span>SUCAMEC</span>
          <span className="w-1 h-1 bg-brand-500 rounded-full" />
          <span>24/7 SUPPORT</span>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <TacticalHUD variant="brackets" size={120} color="#f59e0b" className="mx-auto mb-8" />
            <h1 className="text-4xl font-display font-bold text-white mb-4 uppercase">
              Objetivo no Encontrado
            </h1>
            <p className="text-neutral-400 mb-8 font-mono">
              ERROR 404: El servicio solicitado no existe en el sistema.
            </p>
            <button
              onClick={() => navigate('/servicios')}
              className="px-8 py-4 bg-brand-500 text-black font-display font-bold uppercase tracking-wider hover:bg-brand-400 transition-colors"
            >
              Regresar a Base
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ServiceHero service={service} />

      {/* Description Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(90deg, #f59e0b 1px, transparent 1px)`,
            backgroundSize: '100px 100%'
          }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="prose prose-invert prose-lg max-w-none">
            {service.longDescription.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-neutral-300 leading-relaxed mb-6 first-letter:text-4xl first-letter:font-display first-letter:text-brand-500 first-letter:mr-1">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <FeaturesGrid features={service.features} />
      <SpecificationsPanel specs={service.specifications} />
      <GallerySection gallery={service.gallery} title={service.shortTitle} />
      <CaseStudySection caseStudy={service.caseStudy} />
      <BenefitsSection benefits={service.benefits} />
      <RelatedServicesSection currentId={service.id} />
      <CTASection ctaText={service.ctaText} ctaSubtext={service.ctaSubtext} />

      {/* Global Styles */}
      <style>{`
        @keyframes scanVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .cursor-blink::after {
          content: '█';
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </PageTransition>
  );
};

export default ServiceDetailPage;
