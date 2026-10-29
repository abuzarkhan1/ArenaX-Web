import { ShieldCheck } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';
import { SEO } from './SEO';

export const Privacy = () => {
  const sectionNumberClass =
    'mr-2 inline-flex h-6 min-w-[1.5rem] -translate-y-px items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-emerald-400';

  return (
    <>
      <SEO
        title="Privacy Policy - ArenaX Esports Platform"
        description="Learn how ArenaX collects, protects, and handles player data, Free Fire UIDs, and payment records."
        canonical="https://marenax.site/privacy"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-bg-1 pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />
        <div aria-hidden="true" className="ambient-glow left-1/2 top-16 h-64 w-[36rem] max-w-[90vw] -translate-x-1/2" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <IconOrb icon={ShieldCheck} tone="emerald" size="md" />
              <Pill dot={true} label="DATA PROTECTION" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Privacy <span className="text-accent text-glow-accent">Policy</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2 tracking-tight tabular-nums">
              Last updated: 2026 • Governed under the Laws of Pakistan
            </p>
          </div>

          <div className="hud-card relative overflow-hidden rounded-card p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed">
            <HudCorners tone="emerald" size="sm" inset />
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>1.</span>{' '}Information We Collect</h2>
              <p>
                ArenaX collects personal data necessary to provide competitive tournament matchmaking, automated scoreboard verification, and local payment cashouts. This includes your mobile phone number, authentic Free Fire in-game name and UID, and transaction slip details for manual deposit processing.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>2.</span>{' '}How Information is Used</h2>
              <ul className="list-disc list-inside space-y-2 text-text-2 marker:text-emerald-500/60">
                <li>Verifying match lobby eligibility against registered player UIDs.</li>
                <li>Executing automated AI OCR scoreboard matching for victory and kill tallies.</li>
                <li>Processing direct withdrawals to your JazzCash, EasyPaisa, or Pakistani bank account.</li>
                <li>Detecting fraud, bonus exploitation, and unfair third-party cheat software.</li>
              </ul>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>3.</span>{' '}Data Security & Storage</h2>
              <p>
                All account records and transaction proofs are stored with cryptographic hashing. ArenaX never sells, leases, or trades player data to external marketing advertisers. Financial passwords remain hashed and inaccessible to staff.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>4.</span>{' '}Contacting the Privacy Officer</h2>
              <p>
                If you have questions regarding your stored profile data or wish to request data deletion, contact our privacy desk at{' '}
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

export default Privacy;
