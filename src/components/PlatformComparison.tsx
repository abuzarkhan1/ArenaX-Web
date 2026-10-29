import { CheckCircle2, X } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { HudCorners } from './primitives';

const COMPARISON_POINTS = [
  {
    dimension: 'Result Verification',
    arenax: 'Automated AI vision reads scoreboards in seconds',
    informal: 'Manual host review, prone to bias and delays',
  },
  {
    dimension: 'Prize Money Protection',
    arenax: 'Two-Wallet isolation & 100% solvency guarantee',
    informal: 'Money held in host personal account; high risk',
  },
  {
    dimension: 'Cashout Speed',
    arenax: 'Guaranteed cashout to JazzCash/EasyPaisa within 24h',
    informal: 'Days of delay, ghosting, or arbitrary fee deductions',
  },
  {
    dimension: 'Scoring Transparency',
    arenax: 'Fixed authoritative rules (20 PTS Booyah, 5 PTS Kill)',
    informal: 'Subjective rules changed mid-tournament by hosts',
  },
  {
    dimension: 'Match Cancellation',
    arenax: '100% automated refund directly to Play Wallet',
    informal: 'No refunds provided; players blocked on WhatsApp',
  },
  {
    dimension: 'Host Accountability',
    arenax: 'Verified 1–5★ reviews restricted to real participants',
    informal: 'Anonymous hosts with zero community accountability',
  },
];

export const PlatformComparison = () => {
  return (
    <section
      id="comparison"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Platform Comparison"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="FAIR PLAY AUDIT" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Platform <span className="text-accent text-glow-accent">Integrity</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            See how ArenaX eliminates the risks, delays, and disputes inherent in unregulated WhatsApp and social media scrims.
          </p>
        </div>

        {/* Ambient backlight behind the comparison surface */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="ambient-glow left-1/2 top-10 h-[380px] w-[680px] -translate-x-1/2 opacity-70"
          />

          {/* Desktop Table View */}
          <div className="hidden md:block hud-card rounded-card overflow-hidden relative z-10">
            <HudCorners tone="emerald" size="sm" inset className="opacity-50" />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans">
                <thead>
                  <tr className="border-b border-line bg-bg-3/95 backdrop-blur-xl text-xs font-mono uppercase tracking-wider text-text-3 shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
                    <th className="py-4 px-6">Evaluation Dimension</th>
                    <th className="py-4 px-6 text-accent bg-accent-dim/40 border-x border-line-accent">
                      ArenaX Official Client
                    </th>
                    <th className="py-4 px-6 text-text-3 border-l border-white/[0.04]">
                      Informal WhatsApp / Social Scrims
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {COMPARISON_POINTS.map((pt, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-emerald-500/[0.035] transition-colors duration-200"
                    >
                      <td className="py-4 px-6 font-bold text-text-1 text-sm font-heading">
                        {pt.dimension}
                      </td>
                      <td className="py-4 px-6 bg-accent-dim/20 border-x border-line-accent text-text-1 font-medium">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                          </span>
                          <span className="tabular-nums">{pt.arenax}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-text-3 border-l border-white/[0.04]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                            <X className="w-3.5 h-3.5 text-text-3" strokeWidth={1.5} />
                          </span>
                          <span className="tabular-nums">{pt.informal}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Responsive Cards */}
          <div className="md:hidden relative z-10 space-y-4">
            {COMPARISON_POINTS.map((pt, index) => (
              <div
                key={index}
                className="hud-card relative p-5 rounded-card space-y-3 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift"
              >
                {index === 0 && <HudCorners tone="emerald" size="sm" inset className="opacity-50" />}
                <span className="text-xs font-mono uppercase font-bold text-text-3 tracking-wider block">
                  {pt.dimension}
                </span>

                {/* ArenaX Row */}
                <div className="p-3 rounded-control bg-accent-dim border border-line-accent flex items-start gap-2.5 transition-colors duration-200 hover:border-emerald-400/45">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-accent block">ArenaX Official</span>
                    <p className="text-xs text-text-1 font-medium mt-0.5 tabular-nums">{pt.arenax}</p>
                  </div>
                </div>

                {/* Informal Scrims Row */}
                <div className="p-3 rounded-control bg-bg-1/70 border border-line flex items-start gap-2.5 transition-colors duration-200 hover:border-white/[0.14]">
                  <span className="w-5 h-5 rounded-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-text-3" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-text-3 block">Informal Scrims</span>
                    <p className="text-xs text-text-3 mt-0.5 tabular-nums">{pt.informal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformComparison;
