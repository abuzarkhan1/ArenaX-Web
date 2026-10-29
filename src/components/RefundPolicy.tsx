import { Pill } from './primitives/Pill';
import { SEO } from './SEO';

export const RefundPolicy = () => {
  return (
    <>
      <SEO
        title="100% Refund Policy - ArenaX Esports Platform"
        description="ArenaX 100% Automated Cancellation Refund Policy. Learn how entry fee refunds and cancelled matches are handled."
        canonical="https://marenax.site/refund-policy"
      />

      <div className="pt-28 sm:pt-36 pb-20 bg-bg-1 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <Pill dot={true} label="FINANCIAL PROTECTION" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              100% Refund <span className="text-accent">Policy</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2">
              Automated consumer protection for competitive tournament participants.
            </p>
          </div>

          <div className="hud-card p-8 sm:p-12 rounded-card space-y-8 text-base text-text-2 leading-relaxed">
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">1. Automated Match Cancellation Refund</h2>
              <p>
                ArenaX enforces an absolute 100% automated refund guarantee. If a tournament lobby fails to reach the minimum player capacity threshold, is cancelled by the tournament host, or is aborted due to technical issues, 100% of the tournament entry fee is returned to each registered participant's Play Wallet immediately.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">2. In-Game Room Technical Disruptions</h2>
              <p>
                If a Free Fire custom room experiences server disconnects before the safe zone countdown begins, players can raise an automated dispute ticket in-app. Once verified by our automated logs or review desk, entry fees are fully restored.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">3. Voluntary Player Withdrawals</h2>
              <p>
                Players may voluntarily leave or unregister from an upcoming tournament up until 15 minutes before the match start time. In such instances, the entire entry fee is instantly refunded to their Play Wallet. Once room credentials (Room ID and Password) unlock, unregistration is locked to prevent credential leakage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">4. Dispute Contact</h2>
              <p>
                For immediate refund inquiries regarding match cancellations, contact our operations team at{' '}
                <a href="mailto:arenasupport@gmail.com" className="text-accent font-mono underline">
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
