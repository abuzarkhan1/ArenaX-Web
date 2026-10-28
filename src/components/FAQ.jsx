import { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is ArenaX?',
      answer:
        'ArenaX is Pakistan\'s premier mobile esports tournament platform. We host daily competitive tournaments for Free Fire across Bermuda Battle Royale (48–50 players) and Clash Squad 4v4 brackets. Outfitted with the proprietary ArenaX Vision Engine for automated scoreboard verification and a strict Two-Wallet isolation model, ArenaX guarantees fair competition and instant cashouts.',
    },
    {
      question: 'How do I participate in tournaments?',
      answer:
        'Simply download the official ArenaX APK, register your account, and link your Free Fire in-game UID. Browse active tournaments in the app, review the entry fee and prize pool, and register. Custom room credentials (Room ID and Password) unlock automatically 10–15 minutes before match countdown.',
    },
    {
      question: 'What is the difference between Play Wallet and Winning Wallet?',
      answer:
        'ArenaX maintains a strict two-vault architecture for security: 1) Play Wallet holds deposits and welcome bonuses used strictly to pay tournament entry fees (non-withdrawable). 2) Winning Wallet holds tournament prize money, Scout royalties, and milestone bonuses. 1 AX Coin = 1 PKR Cash, and funds in the Winning Wallet are 100% withdrawable to JazzCash, EasyPaisa, or Pakistani Bank Accounts within 24 hours.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer:
        'You can top up your Play Wallet using JazzCash, EasyPaisa, or direct Bank Transfer. Navigate to the Wallet section, enter the deposit amount (minimum PKR 50), and follow the on-screen transfer instructions. Upload your payment screenshot slip in-app; our financial verification desk processes and credits your Play Wallet promptly during operating hours.',
    },
    {
      question: 'How long does it take to withdraw cash winnings?',
      answer:
        'Withdrawal requests from your Winning Wallet are processed within 24 hours. You can cash out directly to JazzCash, EasyPaisa, or any Pakistani commercial bank account. The minimum withdrawal threshold is 100 AX Coins (PKR 100). For security, all withdrawals require your secondary 6-digit Fund Security Password.',
    },
    {
      question: 'How does the ArenaX Vision Engine verify match scoreboards?',
      answer:
        'After completing your match, submit a screenshot of your end-game victory, defeat, or ranking summary screen. The ArenaX Vision Engine scans the image using high-speed neural optical character recognition (OCR) to detect in-game names, UIDs, kill counts, damage, and Booyah placements. Winnings are distributed to verified winners automatically within seconds, eliminating manual host disputes.',
    },
    {
      question: 'What happens if a tournament is cancelled or fails to start?',
      answer:
        'ArenaX enforces a 100% Automated Cancellation Refund Policy. If a tournament fails to fill the minimum slot threshold or is cancelled by the organizer or platform admin, 100% of your paid entry fee is credited back to your Play Wallet immediately.',
    },
    {
      question: 'What are the rules for P2P coin transfers between friends?',
      answer:
        'You can transfer AX Coins directly between players using usernames to share entry fees among squadmates. To protect users from fraud, accounts are subject to a 24-hour transfer cooldown after initial registration, and recipients must have completed at least one verified tournament before receiving transfers.',
    },
    {
      question: 'How can I become an Organizer and host my own tournaments?',
      answer:
        'Any verified user can apply to become an organizer directly inside the app. Once your identity is approved, you gain access to the Organizer Tournament Wizard where you can configure match rules, schedules, entry fees, and custom slot caps (10 to 50 players). Organizers earn a configurable 0%–20% commission on tournament revenue, credited directly to an isolated Organizer Wallet.',
    },
    {
      question: 'Is ArenaX legal and compliant in Pakistan?',
      answer:
        'Yes. ArenaX operates strictly as a skill-based esports platform where match outcomes depend entirely on players\' tactical decision-making, aim accuracy, and team coordination rather than chance. We comply with all applicable electronic and digital laws in Pakistan.',
    },
    {
      question: 'How are combat points calculated for Bermuda tournaments?',
      answer:
        'ArenaX employs an authoritative point matrix: 1 Booyah (#1 Place) = 20 Points; 1 Kill = 5 Points. Placement finish serves as the primary tie-breaker. This balances aggressive fragging with tactical survival gameplay.',
    },
    {
      question: 'Can I play with my friends in Duo and Squad formats?',
      answer:
        'Absolutely. ArenaX provides 6-digit Squad Codes allowing teammates to assemble their roster in seconds without waiting for manual friend requests. You can also transfer captaincy, remove members, and upload custom squad logos.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-[#101214] relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <HelpCircle className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Frequently Asked Questions
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 font-heading tracking-tight">
            Got Questions? <span className="text-[#00C878]">We Have Answers.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about Free Fire tournaments, automated scoreboard settlement, Two-Wallet security, and withdrawals.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`premium-card rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#00C878]/40 shadow-xl' : 'hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full min-h-[56px] px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold pr-4 font-heading transition-colors ${
                    isOpen ? 'text-[#00C878]' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-[#00C878]/15 text-[#00C878]' : 'bg-white/5 text-[#A1A1AA]'
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#00C878]' : ''
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-white/5">
                    <p className="text-[#A1A1AA] leading-relaxed text-xs sm:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Helpdesk Card */}
        <div className="mt-14 sm:mt-16 premium-card p-6 sm:p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C878]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-[#00C878]/15 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00C878]/30 shadow-md">
              <Mail className="w-6 h-6 text-[#00C878]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
              Still Have Questions or Need Match Assistance?
            </h2>
            <p className="text-[#A1A1AA] mb-6 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Our support team is available 24/7 across Pakistan via email and WhatsApp to assist with tournament room queries and wallet deposits.
            </p>
            <a
              href="mailto:arenasupport@gmail.com"
              className="inline-flex min-h-[48px] items-center gap-2 bg-[#00C878] hover:bg-[#00A865] active:scale-95 text-[#101214] px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#00C878]/25 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Contact arenasupport@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
