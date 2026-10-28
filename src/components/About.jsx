import { Target, Heart, Zap, Users, ShieldCheck } from "lucide-react";
import { logEvent } from "../utils/analytics";

const About = () => {
  const handleDownload = () => {
    logEvent("App", "Download", "ArenaX APK (About Page)");

    const link = document.createElement("a");
    link.href = "https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk";
    link.download = "ArenaX.apk";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-[#101214] relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              About the Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 font-heading tracking-tight">
            About <span className="text-[#00C878]">ArenaX</span>
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed">
            We are building the future of competitive mobile gaming in Pakistan by delivering a seamless, dispute-free tournament ecosystem for players and organizers alike.
          </p>
        </div>

        {/* Our Story Card with Official Logo */}
        <div className="premium-card rounded-3xl p-6 sm:p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C878]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-[#00C878]/25 border-2 border-[#00C878]/40 bg-[#101214] flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="ArenaX Official Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">Our Story</h2>
                <span className="text-xs text-[#00C878] font-semibold">Pakistan's Mobile Esports Platform</span>
              </div>
            </div>

            <div className="space-y-4 text-[#A1A1AA] leading-relaxed text-sm sm:text-base">
              <p>
                ArenaX was founded by competitive gamers who experienced first-hand the pervasive challenges of organizing and participating in mobile esports tournaments across Pakistan. Players constantly struggled with delayed payouts, disputed scoreboards, unverified hosts on WhatsApp, and arbitrary disqualifications.
              </p>
              <p>
                Our mission is to democratize competitive esports by creating a platform where anyone—regardless of their skill tier—can enter tournaments, improve their gameplay, and compete for real, withdrawable cash prizes. We believe in absolute fair play, total financial transparency, and building a thriving community of competitive gamers.
              </p>
              <p>
                Today, ArenaX specializes in competitive Free Fire tournaments, featuring both 50-player Bermuda Battle Royale lobbies and 4v4 Clash Squad brackets. Powered by the proprietary ArenaX Vision Engine for sub-second scoreboard verification and a strict Two-Wallet isolation model, ArenaX sets the standard for professional esports infrastructure in Pakistan.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="premium-card p-6 sm:p-7 rounded-2xl text-center group">
            <div className="w-14 h-14 bg-[#00C878]/15 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#00C878]/30 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-[#00C878]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Our Mission</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Empower gamers with fair, accessible, and automated esports competition.
            </p>
          </div>

          <div className="premium-card p-6 sm:p-7 rounded-2xl text-center group">
            <div className="w-14 h-14 bg-[#00D2FF]/15 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#00D2FF]/30 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-[#00D2FF]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Our Values</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Integrity, financial transparency, and community-first empowerment.
            </p>
          </div>

          <div className="premium-card p-6 sm:p-7 rounded-2xl text-center group">
            <div className="w-14 h-14 bg-[#F59E0B]/15 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#F59E0B]/30 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Vision Engine</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Automated neural vision scans scoreboard screenshots for dispute-free settlement.
            </p>
          </div>

          <div className="premium-card p-6 sm:p-7 rounded-2xl text-center group">
            <div className="w-14 h-14 bg-[#00C878]/15 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#00C878]/30 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-[#00C878]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Community</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Empowering grassroots organizers with in-app hosting tools and verified ratings.
            </p>
          </div>
        </div>

        {/* Why Players Choose ArenaX */}
        <div className="premium-card rounded-3xl p-6 sm:p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00D2FF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 text-center font-heading">
              Why Competitive Players Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00C878]/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#00C878]/15 flex items-center justify-center mx-auto mb-4 border border-[#00C878]/30 shadow-md">
                  <ShieldCheck className="w-7 h-7 text-[#00C878]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">Zero-Tolerance Fair Play</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Advanced anti-cheat protocols, UID verification, and manual anti-fraud oversight protect match integrity.
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00D2FF]/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#00D2FF]/15 flex items-center justify-center mx-auto mb-4 border border-[#00D2FF]/30 shadow-md">
                  <Zap className="w-7 h-7 text-[#00D2FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">24-Hour Verified Payouts</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Cash prize winnings are credited immediately to your Winning Wallet and withdrawable to JazzCash or EasyPaisa.
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/15 flex items-center justify-center mx-auto mb-4 border border-[#F59E0B]/30 shadow-md">
                  <Target className="w-7 h-7 text-[#F59E0B]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">Two-Vault Isolation</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Play balances and cash prize balances are strictly segregated, preventing liquidity issues and bonus manipulation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="premium-card-accent p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C878]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 font-heading">
              Join the ArenaX Community Today
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Download the official Android application and register your squad for today's Free Fire scrims.
            </p>
            <button
              onClick={handleDownload}
              className="min-h-[48px] bg-[#00C878] hover:bg-[#00A865] active:scale-95 text-[#101214] px-8 py-4 rounded-xl font-extrabold text-base transition-all duration-200 shadow-xl shadow-[#00C878]/25 hover:scale-105 cursor-pointer border border-[#00C878]/40"
            >
              Download ArenaX APK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
