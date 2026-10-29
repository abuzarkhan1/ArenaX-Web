import { ShieldCheck } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';
import { SEO } from './SEO';

export const FairPlay = () => {
  const sectionNumberClass =
    'mr-2 inline-flex h-6 min-w-[1.5rem] -translate-y-px items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-emerald-400';

  return (
    <>
      <SEO
        title="Zero-Tolerance Fair Play - ArenaX Esports Platform"
        description="ArenaX Fair Play and Anti-Cheat Policy. Learn about our emulator restrictions, UID validation, and permanent hardware bans."
        canonical="https://marenax.site/fair-play"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-bg-1 pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />
        <div aria-hidden="true" className="ambient-glow left-1/2 top-16 h-64 w-[36rem] max-w-[90vw] -translate-x-1/2" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <IconOrb icon={ShieldCheck} tone="emerald" size="md" />
              <Pill dot={true} label="COMPETITIVE INTEGRITY" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Fair Play <span className="text-accent text-glow-accent">Policy</span>
            </h1>
            <p className="text-sm font-mono text-text-3 mt-2 tracking-tight">
              Zero tolerance for unfair software, emulator advantages, or match tampering.
            </p>
          </div>

          <div className="hud-card relative overflow-hidden rounded-card p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed">
            <HudCorners tone="emerald" size="sm" inset />
            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>1.</span>{' '}Mobile Touchscreen Devices Only</h2>
              <p>
                ArenaX tournaments are strictly restricted to authentic physical mobile devices (Android smartphones and tablets). Running the game or ArenaX client via PC emulators (e.g. BlueStacks, LDPlayer, Gameloop) or using mouse and keyboard mapping hardware is strictly prohibited and results in immediate disqualification.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>2.</span>{' '}In-Game UID Validation</h2>
              <p>
                Every player must register with their genuine Free Fire UID. Custom room slots lock strictly to registered players. If an unverified guest or substitute UID enters the custom room, that slot is flagged and disqualified automatically.
              </p>
            </section>

            <section className="pb-6 border-b border-line">
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>3.</span>{' '}Anti-Photoshop & Tamper Detection</h2>
              <p>
                Scoreboard victory submissions are analyzed by the ArenaX Vision Engine. The system checks image metadata, resolution signatures, font consistency, and pixel patterns to detect altered kill tallies or duplicate screenshot submissions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading text-text-1 mb-3 leading-snug"><span className={sectionNumberClass}>4.</span>{' '}Lifetime Hardware Bans</h2>
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
