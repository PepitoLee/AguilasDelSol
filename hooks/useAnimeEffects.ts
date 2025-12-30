import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';

// ============================================
// GLITCH EFFECT HOOK
// ============================================
interface GlitchOptions {
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'auto' | 'hover' | 'inView';
  interval?: number;
}

export const useGlitch = (options: GlitchOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { intensity = 'medium', trigger = 'auto', interval = 3000 } = options;

  const intensityMap = {
    low: { offset: 2, duration: 80 },
    medium: { offset: 4, duration: 100 },
    high: { offset: 8, duration: 150 }
  };

  const triggerGlitch = useCallback(() => {
    if (!ref.current) return;

    const { offset, duration } = intensityMap[intensity];

    anime.timeline({ loop: 1 })
      .add({
        targets: ref.current,
        translateX: [-offset, offset, -offset/2, offset/2, 0],
        duration: duration,
        easing: 'easeInOutQuad'
      })
      .add({
        targets: ref.current.querySelectorAll('.glitch-layer'),
        opacity: [0, 0.8, 0],
        duration: duration / 2,
        easing: 'steps(2)'
      }, 0);
  }, [intensity]);

  useEffect(() => {
    if (!ref.current || trigger !== 'auto') return;

    const intervalId = setInterval(triggerGlitch, interval);
    triggerGlitch(); // Initial trigger

    return () => clearInterval(intervalId);
  }, [trigger, interval, triggerGlitch]);

  useEffect(() => {
    if (!ref.current || trigger !== 'hover') return;

    const el = ref.current;
    el.addEventListener('mouseenter', triggerGlitch);

    return () => el.removeEventListener('mouseenter', triggerGlitch);
  }, [trigger, triggerGlitch]);

  useEffect(() => {
    if (!ref.current || trigger !== 'inView') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerGlitch();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger, triggerGlitch]);

  return { ref, triggerGlitch };
};

// ============================================
// 3D TILT EFFECT HOOK - Optimized with CSS transitions
// ============================================
interface TiltOptions {
  maxAngle?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export const useTilt = (options: TiltOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { maxAngle = 15, perspective = 1000, scale = 1.02, speed = 300 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use CSS transitions instead of anime.js for smoother performance
    el.style.transformStyle = 'preserve-3d';
    el.style.perspective = `${perspective}px`;
    el.style.transition = `transform ${speed}ms ease-out`;
    el.style.willChange = 'transform';

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to throttle updates
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateX = ((mouseY - centerY) / centerY) * -maxAngle;
        const rotateY = ((mouseX - centerX) / centerX) * maxAngle;

        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.style.transition = `transform ${speed * 2}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      // Reset transition after animation
      setTimeout(() => {
        el.style.transition = `transform ${speed}ms ease-out`;
      }, speed * 2);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxAngle, perspective, scale, speed]);

  return ref;
};

// ============================================
// MAGNETIC EFFECT HOOK
// ============================================
interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export const useMagnetic = (options: MagneticOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { strength = 0.3, ease = 200 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      anime({
        targets: el,
        translateX: deltaX,
        translateY: deltaY,
        duration: ease,
        easing: 'easeOutQuad'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: ease * 2,
        easing: 'easeOutElastic(1, .3)'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, ease]);

  return ref;
};

// ============================================
// COUNTER ANIMATION HOOK
// ============================================
interface CounterOptions {
  duration?: number;
  delay?: number;
  suffix?: string;
  separator?: boolean;
}

export const useCounter = (target: number, options: CounterOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { duration = 2000, delay = 0, suffix = '', separator = true } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const obj = { value: 0 };
            anime({
              targets: obj,
              value: target,
              round: 1,
              duration: duration,
              delay: delay,
              easing: 'easeOutExpo',
              update: () => {
                const formatted = separator
                  ? obj.value.toLocaleString()
                  : obj.value.toString();
                el.textContent = formatted + suffix;
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, delay, suffix, separator]);

  return ref;
};

// ============================================
// TYPEWRITER EFFECT HOOK
// ============================================
interface TypewriterOptions {
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export const useTypewriter = (text: string, options: TypewriterOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { speed = 50, delay = 0, cursor = true } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            let currentIndex = 0;
            el.textContent = cursor ? '█' : '';

            anime({
              duration: text.length * speed,
              delay: delay,
              easing: 'linear',
              update: (anim) => {
                const progress = anim.progress / 100;
                const newIndex = Math.floor(progress * text.length);

                if (newIndex !== currentIndex) {
                  currentIndex = newIndex;
                  el.textContent = text.slice(0, currentIndex) + (cursor ? '█' : '');
                }
              },
              complete: () => {
                el.textContent = text + (cursor ? '' : '');
                if (cursor) {
                  el.classList.add('cursor-blink');
                }
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed, delay, cursor]);

  return ref;
};

// ============================================
// PARALLAX SCROLL HOOK
// ============================================
interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { speed = 0.5, direction = 'vertical' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const offset = scrolled * speed;

      if (direction === 'vertical') {
        anime.set(el, { translateY: offset });
      } else {
        anime.set(el, { translateX: offset });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return ref;
};

// ============================================
// REVEAL ON SCROLL HOOK
// ============================================
interface RevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  distance?: number;
  duration?: number;
  delay?: number;
}

export const useReveal = (options: RevealOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { direction = 'up', distance = 50, duration = 800, delay = 0 } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    // Set initial state
    const initialState: Record<string, number> = { opacity: 0 };
    switch (direction) {
      case 'up': initialState.translateY = distance; break;
      case 'down': initialState.translateY = -distance; break;
      case 'left': initialState.translateX = distance; break;
      case 'right': initialState.translateX = -distance; break;
      case 'scale': initialState.scale = 0.8; break;
    }
    anime.set(el, initialState);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            anime({
              targets: el,
              opacity: 1,
              translateX: 0,
              translateY: 0,
              scale: 1,
              duration: duration,
              delay: delay,
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, distance, duration, delay]);

  return ref;
};

// ============================================
// SCRAMBLE TEXT HOOK
// ============================================
interface ScrambleOptions {
  chars?: string;
  speed?: number;
  delay?: number;
}

export const useScramble = (finalText: string, options: ScrambleOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%', speed = 30, delay = 0 } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            let iteration = 0;
            const totalIterations = finalText.length * 3;

            const interval = setInterval(() => {
              el.textContent = finalText
                .split('')
                .map((char, index) => {
                  if (index < iteration / 3) return finalText[index];
                  if (char === ' ') return ' ';
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

              iteration++;

              if (iteration >= totalIterations) {
                clearInterval(interval);
                el.textContent = finalText;
              }
            }, speed);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    setTimeout(() => observer.observe(el), delay);
    return () => observer.disconnect();
  }, [finalText, chars, speed, delay]);

  return ref;
};

// ============================================
// STAGGER CHILDREN HOOK
// ============================================
interface StaggerOptions {
  delay?: number;
  duration?: number;
  from?: 'first' | 'last' | 'center';
}

export const useStaggerReveal = (options: StaggerOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { delay = 100, duration = 600, from = 'first' } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const children = el.children;
    anime.set(children, { opacity: 0, translateY: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            anime({
              targets: children,
              opacity: 1,
              translateY: 0,
              duration: duration,
              delay: anime.stagger(delay, { from }),
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, from]);

  return ref;
};

// ============================================
// GLOW PULSE HOOK - Now uses CSS animation for better performance
// ============================================
interface GlowOptions {
  color?: string;
  intensity?: number;
  duration?: number;
}

export const useGlowPulse = (options: GlowOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { color = '#f59e0b', intensity = 20, duration = 2000 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use CSS animation instead of JS for better performance
    el.style.setProperty('--glow-color', color);
    el.style.setProperty('--glow-intensity', `${intensity}px`);
    el.style.setProperty('--glow-intensity-2x', `${intensity * 2}px`);
    el.style.animation = `glow-pulse ${duration}ms ease-in-out infinite`;

    return () => {
      el.style.animation = '';
    };
  }, [color, intensity, duration]);

  return ref;
};

// ============================================
// LINE DRAW HOOK (SVG)
// ============================================
export const useLineDraw = (duration: number = 1500, delay: number = 0) => {
  const ref = useRef<SVGPathElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const path = ref.current;
    if (!path || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            anime({
              targets: path,
              strokeDashoffset: [anime.setDashoffset, 0],
              duration: duration,
              delay: delay,
              easing: 'easeInOutQuad'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, [duration, delay]);

  return ref;
};
