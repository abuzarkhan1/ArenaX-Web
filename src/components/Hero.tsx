import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Shield, DownloadCloud, Flame, Trophy } from 'lucide-react';
import { trackDownload } from '../utils/analytics';
import { Button, Badge, Stat } from './primitives';

const CHARACTERS = {
  tactical: {
    id: 'tactical',
    name: 'Red Criminal',
    shortName: 'Criminal',
    badge: 'Dual SMG',
    src: '/hero-character-tactical.webp',
    pngSrc: '/hero-character-tactical.png',
    halo: 'bg-danger/25',
    activeBtn: 'bg-[#EF4444] text-[#EDEDED] border-[#EF4444] shadow-[0_1px_3px_rgba(239,68,68,0.35)]',
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
    activeBtn: 'bg-[#3ECF8E] text-[#041B10] font-semibold border-[#3ECF8E] shadow-[0_1px_3px_rgba(62,207,142,0.35)]',
    accentColor: '#3ECF8E',
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
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden min-h-screen flex flex-col justify-between bg-[#121212] preserve-3d"
      aria-label="ArenaX Hero Section"
    >
      {/* Background Ambient Lighting: Supabase Dark Carbon & Emerald Radial Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Primary Supabase Emerald Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.08)_0%,rgba(62,207,142,0)_70%)] blur-[100px]" />
        
        {/* Subtle Horizontal Tech Scanline Atmosphere */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(14,15,14,0.7)_100%)] opacity-85" />

        {/* Micro Precision Grid Matrix (Supabase developer texture) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 flex-grow flex flex-col justify-between">
        {/* ========================================================== */}
        {/* TOP META BAR (Supabase Pill Tags & Announcement Badge)     */}
        {/* ========================================================== */}
        <div className="pt-2 sm:pt-4 pb-6 flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.08] w-full animate-cine-top">
          {/* Announcement Pill Badge (Supabase Pill Architecture) */}
          <div className="relative inline-flex flex-shrink-0">
            <Badge
              tone="emerald"
              dot
              pulse
              className="px-3.5 py-1.5 text-[11px] font-mono tracking-[0.08em] uppercase bg-[#041B10] text-[#3ECF8E] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]"
            >
              OFFICIAL CLIENT
            </Badge>
          </div>

          {/* Floating Feature Tags: Supabase Styled Capsule Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap overflow-x-auto no-scrollbar max-w-full justify-start sm:justify-center py-0.5 px-1 min-w-0">
            {metaPills.map((pill, i) => {
              const Icon = pill.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSection(pill.id)}
                  className="whitespace-nowrap flex-shrink-0 px-3.5 min-h-[44px] py-2 sm:px-3 sm:py-1.5 sm:min-h-[32px] rounded-full border border-white/[0.08] bg-[#171717]/80 backdrop-blur-xl hover:border-[#3ECF8E]/40 hover:bg-[#1E201F] text-[#A0A0A0] hover:text-[#EDEDED] text-xs font-mono font-medium uppercase tracking-[0.06em] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98] active:duration-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon
                    className="w-3.5 h-3.5 flex-shrink-0 text-[#3ECF8E]"
                    strokeWidth={1.5}
                  />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Operator Loadout Selector (Criminal vs Rebel) */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#171717]/80 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] flex-shrink-0">
            <span className="text-[10px] font-mono text-[#707070] uppercase px-2 hidden sm:inline">Operator</span>
            {Object.values(CHARACTERS).map((c) => {
              const isActive = activeCharacter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCharacter(c.id as 'tactical' | 'rebel')}
                  className={`px-3.5 py-2 min-h-[44px] sm:px-3 sm:py-1.5 sm:min-h-[32px] rounded-full text-xs font-mono font-semibold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer border active:scale-[0.98] ${
                    isActive
                      ? c.activeBtn
                      : 'border-transparent text-[#707070] hover:text-[#EDEDED] hover:bg-[#1E201F]'
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
        {/* MAIN HERO HEADLINE & ACTIONS (Above-The-Fold Priority)     */}
        {/* ========================================================== */}
        <div className="relative z-30 pt-6 sm:pt-8 md:pt-10 max-w-4xl mx-auto w-full text-center">
          {/* High-Impact Manrope Headline with Supabase Green Gradient Accent */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#EDEDED] font-heading tracking-tight mb-6 sm:mb-8 text-balance">
            Pakistan's Premier{' '}
            <span className="bg-gradient-to-r from-[#249361] to-[#3ECF8E] bg-clip-text text-transparent">
              Free Fire
            </span>{' '}
            Platform
          </h1>

          {/* Dual Action Buttons: Supabase Solid Green & Raised Dark Carbon */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-8 sm:mb-10">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownload}
              icon={<DownloadCloud className="w-4 h-4" strokeWidth={1.5} />}
              className="w-full sm:w-auto shadow-[0_12px_28px_rgba(62,207,142,0.25)]"
            >
              Download APK
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('tournaments')}
              icon={<ChevronRight className="w-4 h-4 text-[#3ECF8E]" strokeWidth={1.5} />}
              className="w-full sm:w-auto"
            >
              Explore Tournaments
            </Button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CINEMATIC TITLE & LAYERED CHARACTER OVERLAP                */}
        {/* ========================================================== */}
        <div className="relative my-2 sm:my-4 text-center flex-grow flex flex-col justify-center items-center perspective-1200 min-h-[140px] sm:min-h-[220px] md:min-h-[280px]">
          {/* Giant Condensed Background Title with Z-space recession */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(0, ${scrollY * 0.16}px, -${Math.min(scrollY * 0.45, 240)}px) scale(${Math.max(
                0.86,
                1 - scrollY / 2200
              )})`,
              opacity: Math.max(0.18, 1 - scrollY / 650),
            }}
          >
            <div className="text-[19vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/35 via-white/10 to-transparent font-heading whitespace-nowrap animate-cine-unfurl">
              ARENA<span className="text-[#3ECF8E]/40">X</span>
            </div>
          </div>

          {/* FOREGROUND CHARACTER CUTOUT (Hidden on mobile < 640px)    */}
          <div
            className="hidden sm:block relative z-20 transition-transform duration-100 ease-out pointer-events-none animate-cine-character"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y - scrollY * 0.1}px, 0)`,
              opacity: Math.max(0, 1 - scrollY / 600),
            }}
          >
            <div
              aria-hidden="true"
              className="ambient-glow left-1/2 top-1/2 h-[260px] w-[260px] md:h-[320px] md:w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-70 animate-glow-pulse"
            />
            <div className="relative inline-block">
              {/* Radial Backlight Halo matching active character aura */}
              <div
                className={`absolute inset-0 ${selectedChar.halo} blur-3xl rounded-full scale-75 -z-10 transition-colors duration-500 animate-cine-bloom`}
              />

              {/* Polished hairline pedestal aura framing base */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full border border-white/[0.06] bg-gradient-to-r from-transparent via-[#3ECF8E]/10 to-transparent blur-[1px] pointer-events-none" />

              <picture key={selectedChar.id}>
                <source key={selectedChar.id} srcSet={selectedChar.src} type="image/webp" />
                <img
                  key={selectedChar.id}
                  src={selectedChar.pngSrc}
                  alt={`ArenaX Free Fire Esports - ${selectedChar.name}`}
                  width={600}
                  height={620}
                  className="max-h-[200px] sm:max-h-[260px] md:max-h-[300px] lg:max-h-[340px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-opacity duration-300"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 3-METRIC TELEMETRY RIBBON                                  */}
        {/* ========================================================== */}
        <div className="relative z-30 max-w-4xl mx-auto w-full pb-4 sm:pb-8">
          <div className="pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="p-5 rounded-xl bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/[0.14] transition-all duration-200">
              <Stat value="< 15s" label="AI OCR Verification" accent />
            </div>
            <div className="p-5 rounded-xl bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/[0.14] transition-all duration-200">
              <Stat value="1:1" label="Cash Parity (PKR)" />
            </div>
            <div className="p-5 rounded-xl bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/[0.14] transition-all duration-200">
              <Stat value="100%" label="Automated Refund" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* ARCHITECTURAL HAIRLINE GLOW DIVIDER                        */}
      {/* ========================================================== */}
      <div className="relative w-full border-b border-white/[0.08] mt-4 sm:mt-6">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
