import { ChevronRight, Trophy, Users, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 overflow-hidden min-h-screen flex items-center" aria-label="Hero section">
      {/* Animated background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00FF7F]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <article className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-[#1E1E1E]/40 backdrop-blur-2xl px-6 py-3 rounded-2xl mb-10 border border-white/10 shadow-2xl hover:border-[#00FF7F]/30 transition-all duration-300">
            <Zap size={20} className="text-[#00FF7F]" aria-hidden="true" />
            <span className="text-sm font-semibold text-gray-200">
              Ultimate Tournament Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Compete, Win & Dominate in{' '}
            <span className="text-[#00FF7F]">ArenaX</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed">
            Join Pakistan's premier mobile esports platform. Play Free Fire and PUBG Mobile tournaments daily, compete with 10,000+ players, and win real cash prizes. Safe, secure, instant withdrawals.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
            <button
              onClick={scrollToDownload}
              className="group bg-[#00FF7F]/90 backdrop-blur-xl text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#00FF7F] transition-all duration-300 flex items-center justify-center gap-3 border border-[#00FF7F]/30 shadow-2xl shadow-[#00FF7F]/30 hover:shadow-[#00FF7F]/50 hover:scale-105"
              aria-label="Download ArenaX app"
            >
              Download ArenaX App
              <ChevronRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </button>
            <button
              className="bg-[#1E1E1E]/40 backdrop-blur-2xl text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#1E1E1E]/60 transition-all duration-300 border border-white/10 hover:border-white/20 shadow-xl hover:scale-105"
              aria-label="Watch ArenaX trailer"
            >
              Watch Trailer
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto" role="list">
            <div className="group bg-[#1E1E1E]/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hover:border-[#00FF7F]/40 transition-all duration-300 shadow-2xl hover:shadow-[#00FF7F]/20 hover:-translate-y-2" role="listitem">
              <Trophy className="w-14 h-14 text-[#00FF7F] mb-5 mx-auto" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-white mb-2">50+ Daily</h2>
              <p className="text-gray-400 font-medium">Free Fire & PUBG Tournaments</p>
            </div>

            <div className="group bg-[#1E1E1E]/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hover:border-[#00BFFF]/40 transition-all duration-300 shadow-2xl hover:shadow-[#00BFFF]/20 hover:-translate-y-2" role="listitem">
              <Users className="w-14 h-14 text-[#00BFFF] mb-5 mx-auto" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-white mb-2">10,000+</h2>
              <p className="text-gray-400 font-medium">Registered Players</p>
            </div>

            <div className="group bg-[#1E1E1E]/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hover:border-[#00FF7F]/40 transition-all duration-300 shadow-2xl hover:shadow-[#00FF7F]/20 hover:-translate-y-2" role="listitem">
               <Users className="w-14 h-14 text-[#00BFFF] mb-5 mx-auto" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-white mb-2">4,000+</h2>
              <p className="text-gray-400 font-medium">Active Daily Players</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Hero;