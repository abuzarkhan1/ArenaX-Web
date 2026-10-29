import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Pill } from './primitives/Pill';

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

  return (
    <section
      ref={sectionRef}
      id="wallet"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Two-Wallet Financial Security"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="FINANCIAL ARCHITECTURE" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Two-Vault <span className="text-accent">Security</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            Tournament entry balances are strictly isolated from verified prize money, guaranteeing 1 AX = 1 PKR parity.
          </p>
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL FLOW DIAGRAM WITH LINE-DRAW ON SCROLL        */}
        {/* ======================================================== */}
        <div ref={flowContainerRef} className="mb-14 sm:mb-18 p-6 sm:p-8 rounded-card bg-bg-2 border border-line relative">
          <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-6">
            CAPITAL FLOW LIFECYCLE
          </span>

          {/* Glowing Animated Connector Line */}
          <div className="hidden sm:block absolute top-[58%] left-8 right-8 h-[2px] bg-line pointer-events-none z-0">
            <div
              ref={lineRef}
              className="h-full bg-accent shadow-[0_0_12px_rgba(0,200,120,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {FLOW_NODES.map((node, i) => (
              <div key={node.step} className="flex flex-col relative">
                {/* Node Box */}
                <div className="p-4 rounded-control bg-bg-1 border border-line hover:border-line-accent transition-colors flex flex-col justify-between h-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-accent">/{node.step}</span>
                    {i < FLOW_NODES.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-text-3 hidden sm:block stroke-[1.5]" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-text-1 block font-heading">{node.title}</span>
                    <span className="text-xs text-text-3 font-mono">{node.sub}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Panel 1: Play Wallet (Base Card, slightly behind) */}
          <div className="hud-card p-6 sm:p-8 rounded-card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start pb-4 border-b border-line mb-5">
                <div>
                  <span className="text-xs font-mono text-text-3 uppercase tracking-wider block">
                    VAULT 01
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-text-1 mt-1">Play Wallet</h3>
                  <span className="text-xs font-mono text-text-3">Entry Registration Balance</span>
                </div>
                <span className="px-2.5 py-1 rounded-control text-xs font-mono font-bold bg-bg-3 text-text-2 border border-line">
                  Non-Withdrawable
                </span>
              </div>

              <p className="text-sm text-text-2 leading-relaxed mb-6">
                Holds funds deposited via JazzCash or EasyPaisa and starter bonuses. Used strictly to register for Bermuda Battle Royale and Clash Squad scrims.
              </p>

              <div className="space-y-3 font-mono text-xs text-text-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Instant registration deduction with 0% surcharge.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>100% automated refund to Play Wallet if match cancelled.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>P2P coin transfer between squadmates.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-line flex justify-between text-xs font-mono text-text-3">
              <span>Min Deposit: PKR 50</span>
              <span>Protected Escrow</span>
            </div>
          </div>

          {/* Panel 2: Winning Wallet (Highlighted Card, forward) */}
          <div className="hud-card-highlight p-6 sm:p-8 rounded-card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start pb-4 border-b border-line mb-5">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider block">
                    VAULT 02 (PRIZE ESCROW)
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-text-1 mt-1">Winning Wallet</h3>
                  <span className="text-xs font-mono text-accent">1 AX Coin = 1 PKR Cash</span>
                </div>
                <span className="px-2.5 py-1 rounded-control text-xs font-mono font-bold bg-accent-dim text-accent border border-line-accent">
                  100% Withdrawable
                </span>
              </div>

              <p className="text-sm text-text-2 leading-relaxed mb-6">
                Holds tournament cash prizes, milestone bonuses, and scout royalties. Every coin represents 1 PKR with guaranteed payout within 24 hours.
              </p>

              <div className="space-y-3 font-mono text-xs text-text-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Direct cashout to JazzCash, EasyPaisa, or Pakistani banks.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Secondary 6-digit fund security password required.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Minimum cashout threshold: 100 AX Coins (PKR 100).</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-line flex justify-between text-xs font-mono text-accent">
              <span>Payout SLA: &lt; 24 Hours</span>
              <span>Zero Hidden Commissions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
