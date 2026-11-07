import { Link } from 'react-router-dom';
import { Scale, ListOrdered, FileText, ArrowRight, Mail, ShieldAlert } from 'lucide-react';
import { SEO } from './SEO';

export const Terms = () => {
  const sectionNumberClass =
    'mr-2.5 inline-flex h-6 min-w-[1.6rem] -translate-y-px items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]';

  const sections = [
    { id: 'acceptance', num: '1', title: 'Acceptance of Terms' },
    { id: 'eligibility', num: '2', title: 'Player Eligibility' },
    { id: 'security', num: '3', title: 'Account & Fund Security' },
    { id: 'classification', num: '4', title: 'Skill-Based Gaming Classification' },
    { id: 'bans', num: '5', title: 'Disqualification & Bans' },
  ];

  return (
    <>
      <SEO
        title="Terms & Conditions - ArenaX Esports Platform"
        description="Review the official Terms & Conditions governing player participation, wallet usage, and tournaments on the ArenaX platform."
        canonical="https://marenax.site/terms"
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
            <span className="text-[#3ECF8E] font-medium">Terms & Conditions</span>
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
                  Terms & <span className="text-accent text-glow-accent">Conditions</span>
                </h1>
                <p className="text-sm text-text-3 mt-2 tracking-tight">
                  Official binding platform agreements and competitive rules.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-control border border-white/10 bg-[#181a19] flex items-center justify-center text-[#3ECF8E] shadow-sm">
                  <Scale className="w-5 h-5" strokeWidth={1.75} />
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
                <section id="acceptance" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>1.</span> Acceptance of Terms
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    By downloading the ArenaX application or accessing our website and related services, you accept and agree to be bound by the terms and conditions set forth herein. If you do not agree to these terms, do not access or use our platform. ArenaX reserves the right to modify these terms to reflect feature additions or regulatory changes.
                  </p>
                </section>

                {/* SECTION 2 */}
                <section id="eligibility" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>2.</span> Player Eligibility
                  </h2>
                  <ul className="space-y-2.5 text-[15px] sm:text-base text-text-2 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Users must be at least 18 years of age or possess authorized parental or legal guardian consent.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>You must be a resident of Pakistan or a jurisdiction where skill-based esports platforms are legally permitted.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>You must provide accurate registration details, including your authentic Free Fire in-game name and UID.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Strictly one account per individual is permitted. Duplicate accounts created to exploit bonuses will be terminated.</span>
                    </li>
                  </ul>
                </section>

                {/* SECTION 3 */}
                <section id="security" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>3.</span> Account & Fund Security
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    You are solely responsible for maintaining the confidentiality of your account credentials, login credentials, and private 6-digit Fund Security Password. ArenaX representatives will never ask for your private password. All match registrations and transactions executed under your credentials remain your sole responsibility.
                  </p>
                </section>

                {/* SECTION 4 */}
                <section id="classification" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>4.</span> Skill-Based Gaming Classification
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Tournaments hosted on ArenaX are strictly skill-based competitive sports. Outcomes depend on tactical decision-making, target acquisition accuracy, game sense, and team coordination. ArenaX does not offer games of pure chance or gambling.
                  </p>
                </section>

                {/* SECTION 5 */}
                <section id="bans" className="scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>5.</span> Disqualification & Bans
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Any player detected using emulators, modified client packages, aimbots, wallhacks, or exploiting network lag will receive an immediate permanent hardware ban and forfeiture of all accumulated funds.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-300">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                    <p className="leading-relaxed">
                      Zero tolerance is enforced for modified APKs and PC emulators. Machine signatures are cryptographically logged to prevent re-registration.
                    </p>
                  </div>
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
                    <Link to="/terms" className="flex items-center justify-between text-[#3ECF8E] font-medium py-1">
                      <span>Terms of Service</span>
                      <span className="text-[10px] font-mono bg-[#041B10] px-1.5 py-0.5 rounded border border-[#3ECF8E]/30">Active</span>
                    </Link>
                    <Link to="/privacy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Privacy Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
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
                  <div className="font-semibold text-text-1">Questions Regarding Terms?</div>
                  <p className="text-text-3 leading-relaxed">
                    Our compliance desk is available 24/7 to answer eligibility and security questions.
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

export default Terms;
