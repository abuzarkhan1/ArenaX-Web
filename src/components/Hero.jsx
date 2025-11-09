import { ChevronRight, Trophy, Users, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF7F]/10 via-transparent to-[#00BFFF]/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1E1E1E] px-4 py-2 rounded-full mb-8 border border-[#2A2A2A]">
            <Zap size={16} className="text-[#00FF7F]" />
            <span className="text-sm text-gray-300">
              Ultimate Tournament Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Compete, Win & Dominate in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF7F] to-[#00BFFF]">
              ArenaX
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of players in epic Free Fire and PUBG tournaments.
            Showcase your skills, compete for glory, and win real prizes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToDownload}
              className="group bg-gradient-to-r from-[#00FF7F] to-[#00BFFF] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00FF7F]/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Download Now
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="bg-[#1E1E1E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#2A2A2A] transition-all duration-300 border border-[#2A2A2A]">
              Watch Trailer
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto">
            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-[#2A2A2A] hover:border-[#00FF7F]/50 transition-all">
              <Trophy className="w-12 h-12 text-[#00FF7F] mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-400">Active Tournaments</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-[#2A2A2A] hover:border-[#00BFFF]/50 transition-all">
              <Users className="w-12 h-12 text-[#00BFFF] mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-2">50K+</h3>
              <p className="text-gray-400">Players Worldwide</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-[#2A2A2A] hover:border-[#00FF7F]/50 transition-all">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-2">₹10L+</h3>
              <p className="text-gray-400">Prize Pool</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
