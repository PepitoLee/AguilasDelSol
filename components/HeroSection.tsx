import React, { useRef, useLayoutEffect, useState, memo } from 'react';
import { gsap } from 'gsap';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Shield, LockKeyhole, Cpu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- CONFIG ---
const HERO_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4';

// --- TACTICAL HUD ---
const TacticalHUD = memo(({ visible }: { visible: boolean }) => {
    if (!visible) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-brand-500/40" />
            <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-brand-500/40" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-brand-500/40" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-brand-500/40" />
        </div>
    );
});

TacticalHUD.displayName = 'TacticalHUD';

// --- MAGNETIC CTA ---
const MagneticCTA = memo(({ to }: { to: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
    };

    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: springX, y: springY }}
            className="inline-block relative z-50"
        >
            <Link to={to} className="group relative flex items-center justify-center">
                {/* Glow */}
                <div className="absolute -inset-2 bg-brand-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Button */}
                <div className="relative border-2 border-brand-500 bg-brand-500/10 px-8 py-4 overflow-hidden transition-all duration-300 group-hover:bg-brand-500">
                    <span className="relative font-display font-bold text-brand-500 group-hover:text-black tracking-[0.2em] text-sm uppercase flex items-center gap-3 transition-colors duration-300">
                        <Shield className="w-4 h-4" />
                        Solicitar Seguridad
                    </span>
                </div>
            </Link>
        </motion.div>
    );
});

MagneticCTA.displayName = 'MagneticCTA';

// --- MAIN HERO SECTION ---
const HeroSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [showHUD, setShowHUD] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set(".shutter-left", { xPercent: 0 });
            gsap.set(".shutter-right", { xPercent: 0 });
            gsap.set(".hero-video-wrapper", { scale: 1.2, opacity: 0 });
            gsap.set(".video-overlay", { opacity: 1 });
            gsap.set(".intro-brand-text", { color: "#1a1a1a" });
            gsap.set(".hero-title-line", { y: 80, opacity: 0 });
            gsap.set(".hero-subtitle", { y: 30, opacity: 0 });
            gsap.set(".hero-cta", { y: 20, opacity: 0 });
            gsap.set(".hero-line", { scaleX: 0 });
            gsap.set(".hero-badge", { y: -20, opacity: 0 });
            gsap.set(".hero-scroll", { opacity: 0 });

            const tl = gsap.timeline();

            // 1. Loading progress
            const progressObj = { val: 0 };
            tl.to(progressObj, {
                val: 100,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => setProgress(Math.floor(progressObj.val))
            })

            // 2. Brand text flash
            .to(".intro-brand-text", {
                color: "#ffffff",
                duration: 0.15,
                ease: "power2.in"
            })
            .to(".loading-ui", { opacity: 0, duration: 0.2 })
            .addLabel("breach")

            // 3. Shutters open
            .to(".shutter-left", {
                xPercent: -100,
                duration: 1.4,
                ease: "power4.inOut"
            }, "breach")
            .to(".shutter-right", {
                xPercent: 100,
                duration: 1.4,
                ease: "power4.inOut"
            }, "breach")

            // 4. Video reveal
            .to(".hero-video-wrapper", {
                scale: 1,
                opacity: 1,
                duration: 1.8,
                ease: "power2.out"
            }, "breach")
            .to(".video-overlay", {
                opacity: 0.6,
                duration: 1.8,
                ease: "power2.out"
            }, "breach")

            // 5. Badge
            .to(".hero-badge", {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "breach+=0.8")

            // 6. Title lines reveal
            .to(".hero-title-line", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            }, "breach+=0.9")

            // 7. Decorative line
            .to(".hero-line", {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut"
            }, "-=0.5")

            // 8. Subtitle
            .to(".hero-subtitle", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")

            // 9. CTA
            .to(".hero-cta", {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3")

            // 10. Scroll indicator
            .to(".hero-scroll", {
                opacity: 1,
                duration: 0.5
            }, "-=0.2")

            // 11. Show HUD
            .call(() => setShowHUD(true));

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">

            {/* BACKGROUND VIDEO */}
            <div className="hero-video-wrapper absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src={HERO_VIDEO}
                />
                {/* Dark overlay */}
                <div className="video-overlay absolute inset-0 bg-black" />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
                {/* Noise */}
                <div className="absolute inset-0 opacity-[0.06] bg-noise mix-blend-overlay" />
            </div>

            {/* TACTICAL HUD */}
            <TacticalHUD visible={showHUD} />

            {/* SHUTTERS */}
            <div className="shutter-left absolute top-0 left-0 w-1/2 h-full bg-[#030303] z-50 flex items-center justify-end pr-2 md:pr-4 border-r border-neutral-900">
                <h2 className="intro-brand-text font-display font-black text-[12vw] md:text-[7vw] leading-none tracking-tight">
                    ADS
                </h2>
                <div className="absolute bottom-12 left-12 loading-ui">
                    <div className="flex gap-1 mb-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <div className="w-px h-20 bg-gradient-to-b from-brand-500/50 to-transparent" />
                </div>
            </div>

            <div className="shutter-right absolute top-0 right-0 w-1/2 h-full bg-[#030303] z-50 flex items-center justify-start pl-2 md:pl-4 border-l border-neutral-900">
                <h2 className="intro-brand-text font-display font-black text-[12vw] md:text-[7vw] leading-none tracking-tight text-neutral-900">
                    SECURITY
                </h2>
                <div className="absolute bottom-12 right-12 text-right loading-ui">
                    <div className="font-mono text-5xl md:text-7xl text-brand-500 font-bold tabular-nums">
                        {progress}<span className="text-brand-500/50">%</span>
                    </div>
                    <div className="font-mono text-[10px] text-brand-500/60 mt-2 uppercase tracking-[0.3em] flex items-center justify-end gap-2">
                        <Cpu className="w-3 h-3" />
                        Iniciando
                    </div>
                </div>
            </div>

            {/* CENTER LOCK */}
            <div className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading-ui">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-500/30 blur-xl animate-pulse" />
                    <LockKeyhole className="relative w-10 h-10 text-brand-500" />
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-4">

                {/* Badge */}
                <div className="hero-badge mb-8">
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-black/50 backdrop-blur-md border border-brand-500/30 rounded-full">
                        <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                        <span className="font-mono text-[11px] text-brand-500 uppercase tracking-[0.15em]">
                            Seguridad Especializada
                        </span>
                    </div>
                </div>

                {/* MAIN TITLE */}
                <div className="relative text-center">
                    {/* Line 1 - ÁGUILAS */}
                    <div className="hero-title-line overflow-hidden">
                        <h1 className="font-display font-black text-[15vw] md:text-[12vw] leading-[0.9] tracking-tight text-white uppercase">
                            ÁGUILAS
                        </h1>
                    </div>

                    {/* Decorative line */}
                    <div className="hero-line h-[2px] w-24 md:w-40 mx-auto my-3 md:my-5 bg-brand-500 origin-center" />

                    {/* Line 2 - DEL SOL */}
                    <div className="hero-title-line overflow-hidden">
                        <h1 className="font-display font-black text-[15vw] md:text-[12vw] leading-[0.9] tracking-tight text-brand-500 uppercase">
                            DEL SOL
                        </h1>
                    </div>
                </div>

                {/* Subtitle */}
                <div className="hero-subtitle mt-8 md:mt-10 max-w-xl text-center">
                    <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed">
                        Protección de <span className="text-white font-medium">alto nivel</span> para
                        operaciones en <span className="text-brand-500 font-medium">minería</span> e <span className="text-brand-500 font-medium">industria</span>
                    </p>
                </div>

                {/* CTA */}
                <div className="hero-cta mt-10 md:mt-12">
                    <MagneticCTA to="/contacto" />
                </div>

                {/* Bottom Stats */}
                <div className="hero-subtitle absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-6 md:gap-12">
                        <div className="text-center">
                            <div className="font-display font-bold text-2xl md:text-3xl text-white">14+</div>
                            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Años</div>
                        </div>
                        <div className="w-px h-10 bg-neutral-800" />
                        <div className="text-center">
                            <div className="font-display font-bold text-2xl md:text-3xl text-white">143</div>
                            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Agentes</div>
                        </div>
                        <div className="w-px h-10 bg-neutral-800" />
                        <div className="text-center">
                            <div className="font-display font-bold text-2xl md:text-3xl text-brand-500">RNP</div>
                            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Activo</div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-4 h-4 text-neutral-600 animate-bounce" />
                </div>
            </div>

            <style>{`
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
