import React, { useEffect, useRef, useState } from 'react';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/effects/GlitchText';
import ParticleField from '../components/effects/ParticleField';
import TacticalHUD from '../components/effects/TacticalHUD';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Phone, Mail, Send, Clock, Shield,
  Building2, MessageSquare, ChevronRight, ExternalLink,
  Zap, CheckCircle2
} from 'lucide-react';
import { useScramble, useMagnetic, useGlowPulse } from '../hooks/useAnimeEffects';
import gsap from 'gsap';
import anime from 'animejs';

// ============================================
// COMPANY CONTACT DATA
// ============================================
const contactData = {
  direccion: 'Mza. C Lote 14 Dpto. 101, Urb. Las Palmas del Golf',
  distrito: 'Víctor Larco Herrera',
  provincia: 'Trujillo',
  departamento: 'La Libertad',
  telefonoFijo: '(044) 462-XXX',
  celular: '991 96X XXX',
  email: 'contacto@adssecurity.pe',
  ruc: '20477208348',
  horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
};

const mapCoordinates = {
  lat: -8.1194,
  lng: -79.0389,
  zoom: 16
};

// Service options for the form
const serviceOptions = [
  { value: 'security-mining', label: 'Seguridad Minera / Industrial' },
  { value: 'drones', label: 'Vigilancia con Drones' },
  { value: 'physical', label: 'Seguridad Física' },
  { value: 'consulting', label: 'Consultoría de Seguridad' },
  { value: 'other', label: 'Otro' }
];

// ============================================
// HERO COMPONENT
// ============================================
const ContactHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useScramble('ESTAMOS LISTOS PARA PROTEGERTE', { speed: 30, delay: 300 });

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo('.contact-badge',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-pulse',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'elastic.out(1, 0.5)' },
      '-=0.2'
    );

    // Pulse animation with anime.js
    anime({
      targets: '.pulse-ring',
      scale: [1, 2],
      opacity: [0.6, 0],
      duration: 2000,
      loop: true,
      easing: 'easeOutExpo'
    });

    return () => tl.kill();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <ParticleField count={12} color="#06b6d4" direction="up" speed={0.4} />

      {/* Tactical HUD */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <TacticalHUD variant="crosshair" size={500} color="#06b6d4" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Badge with pulse effect */}
        <motion.div
          className="contact-badge relative inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Pulse rings */}
          <div className="pulse-ring absolute inset-0 border border-cyan-500/50 rounded-full" />
          <div className="pulse-ring absolute inset-0 border border-cyan-500/30 rounded-full" style={{ animationDelay: '0.5s' }} />

          <Zap className="w-4 h-4 text-cyan-500" />
          <span className="text-cyan-500 font-mono text-xs tracking-[0.2em] uppercase">
            Respuesta en 24h
          </span>
        </motion.div>

        {/* Main title */}
        <div className="mb-6">
          <GlitchText
            text="CONTÁCTANOS"
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-wider"
            intensity="low"
            trigger="inView"
            as="h1"
          />
        </div>

        {/* Decorative subtitle */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-cyan-500" />
          <span className="text-cyan-500 font-mono text-lg">◈</span>
          <span
            ref={subtitleRef as any}
            className="text-neutral-400 font-mono text-sm md:text-base tracking-[0.15em]"
          >
            ESTAMOS LISTOS PARA PROTEGERTE
          </span>
          <span className="text-cyan-500 font-mono text-lg">◈</span>
          <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-cyan-500" />
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-neutral-500 font-light max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Nuestro equipo de especialistas está listo para diseñar la solución de seguridad que tu empresa necesita.
        </motion.p>
      </div>
    </div>
  );
};

// ============================================
// CONTACT INFO CARD
// ============================================
interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, title, children, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.fromTo(cardRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: delay * 0.15, ease: 'power3.out' }
      );
    }
  }, [isInView, delay]);

  return (
    <div
      ref={cardRef}
      className="group relative p-5 bg-neutral-950 border border-neutral-800 hover:border-cyan-500/40 transition-all duration-500 opacity-0"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />

      <div className="relative flex items-start gap-4">
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all">
          <Icon className="w-5 h-5 text-cyan-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-white uppercase tracking-wide text-sm mb-2">
            {title}
          </h3>
          <div className="text-neutral-400 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CONTACT INFO SECTION
// ============================================
const ContactInfoSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <InfoCard icon={MapPin} title="Sede Central" delay={0}>
        <p>{contactData.direccion}</p>
        <p>{contactData.distrito}, {contactData.provincia}</p>
        <p>{contactData.departamento}, Perú</p>
      </InfoCard>

      <InfoCard icon={Phone} title="Teléfonos" delay={1}>
        <p>Fijo: {contactData.telefonoFijo}</p>
        <p>Celular: {contactData.celular}</p>
      </InfoCard>

      <InfoCard icon={Mail} title="Correo Electrónico" delay={2}>
        <a href={`mailto:${contactData.email}`} className="text-cyan-500 hover:text-cyan-400 transition-colors">
          {contactData.email}
        </a>
      </InfoCard>

      <InfoCard icon={Clock} title="Horario de Atención" delay={3}>
        <p>{contactData.horario}</p>
        <p className="text-cyan-500/70 mt-1">Emergencias: 24/7</p>
      </InfoCard>

      <InfoCard icon={Building2} title="Información Fiscal" delay={4}>
        <p>RUC: <span className="text-white font-mono">{contactData.ruc}</span></p>
        <p className="text-emerald-500/80 flex items-center gap-1 mt-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Activo y Habido</span>
        </p>
      </InfoCard>
    </div>
  );
};

// ============================================
// ANIMATED FORM
// ============================================
const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    nombre: '',
    empresa: '',
    contacto: '',
    servicio: serviceOptions[0].value,
    mensaje: ''
  });

  useEffect(() => {
    if (!formRef.current) return;

    // Animate form fields on mount
    anime({
      targets: formRef.current.querySelectorAll('.form-field'),
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(80, { start: 200 }),
      duration: 600,
      easing: 'easeOutExpo'
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
  };

  const inputClasses = (fieldName: string) => `
    w-full bg-black border p-4 text-white
    focus:outline-none transition-all duration-300
    ${focused === fieldName
      ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
      : 'border-neutral-800 hover:border-neutral-700'
    }
  `;

  return (
    <motion.div
      className="relative bg-neutral-950 border border-neutral-800 p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-brand-500/20 border border-brand-500/30">
          <MessageSquare className="w-5 h-5 text-brand-500" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
            Solicitar Cotización
          </h3>
          <p className="text-neutral-500 text-sm">Complete el formulario y le responderemos en menos de 24 horas</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Name and Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-field space-y-2 opacity-0">
            <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider">
              Nombre Completo
            </label>
            <input
              type="text"
              className={inputClasses('nombre')}
              placeholder="Su nombre"
              value={formState.nombre}
              onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
              onFocus={() => setFocused('nombre')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className="form-field space-y-2 opacity-0">
            <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider">
              Empresa
            </label>
            <input
              type="text"
              className={inputClasses('empresa')}
              placeholder="Nombre de su empresa"
              value={formState.empresa}
              onChange={(e) => setFormState({ ...formState, empresa: e.target.value })}
              onFocus={() => setFocused('empresa')}
              onBlur={() => setFocused(null)}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="form-field space-y-2 opacity-0">
          <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider">
            Email / Teléfono
          </label>
          <input
            type="text"
            className={inputClasses('contacto')}
            placeholder="Contacto directo"
            value={formState.contacto}
            onChange={(e) => setFormState({ ...formState, contacto: e.target.value })}
            onFocus={() => setFocused('contacto')}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Service */}
        <div className="form-field space-y-2 opacity-0">
          <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider">
            Servicio de Interés
          </label>
          <select
            className={inputClasses('servicio')}
            value={formState.servicio}
            onChange={(e) => setFormState({ ...formState, servicio: e.target.value })}
            onFocus={() => setFocused('servicio')}
            onBlur={() => setFocused(null)}
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="form-field space-y-2 opacity-0">
          <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider">
            Mensaje
          </label>
          <textarea
            rows={4}
            className={inputClasses('mensaje')}
            placeholder="Detalle sus necesidades de seguridad..."
            value={formState.mensaje}
            onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
            onFocus={() => setFocused('mensaje')}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Submit Button */}
        <div className="form-field opacity-0">
          <SubmitButton />
        </div>
      </form>
    </motion.div>
  );
};

// ============================================
// ANIMATED SUBMIT BUTTON
// ============================================
const SubmitButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseEnter = () => {
      anime({
        targets: button.querySelector('.btn-bg'),
        scaleX: [0, 1],
        duration: 400,
        easing: 'easeOutExpo'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: button.querySelector('.btn-bg'),
        scaleX: [1, 0],
        duration: 300,
        easing: 'easeInExpo'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="submit"
      className="group relative w-full py-4 bg-transparent border-2 border-brand-500 text-brand-500 font-display font-bold uppercase tracking-wider overflow-hidden transition-colors hover:text-black"
    >
      {/* Background fill */}
      <div className="btn-bg absolute inset-0 bg-brand-500 origin-left scale-x-0" />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        <Send className="w-4 h-4" />
        <span>Enviar Solicitud</span>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
};

// ============================================
// MAP SECTION
// ============================================
const MapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || !mapRef.current) return;

    gsap.fromTo(mapRef.current,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: 'power3.inOut'
      }
    );
  }, [isInView]);

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.8!2d${mapCoordinates.lng}!3d${mapCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDcnMDkuOCJTIDc5wrAwMiczNC4wIlc!5e0!3m2!1ses!2spe!4v1703894400000!5m2!1ses!2spe`;

  return (
    <motion.section
      ref={containerRef}
      className="relative mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Section header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-brand-500/50" />
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-brand-500" />
          <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
            Nuestra Ubicación
          </h3>
        </div>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-brand-500/50" />
      </div>

      {/* Map container */}
      <div className="relative">
        {/* Decorative frame */}
        <div className="absolute -inset-2 border border-neutral-800 pointer-events-none" />

        {/* Corner accents */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-brand-500" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-brand-500" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-brand-500" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-brand-500" />

        {/* Map iframe */}
        <div ref={mapRef} className="relative h-[400px] md:h-[500px] bg-neutral-900 overflow-hidden">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.8)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación ADS Security - Trujillo"
            className="hover:grayscale-0 hover:brightness-100 transition-all duration-700"
          />

          {/* Location overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-black/95 backdrop-blur-sm border border-neutral-700 p-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-500/20 border border-brand-500/30">
                <MapPin className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <div className="font-mono text-xs text-brand-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                  Sede Central
                </div>
                <p className="text-white font-medium mb-1">
                  {contactData.direccion}
                </p>
                <p className="text-neutral-400 text-sm">
                  {contactData.distrito}, {contactData.provincia}, {contactData.departamento}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapCoordinates.lat},${mapCoordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-brand-500 hover:text-brand-400 text-sm font-mono uppercase tracking-wider transition-colors group"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3 h-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// ============================================
// QUICK CONTACT STRIP
// ============================================
const QuickContactStrip: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stripRef.current) return;

    anime({
      targets: stripRef.current.querySelectorAll('.quick-item'),
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutExpo'
    });
  }, []);

  const quickItems = [
    { icon: Shield, text: 'Más de 14 años de experiencia', color: 'text-emerald-500' },
    { icon: Clock, text: 'Atención 24/7 para emergencias', color: 'text-cyan-500' },
    { icon: CheckCircle2, text: 'Certificación RNP activa', color: 'text-brand-500' }
  ];

  return (
    <div ref={stripRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {quickItems.map((item, i) => (
        <div
          key={i}
          className="quick-item flex items-center gap-3 p-4 bg-neutral-950 border border-neutral-800 opacity-0"
        >
          <item.icon className={`w-5 h-5 ${item.color}`} />
          <span className="text-neutral-300 text-sm">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

// ============================================
// MAIN CONTACT COMPONENT
// ============================================
const Contact: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <ContactHero />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Quick info strip */}
        <QuickContactStrip />

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 border border-cyan-500/30">
                <Phone className="w-4 h-4 text-cyan-500" />
              </div>
              <h2 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                Información de Contacto
              </h2>
            </div>
            <ContactInfoSection />
          </div>

          {/* Right: Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <MapSection />
      </div>

      {/* Global styles */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        .pulse-ring:nth-child(2) {
          animation-delay: 0.5s;
        }
      `}</style>
    </PageTransition>
  );
};

export default Contact;
