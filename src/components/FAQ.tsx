import { useState } from 'react';
import { ChevronDown, Headset } from 'lucide-react';
import { Button } from './primitives/Button';
import { SEO } from './SEO';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'wallet', label: 'Wallet & Cashout' },
    { id: 'engine', label: 'Vision Engine & Rules' },
    { id: 'organizer', label: 'Organizer & Legal' },
  ];

  const faqs = [
    {
      category: 'tournaments',
      question: 'What is ArenaX?',
      answer:
        'ArenaX is Pakistan\'s premier mobile esports platform. We host daily competitive Free Fire scrims across Bermuda Battle Royale (48 players) and Clash Squad 4v4 brackets. Equipped with automated AI scoreboard verification and a strict Two-Wallet isolation model, ArenaX guarantees fair competition and 24-hour cashouts.',
    },
    {
      category: 'tournaments',
      question: 'How do I participate in tournaments?',
      answer:
        'Download the official ArenaX APK, register your account, and link your Free Fire in-game UID. Browse active tournaments in the app, review the entry fee and prize pool, and register. Custom room credentials (Room ID and Password) unlock automatically 10–15 minutes before match countdown.',
    },
    {
      category: 'wallet',
      question: 'What is the difference between Play Wallet and Winning Wallet?',
      answer:
        'ArenaX maintains a strict two-vault architecture: 1) Play Wallet holds deposits and welcome bonuses used strictly to pay tournament entry fees (non-withdrawable). 2) Winning Wallet holds tournament prize money, Scout royalties, and milestone bonuses. 1 AX Coin = 1 PKR Cash, and funds in the Winning Wallet are 100% withdrawable to JazzCash, EasyPaisa, or Pakistani Bank Accounts within 24 hours.',
    },
    {
      category: 'wallet',
      question: 'How do I add money to my wallet?',
      answer:
        'You can top up your Play Wallet using JazzCash, EasyPaisa, or direct Bank Transfer. Navigate to the Wallet section, enter the deposit amount (minimum PKR 50), and follow the transfer instructions. Upload your payment slip in-app; our team processes and credits your Play Wallet promptly.',
    },
    {
      category: 'wallet',
      question: 'How long does it take to withdraw cash winnings?',
      answer:
        'Withdrawal requests from your Winning Wallet are processed within 24 hours. You can cash out directly to JazzCash, EasyPaisa, or any Pakistani commercial bank account. The minimum withdrawal threshold is 100 AX Coins (PKR 100). For security, all withdrawals require your secondary 6-digit Fund Security Password.',
    },
    {
      category: 'engine',
      question: 'How does the ArenaX Vision Engine verify match scoreboards?',
      answer:
        'After completing your match, submit a screenshot of your end-game victory summary. The ArenaX Vision Engine scans the image using optical character recognition (OCR) to detect in-game names, UIDs, kill counts, damage, and Booyah placements. Winnings are distributed to verified winners automatically within seconds.',
    },
    {
      category: 'tournaments',
      question: 'What happens if a tournament is cancelled or fails to start?',
      answer:
        'ArenaX enforces a 100% Automated Cancellation Refund Policy. If a tournament fails to fill the minimum slot threshold or is cancelled by the organizer, 100% of your paid entry fee is credited back to your Play Wallet immediately.',
    },
    {
      category: 'organizer',
      question: 'How can I become an Organizer and host my own tournaments?',
      answer:
        'Any verified user can apply to become an organizer directly inside the app. Once approved, you gain access to the Organizer Wizard where you can configure match rules, schedules, entry fees, and custom slot caps (10 to 48 players). Organizers earn a configurable 0%–20% commission on tournament revenue, credited directly to an isolated Organizer Wallet.',
    },
    {
      category: 'organizer',
      question: 'Is ArenaX legal and compliant in Pakistan?',
      answer:
        'Yes. ArenaX operates strictly as a skill-based esports platform where match outcomes depend entirely on players\' tactical decision-making, aim accuracy, and team coordination. We comply with all applicable electronic and digital laws in Pakistan.',
    },
    {
      category: 'engine',
      question: 'How are combat points calculated for Bermuda tournaments?',
      answer:
        'Scoring is strictly rulebook-governed: 1 Booyah (#1 finish) awards 20 Points, and each confirmed frag kill awards 5 Points. Scores are calculated deterministically across all participants.',
    },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      <SEO
        title="Frequently Asked Questions - ArenaX Esports Platform"
        description="Got questions about ArenaX? Learn about Free Fire tournament rules, AI scoreboard verification, wallet withdrawals, and 24-hour payouts."
        canonical="https://marenax.site/faq"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-20 sm:pt-36">
        {/* Supabase ambient atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-16 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Frequently Asked <span className="text-[#3ECF8E]">Questions</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] mt-3 leading-relaxed">
              Find transparent answers regarding tournaments, payouts, rules, and account security.
            </p>
          </div>

          {/* Supabase Segmented Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#041B10] text-[#3ECF8E] border border-[#3ECF8E]/40 shadow-[0_0_12px_rgba(62,207,142,0.2)]'
                      : 'bg-[#171717] text-[#A0A0A0] border border-white/[0.08] hover:border-white/20 hover:text-[#EDEDED]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List (Supabase Precision Accordion) */}
          <div className="max-w-3xl mx-auto space-y-3 mb-16">
            {filteredFaqs.map((faq) => {
              // Find index in main faqs array to maintain single-open state
              const realIndex = faqs.findIndex((f) => f.question === faq.question);
              const isOpen = openIndex === realIndex;

              return (
                <div
                  key={realIndex}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-200 ${
                    isOpen
                      ? 'bg-[#171717] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(62,207,142,0.12),0_12px_24px_-10px_rgba(0,0,0,0.6)]'
                      : 'bg-[#171717] border border-white/[0.08] hover:border-white/20 hover:bg-[#181a19]'
                  }`}
                >
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[#3ECF8E]"
                    />
                  )}

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : realIndex)}
                    className="w-full min-h-[58px] p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold font-heading text-[#EDEDED] group-hover:text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? 'border-[#3ECF8E]/40 bg-[#041B10] text-[#3ECF8E]'
                          : 'border-white/10 bg-white/[0.02] text-[#A0A0A0] group-hover:border-[#3ECF8E]/30 group-hover:text-[#3ECF8E]'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ease-out ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/[0.08] px-5 sm:px-6 pb-6 pt-4">
                        <p className="text-[15px] sm:text-base text-[#A0A0A0] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need Further Support Card (Supabase Elevated Surface) */}
          <div className="relative mx-auto max-w-2xl space-y-4 overflow-hidden rounded-2xl bg-[#171717] border border-white/[0.08] p-8 sm:p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] transition-all duration-200 ease-out hover:-translate-y-0.5">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-xl bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] shadow-[0_0_15px_rgba(62,207,142,0.15)]">
                <Headset className="w-6 h-6" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#EDEDED]">Still Have Questions?</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed max-w-md mx-auto">
              Our <span className="font-mono tracking-tight tabular-nums text-[#EDEDED]">24/7</span> Pakistani customer support team is available via email and WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                asAnchor
                href="https://wa.me/+923367135319"
                target="_blank"
              >
                Chat on WhatsApp
              </Button>
              <Button
                variant="secondary"
                size="md"
                asAnchor
                href="mailto:arenasupport@gmail.com"
              >
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
