import { Target, Heart, Zap, Users } from "lucide-react";

const About = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v1.0/ArenaX.apk";
    link.download = "ArenaX.apk";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-[#00FF7F]">ArenaX</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're building the future of competitive mobile gaming by providing
            a seamless tournament experience for players worldwide.
          </p>
        </div>

        <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl rounded-3xl p-10 md:p-12 mb-16 border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8">Our Story</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 text-center hover:border-[#00FF7F]/40 transition-all duration-300 shadow-xl hover:shadow-[#00FF7F]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
              <Target className="w-10 h-10 text-[#00FF7F]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              Empower gamers with fair and accessible competitive gaming
            </p>
          </div>

          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 text-center hover:border-[#00BFFF]/40 transition-all duration-300 shadow-xl hover:shadow-[#00BFFF]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00BFFF]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00BFFF]/30 shadow-lg shadow-[#00BFFF]/20">
              <Heart className="w-10 h-10 text-[#00BFFF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Values</h3>
            <p className="text-gray-400 leading-relaxed">
              Integrity, fairness, and community first
            </p>
          </div>

          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 text-center hover:border-[#00FF7F]/40 transition-all duration-300 shadow-xl hover:shadow-[#00FF7F]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
              <Zap className="w-10 h-10 text-[#00FF7F]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
            <p className="text-gray-400 leading-relaxed">
              Constantly improving the gaming experience
            </p>
          </div>

          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 text-center hover:border-[#00BFFF]/40 transition-all duration-300 shadow-xl hover:shadow-[#00BFFF]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00BFFF]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00BFFF]/30 shadow-lg shadow-[#00BFFF]/20">
              <Users className="w-10 h-10 text-[#00BFFF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Community</h3>
            <p className="text-gray-400 leading-relaxed">
              Building lasting connections through gaming
            </p>
          </div>
        </div>

        <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl rounded-3xl p-10 md:p-12 border border-white/10 mb-16 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Why Players Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="text-5xl mb-5">🎯</div>
              <h3 className="text-xl font-bold text-white mb-4">Fair Play</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Advanced anti-cheat systems and manual verification ensure every
                match is fair
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-5">⚡</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Fast Payouts
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Automated prize distribution with instant withdrawals to your
                account
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-5">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Secure Platform
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Bank-grade security protecting your data and transactions 24/7
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the ArenaX Revolution
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Be part of Pakistan's fastest-growing mobile esports community.
            Start your journey to becoming a champion today!
          </p>
          <button
            onClick={handleDownload}
            className="bg-[#00FF7F]/90 backdrop-blur-xl text-black px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#00FF7F] transition-all duration-300 shadow-2xl shadow-[#00FF7F]/30 hover:shadow-[#00FF7F]/50 border border-[#00FF7F]/30 hover:scale-105"
          >
            Download ArenaX Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
