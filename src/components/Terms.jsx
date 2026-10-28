import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-[#101214] relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <ShieldAlert className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Platform Policies & User Agreement
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 font-heading tracking-tight">
            Terms & <span className="text-[#00C878]">Conditions</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Last updated: 2026 • Governed under the Laws of Pakistan</p>
        </div>

        <div className="premium-card rounded-3xl p-6 sm:p-8 md:p-12 space-y-8 text-xs sm:text-sm leading-relaxed text-[#A1A1AA] relative overflow-hidden">
          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              1. Acceptance of Terms
            </h2>
            <p>
              By downloading the ArenaX application or accessing our website and related services, you accept and agree to be bound by the terms and conditions set forth herein. If you do not agree to these terms, do not access or use our platform. ArenaX reserves the right to modify these terms to reflect feature additions or regulatory changes, and continued use represents acceptance of any updates.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              2. Eligibility
            </h2>
            <p className="mb-3">
              To register an account and participate in ArenaX tournaments, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be at least 18 years of age or possess authorized parental/guardian consent.</li>
              <li>Be a resident of Pakistan or a jurisdiction where skill-based esports platforms are legally permitted.</li>
              <li>Provide accurate, authentic registration details, including your Free Fire in-game name and UID.</li>
              <li>Maintain strictly one account per individual. Creation of multiple or duplicate accounts to abuse bonuses will result in immediate termination.</li>
            </ul>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              3. User Account & Fund Security
            </h2>
            <p>
              You are solely responsible for maintaining the confidentiality of your account credentials, login OTPs, and private 6-digit Fund Security Password. ArenaX administrators will never ask for your password. All match registrations and wallet transactions executed under your credentials are your sole responsibility.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              4. Tournament Rules & Authoritative Scoring
            </h2>
            <p className="mb-3">
              All participants must adhere to the game format rules:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Combat scoring: 20 Points for Booyah (#1 Place); 5 Points per Kill. Placement rank serves as the primary tie-breaker.</li>
              <li>Match credentials (Room ID and Password) unlock 10–15 minutes prior to match countdown. Sharing credentials with unregistered individuals is strictly prohibited.</li>
              <li>End-match scoreboard screenshots must be submitted through the in-app portal for ArenaX Vision Engine OCR verification. Tampered or modified screenshots result in permanent disqualification.</li>
            </ul>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              5. Wallet Architecture, Payments & 100% Refunds
            </h2>
            <p className="mb-3">
              ArenaX operates a segregated Two-Wallet structure:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Play Wallet</strong>: Holds deposited funds and welcome bonuses for tournament entry. Funds in the Play Wallet are non-withdrawable.</li>
              <li><strong>Winning Wallet</strong>: Holds tournament cash winnings, Scout royalties, and milestone bonuses at a verified parity of 1 AX Coin = 1 PKR Cash. Funds are withdrawable within 24 hours to JazzCash, EasyPaisa, or Pakistani Bank Accounts. Minimum cashout threshold is 100 AX Coins.</li>
              <li><strong>Automated Cancellation Refunds</strong>: If a tournament fails to launch or is cancelled by an organizer or platform admin, 100% of the entry fee is credited back to the source Play Wallet immediately.</li>
            </ul>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              6. Zero-Tolerance Fair Play & Anti-Cheat Policy
            </h2>
            <p>
              ArenaX maintains absolute zero-tolerance for hacking, cheating, or match-fixing. Any player detected using third-party aimbots, wall hacks, config scripts, speed modifications, radar tools, or teaming in solo brackets will be permanently banned. All accumulated wallet balances of banned accounts are forfeited, and in-game UIDs are blacklisted across the platform.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              7. Organizer Responsibilities & Conduct
            </h2>
            <p>
              Approved organizers are authorized to create tournaments, set custom slots (10–50 players), and earn a configurable commission (0%–20%). Organizers must adhere to platform schedules, ensure fair play, and are subject to authentic 1–5 star reviews from verified tournament participants. Abuse of organizer privileges results in immediate revocation of hosting rights.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              8. Intellectual Property & Brand Rights
            </h2>
            <p>
              ArenaX, its emblem, code, algorithms, interface, and branding are the exclusive property of ArenaX. Free Fire is a registered trademark of Garena International. ArenaX is an independent competitive platform and is not officially affiliated with, endorsed by, or sponsored by Garena.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              9. Limitation of Liability
            </h2>
            <p>
              ArenaX shall not be liable for any indirect, incidental, or consequential losses, including player network disconnections, third-party server outages (e.g. game publisher maintenance), or mobile device hardware failures during live matches.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              10. Dispute Resolution & Arbitration (Pakistan)
            </h2>
            <p>
              Any disputes or claims arising out of or in connection with this agreement or tournament outcomes that cannot be settled amicably through customer support shall be submitted to binding arbitration in accordance with the <strong>Arbitration Act, 1940 (Pakistan)</strong>. The arbitration shall take place in Lahore or Islamabad, Pakistan, and proceedings shall be conducted in English or Urdu.
            </p>
          </section>

          <section className="pb-6 border-b border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              11. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by, interpreted, and construed in accordance with the substantive <strong>laws of the Islamic Republic of Pakistan</strong>. Subject to the arbitration clause, any legal proceedings shall be brought exclusively before the competent courts of jurisdiction in Pakistan.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 font-heading">
              12. Official Contact Information
            </h2>
            <p className="mb-4">
              For legal inquiries, dispute appeals, or policy questions, please contact our legal and support team:
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-xs text-[#71717A] uppercase font-bold block mb-1">Official Legal Channel</span>
              <a
                href="mailto:arenasupport@gmail.com"
                className="text-[#00C878] font-bold text-sm hover:underline"
              >
                arenasupport@gmail.com
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-white px-6 py-3 rounded-xl font-bold text-xs border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00C878]" />
            Return to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
