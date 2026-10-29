import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
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

      <div className="pt-28 sm:pt-36 pb-20 bg-bg-1 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <Pill dot={true} label="SUPPORT KNOWLEDGE BASE" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Frequently Asked <span className="text-accent">Questions</span>
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
                  className={`hud-card rounded-card overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-line-strong' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full min-h-[56px] p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold font-heading text-text-1">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-line">
                      <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need Further Support Card */}
          <div className="hud-card p-8 rounded-card text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold font-heading text-text-1">Still Have Questions?</h3>
            <p className="text-sm text-text-2 leading-relaxed">
              Our 24/7 Pakistani customer support team is available via email and WhatsApp.
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
