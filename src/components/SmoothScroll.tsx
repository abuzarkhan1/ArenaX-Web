"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for "premium" feel
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // 2. Setup RAF loop
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        const rafId = requestAnimationFrame(raf);

        // 3. Handle Anchor Links safely
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
            cancelAnimationFrame(rafId);
            document.removeEventListener('click', handleAnchorClick);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // 5. Intelligent Pause/Resume via MutationObserver
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
