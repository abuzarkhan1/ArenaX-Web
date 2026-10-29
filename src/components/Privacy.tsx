import { Pill } from './primitives/Pill';
import { SEO } from './SEO';

export const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - ArenaX Esports Platform"
        description="Learn how ArenaX collects, protects, and handles player data, Free Fire UIDs, and payment records."
        canonical="https://marenax.site/privacy"
      />

      <div className="pt-28 sm:pt-36 pb-20 bg-bg-1 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <Pill dot={true} label="DATA PROTECTION" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2">
              Last updated: 2026 • Governed under the Laws of Pakistan
            </p>
          </div>

          <div className="hud-card p-8 sm:p-12 rounded-card space-y-8 text-base text-text-2 leading-relaxed">
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">1. Information We Collect</h2>
              <p>
                ArenaX collects personal data necessary to provide competitive tournament matchmaking, automated scoreboard verification, and local payment cashouts. This includes your mobile phone number, authentic Free Fire in-game name and UID, and transaction slip details for manual deposit processing.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">2. How Information is Used</h2>
              <ul className="list-disc list-inside space-y-2 text-text-2">
                <li>Verifying match lobby eligibility against registered player UIDs.</li>
                <li>Executing automated AI OCR scoreboard matching for victory and kill tallies.</li>
                <li>Processing direct withdrawals to your JazzCash, EasyPaisa, or Pakistani bank account.</li>
                <li>Detecting fraud, bonus exploitation, and unfair third-party cheat software.</li>
              </ul>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">3. Data Security & Storage</h2>
              <p>
                All account records and transaction proofs are stored with cryptographic hashing. ArenaX never sells, leases, or trades player data to external marketing advertisers. Financial passwords remain hashed and inaccessible to staff.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">4. Contacting the Privacy Officer</h2>
              <p>
                If you have questions regarding your stored profile data or wish to request data deletion, contact our privacy desk at{' '}
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

export default Privacy;
