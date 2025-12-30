import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12">
    <motion.h1 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight uppercase"
    >
      {title} <span className="text-brand-500">.</span>
    </motion.h1>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-neutral-400 text-lg max-w-2xl border-l-2 border-brand-500 pl-4"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export const Card: React.FC<{ 
  title: string; 
  description: string; 
  icon?: React.ReactNode; 
  link?: string;
  delay?: number;
}> = ({ title, description, icon, link, delay = 0 }) => {
  const Content = () => (
    <div className="h-full bg-neutral-900/40 border border-neutral-800 p-6 rounded-none hover:border-brand-500/50 transition-colors duration-300 group backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity grayscale">
            {icon}
        </div>
      <div className="mb-4 text-brand-500 group-hover:scale-110 transition-transform duration-300 origin-left">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-brand-400 transition-colors uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
        {description}
      </p>
      {link && (
        <div className="flex items-center text-brand-500 text-sm font-bold uppercase tracking-wide mt-auto">
          Explorar <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neutral-700 group-hover:border-brand-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neutral-700 group-hover:border-brand-500 transition-colors" />
    </div>
  );

  const containerClass = "block h-full";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="h-full"
    >
      {link ? (
        <Link to={link} className={containerClass}>
          <Content />
        </Link>
      ) : (
        <div className={containerClass}>
          <Content />
        </div>
      )}
    </motion.div>
  );
};

export const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  to?: string;
}> = ({ children, onClick, variant = 'primary', className = '', to }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-wider text-sm transition-all duration-200 clip-path-slant group relative overflow-hidden";
  
  const styles = {
    primary: "bg-brand-500 hover:bg-brand-400 text-black",
    outline: "bg-transparent border border-brand-500/50 text-brand-500 hover:bg-brand-900/20 hover:border-brand-400"
  };

  const content = (
    <>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === 'primary' && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 skew-x-12 transition-transform duration-500" />
        )}
    </>
  );

  if (to) {
      return <Link to={to} className={`${baseStyle} ${styles[variant]} ${className}`}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${styles[variant]} ${className}`}>
      {content}
    </button>
  );
};