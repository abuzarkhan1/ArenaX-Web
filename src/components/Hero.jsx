import { ChevronRight, Trophy, Zap, RefreshCw } from 'lucide-react';
import { Hero3DScene } from './ui/Hero3DScene';

const Hero = () => {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTournaments = () => {
    document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 overflow-hidden min-h-screen flex items-center" aria-label="Hero section">
      {/* Interactive 3D ArenaX Brand Installation */}
      <Hero3DScene />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <article className="text-center max-w-5xl mx-auto">
          {/* Tag Pill with Starter Gift Callout */}
          <div className="inline-flex items-center gap-2.5 bg-[#14171A]/85 backdrop-blur-2xl px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-8 border border-white/10 shadow-2xl hover:border-[#00C878]/40 transition-all duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C878] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00C878]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#F3F4F6]">
              Free Fire Esports Pakistan • <span className="text-[#00C878] font-bold">Claim 25 AX Welcome Bonus</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading mb-6 leading-[1.1] tracking-tight uppercase">
            <span className="text-gradient-white">Compete, Win & Dominate in</span>{' '}
            <span className="text-gradient-emerald font-heading block sm:inline">ArenaX</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
            Pakistan's premier mobile esports platform. Play daily Free Fire Bermuda Battle Royale & Clash Squad 4v4 tournaments, verified by ArenaX Vision Engine. Instant JazzCash & EasyPaisa cashouts.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center mb-14 sm:mb-16 max-w-md sm:max-w-none mx-auto w-full">
            <button
              onClick={scrollToDownload}
              className="group bg-gradient-to-r from-[#00E58A] via-[#00C878] to-[#00B46C] hover:from-[#00FF9D] hover:to-[#00C878] text-[#0A0D0F] px-8 py-4 rounded-xl font-black text-base transition-all duration-200 flex items-center justify-center gap-2.5 border-t border-white/40 shadow-xl shadow-[#00C878]/25 hover:shadow-[#00C878]/45 active:scale-[0.98] cursor-pointer"
              aria-label="Download ArenaX app"
            >
              <span>Download ArenaX App</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform stroke-[2.5]"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={scrollToTournaments}
              className="bg-white/[0.04] hover:bg-white/[0.08] text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-lg active:scale-[0.98] cursor-pointer"
              aria-label="Explore Free Fire Tournament Modes"
            >
              Explore Tournament Modes
            </button>
          </div>

          {/* 3 Verified Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto text-left" role="list">
            <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group" role="listitem">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center mb-4 border border-[#00C878]/30 group-hover:scale-105 transition-transform shadow-inner">
                  <Zap className="w-6 h-6 text-[#00C878]" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1.5">ArenaX Vision Engine</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">Automated neural scoreboard scans with dispute-free instant settlement</p>
              </div>
            </div>

            <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group" role="listitem">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/5 flex items-center justify-center mb-4 border border-[#F59E0B]/30 group-hover:scale-105 transition-transform shadow-inner">
                  <Trophy className="w-6 h-6 text-[#F59E0B]" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1.5">70%–90% Player Prizes</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">Transparent 3-way split with dedicated organizer commission</p>
              </div>
            </div>

            <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group" role="listitem">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D2FF]/25 to-[#00D2FF]/5 flex items-center justify-center mb-4 border border-[#00D2FF]/30 group-hover:scale-105 transition-transform shadow-inner">
                  <RefreshCw className="w-6 h-6 text-[#00D2FF]" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1.5">100% Auto-Refund</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">Instant return of entry fees if match is cancelled by host or admin</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Hero;
