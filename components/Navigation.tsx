import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Radio, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Inicio', path: '/', code: '001' },
  { label: 'Servicios', path: '/servicios', code: '002' },
  { label: 'Quiénes Somos', path: '/nosotros', code: '003' },
  { label: 'Historia', path: '/historia', code: '004' },
  { label: 'Documentación', path: '/documentacion', code: '005' },
  { label: 'Blog', path: '/blog', code: '006' },
  { label: 'Contacto', path: '/contacto', code: '007' },
];

// Tactical scan line effect
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent pointer-events-none"
    initial={{ top: '0%' }}
    animate={{ top: '100%' }}
    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
  />
);

// Animated menu item
const MenuItem = ({
  item,
  index,
  onClose
}: {
  item: typeof navItems[0];
  index: number;
  onClose: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <NavLink
        to={item.path}
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group block relative"
      >
        {({ isActive }) => (
          <div className={`
            relative py-4 px-4 border-l-2 transition-all duration-300
            ${isActive
              ? 'border-brand-500 bg-brand-500/10'
              : 'border-neutral-800 hover:border-brand-500/50 hover:bg-neutral-900/50'
            }
          `}>
            {/* Glitch line on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-brand-500/5"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Code number */}
            <div className="flex items-center gap-4">
              <span className={`
                font-mono text-xs tracking-wider transition-colors duration-300
                ${isActive ? 'text-brand-500' : 'text-neutral-600 group-hover:text-brand-500/70'}
              `}>
                [{item.code}]
              </span>

              {/* Main label */}
              <span className={`
                font-display text-2xl font-bold tracking-wide uppercase transition-all duration-300
                ${isActive
                  ? 'text-brand-500'
                  : 'text-white group-hover:text-brand-400'
                }
              `}>
                {item.label}
              </span>
            </div>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-brand-500 uppercase tracking-widest">
                  Activo
                </span>
              </motion.div>
            )}

            {/* Hover arrow */}
            {!isActive && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" className="text-brand-500">
                  <path
                    d="M4 10h12M12 6l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </div>
        )}
      </NavLink>
    </motion.div>
  );
};

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0 group relative z-[110]">
              <img
                src="/images/logo-ads.png"
                alt="ADS Security"
                className="h-24 w-auto drop-shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 group-hover:scale-105"
              />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `font-display text-sm font-bold tracking-widest transition-all duration-300 hover:text-brand-400 ${
                        isActive ? 'text-brand-500' : 'text-neutral-400'
                      }`
                    }
                  >
                    {item.label.toUpperCase()}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-[110]">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background */}
                <motion.div
                  className="absolute inset-0 border border-neutral-700 bg-neutral-900/50"
                  animate={{
                    borderColor: isOpen ? 'rgb(245, 158, 11)' : 'rgb(64, 64, 64)',
                    backgroundColor: isOpen ? 'rgba(245, 158, 11, 0.1)' : 'rgba(23, 23, 23, 0.5)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-brand-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-neutral-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[99] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background layers */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              exit={{ opacity: 0 }}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Scan line effect */}
            <ScanLine />

            {/* Corner decorations */}
            <div className="absolute top-28 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-500/30" />
            <div className="absolute top-28 right-4 w-8 h-8 border-r-2 border-t-2 border-brand-500/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-brand-500/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-500/30" />

            {/* Content container */}
            <div className="relative h-full pt-32 pb-8 px-6 flex flex-col">
              {/* Header info */}
              <motion.div
                className="mb-8 flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Radio className="w-4 h-4 text-brand-500 animate-pulse" />
                <span className="font-mono text-xs text-brand-500/70 uppercase tracking-[0.2em]">
                  Sistema de Navegación
                </span>
              </motion.div>

              {/* Menu items */}
              <div className="flex-1 space-y-2">
                {navItems.map((item, index) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    index={index}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Footer info */}
              <motion.div
                className="mt-8 pt-6 border-t border-neutral-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Status indicators */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-500" />
                    <span className="font-mono text-xs text-neutral-500">
                      RNP: <span className="text-brand-500">ACTIVO</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-600" />
                    <span className="font-mono text-xs text-neutral-500">
                      Trujillo, Perú
                    </span>
                  </div>
                </div>

                {/* Copyright */}
                <p className="font-mono text-[10px] text-neutral-600 text-center">
                  © 2024 ADS SECURITY — CORPORACIÓN ÁGUILAS DEL SOL S.A.C.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
