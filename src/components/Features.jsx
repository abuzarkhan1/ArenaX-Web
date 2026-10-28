import { Shield, Award, Clock, Users, Zap, Trophy, Gamepad2, Star, Headphones, Banknote, ArrowRight } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const Features = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Daily Bermuda & Clash Squad',
      description:
        'Compete in 50-player Bermuda survival lobbies and 4v4 Clash Squad brackets daily with transparent prize pools.',
      color: '#00C878',
    },
    {
      icon: Zap,
      title: 'ArenaX Vision Engine',
      description:
        'Instant, dispute-free scoreboard OCR processing. Kills, placements, and Booyahs are verified automatically in seconds.',
      color: '#00D2FF',
    },
    {
      icon: Shield,
      title: 'Two-Wallet Financial Security',
      description:
        'Isolated Play and Winning Wallets. 1 AX = 1 PKR cash parity with fast cashouts to JazzCash, EasyPaisa, or Bank.',
      color: '#00C878',
    },
    {
      icon: Users,
      title: '6-Digit Squad Codes',
      description:
        'Assemble your Duo or Squad roster in seconds with frictionless 6-digit codes. Full captaincy and roster controls.',
      color: '#00D2FF',
    },
    {
      icon: Award,
      title: '36-Sub-Tier Ladder & Milestones',
      description:
        'Climb from Bronze I to Grandmaster Top 300. Unlock cash rewards and permanent Scout royalties at every major tier.',
      color: '#F59E0B',
    },
    {
      icon: Clock,
      title: '100% Auto-Refund Guarantee',
      description:
        'If a match fails to start or is cancelled by a host, 100% of your entry fees are returned to your Play Wallet automatically.',
      color: '#00C878',
    },
  ];

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] relative border-t border-[#30363A]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-heading tracking-tight">
            Why Competitive Gamers Choose <span className="text-[#00C878]">ArenaX</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-3xl mx-auto leading-relaxed">
            The complete esports ecosystem built for Free Fire players, teams, and tournament organizers across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative rounded-3xl h-full">
                <div className="absolute -inset-px rounded-3xl z-0 pointer-events-none">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={1.5}
                  />
                </div>

                <div className="relative h-full premium-card p-6 sm:p-7 md:p-8 rounded-3xl z-10 flex flex-col justify-between">
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border"
                      style={{
                        backgroundColor: `${feature.color}15`,
                        borderColor: `${feature.color}35`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2.5">
                      {feature.title}
                    </h3>
                    <p className="text-[#A1A1AA] leading-relaxed text-xs sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="mt-16 sm:mt-20 premium-card-accent rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 font-heading">
                Ready to Join the Competition?
              </h3>
              <p className="text-[#A1A1AA] text-sm sm:text-base mb-6 leading-relaxed">
                Download the official ArenaX app today. Register your squad, enter daily Free Fire scrims, and experience dispute-free competitive gaming.
              </p>
              <button
                onClick={scrollToDownload}
                className="w-full sm:w-auto bg-gradient-to-r from-[#00E58A] to-[#00C878] hover:from-[#00FF9D] hover:to-[#00D982] text-[#0A0D0F] font-black px-7 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 shadow-xl shadow-[#00C878]/25 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Download ArenaX App</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* 4 Professional Metric Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <Gamepad2 className="w-6 h-6 text-[#00C878] mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-black text-white font-heading">Dual Format</div>
                <div className="text-[#A1A1AA] text-[11px] sm:text-xs font-medium">Bermuda & Clash Squad</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <Star className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-black text-white font-heading">4.8 / 5.0</div>
                <div className="text-[#A1A1AA] text-[11px] sm:text-xs font-medium">Player App Rating</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <Headphones className="w-6 h-6 text-[#00D2FF] mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-black text-white font-heading">24/7 PKT</div>
                <div className="text-[#A1A1AA] text-[11px] sm:text-xs font-medium">WhatsApp & Helpdesk</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <Banknote className="w-6 h-6 text-[#00C878] mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-black text-white font-heading">&lt; 24h</div>
                <div className="text-[#A1A1AA] text-[11px] sm:text-xs font-medium">JazzCash / EasyPaisa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
