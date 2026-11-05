import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { Badge } from './primitives/Badge';
import { Button } from './primitives/Button';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';

gsap.registerPlugin(ScrollTrigger);

const FLOW_NODES = [
  { step: '01', title: 'Deposit', sub: 'JazzCash / EasyPaisa' },
  { step: '02', title: 'Play Wallet', sub: 'Non-Withdrawable' },
  { step: '03', title: 'Match Scrim', sub: 'Free Fire BR / CS' },
  { step: '04', title: 'Winning Wallet', sub: '1 AX = 1 PKR' },
  { step: '05', title: 'Cashout', sub: '< 24h Direct' },
];

export const WalletSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const flowContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (lineRef.current && flowContainerRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: flowContainerRef.current,
                start: 'top 80%',
                end: 'bottom 50%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="wallet"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Two-Vault Financial Security"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <IconOrb icon={ShieldCheck} tone="emerald" size="lg" className="hidden sm:inline-flex" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading">
              Two-Vault <span className="text-accent">Security</span>
            </h2>
          </div>
          <Badge tone="emerald" dot pulse className="self-start sm:self-auto">
            1 AX = 1 PKR Cash Parity
          </Badge>
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL FLOW DIAGRAM WITH LINE-DRAW ON SCROLL        */}
        {/* ======================================================== */}
        <div ref={flowContainerRef} className="mb-14 sm:mb-18 p-6 sm:p-8 rounded-card bg-bg-2/70 backdrop-blur-sm border border-line relative">
          {/* Glowing Animated Connector Line */}
          <div className="hidden sm:block absolute top-[50%] left-8 right-8 h-[2px] bg-line pointer-events-none z-0">
            <div
              ref={lineRef}
              className="h-full bg-accent shadow-[0_0_12px_rgba(0,200,120,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {FLOW_NODES.map((node, i) => (
              <div key={node.step} className="flex flex-col relative">
                {/* Node Box */}
                <div className="glass-panel group p-4 rounded-control flex flex-col justify-between h-full transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-accent tracking-tight tabular-nums">/{node.step}</span>
                    {i < FLOW_NODES.length - 1 && (
                      <ArrowRight
                        className="w-3.5 h-3.5 text-text-3 hidden sm:block transition-colors group-hover:text-accent"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-text-1 block font-heading">{node.title}</span>
                    <span className="text-xs text-text-3 font-mono tracking-tight tabular-nums">{node.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* TWO PANELS AT DIFFERENT DEPTHS                           */}
        {/* Play Wallet (base card) & Winning Wallet (highlighted)   */}
        {/* ======================================================== */}
        <div className="relative">
          <div aria-hidden="true" className="ambient-glow -left-16 top-0 h-72 w-72" />
          <div aria-hidden="true" className="ambient-glow -right-12 bottom-0 h-80 w-80" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Panel 1: Play Wallet (Base Card, Entry Escrow) */}
            <div className="hud-card relative p-6 sm:p-8 rounded-card flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-line mb-6">
                  <div className="flex items-center gap-3">
                    <IconOrb icon={Wallet} tone="emerald" size="sm" />
                    <h3 className="text-2xl font-bold font-heading text-text-1">Play Wallet</h3>
                  </div>
                  <Badge tone="neutral">Non-Withdrawable</Badge>
                </div>

                {/* Structured Telemetry Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Min Deposit</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">PKR 50</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Surcharge</span>
                    <span className="text-base font-mono font-bold text-accent tabular-nums mt-1 block">0% Instant</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Cancellation</span>
                    <span className="text-base font-mono font-bold text-accent tabular-nums mt-1 block">100% Refund</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Squad Transfer</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">Instant P2P</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={scrollToDownload}
                >
                  Deposit
                </Button>
              </div>
            </div>

            {/* Panel 2: Winning Wallet (Highlighted Card, Prize Escrow) */}
            <div className="hud-card-highlight relative p-6 sm:p-8 rounded-card flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lift-strong">
              <HudCorners tone="emerald" size="md" />
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-line mb-6">
                  <div className="flex items-center gap-3">
                    <IconOrb icon={ShieldCheck} tone="emerald" size="sm" />
                    <h3 className="text-2xl font-bold font-heading text-text-1">Winning Wallet</h3>
                  </div>
                  <Badge tone="emerald" dot>100% Withdrawable</Badge>
                </div>

                {/* Cash Parity Callout */}
                <div className="flex items-center justify-between p-3 rounded-control bg-accent-dim/40 border border-line-accent/40 mb-4">
                  <span className="text-xs font-mono text-text-2 uppercase tracking-wide">Cash Valuation</span>
                  <span className="text-sm font-mono font-bold text-accent tracking-tight tabular-nums">1 AX = 1 PKR Cash</span>
                </div>

                {/* Structured Telemetry Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Payout SLA</span>
                    <span className="text-base font-mono font-bold text-accent tabular-nums mt-1 block">&lt; 24 Hours</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Min Threshold</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">100 AX</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Disbursement</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">JazzCash / EasyPaisa</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Security</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">6-Digit PIN</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={scrollToDownload}
                >
                  Cashout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
