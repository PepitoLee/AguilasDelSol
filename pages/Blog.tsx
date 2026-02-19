import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import PageTransition from '../components/PageTransition';
import { Calendar, Clock, ChevronRight, Tag, User, Filter } from 'lucide-react';
import { blogPosts, blogCategories, BlogCategory } from '../data/blogData';
import {
  GlitchText,
  ParticleField,
  TacticalHUD,
  ScanlineOverlay
} from '../components/effects';
import { useReveal, useLineDraw } from '../hooks/useAnimeEffects';

// ============================================
// BLOG HERO SECTION
// ============================================
const BlogHero: React.FC = () => {
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
          }, 20);
        }
      });
    }
  }, []);

  return (
    <div className="relative mb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <ParticleField density={40} color="#f59e0b" speed={0.3} />
      </div>
      <ScanlineOverlay opacity={0.03} />

      <div className="relative z-10 py-16 text-center">
        <div className="mb-6">
          <GlitchText
            text="BLOG // INTELIGENCIA OPERATIVA"
            className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-wider"
            intensity="medium"
            glitchInterval={4000}
          />
        </div>

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

        <p
          ref={subtitleRef}
          className="text-neutral-400 text-lg max-w-2xl mx-auto font-light"
        >
          Análisis técnico, tendencias en seguridad y casos de éxito del sector minero e industrial.
        </p>

        <TacticalHUD variant="corners" className="absolute inset-4 pointer-events-none" />
      </div>
    </div>
  );
};

// ============================================
// CATEGORY FILTER
// ============================================
const CategoryFilter: React.FC<{
  active: BlogCategory | null;
  onChange: (cat: BlogCategory | null) => void;
}> = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-12 justify-center">
      <Filter className="w-4 h-4 text-neutral-500" />
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 text-sm font-display uppercase tracking-wider transition-all duration-300 border ${
          active === null
            ? 'bg-brand-500 text-black border-brand-500'
            : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-brand-500/50 hover:text-brand-400'
        }`}
      >
        Todos
      </button>
      {blogCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 text-sm font-display uppercase tracking-wider transition-all duration-300 border ${
            active === cat
              ? 'bg-brand-500 text-black border-brand-500'
              : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-brand-500/50 hover:text-brand-400'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

// ============================================
// BLOG CARD
// ============================================
interface BlogCardProps {
  post: typeof blogPosts[0];
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    anime.set(card, { opacity: 0, translateY: 40 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasRevealed) {
            setHasRevealed(true);
            anime({
              targets: card,
              opacity: 1,
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

  return (
    <div ref={cardRef} className="h-full opacity-0">
      <Link
        to={`/blog/${post.slug}`}
        className="group block relative h-full bg-neutral-900/70 backdrop-blur-sm overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 opacity-80' : 'scale-100 opacity-60'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-brand-500/90 text-black text-xs font-display font-bold uppercase tracking-wider">
            {post.category}
          </div>

          {/* Read Time */}
          <div className="absolute top-4 right-4 flex items-center gap-1 text-neutral-300 text-xs font-mono bg-black/50 px-2 py-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>

          {/* Corner brackets */}
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-brand-500/0 group-hover:border-brand-500 transition-colors duration-300" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-brand-500/0 group-hover:border-brand-500 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Date & Author */}
          <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedAt).toLocaleDateString('es-PE', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-display font-bold text-white uppercase mb-3 group-hover:text-brand-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[10px] text-neutral-500 border border-neutral-800 px-2 py-0.5 font-mono"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-brand-500 text-sm font-display uppercase tracking-wider mt-auto">
            <span>Leer artículo</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isHovered ? 'translate-x-2' : ''
              }`}
            />
          </div>
        </div>

        {/* Hover Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-brand-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* HUD Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neutral-700 group-hover:border-brand-500 transition-colors duration-500" />
      </Link>
    </div>
  );
};

// ============================================
// MAIN BLOG PAGE
// ============================================
const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);

  const filteredPosts = activeCategory
    ? blogPosts.filter((p) => p.category === activeCategory)
    : blogPosts;

  return (
    <PageTransition>
      <BlogHero />

      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <BlogCard key={post.id} post={post} index={idx} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <TacticalHUD variant="brackets" size={80} color="#f59e0b" className="mx-auto mb-6" />
          <p className="text-neutral-400 font-mono text-sm">
            No se encontraron artículos en esta categoría.
          </p>
        </div>
      )}
    </PageTransition>
  );
};

export default Blog;
