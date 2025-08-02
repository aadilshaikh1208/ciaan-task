import { ReactNode } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

const AnimatedPage = ({ children, className = '' }: AnimatedPageProps) => {
  return (
    <div className={`page-enter ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedPage;