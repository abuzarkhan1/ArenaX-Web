import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Shield, DownloadCloud, Flame, Trophy } from 'lucide-react';
import { trackDownload } from '../utils/analytics';
import { Button, Badge, HudCorners, Stat } from './primitives';

const CHARACTERS = {
  tactical: {
    id: 'tactical',
    name: 'Red Criminal',
    shortName: 'Criminal',
    badge: 'Dual SMG',
    src: '/hero-character-tactical.webp',
    pngSrc: '/hero-character-tactical.png',
    halo: 'bg-danger/25',
    activeBtn: 'bg-danger text-text-1 border-danger shadow-sm',
    accentColor: '#EF4444',
  },
  rebel: {
    id: 'rebel',
    name: 'Streetwear Rebel',
    shortName: 'Rebel',
    badge: 'Street Legend',
    src: '/hero-character.webp',
    pngSrc: '/hero-character.png',
    halo: 'bg-accent/25',
    activeBtn: 'bg-accent text-bg-1 border-accent shadow-sm',
    accentColor: '#00C878',
  },
};

const Hero = () => {
  const [activeCharacter, setActiveCharacter] = useState<'tactical' | 'rebel'>('tactical');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const selectedChar = CHARACTERS[activeCharacter] || CHARACTERS.tactical;

  const downloadUrl = "https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk";

  const handleDownload = () => {
    trackDownload("ArenaX.apk", "Android", "2.6.0");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "ArenaX.apk";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax tilt tracking on desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Multi-plane scroll parallax tracking with Z-axis depth displacement
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const metaPills = [
    { label: 'Bermuda BR', id: 'tournaments', icon: Trophy },
    { label: 'Clash Squad 4v4', id: 'tournaments', icon: Flame },
    { label: 'AI Vision OCR', id: 'ai-vision', icon: Zap },
    { label: 'Two-Wallet Escrow', id: 'wallet', icon: Shield },
  ];

  return (
    <section
      ref={heroRef}
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden min-h-screen flex flex-col justify-between bg-bg-1 preserve-3d"
      aria-label="ArenaX Hero Section"
    >
      {/* Background Ambient Lighting: Restrained Emerald Centre Glow Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-accent/[0.08] rounded-full blur-[140px]" />
        
        {/* Subtle Horizontal Tech Scanline Atmosphere */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(11,13,14,0.6)_100%)] opacity-80" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 flex-grow flex flex-col justify-between">
        {/* ========================================================== */}
        {/* TOP META BAR (Broadcast HUD Tags)                          */}
        {/* ========================================================== */}
        <div className="pt-2 sm:pt-4 pb-6 flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.08] w-full animate-cine-top">
          {/* Live Platform Badge */}
          <div className="relative inline-flex flex-shrink-0">
            <HudCorners tone="emerald" size="sm" className="-m-1.5" />
            <Badge
              tone="emerald"
              dot
              pulse
              className="px-3.5 py-1.5 text-[11px] tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              OFFICIAL CLIENT
            </Badge>
          </div>

          {/* Floating Feature Tags: Fluidly scrollable on mobile */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap overflow-x-auto no-scrollbar max-w-full justify-start sm:justify-center py-0.5 px-1 min-w-0">
            {metaPills.map((pill, i) => {
              const Icon = pill.icon;
              return (
                <button
                  key={i}
                  onClick={() => scrollToSection(pill.id)}
                  className="whitespace-nowrap flex-shrink-0 px-3.5 min-h-[44px] py-2 sm:px-3 sm:py-1.5 sm:min-h-[32px] rounded-control border border-white/[0.08] bg-bg-2/60 backdrop-blur-xl hover:border-emerald-500/40 text-text-2 hover:text-text-1 text-xs font-mono font-medium uppercase tracking-[0.06em] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.98] active:duration-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon
                    className="w-3.5 h-3.5 flex-shrink-0 text-accent"
                    strokeWidth={1.5}
                  />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Character Switcher Pill (Criminal vs Rebel) */}
          <div className="flex items-center gap-1 p-1 rounded-control bg-bg-2/60 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] flex-shrink-0">
            {Object.values(CHARACTERS).map((c) => {
              const isActive = activeCharacter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCharacter(c.id as 'tactical' | 'rebel')}
                  className={`px-3.5 py-2 min-h-[44px] sm:px-3 sm:py-1.5 sm:min-h-[32px] rounded-control text-xs font-mono font-bold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer border active:scale-[0.98] ${
                    isActive
                      ? c.activeBtn
                      : 'border-transparent text-text-3 hover:text-text-1 hover:bg-bg-3'
                  }`}
                  title={`${c.name} (${c.badge})`}
                >
                  {c.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================== */}
        {/* CINEMATIC TITLE & LAYERED CHARACTER OVERLAP                */}
        {/* ========================================================== */}
        <div className="relative my-4 sm:my-8 text-center flex-grow flex flex-col justify-center items-center perspective-1200">
          {/* Giant Condensed Background Title with Z-space recession */}
          <div
            className="relative w-full select-none pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(0, ${scrollY * 0.16}px, -${Math.min(scrollY * 0.45, 240)}px) scale(${Math.max(
                0.86,
                1 - scrollY / 2200
              )})`,
              opacity: Math.max(0.18, 1 - scrollY / 650),
            }}
          >
            <h1 className="text-[19vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/35 via-white/10 to-transparent font-heading whitespace-nowrap animate-cine-unfurl">
              ARENA<span className="text-accent/40">X</span>
            </h1>
          </div>

          {/* ======================================================== */}
          {/* FOREGROUND CHARACTER CUTOUT (Overlapping the Title)      */}
          {/* ======================================================== */}
          <div
            className="relative z-20 -mt-[14vw] sm:-mt-[13vw] md:-mt-[12vw] lg:-mt-[11vw] transition-transform duration-100 ease-out pointer-events-none animate-cine-character"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y - scrollY * 0.1}px, 0)`,
              opacity: Math.max(0, 1 - scrollY / 600),
            }}
          >
            <div
              aria-hidden="true"
              className="ambient-glow left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 opacity-70 animate-glow-pulse"
            />
            <div className="relative inline-block">
              {/* Radial Backlight Halo matching active character aura */}
              <div
                className={`absolute inset-0 ${selectedChar.halo} blur-3xl rounded-full scale-75 -z-10 transition-colors duration-500 animate-cine-bloom`}
              />

              <picture>
                <source srcSet={selectedChar.src} type="image/webp" />
                <img
                  key={selectedChar.id}
                  src={selectedChar.pngSrc}
                  alt={`ArenaX Free Fire Esports - ${selectedChar.name}`}
                  width={600}
                  height={620}
                  className="max-h-[320px] sm:max-h-[440px] md:max-h-[520px] lg:max-h-[600px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-opacity duration-300"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* OPEN BROADCAST ACTION & TELEMETRY REGION (Cardless Design) */}
        {/* ========================================================== */}
        <div className="relative z-30 mt-2 sm:mt-4 md:mt-6 max-w-4xl mx-auto w-full text-center pb-8 sm:pb-12">
          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-text-1 font-heading tracking-tight mb-8 text-balance">
            Pakistan's Premier <span className="text-accent">Free Fire</span> Platform
          </h2>

          {/* Dual CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-10 sm:mb-14">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownload}
              icon={<DownloadCloud className="w-4 h-4" strokeWidth={1.5} />}
              className="w-full sm:w-auto shadow-[0_12px_28px_rgba(0,200,120,0.22)]"
            >
              Download APK
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('tournaments')}
              icon={<ChevronRight className="w-4 h-4 text-accent" strokeWidth={1.5} />}
              className="w-full sm:w-auto"
            >
              Explore Tournaments
            </Button>
          </div>

          {/* Open HUD Telemetry Ribbon (High-Contrast Quantitative Data) */}
          <div className="pt-8 sm:pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-line text-left">
            <div className="sm:pr-8">
              <Stat value="< 15s" label="AI OCR Verification" accent />
            </div>
            <div className="sm:px-8">
              <Stat value="1:1" label="Cash Parity (PKR)" />
            </div>
            <div className="sm:pl-8">
              <Stat value="100%" label="Automated Refund" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* ORGANIC CURVED MASK SCROLL TRANSITION (Used ONCE at Hero exit) */}
      {/* ========================================================== */}
      <div className="relative w-full overflow-hidden leading-none z-20 pointer-events-none mt-6 sm:mt-10 -mb-1">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 200, 120, 0)" />
              <stop offset="50%" stopColor="rgba(0, 200, 120, 0.45)" />
              <stop offset="100%" stopColor="rgba(0, 200, 120, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q720,12 1440,80"
            stroke="url(#heroCurveGlow)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0,80 Q720,12 1440,80 L1440,96 L0,96 Z"
            fill="#101214"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
