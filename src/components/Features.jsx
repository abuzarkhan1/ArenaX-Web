import { Shield, Award, Clock, Users, Zap, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Daily Tournaments',
      description:
        'Participate in multiple tournaments every day across Free Fire and PUBG with varying entry fees and prize pools.',
      color: 'from-[#00FF7F] to-[#00BFFF]',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description:
        'Safe and secure transactions with instant deposits and quick withdrawals. Your money is always protected.',
      color: 'from-[#00BFFF] to-[#8B5CF6]',
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description:
        'Get instant notifications for tournament starts, results, and prize distributions. Never miss a match.',
      color: 'from-[#00FF7F] to-[#FFD700]',
    },
    {
      icon: Users,
      title: 'Team Management',
      description:
        'Create and manage your teams easily. Invite friends, coordinate strategies, and dominate together.',
      color: 'from-[#FF6B6B] to-[#FFD700]',
    },
    {
      icon: Award,
      title: 'Leaderboards',
      description:
        'Climb the ranks and showcase your skills. Top players get featured and receive exclusive rewards.',
      color: 'from-[#00BFFF] to-[#00FF7F]',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description:
        'Automated result processing and prize distribution. Winners get paid immediately after verification.',
      color: 'from-[#FFD700] to-[#FF6B6B]',
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF7F] to-[#00BFFF]">
              ArenaX
            </span>
            ?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                className="group bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] hover:border-[#00FF7F]/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-gradient-to-r from-[#00FF7F]/10 to-[#00BFFF]/10 rounded-3xl p-8 md:p-12 border border-[#2A2A2A]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                Download ArenaX now and join the ultimate gaming tournament
                platform. Your next victory awaits!
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-[#00FF7F]/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <span className="text-white font-medium">Free to Join</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-[#00BFFF]/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <span className="text-white font-medium">Quick Setup</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1E1E1E] p-6 rounded-xl text-center border border-[#2A2A2A]">
                <div className="text-3xl mb-2">🎮</div>
                <div className="text-2xl font-bold text-white mb-1">2+</div>
                <div className="text-gray-400 text-sm">Games Supported</div>
              </div>
              <div className="bg-[#1E1E1E] p-6 rounded-xl text-center border border-[#2A2A2A]">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-white mb-1">4.8</div>
                <div className="text-gray-400 text-sm">App Rating</div>
              </div>
              <div className="bg-[#1E1E1E] p-6 rounded-xl text-center border border-[#2A2A2A]">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
              <div className="bg-[#1E1E1E] p-6 rounded-xl text-center border border-[#2A2A2A]">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-white mb-1">Fast</div>
                <div className="text-gray-400 text-sm">Withdrawals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
