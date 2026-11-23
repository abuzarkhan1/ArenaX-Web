import React, { useEffect, useRef, useState } from 'react';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Re-animate every time the element enters the viewport. */
  once?: boolean;
}

/**
 * Scroll entrance driven by IntersectionObserver. Pairs with the `.reveal`
 * utilities; reduced-motion users see content immediately via the CSS override.
 */
export const Reveal = ({
  children,
  delay = 0,
  once = true,
  className = '',
  style,
  ...props
}: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Reveal;