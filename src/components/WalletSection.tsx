import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { Badge, Button, IconOrb } from './primitives';

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
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Two-Vault Financial Security"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <IconOrb icon={ShieldCheck} tone="emerald" size="lg" className="hidden sm:inline-flex" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
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
        <div
          ref={flowContainerRef}
          className="mb-14 sm:mb-18 p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] relative"
        >
          {/* Glowing Animated Connector Line */}
          <div className="hidden sm:block absolute top-[50%] left-8 right-8 h-[2px] bg-white/[0.08] pointer-events-none z-0">
            <div
              ref={lineRef}
              className="h-full bg-[#3ECF8E] shadow-[0_0_8px_rgba(62,207,142,0.5)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {FLOW_NODES.map((node, i) => (
              <div key={node.step} className="flex flex-col relative">
                {/* Node Box */}
                <div className="group p-4 rounded-control bg-[#121212]/90 border border-white/[0.08] hover:border-[#3ECF8E]/40 hover:bg-[#121212] flex flex-col justify-between h-full transition-all duration-200 ease-out hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#3ECF8E] tracking-tight tabular-nums">
                      /{node.step}
                    </span>
                    {i < FLOW_NODES.length - 1 && (
                      <ArrowRight
                        className="w-3.5 h-3.5 text-[#707070] hidden sm:block transition-colors group-hover:text-[#3ECF8E]"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#EDEDED] block font-heading">
                      {node.title}
                    </span>
                    <span className="text-xs text-[#707070] font-mono tracking-tight tabular-nums">
                      {node.sub}
                    </span>
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
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-[#3ECF8E]/[0.03] blur-[90px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 bottom-0 h-80 w-80 rounded-full bg-[#3ECF8E]/[0.03] blur-[90px]" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Panel 1: Play Wallet (Base Card, Entry Escrow) */}
            <div className="relative p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <IconOrb icon={Wallet} tone="emerald" size="sm" />
                    <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Play Wallet</h3>
                  </div>
                  <Badge tone="neutral">Non-Withdrawable</Badge>
                </div>

                {/* Structured Telemetry Specs (2x2 Matrix) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Min Deposit</span>
                    <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">PKR 50</span>
                  </div>
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Surcharge</span>
                    <span className="text-base font-mono font-bold text-[#3ECF8E] tabular-nums mt-1 block">0% Instant</span>
                  </div>
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Cancellation</span>
                    <span className="text-base font-mono font-bold text-[#3ECF8E] tabular-nums mt-1 block">100% Refund</span>
                  </div>
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Squad Transfer</span>
                    <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">Instant P2P</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
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
            <div className="relative p-6 sm:p-8 rounded-card bg-[#181a19] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_0_36px_-12px_rgba(62,207,142,0.22),0_20px_48px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <IconOrb icon={ShieldCheck} tone="emerald" size="sm" />
                    <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Winning Wallet</h3>
                  </div>
                  <Badge tone="emerald" dot>100% Withdrawable</Badge>
                </div>

                {/* Cash Parity Callout */}
                <div className="flex items-center justify-between p-3 rounded-control bg-[#041B10]/90 border border-[#3ECF8E]/30 mb-4 shadow-[inset_0_1px_0_rgba(62,207,142,0.12)]">
                  <span className="text-xs font-mono text-[#A0A0A0] uppercase tracking-wide">Cash Valuation</span>
                  <span className="text-sm font-mono font-bold text-[#3ECF8E] tracking-tight tabular-nums">1 AX = 1 PKR Cash</span>
                </div>

                {/* Structured Telemetry Specs (2x2 Matrix) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Payout SLA</span>
                    <span className="text-base font-mono font-bold text-[#3ECF8E] tabular-nums mt-1 block">&lt; 24 Hours</span>
                  </div>
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Min Threshold</span>
                    <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">100 AX</span>
                  </div>
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Disbursement</span>
                    <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">JazzCash / EasyPaisa</span>
                  </div>
                  <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Security</span>
                    <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">6-Digit PIN</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
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
