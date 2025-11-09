import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is ArenaX?',
      answer:
        'ArenaX is a mobile tournament platform for competitive gaming. We host daily tournaments for popular games like Free Fire and PUBG, where players can compete, win prizes, and climb leaderboards. Our platform offers secure payments, real-time updates, and a fair gaming environment.',
    },
    {
      question: 'How do I participate in tournaments?',
      answer:
        'Simply download the ArenaX app, create an account, and browse available tournaments. Each tournament shows the entry fee, prize pool, and game format. Once you find a tournament you like, pay the entry fee using coins (which you can purchase), and you\'re registered! You\'ll receive all match details and room codes before the tournament starts.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer:
        'You can add money to your ArenaX wallet using multiple payment methods including EasyPaisa, JazzCash , debit/credit cards, and net banking. Go to your wallet section, click on "Deposit," enter the amount you want to add, and choose your preferred payment method. The coins will be credited instantly to your account.',
    },
    {
      question: 'How long does it take to withdraw winnings?',
      answer:
        'Withdrawals are processed within 24-48 hours after verification. You can withdraw your winnings to your bank account, EasyPaisa, or JazzCash or Bank. Minimum withdrawal amount is RS 100.',
    },
    {
      question: 'What games are supported?',
      answer:
        'Currently, ArenaX supports Free Fire and PUBG Mobile Is Comming Soon. We regularly host tournaments for  games with various formats including Solo, Duo, and Squad matches. We\'re constantly working on adding more games based on community demand.',
    },
    {
      question: 'Is ArenaX safe and legal?',
      answer:
        'Yes, ArenaX is completely safe and legal. We operate as a skill-based gaming platform where outcomes depend on player skill rather than chance. All transactions are encrypted and secure. We comply with all applicable laws and regulations in Pakistan.',
    },
    {
      question: 'What if I face technical issues during a tournament?',
      answer:
        'If you experience technical issues during a tournament, immediately contact our support team through the in-app chat or email. We have a dedicated support team available 24/7. Depending on the issue, we may reschedule your match or provide a refund. Make sure to report issues within 15 minutes of match start.',
    },
    {
      question: 'How are winners determined?',
      answer:
        'Winners are determined based on their in-game performance and rankings. For Battle Royale tournaments, we consider kills, placement, and survival time. After each match, players must submit their results with screenshots. Our team verifies all results before distributing prizes.',
    },
    {
      question: 'Can I play with my friends?',
      answer:
        'Absolutely! ArenaX supports team registrations. You can create or join a team with your friends and participate in Duo and Squad tournaments together. Simply create a team in the app, invite your friends, and register for team-based tournaments.',
    },
    
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked <span className="text-[#00FF7F]">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Got questions? We've got answers. Find everything you need to know
            about ArenaX.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E]/40 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-white pr-6">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#00FF7F] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-400 leading-relaxed text-lg">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#1E1E1E]/40 backdrop-blur-2xl rounded-3xl p-10 md:p-12 border border-white/10 text-center shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            Still Have Questions?
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Can't find the answer you're looking for? Our support team is here
            to help you 24/7.
          </p>
          <button
            onClick={() =>
              (window.location.href = 'mailto:arenasupprt@gmail.com')
            }
            className="bg-[#00FF7F]/90 backdrop-blur-xl text-black px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#00FF7F] transition-all duration-300 shadow-2xl shadow-[#00FF7F]/30 hover:shadow-[#00FF7F]/50 border border-[#00FF7F]/30 hover:scale-105"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;