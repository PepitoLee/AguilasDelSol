import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, animate } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Crosshair, Shield, Users, Database, Globe, ChevronRight, Eye, Radio, Zap, Lock, Mountain, ScanLine, Activity, CheckCircle2, Fingerprint, Aperture, Terminal, History, Clock, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// --- UTILS & SHARED UI ---
const SectionHeader = ({ title, sub, align = 'left' }: { title: string, sub: string, align?: 'left' | 'center' | 'right' }) => (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
        <div className={`inline-flex items-center gap-2 text-brand-500 font-mono text-xs tracking-widest uppercase mb-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <Crosshair className="w-4 h-4" />
            <span>System_Section // {title.substring(0, 3)}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-none mb-4">
            {title}
        </h2>
        <p className={`text-neutral-400 max-w-xl text-lg ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
            {sub}
        </p>
    </div>
);

const ViewMoreBtn = ({ to }: { to: string }) => (
    <Link to={to} className="group inline-flex items-center gap-4 px-6 py-3 bg-transparent border border-neutral-700 hover:border-brand-500 transition-colors">
        <span className="font-display font-bold text-white uppercase tracking-widest text-sm group-hover:text-brand-500 transition-colors">
            Acceso Total
        </span>
        <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
    </Link>
);

// --- 1. SERVICES: STRATEGIC PERIMETER SCAN ---
const STRATEGIC_SERVICES = [
    {
        id: "01",
        slug: "seguridad-patrimonial-minera",
        title: "Seguridad Patrimonial",
        desc: "Protección integral de grandes extensiones, campamentos y maquinaria pesada en zonas agrestes.",
        icon: Mountain,
        images: [
            "/images/services/seguridad-patrimonial/1.jpeg",
            "/images/services/seguridad-patrimonial/2.jpeg",
            "/images/services/seguridad-patrimonial/3.jpeg",
            "/images/services/seguridad-patrimonial/4.jpeg"
        ],
        fallbackImg: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "02",
        slug: "vigilancia-aerea-uav",
        title: "Vigilancia Aérea (UAV)",
        desc: "Flota DJI Matrice/Mavic con visión térmica/nocturna y Smart Track para seguimiento de intrusos.",
        icon: Globe,
        images: [
            "/images/services/vigilancia-uav/1 drone.jpeg",
            "/images/services/vigilancia-uav/2 drone.jpeg",
            "/images/services/vigilancia-uav/3 drone.jpeg",
            "/images/services/vigilancia-uav/4 drone.jpeg"
        ],
        fallbackImg: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "03",
        slug: "centro-control-cctv",
        title: "Centro de Control",
        desc: "Gestión centralizada con analítica Smart PSS y comunicación radial en tiempo real.",
        icon: Eye,
        images: [
            "/images/services/centro-control/1.jpeg",
            "/images/services/centro-control/2.jpeg",
            "/images/services/centro-control/3.jpeg",
            "/images/services/centro-control/4.jpeg"
        ],
        fallbackImg: "https://images.unsplash.com/photo-1551808525-51a943718d53?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "04",
        slug: "unidades-tacticas",
        title: "Unidades Tácticas",
        desc: "Personal 'robocop' altamente entrenado para control de masas y defensa de perímetros.",
        icon: Users,
        images: [
            "/images/services/unidades-tacticas/1.jpeg",
            "/images/services/unidades-tacticas/2.jpeg",
            "/images/services/unidades-tacticas/3.jpeg",
            "/images/services/unidades-tacticas/4.jpeg"
        ],
        fallbackImg: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "05",
        slug: "reaccion-inmediata",
        title: "Reacción Inmediata",
        desc: "Neutralización de intrusiones y recuperación de activos en terrenos difíciles.",
        icon: Zap,
        images: [
            "/images/services/reaccion-inmediata/1.jpeg",
            "/images/services/reaccion-inmediata/2.jpeg",
            "/images/services/reaccion-inmediata/3.jpeg",
            "/images/services/reaccion-inmediata/4.jpeg"
        ],
        fallbackImg: "https://images.unsplash.com/photo-1625624773836-82b434455822?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "06",
        slug: "control-accesos",
        title: "Control de Accesos",
        desc: "Gestión rigurosa de entradas/salidas garantizando hermetismo en puntos neurálgicos.",
        icon: Lock,
        images: [
            "/images/services/control-accesos/1.jpeg",
            "/images/services/control-accesos/2.jpeg",
            "/images/services/control-accesos/3.jpeg",
            "/images/services/control-accesos/4.jpeg"
        ],
        fallbackImg: "https://images.unsplash.com/photo-1581093588402-41141199a086?q=80&w=800&auto=format&fit=crop"
    }
];

// Service Card with Image Cycling
const ServiceCard = ({ item, isMobile }: { item: typeof STRATEGIC_SERVICES[0], isMobile: boolean }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Mobile: Auto-cycle every 2 seconds
        // Desktop: Cycle on hover every 1.2 seconds
        if (isMobile) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
            }, 2000);
        } else if (isHovered) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
            }, 1200);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setCurrentImageIndex(0);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, isMobile, item.images.length]);

    return (
        <Link
            to={`/servicios/${item.slug}`}
            className={`relative flex-shrink-0 group block ${isMobile ? 'w-[80vw] h-full' : 'w-[450px] h-full'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* CARD FRAME */}
            <div className="w-full h-full relative overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-brand-500 transition-colors duration-500">

                {/* 1. BACKGROUND WITH IMAGE CYCLING */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="parallax-bg w-[130%] -left-[15%] h-full relative">
                        {item.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${item.title} ${idx + 1}`}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = item.fallbackImg;
                                }}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                                    idx === currentImageIndex
                                        ? 'opacity-60 scale-100'
                                        : 'opacity-0 scale-105'
                                } ${!isMobile && isHovered ? 'grayscale-0' : 'grayscale'}`}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.5)_2px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
                    </div>
                </div>

                {/* 2. IMAGE INDICATORS */}
                <div className="absolute top-4 left-4 z-20 flex gap-1">
                    {item.images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 transition-all duration-300 ${
                                idx === currentImageIndex
                                    ? 'w-6 bg-brand-500'
                                    : 'w-2 bg-neutral-600'
                            }`}
                        />
                    ))}
                </div>

                {/* 3. FOREGROUND ID */}
                <div className="absolute top-4 right-4 z-10 opacity-30">
                    <span className="font-display font-bold text-6xl text-transparent stroke-text leading-none">
                        {item.id}
                    </span>
                </div>

                {/* 4. CONTENT */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <div className="inline-flex p-3 bg-black/50 backdrop-blur-sm border border-brand-500/30 text-brand-500 mb-6">
                        <item.icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-3xl font-display font-bold text-white uppercase mb-4 leading-none group-hover:text-brand-400 transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-neutral-400 text-sm line-clamp-3 mb-6 border-l-2 border-brand-500 pl-4 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                    </p>

                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-brand-500 transition-colors gap-2">
                        Ver Detalles <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* DECORATIVE CORNERS */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </Link>
    );
};

export const HomeServices = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 1024 : false
    );
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
        };
        checkMobile();

        // Mark as ready after a short delay to ensure DOM is measured correctly
        const readyTimer = setTimeout(() => setIsReady(true), 200);

        // Refresh ScrollTrigger on resize (important for orientation changes)
        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            checkMobile();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(readyTimer);
            clearTimeout(resizeTimer);
        };
    }, []);

    // GSAP horizontal scroll on vertical scroll - works on BOTH mobile and desktop
    useLayoutEffect(() => {
        if (!isReady) return;

        let ctx: gsap.Context | null = null;

        // Longer delay for mobile to ensure DOM is fully ready
        const timer = setTimeout(() => {
            if (!containerRef.current || !triggerRef.current) return;

            ctx = gsap.context(() => {
                const container = containerRef.current!;
                const trigger = triggerRef.current!;

                // Force recalculation of dimensions
                ScrollTrigger.refresh();

                const scrollWidth = container.scrollWidth;
                const viewportWidth = trigger.offsetWidth;
                const distance = scrollWidth - viewportWidth;

                if (distance <= 0) return;

                // Horizontal Scroll - same experience on mobile and desktop
                gsap.to(container, {
                    x: -distance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        pin: true,
                        pinSpacing: true,
                        scrub: isMobile ? 1 : 0.5,
                        start: "top top",
                        end: () => "+=" + (distance * (isMobile ? 1.5 : 1.5)),
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        fastScrollEnd: true,
                        preventOverlaps: true,
                        onUpdate: (self) => {
                            if (progressBarRef.current) {
                                gsap.set(progressBarRef.current, { scaleX: self.progress });
                            }
                        }
                    }
                });

                // Parallax Effect - only on desktop for performance
                if (!isMobile) {
                    gsap.utils.toArray(".parallax-bg").forEach((bg: any) => {
                        gsap.to(bg, {
                            xPercent: 15,
                            ease: "none",
                            scrollTrigger: {
                                trigger: trigger,
                                start: "top top",
                                end: () => "+=" + (distance * 1.5),
                                scrub: true,
                                invalidateOnRefresh: true
                            }
                        });
                    });
                }

            }, sectionRef);

        }, isMobile ? 300 : 150);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === triggerRef.current) {
                    st.kill();
                }
            });
        };
    }, [isMobile, isReady]);

    return (
        <section ref={sectionRef} className="bg-black relative overflow-hidden">
            <div ref={triggerRef} className="w-full h-screen flex flex-col relative">

                {/* --- GLOBAL BACKGROUND --- */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-500/10" />
                    <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5" />
                    <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
                </div>

                {/* --- HEADER --- */}
                <div className="absolute top-0 left-0 w-full z-40 p-6 md:p-12 pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 text-brand-500 font-mono text-xs mb-2">
                                <ScanLine className="w-4 h-4 animate-pulse" />
                                <span>PERIMETER_SCAN // ACTIVE</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase shadow-black drop-shadow-md">
                                Servicios Estratégicos
                            </h2>
                        </div>
                    </div>
                </div>

                {/* --- HORIZONTAL TRACK --- */}
                <div className="flex-grow flex items-center z-20 overflow-hidden pl-[5vw] pr-[20vw]">
                    <div
                        ref={containerRef}
                        className="flex gap-4 md:gap-6 items-center h-[60vh] md:h-[70vh]"
                        style={{ width: 'max-content' }}
                    >
                        {STRATEGIC_SERVICES.map((item) => (
                            <ServiceCard key={item.id} item={item} isMobile={isMobile} />
                        ))}
                    </div>
                </div>

                {/* --- HUD FOOTER --- */}
                <div className="absolute bottom-0 left-0 w-full z-30 bg-neutral-950 border-t border-neutral-800">
                    <div className="w-full h-1 bg-neutral-800 relative">
                        <div ref={progressBarRef} className="absolute top-0 left-0 h-full bg-brand-500 w-full origin-left scale-x-0" />
                    </div>
                    <div className="flex justify-between items-center px-6 md:px-12 py-4 font-mono text-xs text-neutral-500">
                        <div className="flex gap-4 md:gap-8">
                            <span className="hidden md:inline">SYSTEM STATUS: OPTIMAL</span>
                            <span className="animate-pulse text-brand-500">● LIVE FEED</span>
                        </div>
                        <div>
                            SCROLL TO NAVIGATE
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.5);
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                /* Mobile touch scrolling fix */
                @media (max-width: 1023px) {
                    .pin-spacer {
                        touch-action: pan-y !important;
                        -webkit-overflow-scrolling: touch !important;
                    }
                }
            `}</style>
        </section>
    );
};

// --- 2. ABOUT: THE BIOMETRIC FEED ---

// Helper: Decrypted Text Effect
const DecryptedText = ({ text, className = "" }: { text: string, className?: string }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!inView) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [inView, text]);

    return <span ref={ref} className={className}>{displayText}</span>;
};

// Helper: Live Counter
const LiveCounter = ({ to, label }: { to: number, label: string }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (!inView) return;
        const node = nodeRef.current;
        if (node) {
            const controls = animate(0, to, {
                duration: 2,
                ease: "circOut",
                onUpdate: (value) => {
                    node.textContent = Math.round(value).toString();
                }
            });
            return () => controls.stop();
        }
    }, [to, inView]);

    return (
        <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
                <span ref={nodeRef} className="text-4xl md:text-5xl font-display font-bold text-white">0</span>
                <span className="text-brand-500 font-bold text-2xl">+</span>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{label}</span>
        </div>
    );
};

export const HomeAbout = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Video entrance effect on scroll (sin filtros)
            gsap.fromTo(videoRef.current,
                { scale: 1.05, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "center center",
                        scrub: 1
                    }
                }
            );

            // Connect circuit lines
            gsap.fromTo(".circuit-line",
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".data-panel",
                        start: "top 80%"
                    }
                }
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-black relative border-t border-neutral-900 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* --- HEADER --- */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-brand-500 font-mono text-xs tracking-widest uppercase mb-2">
                            <Terminal className="w-4 h-4" />
                            <DecryptedText text="SYSTEM_ANALYSIS // LIVE" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase leading-none">
                            <DecryptedText text="IDENTIDAD" /> <span className="text-neutral-600">OPERATIVA</span>
                        </h2>
                    </div>
                    <p className="text-neutral-400 max-w-md text-sm md:text-base border-l-2 border-brand-500 pl-4">
                        Transformamos la incertidumbre en datos procesables. Somos el estándar de seguridad para el sector industrial.
                    </p>
                </div>

                {/* --- BIOMETRIC FEED LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">

                    {/* COL 1: THE FEED (Video Source) - Spans 7 cols */}
                    <div className="lg:col-span-7 relative group">
                        {/* Video Frame */}
                        <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden clip-path-corner border border-neutral-800 group-hover:border-brand-500/30 transition-colors">
                            <video
                                ref={videoRef}
                                src="/videos/ads-intro.mp4"
                                autoPlay muted loop playsInline
                                className="w-full h-full object-cover"
                            />

                            {/* Minimal Overlay */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* REC indicator */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-xs text-white bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    REC
                                </div>

                                {/* Timestamp */}
                                <div className="absolute top-4 right-16 font-mono text-xs text-white/80 bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
                                    {time}
                                </div>
                            </div>

                            {/* Sound Toggle Button */}
                            <button
                                onClick={toggleMute}
                                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-brand-500/80 rounded backdrop-blur-sm transition-all duration-300 group/sound"
                                title={isMuted ? "Activar sonido" : "Silenciar"}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-4 h-4 text-white/80 group-hover/sound:text-white" />
                                ) : (
                                    <Volume2 className="w-4 h-4 text-brand-500 group-hover/sound:text-white" />
                                )}
                            </button>
                        </div>

                        {/* Connection Points (Desktop Only) */}
                        <div className="hidden lg:block absolute top-1/4 -right-8 w-8 h-[1px] bg-neutral-700 circuit-line origin-left" />
                        <div className="hidden lg:block absolute bottom-1/4 -right-8 w-8 h-[1px] bg-neutral-700 circuit-line origin-left" />
                    </div>

                    {/* COL 2: THE ANALYSIS (Data) - Spans 5 cols */}
                    <div className="lg:col-span-5 data-panel flex flex-col justify-center lg:pl-8 space-y-8 relative">
                        {/* Vertical Line Connector */}
                        <div className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-neutral-800" />

                        {/* Stat Block 1: Agents */}
                        <div className="relative pl-6 lg:pl-8 border-l border-neutral-800 lg:border-none">
                            <div className="hidden lg:block absolute top-1/2 -left-8 w-8 h-[1px] bg-neutral-700 circuit-line origin-left" />
                            <div className="flex items-center gap-3 mb-2 text-brand-500">
                                <Users className="w-5 h-5" />
                                <h4 className="font-display font-bold uppercase tracking-wider text-sm">Fuerza Operativa</h4>
                            </div>
                            <LiveCounter to={140} label="Agentes Desplegados" />
                            <div className="mt-2 w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-brand-500"
                                />
                            </div>
                        </div>

                        {/* Stat Block 2: RNP */}
                        <div className="relative pl-6 lg:pl-8 border-l border-neutral-800 lg:border-none">
                            <div className="hidden lg:block absolute top-1/2 -left-8 w-8 h-[1px] bg-neutral-700 circuit-line origin-left" />
                            <div className="flex items-center gap-3 mb-2 text-brand-500">
                                <Fingerprint className="w-5 h-5" />
                                <h4 className="font-display font-bold uppercase tracking-wider text-sm">Validación Estatal</h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-display font-bold text-white">RNP</span>
                                <div className="px-3 py-1 bg-green-900/20 border border-green-500/30 text-green-500 text-xs font-bold uppercase flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" /> Verificado
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500 font-mono">
                                LICENCIA VIGENTE ID: 884-XJ-99
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="pl-6 lg:pl-8 pt-4">
                            <Link to="/nosotros" className="group relative inline-flex items-center justify-center px-8 py-4 bg-neutral-900 border border-neutral-700 hover:border-brand-500 transition-all overflow-hidden clip-path-btn">
                                <div className="absolute inset-0 bg-brand-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative font-display font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-brand-500" />
                                    Acceso Total
                                </span>
                                {/* Small LED */}
                                <div className="absolute top-2 right-2 w-1 h-1 bg-neutral-700 group-hover:bg-green-500 transition-colors rounded-full" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .clip-path-corner {
                    clip-path: polygon(
                        0 0,
                        100% 0,
                        100% calc(100% - 20px),
                        calc(100% - 20px) 100%,
                        0 100%,
                        0 20px,
                        20px 0
                    );
                }
                .clip-path-btn {
                    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                }
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>
        </section>
    );
};

// --- 3. HISTORY: THE TEMPORAL REACTOR ---
// Cyber-Industrial Implementation

const ReactorRing = ({ className, duration, reverse = false }: { className: string, duration: number, reverse?: boolean }) => (
    <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-0 rounded-full border border-neutral-800 ${className}`}
    />
);

export const HomeHistory = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden border-t border-neutral-900">
            {/* ATMOSPHERE */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-50" />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">

                {/* LEFT: DATA STREAM LOG */}
                <div className="lg:w-1/2 relative">
                    <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-neutral-800 hidden xl:block">
                        <div className="absolute top-0 left-0 w-full h-24 bg-brand-500/50 animate-scan" />
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 bg-brand-500 animate-pulse" />
                        <span className="font-mono text-xs text-brand-500 tracking-[0.3em] uppercase">Temporal_Sequence // Active</span>
                    </div>

                    <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase leading-[0.85] mb-8 mix-blend-difference">
                        LEGADO<br />
                        <span className="text-transparent stroke-text-bold">TÁCTICO</span>
                    </h2>

                    <p className="text-neutral-400 text-lg leading-relaxed max-w-xl border-l-2 border-brand-500 pl-6 mb-12">
                        Evolución constante desde 2011. Transformando <span className="text-white font-bold">vigilancia perimetral</span> en inteligencia estratégica corporativa.
                    </p>

                    <Link to="/historia" className="group inline-flex items-center gap-4 px-8 py-4 bg-neutral-900 border border-neutral-800 hover:border-brand-500 transition-all">
                        <span className="font-mono text-xs text-brand-500 uppercase tracking-widest">Acceder a Línea de Tiempo</span>
                        <ChevronRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* RIGHT: REACTOR CORE */}
                <div className="lg:w-1/2 flex justify-center perspective-1000">
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center group">

                        {/* Glow Core */}
                        <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />

                        {/* RINGS */}
                        <ReactorRing className="border-dashed opacity-30 border-t-white/50" duration={60} />
                        <ReactorRing className="w-[80%] h-[80%] border-brand-500/20 border-l-brand-500" duration={40} reverse />
                        <ReactorRing className="w-[60%] h-[60%] border-dotted border-white/20" duration={20} />

                        {/* Static Crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <div className="w-[120%] h-[1px] bg-white" />
                            <div className="h-[120%] w-[1px] bg-white" />
                        </div>

                        {/* CENTER DATA */}
                        <div className="relative z-20 w-64 h-64 bg-black border border-neutral-700 rounded-full flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-500 box-shadow-glow">
                            <span className="font-display font-bold text-9xl text-white tracking-tighter leading-none mix-blend-screen">
                                12
                            </span>
                            <span className="absolute bottom-10 font-mono text-[10px] text-brand-500 tracking-[0.5em] bg-black px-2">
                                AÑOS.EXP
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM: DATA STREAM SCROLL */}
            <div className="mt-24 border-y border-neutral-900 bg-neutral-950/50 py-4 md:py-6 overflow-hidden relative">
                <div className="marquee-track flex whitespace-nowrap font-mono text-2xl md:text-4xl font-bold text-neutral-800 select-none">
                    {/* First set */}
                    <div className="marquee-content flex animate-marquee">
                        {[...Array(14)].map((_, i) => (
                            <span key={`a-${i}`} className="mx-4 md:mx-8 hover:text-brand-500 transition-colors">
                                {2011 + i} ///
                            </span>
                        ))}
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="marquee-content flex animate-marquee">
                        {[...Array(14)].map((_, i) => (
                            <span key={`b-${i}`} className="mx-4 md:mx-8 hover:text-brand-500 transition-colors">
                                {2011 + i} ///
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .stroke-text-bold {
                    -webkit-text-stroke: 2px rgba(255,255,255,0.8);
                }
                .box-shadow-glow {
                    box-shadow: 0 0 50px rgba(56,189,248,0.1);
                }
                .marquee-track {
                    width: max-content;
                }
                .animate-marquee {
                    animation: marquee-scroll 12s linear infinite;
                }
                @media (max-width: 768px) {
                    .animate-marquee {
                        animation: marquee-scroll 8s linear infinite;
                    }
                }
                @keyframes marquee-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
            `}</style>
        </section>
    );
};


// --- 4. DOCUMENTATION: SECURE CYBER-INDUSTRIAL VAULT ---
// V2 Implementation: RGB Glitch & High Density

// Helper: RGB Glitch Text
const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => (
    <div className={`relative inline-block group ${className}`}>
        <span className="relative z-10">{text}</span>
        <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 mix-blend-screen select-none clip-glitch-1">
            {text}
        </span>
        <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 mix-blend-screen select-none clip-glitch-2">
            {text}
        </span>
    </div>
);

// Helper: Data Holo Card V2
const HoloCardV2 = ({ title, type, serial, delay }: { title: string, type: string, serial: string, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay }}
            className="relative h-64 w-full group select-none"
        >
            <div className="absolute inset-0 bg-neutral-900 border border-neutral-800 transition-all duration-300 group-hover:border-brand-500/50">

                {/* 1. INTERNAL NOISE & GRID */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(0deg,transparent_24%,rgba(56,189,248,0.3)_25%,rgba(56,189,248,0.3)_26%,transparent_27%,transparent_74%,rgba(56,189,248,0.3)_75%,rgba(56,189,248,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(56,189,248,0.3)_25%,rgba(56,189,248,0.3)_26%,transparent_27%,transparent_74%,rgba(56,189,248,0.3)_75%,rgba(56,189,248,0.3)_76%,transparent_77%,transparent)] bg-[size:30px_30px]" />

                {/* 2. HOVER SCANLINE FILL */}
                <div className="absolute inset-0 bg-brand-500/10 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out" />

                {/* 3. CONTENT LAYOUT */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    {/* Top Meta */}
                    <div className="flex justify-between items-start font-mono text-[10px] text-neutral-500">
                        <span className="group-hover:text-brand-500 transition-colors">//{type}</span>
                        <span className="border border-neutral-800 px-1 group-hover:border-brand-500 transition-colors">{serial}</span>
                    </div>

                    {/* Center Graphic/Icon (Abstract) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-neutral-800 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-brand-500 transition-all duration-500">
                        <div className="w-1 h-1 bg-neutral-600 group-hover:bg-brand-500 rounded-full" />
                        <div className="absolute inset-0 border-t border-brand-500/30 animate-spin-slow opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Bottom Title */}
                    <div>
                        <GlitchText text={title} className="font-display font-bold text-2xl text-white uppercase" />
                        <div className="mt-2 h-[2px] w-8 bg-neutral-700 group-hover:w-full group-hover:bg-brand-500 transition-all duration-500" />
                    </div>
                </div>

                {/* 4. CORNER DECORATORS */}
                <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-l-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors" />
                <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-r-2 border-b-2 border-neutral-700 group-hover:border-brand-500 transition-colors" />
            </div>
        </motion.div>
    );
}

export const HomeDocs = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-neutral-900">
            {/* --- CYBER ATMOSPHERE --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Global Scanline */}
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[size:100%_4px] z-20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-brand-500/10 to-transparent animate-scan-global z-20 pointer-events-none" />

                {/* Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10" />
            </div>

            <div className="relative z-30 max-w-[1400px] mx-auto px-6">

                {/* HEADER LAYOUT: ASYMMETRIC */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 border-b border-neutral-800 pb-8 relative">
                    <div className="relative">
                        <div className="absolute -left-12 top-0 bottom-0 w-1 bg-brand-500 hidden md:block" />
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-brand-500 animate-pulse" />
                            <span className="font-mono text-xs text-brand-500 tracking-widest">DATA_VAULT_ACCESS</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.8] tracking-tighter mix-blend-difference">
                            ARCHIVO<br /><span className="text-neutral-800 text-stroke-white">SEGURO</span>
                        </h2>
                    </div>

                    <div className="md:text-right mt-8 md:mt-0 font-mono text-xs text-neutral-500 space-y-2">
                        <p>ENCRYPTION: AES-256-GCM</p>
                        <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                        <p>LATENCY: 4ms</p>
                    </div>

                    {/* Decorative Code Block */}
                    <div className="absolute -right-4 -bottom-4 font-mono text-[10px] text-neutral-800 opacity-50 hidden xl:block text-right">
                        0x4F 0x4B 0x00<br />0x1A 0xB2 0xFF
                    </div>
                </div>

                {/* ARTIFACTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <HoloCardV2 title="RNP Activo" type="LIC_GOV" serial="ESTADO" delay={0} />
                    <HoloCardV2 title="RUC Verificado" type="TAX_REG" serial="20477208348" delay={0.1} />
                    <HoloCardV2 title="CIIU 74927" type="ACT_CODE" serial="SEGURIDAD" delay={0.2} />
                    <HoloCardV2 title="Habido SUNAT" type="FISCAL" serial="ACTIVO" delay={0.3} />
                </div>

                {/* BOTTOM MARQUEE */}
                <div className="mt-24 border-t border-neutral-800 pt-4 flex justify-between items-center overflow-hidden">
                    <div className="font-mono text-[10px] text-neutral-600 flex gap-8 whitespace-nowrap animate-marquee">
                        {Array(10).fill("RESTRICTED AREA /// AUTHORIZED PERSONNEL ONLY /// ").map((t, i) => (
                            <span key={i}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .text-stroke-white {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.8);
                }
                @keyframes scan-global {
                    0% { transform: translateY(-100%); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .animate-scan-global {
                    animation: scan-global 8s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .clip-glitch-1 {
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                }
                .clip-glitch-2 {
                    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
                }
            `}</style>
        </section>
    );
}

// --- 4. CONTACT: UPLINK ---
export const HomeContact = () => {
    return (
        <section className="py-24 bg-brand-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-90" /> {/* Darken brand color significantly */}

            {/* Decorative Map Texture */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-10 bg-fixed bg-cover mix-blend-overlay" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter">
                    INICIAR <span className="text-brand-500">OPERACIÓN</span>
                </h2>
                <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
                    Nuestros canales están encriptados y listos para recibir su solicitud de seguridad. Respuesta garantizada en menos de 24 horas.
                </p>

                <Link to="/contacto" className="inline-block relative group">
                    <div className="absolute inset-0 bg-brand-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <button className="relative bg-brand-500 text-black font-display font-bold text-xl uppercase tracking-widest px-12 py-6 clip-path-slant hover:bg-brand-400 transition-colors">
                        Contactar Central
                    </button>
                </Link>

                <div className="mt-12 flex justify-center gap-8 text-neutral-500 font-mono text-xs">
                    <span>SECURE_CONNECTION: TLS 1.3</span>
                    <span>LATENCY: 12ms</span>
                </div>
            </div>

            <style>{`
                .clip-path-slant {
                    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
                }
            `}</style>
        </section>
    );
};
