import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import anime from 'animejs';
import PageTransition from '../components/PageTransition';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
  ChevronRight,
  Phone,
  Shield
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedBlogPosts, BlogPost as BlogPostType } from '../data/blogData';
import {
  GlitchText,
  ParticleField,
  TacticalHUD,
  ScanlineOverlay,
  MagneticElement
} from '../components/effects';
import { useReveal, useStaggerReveal, useParallax } from '../hooks/useAnimeEffects';

// ============================================
// HERO SECTION
// ============================================
const PostHero: React.FC<{ post: BlogPostType }> = ({ post }) => {
  const parallaxRef = useParallax({ speed: 0.3 });
  const breadcrumbRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (lineRef.current) {
      anime({
        targets: lineRef.current,
        scaleX: [0, 1],
        duration: 1200,
        delay: 800,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  return (
    <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
      <div
        ref={parallaxRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 scale-110"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/50" />

      <ScanlineOverlay intensity="medium" animated={true} />
      <ParticleField
        count={30}
        color="#f59e0b"
        direction="up"
        speed={0.4}
        size={{ min: 1, max: 2 }}
        className="opacity-40"
      />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
        {/* Breadcrumb */}
        <nav
          ref={breadcrumbRef}
          className="absolute top-8 left-4 sm:left-6 lg:left-8 opacity-0"
        >
          <Link
            to="/blog"
            className="flex items-center gap-2 text-neutral-400 hover:text-brand-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider font-display">Volver al Blog</span>
          </Link>
        </nav>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-brand-500/90 text-black text-xs font-display font-bold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <div className="mb-4">
          <GlitchText
            text={post.title}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight"
            intensity="low"
            trigger="inView"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400 mb-6">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-brand-500" />
            {post.author.name} — {post.author.role}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-500" />
            {new Date(post.publishedAt).toLocaleDateString('es-PE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-500" />
            {post.readTime} de lectura
          </span>
        </div>

        {/* Decorative Line */}
        <div
          ref={lineRef}
          className="h-1 w-48 bg-gradient-to-r from-brand-500 via-brand-400 to-transparent origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 right-4 w-32 h-32 border-t-2 border-r-2 border-brand-500/20" />
      <div className="absolute bottom-4 left-4 w-32 h-32 border-b-2 border-l-2 border-brand-500/20" />
    </section>
  );
};

// ============================================
// ARTICLE BODY
// ============================================
const ArticleBody: React.FC<{ post: BlogPostType }> = ({ post }) => {
  const bodyRef = useReveal({ direction: 'up', duration: 800 });

  return (
    <section className="py-20 bg-black relative">
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(90deg, #f59e0b 1px, transparent 1px)`,
            backgroundSize: '100px 100%'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={bodyRef as React.RefObject<HTMLDivElement>}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-neutral-800">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-xs text-neutral-400 border border-neutral-700 px-3 py-1 font-mono hover:border-brand-500/50 hover:text-brand-400 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Body Paragraphs */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.body.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="text-neutral-300 leading-relaxed mb-6 first-letter:text-4xl first-letter:font-display first-letter:text-brand-500 first-letter:mr-1"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-16 p-6 bg-neutral-900/50 border border-neutral-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-500/20 border border-brand-500/40 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-brand-500" />
          </div>
          <div>
            <p className="text-white font-display font-bold uppercase">{post.author.name}</p>
            <p className="text-neutral-500 text-sm">{post.author.role} — ADS Security</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// RELATED POSTS
// ============================================
const RelatedPostsSection: React.FC<{ postId: string }> = ({ postId }) => {
  const relatedPosts = getRelatedBlogPosts(postId);
  const containerRef = useStaggerReveal({ delay: 150 });

  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-500 text-sm font-display uppercase tracking-[0.3em]">
            Sigue leyendo
          </span>
          <h2 className="mt-4 text-4xl font-display font-bold text-white uppercase tracking-tight">
            Artículos Relacionados
          </h2>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {relatedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block group relative overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <ScanlineOverlay intensity="light" animated={false} className="opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 left-3 px-2 py-0.5 bg-brand-500/90 text-black text-[10px] font-display font-bold uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2 text-neutral-400 text-xs font-mono">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                  <span className="text-brand-500">·</span>
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
                <h3 className="text-white font-display font-bold text-lg uppercase group-hover:text-brand-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-neutral-400 group-hover:text-brand-500 transition-colors">
                  <span className="text-sm">Leer más</span>
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
// CTA SECTION
// ============================================
const BlogCTA: React.FC = () => {
  const containerRef = useReveal({ direction: 'up', duration: 1000 });

  return (
    <section className="py-24 bg-gradient-to-b from-neutral-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />
      </div>

      <ParticleField
        count={20}
        color="#f59e0b"
        direction="radial"
        speed={0.3}
        size={{ min: 1, max: 2 }}
        className="opacity-30"
      />

      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <Shield className="w-12 h-12 text-brand-500 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight mb-4">
          ¿Necesita estos servicios?
        </h2>
        <p className="text-neutral-400 mb-10 leading-relaxed">
          Nuestro equipo de especialistas está listo para diseñar una solución de seguridad a la medida de su operación.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticElement strength={0.2}>
            <Link
              to="/contacto"
              className="group relative flex items-center"
            >
              <div className="w-3 h-14 border-l-2 border-t-2 border-b-2 border-brand-500 group-hover:border-brand-400 transition-colors" />
              <div className="relative px-8 py-4 bg-brand-500 group-hover:bg-brand-400 transition-colors">
                <span className="flex items-center gap-3 text-black font-display font-bold uppercase tracking-wider text-sm">
                  Solicitar Cotización
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="w-3 h-14 border-r-2 border-t-2 border-b-2 border-brand-500 group-hover:border-brand-400 transition-colors" />
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.15}>
            <a
              href="tel:+51999999999"
              className="group flex items-center gap-3 px-8 py-4 border-2 border-neutral-700 hover:border-brand-500 text-white hover:text-brand-400 font-display font-bold uppercase tracking-wider text-sm transition-all"
            >
              <Phone className="w-5 h-5 text-brand-500" />
              Llamar Ahora
            </a>
          </MagneticElement>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-neutral-600 text-sm font-mono">
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
const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <TacticalHUD variant="brackets" size={120} color="#f59e0b" className="mx-auto mb-8" />
            <h1 className="text-4xl font-display font-bold text-white mb-4 uppercase">
              Artículo no Encontrado
            </h1>
            <p className="text-neutral-400 mb-8 font-mono">
              ERROR 404: El artículo solicitado no existe en el sistema.
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="px-8 py-4 bg-brand-500 text-black font-display font-bold uppercase tracking-wider hover:bg-brand-400 transition-colors"
            >
              Volver al Blog
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PostHero post={post} />
      <ArticleBody post={post} />
      <RelatedPostsSection postId={post.id} />
      <BlogCTA />
    </PageTransition>
  );
};

export default BlogPostPage;
