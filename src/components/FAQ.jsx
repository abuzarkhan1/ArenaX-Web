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
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF7F] to-[#00BFFF]">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Got questions? We've got answers. Find everything you need to know
            about ArenaX.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] rounded-2xl border border-[#2A2A2A] overflow-hidden hover:border-[#00FF7F]/30 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00FF7F] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#00FF7F]/10 to-[#00BFFF]/10 rounded-3xl p-8 md:p-12 border border-[#2A2A2A] text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Can't find the answer you're looking for? Our support team is here
            to help you 24/7.
          </p>
          <button
            onClick={() =>
              (window.location.href = 'mailto:arenasupprt@gmail.com')
            }
            className="bg-gradient-to-r from-[#00FF7F] to-[#00BFFF] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00FF7F]/50 transition-all duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
