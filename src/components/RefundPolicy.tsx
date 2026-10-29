import { ShieldCheck } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';
import { SEO } from './SEO';

export const RefundPolicy = () => {
  const sectionNumberClass =
    'mr-2 inline-flex h-6 min-w-[1.5rem] -translate-y-px items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-emerald-400';

  return (
    <>
      <SEO
        title="100% Refund Policy - ArenaX Esports Platform"
        description="ArenaX 100% Automated Cancellation Refund Policy. Learn how entry fee refunds and cancelled matches are handled."
        canonical="https://marenax.site/refund-policy"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-bg-1 pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />
        <div aria-hidden="true" className="ambient-glow left-1/2 top-16 h-64 w-[36rem] max-w-[90vw] -translate-x-1/2" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <IconOrb icon={ShieldCheck} tone="emerald" size="md" />
              <Pill dot={true} label="FINANCIAL PROTECTION" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              100% Refund <span className="text-accent text-glow-accent">Policy</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2 tracking-tight">
              Automated consumer protection for competitive tournament participants.
            </p>
          </div>

          <div className="hud-card relative overflow-hidden rounded-card p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed">
            <HudCorners tone="emerald" size="sm" inset />
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>1.</span>{' '}Automated Match Cancellation Refund</h2>
              <p>
                ArenaX enforces an absolute 100% automated refund guarantee. If a tournament lobby fails to reach the minimum player capacity threshold, is cancelled by the tournament host, or is aborted due to technical issues, 100% of the tournament entry fee is returned to each registered participant's Play Wallet immediately.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>2.</span>{' '}In-Game Room Technical Disruptions</h2>
              <p>
                If a Free Fire custom room experiences server disconnects before the safe zone countdown begins, players can raise an automated dispute ticket in-app. Once verified by our automated logs or review desk, entry fees are fully restored.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>3.</span>{' '}Voluntary Player Withdrawals</h2>
              <p>
                Players may voluntarily leave or unregister from an upcoming tournament up until 15 minutes before the match start time. In such instances, the entire entry fee is instantly refunded to their Play Wallet. Once room credentials (Room ID and Password) unlock, unregistration is locked to prevent credential leakage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>4.</span>{' '}Dispute Contact</h2>
              <p>
                For immediate refund inquiries regarding match cancellations, contact our operations team at{' '}
                <a href="mailto:arenasupport@gmail.com" className="text-accent font-mono underline decoration-emerald-500/40 underline-offset-4 transition-colors duration-200 hover:text-accent-hover">
                  arenasupport@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
