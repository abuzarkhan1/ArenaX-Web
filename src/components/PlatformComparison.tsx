import { CheckCircle2, X } from 'lucide-react';

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
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Platform Comparison"
    >
      {/* Subtle atmospheric radial backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)]"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Platform <span className="text-[#3ECF8E]">Integrity</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed">
            See how ArenaX eliminates the risks, delays, and disputes inherent in unregulated WhatsApp and social media scrims.
          </p>
        </div>

        {/* Comparison Surface */}
        <div className="relative">
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-card overflow-hidden relative z-10 bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_48px_-20px_rgba(0,0,0,0.7)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#1E201F]/95 backdrop-blur-xl text-xs font-mono uppercase tracking-wider text-[#707070] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
                    <th className="py-4 px-6 font-semibold">Evaluation Dimension</th>
                    <th className="py-4 px-6 text-[#3ECF8E] font-semibold bg-[#041B10]/40 border-x border-[#3ECF8E]/20">
                      ArenaX Official Client
                    </th>
                    <th className="py-4 px-6 text-[#707070] font-semibold border-l border-white/[0.04]">
                      Informal WhatsApp / Social Scrims
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08]">
                  {COMPARISON_POINTS.map((pt, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-white/[0.02] transition-colors duration-150"
                    >
                      <td className="py-4 px-6 font-bold text-[#EDEDED] text-sm font-heading">
                        {pt.dimension}
                      </td>
                      <td className="py-4 px-6 bg-[#041B10]/20 border-x border-[#3ECF8E]/20 text-[#EDEDED] font-medium">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 flex items-center justify-center flex-shrink-0 text-[#3ECF8E]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                          </span>
                          <span className="tabular-nums">{pt.arenax}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#707070] border-l border-white/[0.04]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-white/[0.02] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-[#707070]">
                            <X className="w-3.5 h-3.5 text-[#707070]" strokeWidth={1.5} />
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
                className="relative p-5 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] space-y-3 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]"
              >
                <span className="text-xs font-mono uppercase font-bold text-[#707070] tracking-wider block">
                  {pt.dimension}
                </span>

                {/* ArenaX Row */}
                <div className="p-3 rounded-control bg-[#041B10]/60 border border-[#3ECF8E]/25 flex items-start gap-2.5 transition-colors duration-200 hover:border-[#3ECF8E]/40">
                  <span className="w-5 h-5 rounded-md bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#3ECF8E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#3ECF8E] block">ArenaX Official</span>
                    <p className="text-xs text-[#EDEDED] font-medium mt-0.5 tabular-nums">{pt.arenax}</p>
                  </div>
                </div>

                {/* Informal Scrims Row */}
                <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex items-start gap-2.5 transition-colors duration-200 hover:border-white/[0.14]">
                  <span className="w-5 h-5 rounded-md bg-white/[0.02] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#707070]">
                    <X className="w-3.5 h-3.5 text-[#707070]" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#707070] block">Informal Scrims</span>
                    <p className="text-xs text-[#707070] mt-0.5 tabular-nums">{pt.informal}</p>
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
