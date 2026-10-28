import { useState } from 'react';
import { Trophy, Swords, Users, KeyRound, ShieldAlert, Tv, ArrowRight, CheckCircle2 } from 'lucide-react';

const TournamentModes = () => {
  const [activeTab, setActiveTab] = useState('bermuda');
  const [bermudaFormat, setBermudaFormat] = useState('squad'); // 'solo' | 'duo' | 'squad'
  const [csStage, setCsStage] = useState('semis'); // 'quarters' | 'semis' | 'finals'

  const bermudaData = {
    solo: {
      formatTitle: 'Solo Survival (48 Players)',
      slots: '48 / 48 Slots',
      entry: '50 AX (50 PKR)',
      prizePool: '2,160 AX Cash',
      desc: 'Individual survival glory. Every player fights for themselves.',
    },
    duo: {
      formatTitle: 'Duo Combat (24 Teams)',
      slots: '24 Teams (48 Players)',
      entry: '100 AX / Team',
      prizePool: '2,160 AX Cash',
      desc: 'Pair up with your trusted partner using 6-digit squad codes.',
    },
    squad: {
      formatTitle: 'Squad 4v4v4 (12 Teams)',
      slots: '12 Squads (48 Players)',
      entry: '200 AX / Squad',
      prizePool: '2,160 AX Cash',
      desc: 'Full 4-player team coordination. Captains manage rosters.',
    },
  };

  const currentBermuda = bermudaData[bermudaFormat];

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tournaments" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <Trophy className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Verified Free Fire Tournament Formats
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Battle for the <span className="text-[#00C878]">Booyah</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Choose your battlefield format. Whether it is a 50-player survival gauntlet or tactical 4v4 round brackets, every match is verified by the ArenaX Vision Engine.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row p-1.5 rounded-2xl bg-[#14171A] border border-white/10 mt-8 shadow-2xl max-w-xl mx-auto gap-1">
            <button
              onClick={() => setActiveTab('bermuda')}
              className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer w-full ${
                activeTab === 'bermuda'
                  ? 'bg-gradient-to-r from-[#00E58A] to-[#00C878] text-[#0A0D0F] shadow-lg shadow-[#00C878]/25'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Bermuda Battle Royale (50P)
            </button>
            <button
              onClick={() => setActiveTab('clashsquad')}
              className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer w-full ${
                activeTab === 'clashsquad'
                  ? 'bg-gradient-to-r from-[#00D2FF] to-[#00A8DC] text-[#0A0D0F] shadow-lg shadow-[#00D2FF]/25'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Swords className="w-4 h-4" />
              Clash Squad 4v4 (Brackets)
            </button>
          </div>
        </div>

        {/* Tab 1: Bermuda Battle Royale */}
        {activeTab === 'bermuda' && (
          <div className="premium-card rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl animate-in fade-in duration-300">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-md bg-[#00C878]/15 text-[#00C878] border border-[#00C878]/30">
                  <span>Flagship Battle Royale</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
                  Bermuda 48–50 Player Survival
                </h3>
                <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  Drop into Bermuda in Solo, Duo, or Squad formats. Compete against 48–50 verified players for real cash prize pools. Transparent scoring with 20 points for Booyah and 5 points per kill.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[11px] text-[#71717A] uppercase font-bold block mb-1">Roster Formats</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#00C878]" /> Solo / Duo / Squad
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[11px] text-[#71717A] uppercase font-bold block mb-1">Room Credentials</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-[#00C878]" /> 10–15m Before Match
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[11px] text-[#71717A] uppercase font-bold block mb-1">Live Casting</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                      <Tv className="w-4 h-4 text-[#00C878]" /> Stream Embedded
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                    <span>Instant room slot locking with verified in-game UID validation.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                    <span>Automated neural vision OCR verification of scoreboard screenshots within seconds.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                    <span>100% automated refund to your Play Wallet if match fails to start.</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={scrollToDownload}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#00E58A] to-[#00C878] hover:from-[#00FF9D] hover:to-[#00D982] text-[#0A0D0F] font-black px-7 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 shadow-xl shadow-[#00C878]/20 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <span>Join Next Bermuda Scrim</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Bermuda Visual Blueprint Card */}
              <div className="lg:col-span-5 bg-[#121417]/95 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center pb-3 border-b border-[#30363A]">
                  <div>
                    <span className="text-xs text-[#00C878] font-bold uppercase tracking-wider block">Interactive Match Preview</span>
                    <h4 className="text-white font-bold text-lg">Bermuda Championship #104</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#00C878]/20 text-[#00C878] border border-[#00C878]/30">
                    Live Preset
                  </span>
                </div>

                {/* Format switcher tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#101214] rounded-xl border border-[#30363A]">
                  {['solo', 'duo', 'squad'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setBermudaFormat(fmt)}
                      className={`py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        bermudaFormat === fmt
                          ? 'bg-[#00C878] text-[#101214] shadow-md shadow-[#00C878]/25'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#30363A]/50">
                    <span className="text-[#A1A1AA]">Roster Setup</span>
                    <span className="text-white font-semibold">{currentBermuda.formatTitle}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#30363A]/50">
                    <span className="text-[#A1A1AA]">Slots Available</span>
                    <span className="text-[#00C878] font-bold">{currentBermuda.slots}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#30363A]/50">
                    <span className="text-[#A1A1AA]">Entry Fee</span>
                    <span className="text-white font-bold">{currentBermuda.entry}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#A1A1AA]">Guaranteed Prize Pool</span>
                    <span className="text-[#F59E0B] font-extrabold">{currentBermuda.prizePool}</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="flex items-center gap-2 text-[#00C878] font-bold">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Credentials Security Lock</span>
                  </div>
                  <p className="text-[#A1A1AA] text-[11px]">
                    Room ID & Password unlock strictly 10–15 minutes before match countdown. No unauthorized leaks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Clash Squad 4v4 */}
        {activeTab === 'clashsquad' && (
          <div className="premium-card rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl animate-in fade-in duration-300">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30">
                  <span>Tactical Elimination Format</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
                  Clash Squad 4v4 Tournament Brackets
                </h3>
                <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  High-intensity squad vs squad tactical combat. Compete in single-elimination tournament brackets with automated round progression from Quarterfinals all the way to the Grand Finals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[11px] text-[#71717A] uppercase font-bold block mb-1">Squad Size</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#00D2FF]" /> 4v4 Squad Roster
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[11px] text-[#71717A] uppercase font-bold block mb-1">Bracket Tree</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                      <Swords className="w-4 h-4 text-[#00D2FF]" /> 8–16 Teams Single Elim
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[11px] text-[#71717A] uppercase font-bold block mb-1">Settlement</span>
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-[#00D2FF]" /> Round-by-Round Progression
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                    <span>Dynamic bracket visualization inside the mobile app for players and viewers.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                    <span>6-digit squad codes allow captains to assemble their 4-player lineup in seconds.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                    <span>Instant prize distribution directly to the Winning Wallet upon Finals victory.</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={scrollToDownload}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#00D2FF] to-[#00A8DC] hover:from-[#33DCFF] hover:to-[#00D2FF] text-[#0A0D0F] font-black px-7 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 shadow-xl shadow-[#00D2FF]/20 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <span>Enter 4v4 Bracket</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Clash Squad Tactical Bracket Illustration */}
              <div className="lg:col-span-5 premium-card-cyan rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs text-[#00D2FF] font-bold uppercase tracking-wider block">Interactive Bracket Preview</span>
                    <h4 className="text-white font-bold text-lg">CS Masters Tournament</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/30">
                    Live Tree
                  </span>
                </div>

                {/* Bracket Stage Selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#101214] rounded-xl border border-white/10">
                  {['quarters', 'semis', 'finals'].map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setCsStage(stage)}
                      className={`py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        csStage === stage
                          ? 'bg-[#00D2FF] text-[#101214] shadow-md shadow-[#00D2FF]/25'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {stage === 'quarters' ? 'Quarterfinals' : stage === 'semis' ? 'Semifinals' : 'Grand Final'}
                    </button>
                  ))}
                </div>

                {/* Dynamic Bracket Views */}
                {csStage === 'quarters' && (
                  <div className="space-y-2 text-xs">
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/10 flex justify-between items-center hover:border-[#00D2FF]/30 transition-all">
                      <span className="font-semibold text-white">Falcons (7) vs Delta (3)</span>
                      <span className="text-[#00D2FF] font-bold text-[10px]">Falcons Won</span>
                    </div>
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/10 flex justify-between items-center hover:border-[#00D2FF]/30 transition-all">
                      <span className="font-semibold text-white">Shadows (7) vs Apex (5)</span>
                      <span className="text-[#00D2FF] font-bold text-[10px]">Shadows Won</span>
                    </div>
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/10 flex justify-between items-center hover:border-[#00D2FF]/30 transition-all">
                      <span className="font-semibold text-white">Vipers (7) vs Storm (2)</span>
                      <span className="text-[#00D2FF] font-bold text-[10px]">Vipers Won</span>
                    </div>
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/10 flex justify-between items-center hover:border-[#00D2FF]/30 transition-all">
                      <span className="font-semibold text-white">Kings (7) vs Toxic (4)</span>
                      <span className="text-[#00D2FF] font-bold text-[10px]">Kings Won</span>
                    </div>
                  </div>
                )}

                {csStage === 'semis' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-white/[0.03] p-3 rounded-xl border border-white/10 flex justify-between items-center hover:border-[#00D2FF]/30 transition-all">
                      <span className="font-bold text-white">Team Falcons [PAK]</span>
                      <span className="text-[#00D2FF] font-extrabold">7 Rounds (Winner)</span>
                    </div>
                    <div className="bg-white/[0.015] p-3 rounded-xl border border-white/5 flex justify-between items-center opacity-60">
                      <span className="text-[#A1A1AA]">Team Shadow Killers</span>
                      <span className="text-[#71717A]">4 Rounds</span>
                    </div>
                    <div className="text-center py-0.5">
                      <span className="text-[10px] uppercase font-bold text-[#00D2FF] tracking-widest">
                        ▼ Advances to Championship Grand Final
                      </span>
                    </div>
                    <div className="bg-white/[0.03] p-3 rounded-xl border border-white/10 flex justify-between items-center hover:border-[#00D2FF]/30 transition-all">
                      <span className="font-bold text-white">Team Vipers</span>
                      <span className="text-[#00D2FF] font-extrabold">7 Rounds (Winner)</span>
                    </div>
                  </div>
                )}

                {csStage === 'finals' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-gradient-to-r from-[#00D2FF]/20 to-[#00C878]/20 p-4 rounded-xl border border-[#00D2FF]/40 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-[#00D2FF] font-bold uppercase block">Championship Showdown</span>
                        <span className="text-white font-extrabold text-sm">Team Falcons vs Team Vipers</span>
                        <span className="text-[11px] text-[#A1A1AA] block mt-0.5">Best of 13 Rounds (First to 7)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#F59E0B] font-bold uppercase block">First Place Cash</span>
                        <span className="text-[#F59E0B] font-extrabold text-base">4,000 AX</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#71717A] text-center">
                      Instant prize credit directly into winners' Winning Wallets within 5 minutes of victory.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TournamentModes;

