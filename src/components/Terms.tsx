import { Pill } from './primitives/Pill';
import { SEO } from './SEO';

export const Terms = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions - ArenaX Esports Platform"
        description="Review the official Terms & Conditions governing player participation, wallet usage, and tournaments on the ArenaX platform."
        canonical="https://marenax.site/terms"
      />

      <div className="pt-28 sm:pt-36 pb-20 bg-bg-1 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <Pill dot={true} label="PLATFORM USER AGREEMENT" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Terms & <span className="text-accent">Conditions</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2">
              Last updated: 2026 • Governed under the Laws of Pakistan
            </p>
          </div>

          <div className="hud-card p-8 sm:p-12 rounded-card space-y-8 text-base text-text-2 leading-relaxed">
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">1. Acceptance of Terms</h2>
              <p>
                By downloading the ArenaX application or accessing our website and related services, you accept and agree to be bound by the terms and conditions set forth herein. If you do not agree to these terms, do not access or use our platform. ArenaX reserves the right to modify these terms to reflect feature additions or regulatory changes.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">2. Player Eligibility</h2>
              <ul className="list-disc list-inside space-y-2 text-text-2">
                <li>Users must be at least 18 years of age or possess authorized parental or legal guardian consent.</li>
                <li>You must be a resident of Pakistan or a jurisdiction where skill-based esports platforms are legally permitted.</li>
                <li>You must provide accurate registration details, including your authentic Free Fire in-game name and UID.</li>
                <li>Strictly one account per individual is permitted. Duplicate accounts created to exploit bonuses will be terminated.</li>
              </ul>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">3. Account & Fund Security</h2>
              <p>
                You are solely responsible for maintaining the confidentiality of your account credentials, login credentials, and private 6-digit Fund Security Password. ArenaX representatives will never ask for your private password. All match registrations and transactions executed under your credentials remain your sole responsibility.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">4. Skill-Based Gaming Classification</h2>
              <p>
                Tournaments hosted on ArenaX are strictly skill-based competitive sports. Outcomes depend on tactical decision-making, target acquisition accuracy, game sense, and team coordination. ArenaX does not offer games of pure chance or gambling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">5. Disqualification & Bans</h2>
              <p>
                Any player detected using emulators, modified client packages, aimbots, wallhacks, or exploiting network lag will receive an immediate permanent hardware ban and forfeiture of all accumulated funds.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
