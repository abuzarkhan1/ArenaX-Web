import { useState } from 'react';
import { ChevronDown, Headset } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';
import { SEO } from './SEO';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is ArenaX?',
      answer:
        'ArenaX is Pakistan\'s premier mobile esports platform. We host daily competitive Free Fire scrims across Bermuda Battle Royale (48 players) and Clash Squad 4v4 brackets. Equipped with automated AI scoreboard verification and a strict Two-Wallet isolation model, ArenaX guarantees fair competition and 24-hour cashouts.',
    },
    {
      question: 'How do I participate in tournaments?',
      answer:
        'Download the official ArenaX APK, register your account, and link your Free Fire in-game UID. Browse active tournaments in the app, review the entry fee and prize pool, and register. Custom room credentials (Room ID and Password) unlock automatically 10–15 minutes before match countdown.',
    },
    {
      question: 'What is the difference between Play Wallet and Winning Wallet?',
      answer:
        'ArenaX maintains a strict two-vault architecture: 1) Play Wallet holds deposits and welcome bonuses used strictly to pay tournament entry fees (non-withdrawable). 2) Winning Wallet holds tournament prize money, Scout royalties, and milestone bonuses. 1 AX Coin = 1 PKR Cash, and funds in the Winning Wallet are 100% withdrawable to JazzCash, EasyPaisa, or Pakistani Bank Accounts within 24 hours.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer:
        'You can top up your Play Wallet using JazzCash, EasyPaisa, or direct Bank Transfer. Navigate to the Wallet section, enter the deposit amount (minimum PKR 50), and follow the transfer instructions. Upload your payment slip in-app; our team processes and credits your Play Wallet promptly.',
    },
    {
      question: 'How long does it take to withdraw cash winnings?',
      answer:
        'Withdrawal requests from your Winning Wallet are processed within 24 hours. You can cash out directly to JazzCash, EasyPaisa, or any Pakistani commercial bank account. The minimum withdrawal threshold is 100 AX Coins (PKR 100). For security, all withdrawals require your secondary 6-digit Fund Security Password.',
    },
    {
      question: 'How does the ArenaX Vision Engine verify match scoreboards?',
      answer:
        'After completing your match, submit a screenshot of your end-game victory summary. The ArenaX Vision Engine scans the image using optical character recognition (OCR) to detect in-game names, UIDs, kill counts, damage, and Booyah placements. Winnings are distributed to verified winners automatically within seconds.',
    },
    {
      question: 'What happens if a tournament is cancelled or fails to start?',
      answer:
        'ArenaX enforces a 100% Automated Cancellation Refund Policy. If a tournament fails to fill the minimum slot threshold or is cancelled by the organizer, 100% of your paid entry fee is credited back to your Play Wallet immediately.',
    },
    {
      question: 'How can I become an Organizer and host my own tournaments?',
      answer:
        'Any verified user can apply to become an organizer directly inside the app. Once approved, you gain access to the Organizer Wizard where you can configure match rules, schedules, entry fees, and custom slot caps (10 to 48 players). Organizers earn a configurable 0%–20% commission on tournament revenue, credited directly to an isolated Organizer Wallet.',
    },
    {
      question: 'Is ArenaX legal and compliant in Pakistan?',
      answer:
        'Yes. ArenaX operates strictly as a skill-based esports platform where match outcomes depend entirely on players\' tactical decision-making, aim accuracy, and team coordination. We comply with all applicable electronic and digital laws in Pakistan.',
    },
    {
      question: 'How are combat points calculated for Bermuda tournaments?',
      answer:
        'Scoring is strictly rulebook-governed: 1 Booyah (#1 finish) awards 20 Points, and each confirmed frag kill awards 5 Points. Scores are calculated deterministically across all participants.',
    },
  ];

  return (
    <>
      <SEO
        title="Frequently Asked Questions - ArenaX Esports Platform"
        description="Got questions about ArenaX? Learn about Free Fire tournament rules, AI scoreboard verification, wallet withdrawals, and 24-hour payouts."
        canonical="https://marenax.site/faq"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-bg-1 pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />
        <div aria-hidden="true" className="ambient-glow left-1/2 top-16 h-64 w-[36rem] max-w-[90vw] -translate-x-1/2" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <Pill dot={true} label="SUPPORT KNOWLEDGE BASE" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Frequently Asked <span className="text-accent text-glow-accent">Questions</span>
            </h1>
            <p className="text-base sm:text-lg text-text-2 mt-3 leading-relaxed">
              Find transparent answers regarding tournaments, payouts, rules, and account security.
            </p>
          </div>

          {/* FAQ Accordion List: 15-16px text */}
          <div className="max-w-3xl mx-auto space-y-3.5 mb-16">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="group hud-card relative overflow-hidden rounded-card transition-all duration-300 ease-out hover:-translate-y-0.5"
                >
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 rounded-card border border-emerald-500/30 bg-emerald-500/[0.02] shadow-[0_12px_24px_-10px_rgba(0,255,163,0.15)]"
                    />
                  )}
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-emerald-400/80 via-emerald-500/40 to-transparent"
                    />
                  )}
                  {isOpen && <HudCorners tone="emerald" size="sm" inset />}

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full min-h-[56px] p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold font-heading text-text-1">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ease-out ${
                        isOpen
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                          : 'border-white/[0.08] bg-white/[0.03] text-text-2 group-hover:border-emerald-500/40 group-hover:text-emerald-400'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
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
                      <div className="border-t border-line px-5 sm:px-6 pb-6 pt-5">
                        <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need Further Support Card */}
          <div className="hud-card relative mx-auto max-w-2xl space-y-4 overflow-hidden rounded-card p-8 text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
            <HudCorners tone="neutral" size="sm" inset />
            <div className="flex justify-center">
              <IconOrb icon={Headset} tone="emerald" size="md" />
            </div>
            <h3 className="text-xl font-bold font-heading text-text-1">Still Have Questions?</h3>
            <p className="text-sm text-text-2 leading-relaxed">
              Our <span className="font-mono tracking-tight tabular-nums text-white/80">24/7</span> Pakistani customer support team is available via email and WhatsApp.
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
