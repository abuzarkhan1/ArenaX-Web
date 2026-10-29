import { Pill } from './primitives/Pill';
import { SEO } from './SEO';

export const FairPlay = () => {
  return (
    <>
      <SEO
        title="Zero-Tolerance Fair Play - ArenaX Esports Platform"
        description="ArenaX Fair Play and Anti-Cheat Policy. Learn about our emulator restrictions, UID validation, and permanent hardware bans."
        canonical="https://marenax.site/fair-play"
      />

      <div className="pt-28 sm:pt-36 pb-20 bg-bg-1 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <Pill dot={true} label="COMPETITIVE INTEGRITY" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Fair Play <span className="text-accent">Policy</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2">
              Zero tolerance for unfair software, emulator advantages, or match tampering.
            </p>
          </div>

          <div className="hud-card p-8 sm:p-12 rounded-card space-y-8 text-base text-text-2 leading-relaxed">
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">1. Mobile Touchscreen Devices Only</h2>
              <p>
                ArenaX tournaments are strictly restricted to authentic physical mobile devices (Android smartphones and tablets). Running the game or ArenaX client via PC emulators (e.g. BlueStacks, LDPlayer, Gameloop) or using mouse and keyboard mapping hardware is strictly prohibited and results in immediate disqualification.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">2. In-Game UID Validation</h2>
              <p>
                Every player must register with their genuine Free Fire UID. Custom room slots lock strictly to registered players. If an unverified guest or substitute UID enters the custom room, that slot is flagged and disqualified automatically.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">3. Anti-Photoshop & Tamper Detection</h2>
              <p>
                Scoreboard victory submissions are analyzed by the ArenaX Vision Engine. The system checks image metadata, resolution signatures, font consistency, and pixel patterns to detect altered kill tallies or duplicate screenshot submissions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3">4. Lifetime Hardware Bans</h2>
              <p>
                Players verified to be using third-party aimbots, ESP wallhacks, speed mods, or teaming in solo scrims receive a permanent device hardware ban, account closure, and forfeiture of all balances.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default FairPlay;
