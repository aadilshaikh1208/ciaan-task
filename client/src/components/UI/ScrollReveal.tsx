import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '',
  threshold = 0.1 
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  const getAnimationClass = () => {
    const baseClass = 'scroll-reveal';
    switch (direction) {
      case 'left':
        return 'scroll-reveal-left';
      case 'right':
        return 'scroll-reveal-right';
      case 'scale':
        return 'scroll-reveal-scale';
      default:
        return baseClass;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;