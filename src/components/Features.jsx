import { Shield, Award, Clock, Users, Zap, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Daily Tournaments',
      description:
        'Participate in multiple tournaments every day across Free Fire and PUBG with varying entry fees and prize pools.',
      color: '#00FF7F',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description:
        'Safe and secure transactions with instant deposits and quick withdrawals. Your money is always protected.',
      color: '#00BFFF',
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description:
        'Get instant notifications for tournament starts, results, and prize distributions. Never miss a match.',
      color: '#00FF7F',
    },
    {
      icon: Users,
      title: 'Team Management',
      description:
        'Create and manage your teams easily. Invite friends, coordinate strategies, and dominate together.',
      color: '#00BFFF',
    },
    {
      icon: Award,
      title: 'Leaderboards',
      description:
        'Climb the ranks and showcase your skills. Top players get featured and receive exclusive rewards.',
      color: '#00FF7F',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description:
        'Automated result processing and prize distribution. Winners get paid immediately after verification.',
      color: '#00BFFF',
    },
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="text-[#00FF7F]">ArenaX</span>?
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the most advanced tournament platform with features
            designed for competitive gamers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-3 shadow-xl hover:shadow-2xl"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300 shadow-2xl border border-white/10"
                  style={{ 
                    backgroundColor: `${feature.color}20`,
                    boxShadow: `0 10px 40px ${feature.color}30`
                  }}
                >
                  <Icon className="w-10 h-10" style={{ color: feature.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-[#1E1E1E]/40 backdrop-blur-2xl rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Download ArenaX now and join the ultimate gaming tournament
                platform. Your next victory awaits!
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-[#00FF7F]/30">
                    <span className="text-2xl">✓</span>
                  </div>
                  <span className="text-white font-semibold text-lg">Free to Join</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#00BFFF]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-[#00BFFF]/30">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <span className="text-white font-semibold text-lg">Quick Setup</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#121212]/60 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10 shadow-xl hover:border-[#00FF7F]/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-3">🎮</div>
                <div className="text-3xl font-bold text-white mb-2">2+</div>
                <div className="text-gray-400 font-medium">Games Supported</div>
              </div>
              <div className="bg-[#121212]/60 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10 shadow-xl hover:border-[#00BFFF]/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-3">⭐</div>
                <div className="text-3xl font-bold text-white mb-2">4.8</div>
                <div className="text-gray-400 font-medium">App Rating</div>
              </div>
              <div className="bg-[#121212]/60 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10 shadow-xl hover:border-[#00FF7F]/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 font-medium">Support</div>
              </div>
              <div className="bg-[#121212]/60 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10 shadow-xl hover:border-[#00BFFF]/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-3">💰</div>
                <div className="text-3xl font-bold text-white mb-2">Fast</div>
                <div className="text-gray-400 font-medium">Withdrawals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;