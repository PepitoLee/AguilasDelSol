import React, { useEffect, useRef } from 'react';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/effects/GlitchText';
import ParticleField from '../components/effects/ParticleField';
import TacticalHUD from '../components/effects/TacticalHUD';
import { motion, useInView } from 'framer-motion';
import {
  Building2, FileCheck, Users, Calendar, MapPin,
  BadgeCheck, Briefcase, Hash, Shield, Award
} from 'lucide-react';
import { useCounter, useScramble } from '../hooks/useAnimeEffects';
import gsap from 'gsap';
import anime from 'animejs';

// ============================================
// COMPANY DATA
// ============================================
const companyInfo = {
  razonSocial: 'CORPORACION AGUILAS DEL SOL S.A.C.',
  nombreComercial: 'ADS Security',
  ruc: '20477208348',
  estado: 'Activo',
  condicion: 'Habido',
  direccion: 'Mza. C Lote 14 Dpto. 101, Urb. Las Palmas del Golf',
  distrito: 'Víctor Larco Herrera',
  provincia: 'Trujillo',
  departamento: 'La Libertad',
  inicioActividades: '15 de Marzo de 2011',
  trabajadores: 143,
  ciiu: '74927',
  actividadEconomica: 'Actividades de investigación y seguridad',
  certificaciones: ['Registro Nacional de Proveedores (RNP)', 'Habilitado para contratar con el Estado Peruano']
};

// ============================================
// HERO COMPONENT
// ============================================
const DocumentationHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useScramble('PERFIL CORPORATIVO OFICIAL', { speed: 35, delay: 400 });

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo('.doc-badge',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.doc-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
      '-=0.3'
    );

    return () => tl.kill();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <ParticleField count={10} color="#10b981" direction="up" speed={0.3} />

      {/* Tactical HUD decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <TacticalHUD variant="brackets" size={600} color="#10b981" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Verified badge */}
        <motion.div
          className="doc-badge inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/50 bg-emerald-500/10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BadgeCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] uppercase">
            Empresa Verificada • RNP Activo
          </span>
        </motion.div>

        {/* Main title */}
        <div className="mb-6">
          <GlitchText
            text="IDENTIDAD CORPORATIVA"
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-wider"
            intensity="low"
            trigger="inView"
            as="h1"
          />
        </div>

        {/* Decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="doc-line h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-emerald-500" />
          <span className="text-emerald-500 font-mono text-lg">◆</span>
          <span
            ref={subtitleRef as any}
            className="text-neutral-400 font-mono text-sm md:text-base tracking-[0.15em]"
          >
            PERFIL CORPORATIVO OFICIAL
          </span>
          <span className="text-emerald-500 font-mono text-lg">◆</span>
          <div className="doc-line h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-emerald-500" />
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-neutral-500 font-light max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Información legal, administrativa y de contacto de nuestra corporación.
        </motion.p>
      </div>
    </div>
  );
};

// ============================================
// DATA FIELD COMPONENT
// ============================================
interface DataFieldProps {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  delay?: number;
}

const DataField: React.FC<DataFieldProps> = ({ icon: Icon, label, value, highlight = false, delay = 0 }) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(fieldRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && fieldRef.current) {
      gsap.fromTo(fieldRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: delay * 0.1, ease: 'power2.out' }
      );
    }
  }, [isInView, delay]);

  return (
    <div
      ref={fieldRef}
      className={`group p-4 border transition-all duration-300 opacity-0 ${
        highlight
          ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60'
          : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded transition-colors ${
          highlight
            ? 'bg-emerald-500/20 text-emerald-500'
            : 'bg-neutral-800 text-neutral-400 group-hover:text-brand-500'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {label}
          </div>
          <div className={`font-medium break-words ${highlight ? 'text-emerald-400' : 'text-white'}`}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPANY CARD COMPONENT
// ============================================
const CompanyCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && cardRef.current) {
      // Anime.js: Stagger animation for data fields
      anime({
        targets: cardRef.current.querySelectorAll('.data-row'),
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(80),
        duration: 600,
        easing: 'easeOutExpo'
      });
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Card header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-wide">
                {companyInfo.nombreComercial}
              </h2>
              <p className="text-neutral-400 text-sm font-mono">
                {companyInfo.razonSocial}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 uppercase">
                {companyInfo.estado} • {companyInfo.condicion}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Data grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="data-row">
          <DataField icon={Hash} label="RUC" value={companyInfo.ruc} highlight delay={0} />
        </div>
        <div className="data-row">
          <DataField icon={Briefcase} label="Actividad Económica" value={companyInfo.actividadEconomica} delay={1} />
        </div>
        <div className="data-row">
          <DataField icon={FileCheck} label="CIIU" value={companyInfo.ciiu} delay={2} />
        </div>
        <div className="data-row">
          <DataField icon={Calendar} label="Inicio de Actividades" value={companyInfo.inicioActividades} delay={3} />
        </div>
        <div className="data-row md:col-span-2">
          <DataField icon={MapPin} label="Sede Central" value={`${companyInfo.direccion}, ${companyInfo.distrito}, ${companyInfo.provincia}, ${companyInfo.departamento}`} delay={4} />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// STATS CARDS COMPONENT
// ============================================
const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard value={14} suffix="+" label="Años de Experiencia" icon={Calendar} delay={0} />
      <StatCard value={143} suffix="" label="Colaboradores" icon={Users} delay={1} />
      <StatCard value={100} suffix="%" label="Cumplimiento RNP" icon={Shield} delay={2} />
      <StatCard value={24} suffix="/7" label="Operación" icon={Briefcase} delay={3} />
    </div>
  );
};

const StatCard: React.FC<{ value: number; suffix: string; label: string; icon: React.ElementType; delay: number }> = ({
  value, suffix, label, icon: Icon, delay
}) => {
  const counterRef = useCounter(value, { duration: 2000, delay: delay * 150, suffix, separator: false });

  return (
    <motion.div
      className="relative p-6 bg-neutral-950 border border-neutral-800 hover:border-emerald-500/30 transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors" />

      {/* Icon */}
      <Icon className="w-5 h-5 text-emerald-500/50 mb-3" />

      {/* Value */}
      <div
        ref={counterRef as any}
        className="font-display text-3xl md:text-4xl font-bold text-emerald-500"
      >
        0{suffix}
      </div>

      {/* Label */}
      <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mt-1">
        {label}
      </div>
    </motion.div>
  );
};

// ============================================
// CERTIFICATIONS COMPONENT
// ============================================
const Certifications: React.FC = () => {
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!certRef.current) return;

    anime({
      targets: certRef.current.querySelectorAll('.cert-badge'),
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 500,
      easing: 'easeOutBack'
    });
  }, []);

  return (
    <motion.div
      ref={certRef}
      className="p-6 border border-neutral-800 bg-neutral-950"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-5 h-5 text-brand-500" />
        <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
          Certificaciones y Habilitaciones
        </h3>
      </div>

      <div className="space-y-3">
        {companyInfo.certificaciones.map((cert, i) => (
          <div
            key={i}
            className="cert-badge flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 hover:border-brand-500/30 transition-colors opacity-0"
          >
            <div className="w-8 h-8 bg-brand-500/20 flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-brand-500" />
            </div>
            <span className="text-neutral-300 text-sm">{cert}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};


// ============================================
// MAIN DOCUMENTATION COMPONENT
// ============================================
const Documentation: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero section */}
      <DocumentationHero />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Company Card */}
        <section>
          <CompanyCard />
        </section>

        {/* Stats */}
        <section>
          <StatsCards />
        </section>

        {/* Certifications */}
        <section>
          <Certifications />
        </section>

        {/* Footer note */}
        <motion.div
          className="text-center py-8 border-t border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-500 text-sm">
            Información verificable en{' '}
            <a
              href="https://www.sunat.gob.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:text-brand-400 transition-colors"
            >
              SUNAT
            </a>
            {' '}y{' '}
            <a
              href="https://www.rnp.gob.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:text-brand-400 transition-colors"
            >
              Registro Nacional de Proveedores
            </a>
          </p>
        </motion.div>
      </div>

      {/* Global styles */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </PageTransition>
  );
};

export default Documentation;
