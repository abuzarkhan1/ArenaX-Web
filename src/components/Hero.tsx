import { useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackDownload } from '../utils/analytics';
import '../styles/redesign.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-opening]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.11, ease: 'power3.out' });
        gsap.to('.ax-hero-art', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const arena = stage.current;
    if (!arena || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const resetTilt = () => {
      arena.style.setProperty('--tilt-x', '0deg');
      arena.style.setProperty('--tilt-y', '0deg');
    };
    const moveArena = (event: PointerEvent) => {
      const bounds = arena.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      arena.style.setProperty('--tilt-x', `${x * 2.4}deg`);
      arena.style.setProperty('--tilt-y', `${y * -2.2}deg`);
    };

    arena.addEventListener('pointermove', moveArena, { passive: true });
    arena.addEventListener('pointerleave', resetTilt, { passive: true });
    return () => {
      arena.removeEventListener('pointermove', moveArena);
      arena.removeEventListener('pointerleave', resetTilt);
      resetTilt();
    };
  }, []);

  return (
    <section ref={root} className="ax-opening" aria-labelledby="opening-title">
      <div className="ax-hero-grid">
        <div className="ax-hero-copy">
          <p className="ax-kicker" data-opening><span /> PAKISTAN'S FREE FIRE BATTLEGROUND</p>
          <h1 id="opening-title" className="ax-display" data-opening>READY<br />FOR THE<br /><span>ARENA?</span></h1>
          <p className="ax-intro" data-opening>Find your format. Bring your squad. Make every match count on ArenaX.</p>
          <div className="ax-actions" data-opening>
            <a className="ax-button" href="https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk" onClick={() => trackDownload('ArenaX.apk', 'Android', '2.6.0')}><Download size={17} /> Download for Android <ArrowUpRight size={18} /></a>
            <a className="ax-text-link" href="#tournaments">Explore tournaments <ArrowDown size={16} /></a>
          </div>
          <div className="ax-platform-note" data-opening><span>01 / CHOOSE A FORMAT</span><span>02 / ENTER A MATCH</span><span>03 / PLAY TO WIN</span></div>
        </div>
        <div ref={stage} className="ax-hero-stage" aria-label="Illustrative Free Fire character artwork">
          <div className="ax-stage-top"><span>PLAYER FIELD / 001</span><span>ARENAX</span></div>
          <span className="ax-stage-x" aria-hidden="true">X</span>
          <div className="ax-stage-orbit" aria-hidden="true" />
          <div className="ax-stage-platform" aria-hidden="true" />
          <div className="ax-stage-module ax-stage-module-left" aria-hidden="true"><span>MODE / 01</span><strong>BATTLE ROYALE</strong><i /></div>
          <div className="ax-stage-module ax-stage-module-right" aria-hidden="true"><span>MODE / 02</span><strong>CLASH SQUAD</strong><i /></div>
          <img className="ax-hero-art" src="/artwork/orion-official.png" alt="Orion from Free Fire in the ArenaX hero composition" width="550" height="800" fetchPriority="high" />
          <div className="ax-stage-bottom"><span>ENTER THE<br /><strong>BATTLEGROUND</strong></span><span className="ax-stage-cross" aria-hidden="true">+</span></div>
        </div>
      </div>
      <div className="ax-opening-rail"><span><i /> FREE FIRE TOURNAMENTS</span><a href="#tournaments">BATTLE ROYALE <ArrowUpRight size={14} /></a><a href="#tournaments">CLASH SQUAD 4V4 <ArrowUpRight size={14} /></a><a href="#how-it-works" className="ax-rail-scroll">HOW IT WORKS <ArrowDown size={14} /></a></div>
    </section>
  );
}
