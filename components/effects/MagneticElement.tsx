import React, { useRef, useEffect, ReactNode } from 'react';
import anime from 'animejs';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  ease?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  strength = 0.4,
  ease = 300,
  className = '',
  as: Component = 'div'
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateBounding = () => {
      boundingRef.current = element.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) updateBounding();
      const bounding = boundingRef.current!;

      const centerX = bounding.left + bounding.width / 2;
      const centerY = bounding.top + bounding.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      anime({
        targets: element,
        translateX: deltaX,
        translateY: deltaY,
        duration: ease,
        easing: 'easeOutQuad'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: element,
        translateX: 0,
        translateY: 0,
        duration: ease * 1.5,
        easing: 'easeOutElastic(1, .4)'
      });
    };

    const handleMouseEnter = () => {
      updateBounding();
    };

    // Add event listeners to parent for larger detection area
    const parent = element.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      parent.addEventListener('mouseenter', handleMouseEnter);
    }

    window.addEventListener('resize', updateBounding);
    window.addEventListener('scroll', updateBounding);

    return () => {
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('mouseenter', handleMouseEnter);
      }
      window.removeEventListener('resize', updateBounding);
      window.removeEventListener('scroll', updateBounding);
    };
  }, [strength, ease]);

  return (
    <Component
      ref={elementRef as any}
      className={`magnetic-element ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </Component>
  );
};

export default MagneticElement;
