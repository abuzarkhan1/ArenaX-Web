import { Download, UserPlus, Users, Swords, Trophy, Banknote } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      icon: Download,
      title: 'Download & Install APK',
      desc: 'Download the official ArenaX APK for Android. Register with a referral code to claim 25 AX starter coins.',
    },
    {
      step: '02',
      icon: UserPlus,
      title: 'Link Your Free Fire UID',
      desc: 'Set up your player profile and connect your authentic Free Fire IGN and UID for automated verification.',
    },
    {
      step: '03',
      icon: Users,
      title: 'Assemble Your Squad',
      desc: 'Form Duo or Squad lineups in under 5 seconds using unique 6-digit room codes, or compete as a Solo rogue.',
    },
    {
      step: '04',
      icon: Swords,
      title: 'Register for Tournaments',
      desc: 'Browse daily Bermuda Battle Royale scrims and Clash Squad 4v4 brackets with entry fees starting from 50 AX.',
    },
    {
      step: '05',
      icon: Trophy,
      title: 'Drop & Dominate',
      desc: 'Room ID & password unlock 10–15 minutes before match start. Fight for the Booyah and rack up kill points.',
    },
    {
      step: '06',
      icon: Banknote,
      title: 'AI Verification & Cashout',
      desc: 'ArenaX Vision Engine verifies the scoreboard. Cash winnings are credited to your Winning Wallet for 24h cashout.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Seamless Player Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            How ArenaX <span className="text-[#00C878]">Works</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            From installation to cash withdrawal in 6 simple, transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="premium-card p-5 sm:p-7 md:p-8 rounded-3xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center border border-[#00C878]/30 group-hover:scale-105 transition-transform shadow-inner">
                      <Icon className="w-6 h-6 text-[#00C878]" />
                    </div>
                    <span className="text-3xl font-black text-white/10 group-hover:text-[#00C878]/30 transition-colors font-heading">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

