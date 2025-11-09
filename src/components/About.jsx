import { Target, Heart, Zap, Users } from 'lucide-react';

const About = () => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/abuzarkhan1/ArenaX-web/releases/download/v1.0.0/ArenaX.apk';
    link.download = 'ArenaX.apk';
    link.target = '_blank'; // Fallback to open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF7F] to-[#00BFFF]">
              ArenaX
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're building the future of competitive mobile gaming by providing
            a seamless tournament experience for players worldwide.
          </p>
        </div>

        <div className="bg-[#1E1E1E] rounded-3xl p-8 md:p-12 mb-12 border border-[#2A2A2A]">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            <p>
              ArenaX was founded by passionate gamers who understood the
              challenges of organizing and participating in mobile esports
              tournaments. We noticed that players struggled to find reliable
              platforms, fair competition, and timely prize distributions.
            </p>
            <p>
              Our mission is to democratize competitive gaming by creating a
              platform where anyone, regardless of their skill level, can
              participate in tournaments, improve their gameplay, and win real
              rewards. We believe in fair play, transparency, and building a
              strong community of competitive gamers.
            </p>
            <p>
              Today, ArenaX serves thousands of players across Pakistan, hosting
              hundreds of tournaments daily for popular games like Free Fire and
              PUBG. We're constantly innovating to bring new features, better
              experiences, and more opportunities for our community.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] text-center hover:border-[#00FF7F]/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-gray-400">
              Empower gamers with fair and accessible competitive gaming
            </p>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] text-center hover:border-[#00BFFF]/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Our Values</h3>
            <p className="text-gray-400">
              Integrity, fairness, and community first
            </p>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] text-center hover:border-[#00FF7F]/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FF6B6B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
            <p className="text-gray-400">
              Constantly improving the gaming experience
            </p>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] text-center hover:border-[#00BFFF]/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00FF7F] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-gray-400">
              Building lasting connections through gaming
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00FF7F]/10 to-[#00BFFF]/10 rounded-3xl p-8 md:p-12 border border-[#2A2A2A]">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Why Players Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4 text-center">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Fair Play
              </h3>
              <p className="text-gray-400 text-center">
                Advanced anti-cheat systems and manual verification ensure every
                match is fair
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-center">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Fast Payouts
              </h3>
              <p className="text-gray-400 text-center">
                Automated prize distribution with instant withdrawals to your
                account
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-center">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Secure Platform
              </h3>
              <p className="text-gray-400 text-center">
                Bank-grade security protecting your data and transactions 24/7
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the ArenaX Revolution
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Be part of Pakistan's fastest-growing mobile esports community. Start
            your journey to becoming a champion today!
          </p>
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-[#00FF7F] to-[#00BFFF] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00FF7F]/50 transition-all duration-300"
          >
            Download ArenaX Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
