import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // 3. Handle In-Page Anchor Links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.length > 1 && anchor.hash.startsWith('#')) {
        try {
          const element = document.querySelector(anchor.hash);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement);
          }
        } catch {
          // Ignore invalid selector queries safely
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // 4. Cleanup
    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.off('scroll', ScrollTrigger.update);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 5. Intelligent Pause/Resume via MutationObserver when mobile drawer/modal opens
  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const bodyStyle = window.getComputedStyle(document.body);
          if (bodyStyle.overflow === 'hidden') {
            lenisRef.current?.stop();
          } else {
            lenisRef.current?.start();
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
