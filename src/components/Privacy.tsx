import { Link } from 'react-router-dom';
import { ShieldCheck, ListOrdered, FileText, ArrowRight, Mail, Lock } from 'lucide-react';
import { SEO } from './SEO';

export const Privacy = () => {
  const sectionNumberClass =
    'mr-2.5 inline-flex h-6 min-w-[1.6rem] -translate-y-px items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]';

  const sections = [
    { id: 'collection', num: '1', title: 'Information We Collect' },
    { id: 'usage', num: '2', title: 'How Information is Used' },
    { id: 'security', num: '3', title: 'Data Security & Storage' },
    { id: 'officer', num: '4', title: 'Contacting the Privacy Officer' },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - ArenaX Esports Platform"
        description="Learn how ArenaX collects, protects, and handles player data, Free Fire UIDs, and payment records."
        canonical="https://marenax.site/privacy"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-24 sm:pt-36">
        {/* Subtle Supabase Ambient Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-[95vw] rounded-full bg-[#3ECF8E]/[0.03] blur-3xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-3">
            <Link to="/" className="text-text-2 hover:text-[#3ECF8E] transition-colors focus-ring rounded-sm">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-text-3">Legal & Compliance</span>
            <span className="text-white/20">/</span>
            <span className="text-[#3ECF8E] font-medium">Privacy Policy</span>
          </nav>

          {/* Page Hero Header */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ECF8E]" />
              </span>
              <span className="tabular-nums">Last updated: 2026 • Governed under the Laws of Pakistan</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-1 tracking-tight">
                  Privacy <span className="text-accent text-glow-accent">Policy</span>
                </h1>
                <p className="text-sm font-mono text-text-3 mt-2 tracking-tight tabular-nums">
                  Last updated: 2026 • Governed under the Laws of Pakistan
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-control border border-white/10 bg-[#181a19] flex items-center justify-center text-[#3ECF8E] shadow-sm">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Developer-Docs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Legal Content Card */}
            <main className="lg:col-span-8">
              <div className="rounded-card border border-white/[0.08] bg-[#171717] p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.75)]">
                {/* SECTION 1 */}
                <section id="collection" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>1.</span> Information We Collect
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    ArenaX collects personal data necessary to provide competitive tournament matchmaking, automated scoreboard verification, and local payment cashouts. This includes your mobile phone number, authentic Free Fire in-game name and UID, and transaction slip details for manual deposit processing.
                  </p>
                </section>

                {/* SECTION 2 */}
                <section id="usage" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>2.</span> How Information is Used
                  </h2>
                  <ul className="space-y-2.5 text-[15px] sm:text-base text-text-2 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Verifying match lobby eligibility against registered player UIDs.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Executing automated AI OCR scoreboard matching for victory and kill tallies.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Processing direct withdrawals to your JazzCash, EasyPaisa, or Pakistani bank account.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Detecting fraud, bonus exploitation, and unfair third-party cheat software.</span>
                    </li>
                  </ul>
                </section>

                {/* SECTION 3 */}
                <section id="security" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>3.</span> Data Security & Storage
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    All account records and transaction proofs are stored with cryptographic hashing. ArenaX never sells, leases, or trades player data to external marketing advertisers. Financial passwords remain hashed and inaccessible to staff.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-[#3ECF8E]/20 bg-[#041B10]/40 p-4 text-xs text-[#85E0BA]">
                    <Lock className="w-4 h-4 flex-shrink-0 text-[#3ECF8E] mt-0.5" />
                    <p className="leading-relaxed">
                      All stored player data and transaction ledger proofs are safeguarded with SHA-256 cryptographic hashes and strict multi-tier access controls.
                    </p>
                  </div>
                </section>

                {/* SECTION 4 */}
                <section id="officer" className="scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>4.</span> Contacting the Privacy Officer
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    If you have questions regarding your stored profile data or wish to request data deletion, contact our privacy desk at{' '}
                    <a
                      href="mailto:arenasupport@gmail.com"
                      className="text-accent font-mono underline decoration-[#3ECF8E]/40 underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-ring rounded-sm"
                    >
                      arenasupport@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </main>

            {/* Sidebar Table of Contents & Quick Navigation */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* Table of Contents */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3.5">
                    <ListOrdered className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>On This Page</span>
                  </div>
                  <nav className="space-y-1.5 font-sans text-xs">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center py-1 text-text-2 transition-colors duration-150 hover:text-[#3ECF8E]"
                      >
                        <span className="mr-2 font-mono text-[10px] text-[#3ECF8E]/80 group-hover:text-[#3ECF8E]">
                          0{sec.num}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Legal Switcher */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>Legal Directory</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Link to="/terms" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Terms of Service</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/privacy" className="flex items-center justify-between text-[#3ECF8E] font-medium py-1">
                      <span>Privacy Policy</span>
                      <span className="text-[10px] font-mono bg-[#041B10] px-1.5 py-0.5 rounded border border-[#3ECF8E]/30">Active</span>
                    </Link>
                    <Link to="/refund-policy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>100% Refund Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/fair-play" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Fair Play & Anti-Cheat</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                  </div>
                </div>

                {/* Need Support Box */}
                <div className="rounded-panel border border-white/[0.08] bg-[#141514] p-4 text-xs space-y-2.5">
                  <div className="font-semibold text-text-1">Data Deletion Inquiries?</div>
                  <p className="text-text-3 leading-relaxed">
                    Submit UID and profile data deletion requests directly to our designated Privacy Desk.
                  </p>
                  <a
                    href="mailto:arenasupport@gmail.com"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3ECF8E] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    <span>arenasupport@gmail.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
