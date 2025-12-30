import React, { useEffect, useRef } from 'react';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/effects/GlitchText';
import ParticleField from '../components/effects/ParticleField';
import TacticalHUD from '../components/effects/TacticalHUD';
import { motion, useInView } from 'framer-motion';
import { Clock, ShieldCheck, Cpu, Award, MapPin, CheckCircle } from 'lucide-react';
import { useCounter, useScramble } from '../hooks/useAnimeEffects';
import gsap from 'gsap';
import anime from 'animejs';

// ============================================
// MISSION DATA
// ============================================
const missions = [
  {
    id: '001',
    year: '2011',
    title: 'Inicio de Operaciones',
    date: '15 de Marzo, 2011',
    location: 'Trujillo, Perú',
    desc: 'Iniciamos operaciones el 15 de marzo de 2011 como una respuesta a la necesidad de seguridad especializada en la región norte del país.',
    icon: Clock,
    status: 'Hito completado',
    color: '#f59e0b'
  },
  {
    id: '002',
    year: '2014',
    title: 'Formalización Corporativa',
    date: 'Junio, 2014',
    location: 'Trujillo, Perú',
    desc: 'Nos constituimos como Sociedad Anónima Cerrada (S.A.C.), fortaleciendo nuestra estructura legal y operativa para mayor confianza institucional.',
    icon: ShieldCheck,
    status: 'Hito completado',
    color: '#10b981'
  },
  {
    id: '003',
    year: '2018',
    title: 'Expansión al Sector Minero',
    date: 'Agosto, 2018',
    location: 'Alta Montaña, Perú',
    desc: 'Adaptación de estrategias para seguridad en alta montaña y protección de activos en zonas agrestes del sector minero.',
    icon: MountainIcon,
    status: 'Hito completado',
    color: '#6366f1'
  },
  {
    id: '004',
    year: '2021',
    title: 'Innovación Tecnológica',
    date: 'Febrero, 2021',
    location: 'Trujillo, Perú',
    desc: 'Implementación de flota de drones y centros de control con video wall para vigilancia moderna y respuesta inmediata.',
    icon: Cpu,
    status: 'Hito completado',
    color: '#ec4899'
  },
  {
    id: '005',
    year: '2024',
    title: 'Liderazgo Consolidado',
    date: 'Enero, 2024',
    location: 'Norte del Perú',
    desc: 'Somos un socio estratégico confiable en el norte del país, con más de 140 colaboradores activos y presencia regional consolidada.',
    icon: Award,
    status: 'Actualidad',
    color: '#f59e0b'
  }
];

const stats = [
  { label: 'Años de Experiencia', value: 13, suffix: '+' },
  { label: 'Personal Activo', value: 140, suffix: '+' },
  { label: 'Cumplimiento RNP', value: 100, suffix: '%' },
  { label: 'Operación', value: 24, suffix: '/7' }
];

// ============================================
// HELPER ICONS
// ============================================
function MountainIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
    </svg>
  );
}

// ============================================
// HISTORY HERO COMPONENT
// ============================================
const HistoryHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useScramble('NUESTRA TRAYECTORIA', { speed: 40, delay: 500 });

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo('.hero-badge',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
      '-=0.4'
    );

    return () => tl.kill();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <ParticleField count={12} color="#f59e0b" direction="up" speed={0.4} />

      {/* Tactical HUD decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <TacticalHUD variant="full" size={450} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Badge */}
        <motion.div
          className="hero-badge inline-flex items-center gap-2 px-4 py-2 border border-brand-500/50 bg-brand-500/10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          <span className="text-brand-500 font-mono text-xs tracking-[0.3em] uppercase">
            Desde 2011
          </span>
        </motion.div>

        {/* Main title with glitch */}
        <div className="mb-6">
          <GlitchText
            text="NUESTRA HISTORIA"
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-wider"
            intensity="low"
            trigger="inView"
            as="h1"
          />
        </div>

        {/* Decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="hero-line h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-brand-500" />
          <span className="text-brand-500 font-mono text-lg">«</span>
          <span
            ref={subtitleRef as any}
            className="text-neutral-400 font-mono text-sm md:text-base tracking-[0.2em]"
          >
            NUESTRA TRAYECTORIA
          </span>
          <span className="text-brand-500 font-mono text-lg">»</span>
          <div className="hero-line h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-brand-500" />
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-neutral-500 font-light max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Más de una década de compromiso con la seguridad y protección en el norte del Perú.
        </motion.p>
      </div>
    </div>
  );
};

// ============================================
// TACTICAL TIMELINE COMPONENT
// ============================================
const TacticalTimeline: React.FC<{ activeIndex: number; onNodeClick: (i: number) => void }> = ({
  activeIndex,
  onNodeClick
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP: Draw the timeline path
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.fromTo(pathRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%'
          }
        }
      );
    }

    // Anime.js: Pulse animation for nodes
    if (nodesRef.current) {
      anime({
        targets: nodesRef.current.querySelectorAll('.timeline-node'),
        scale: [1, 1.2, 1],
        boxShadow: [
          '0 0 0 rgba(245, 158, 11, 0)',
          '0 0 20px rgba(245, 158, 11, 0.6)',
          '0 0 0 rgba(245, 158, 11, 0)'
        ],
        duration: 2000,
        delay: anime.stagger(300),
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }, []);

  return (
    <div ref={timelineRef} className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-8">
          <span className="text-brand-500 font-mono text-xs tracking-[0.3em] uppercase">
            Hitos Importantes
          </span>
        </div>

        {/* Timeline SVG */}
        <div className="relative h-20">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M 0,40 L 1000,40"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-30"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
          </svg>

          {/* Nodes */}
          <div ref={nodesRef} className="absolute inset-0 flex items-center justify-between px-4">
            {missions.map((mission, i) => (
              <button
                key={mission.id}
                onClick={() => onNodeClick(i)}
                className={`timeline-node relative group transition-all duration-300 ${
                  activeIndex === i ? 'scale-125' : ''
                }`}
              >
                {/* Node circle */}
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    activeIndex === i
                      ? 'bg-brand-500 border-brand-500'
                      : 'bg-neutral-900 border-neutral-600 group-hover:border-brand-500'
                  }`}
                />

                {/* Year label */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs transition-colors ${
                  activeIndex === i ? 'text-brand-500' : 'text-neutral-500 group-hover:text-brand-400'
                }`}>
                  {mission.year}
                </div>

                {/* Hover tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-neutral-900 border border-neutral-700 px-3 py-1 rounded text-xs font-mono text-white whitespace-nowrap">
                    {mission.code}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MILESTONE CARD COMPONENT
// ============================================
const MilestoneCard: React.FC<{ mission: typeof missions[0]; index: number }> = ({ mission, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const titleRef = useScramble(mission.title, { speed: 30, delay: 300 });

  const Icon = mission.icon;

  return (
    <motion.div
      ref={cardRef}
      id={`mission-${mission.id}`}
      className={`relative ${index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative group">
        {/* Card */}
        <div className="relative bg-neutral-950 border border-neutral-800 hover:border-brand-500/50 transition-all duration-500 overflow-hidden">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center border rounded"
                style={{ borderColor: mission.color, color: mission.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-xs text-neutral-500">
                  {mission.year} — {mission.location}
                </div>
                <div
                  ref={isInView ? titleRef as any : null}
                  className="font-display font-bold text-lg text-white uppercase tracking-wide"
                >
                  {mission.title}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-4xl font-bold text-neutral-800">
                {mission.year}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Meta info */}
            <div className="flex items-center gap-6 mb-6 font-mono text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{mission.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{mission.location}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6" />

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed mb-6">
              {mission.desc}
            </p>

            {/* Status */}
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-mono text-xs text-green-500">
                {mission.status}
              </span>
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.03) 50%, transparent 100%)',
                animation: 'scan-line 2s linear infinite'
              }}
            />
          </div>
        </div>

        {/* Connection line to timeline (desktop) */}
        <div className={`hidden md:block absolute top-1/2 h-[2px] bg-gradient-to-r from-brand-500/50 to-transparent w-8 ${
          index % 2 === 0 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full rotate-180'
        }`} />
      </div>
    </motion.div>
  );
};

// ============================================
// STATS SECTION COMPONENT
// ============================================
const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="relative py-24 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-brand-500/50" />
            <span className="font-mono text-xs text-brand-500 tracking-[0.3em] uppercase">
              Nuestros Números
            </span>
            <div className="h-[1px] w-12 bg-brand-500/50" />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative p-6 bg-neutral-950 border border-neutral-800 hover:border-brand-500/30 transition-colors group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-500/30 group-hover:border-brand-500 transition-colors" />

              <StatCounter value={stat.value} suffix={stat.suffix} />
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-500 font-light">
            Comprometidos con la excelencia en seguridad desde 2011
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================
// STAT COUNTER COMPONENT
// ============================================
const StatCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const counterRef = useCounter(value, { duration: 2500, delay: 200, suffix, separator: false });

  return (
    <div
      ref={counterRef as any}
      className="font-display text-4xl md:text-5xl font-bold text-brand-500"
    >
      0{suffix}
    </div>
  );
};

// ============================================
// MAIN HISTORY COMPONENT
// ============================================
const History: React.FC = () => {
  const [activeTimelineIndex, setActiveTimelineIndex] = React.useState(0);

  const handleNodeClick = (index: number) => {
    setActiveTimelineIndex(index);
    const element = document.getElementById(`mission-${missions[index].id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <PageTransition>
      {/* Hero section */}
      <HistoryHero />

      {/* Timeline navigation */}
      <TacticalTimeline
        activeIndex={activeTimelineIndex}
        onNodeClick={handleNodeClick}
      />

      {/* Milestone cards */}
      <div className="relative py-16 px-4">
        {/* Vertical center line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent transform -translate-x-1/2" />

        <div className="max-w-5xl mx-auto space-y-16">
          {missions.map((mission, index) => (
            <MilestoneCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </div>

      {/* Stats section */}
      <StatsSection />

      {/* Global styles */}
      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </PageTransition>
  );
};

export default History;
