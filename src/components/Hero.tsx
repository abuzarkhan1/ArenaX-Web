import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Shield, DownloadCloud, Sparkles, Flame, CheckCircle2, Trophy } from 'lucide-react';
import { trackDownload } from '../utils/analytics';
import { Button, Badge, HudCorners, IconOrb } from './primitives';

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
    { label: 'Bermuda BR', id: 'tournaments', icon: Trophy, tone: 'emerald' as const },
    { label: 'Clash Squad 4v4', id: 'tournaments', icon: Flame, tone: 'emerald' as const },
    { label: 'AI Vision OCR', id: 'ai-vision', icon: Zap, tone: 'amber' as const },
    { label: 'Two-Wallet Escrow', id: 'wallet', icon: Shield, tone: 'emerald' as const },
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
              OFFICIAL CLIENT <span className="ml-0.5 text-emerald-300/90">• v2.6.0</span>
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
                  className="whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-control border border-white/[0.08] bg-bg-2/60 backdrop-blur-xl hover:border-emerald-500/40 text-text-2 hover:text-text-1 text-xs font-mono font-medium uppercase tracking-[0.06em] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.98] active:duration-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      pill.tone === 'amber' ? 'text-amber-400' : 'text-accent'
                    }`}
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
                  className={`px-3 py-1.5 min-h-[32px] rounded-control text-xs font-mono font-bold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer border active:scale-[0.98] ${
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

            {/* Corner Year Badge */}
            <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-end animate-cine-badge-right">
              <Badge tone="emerald" className="px-2.5 py-1 tracking-[0.1em]">
                [2026]
              </Badge>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-3 mt-1.5">
                PK Esports Circuit
              </span>
            </div>

            {/* Left Season Badge */}
            <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-start animate-cine-badge-left">
              <Badge tone="neutral" className="px-2.5 py-1 tracking-[0.1em]">
                SEASON 4
              </Badge>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-3 mt-1.5">
                Free Fire Only
              </span>
            </div>
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
          {/* Welcome Bonus Callout Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/25 backdrop-blur-xl mb-4 shadow-[0_0_28px_-14px_rgba(0,200,120,0.5)]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 tabular-nums">
              25 AX Free Welcome Bonus For Referred Accounts
            </span>
          </div>

          {/* Clean Open Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-1 font-heading tracking-tight mb-3 text-balance">
            Pakistan's Premier <span className="text-accent">Free Fire</span> Platform
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mx-auto leading-relaxed mb-7 px-2">
            Daily Bermuda BR & 4v4 Clash Squad scrims. Verified by AI vision in seconds, with 24-hour cash withdrawals to JazzCash & EasyPaisa.
          </p>

          {/* Dual CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-10 sm:mb-14">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownload}
              icon={<DownloadCloud className="w-4 h-4" strokeWidth={1.5} />}
              className="w-full sm:w-auto shadow-[0_12px_28px_rgba(0,200,120,0.22)]"
            >
              Download Direct APK (v2.6)
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('tournaments')}
              icon={<ChevronRight className="w-4 h-4 text-accent" strokeWidth={1.5} />}
              className="w-full sm:w-auto"
            >
              Explore Tournament Modes
            </Button>
          </div>

          {/* Open HUD Telemetry Ribbon (No cards, pure architectural lines) */}
          <div className="pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0 sm:divide-x sm:divide-line text-left">
            <div className="flex items-start gap-3 sm:pr-6">
              <IconOrb icon={Zap} tone="amber" size="sm" className="mt-0.5" />
              <div>
                <span className="text-[11px] text-text-3 font-mono uppercase font-bold tracking-wider block mb-0.5">
                  AI Vision Engine
                </span>
                <span className="text-sm font-bold text-text-1 block tracking-tight">
                  Scoreboards verified in seconds
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:px-6">
              <IconOrb icon={Shield} tone="emerald" size="sm" className="mt-0.5" />
              <div>
                <span className="text-[11px] text-text-3 font-mono uppercase font-bold tracking-wider block mb-0.5">
                  Two-Wallet Security
                </span>
                <span className="text-sm font-bold text-text-1 block font-mono tracking-tight tabular-nums">
                  1 AX = 1 PKR cash parity
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:pl-6">
              <IconOrb icon={CheckCircle2} tone="emerald" size="sm" className="mt-0.5" />
              <div>
                <span className="text-[11px] text-text-3 font-mono uppercase font-bold tracking-wider block mb-0.5">
                  Solvency Guarantee
                </span>
                <span className="text-sm font-bold text-text-1 block font-mono tracking-tight tabular-nums">
                  100% automated refund
                </span>
              </div>
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
