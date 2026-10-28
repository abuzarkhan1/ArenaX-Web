import { ShieldCheck, Zap, RefreshCw, Smartphone } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    {
      icon: Zap,
      title: 'ArenaX Vision Engine',
      desc: 'Instant Scoreboard OCR Settlement',
      color: '#00C878',
    },
    {
      icon: Smartphone,
      title: 'JazzCash & EasyPaisa',
      desc: 'Verified Local Pakistani Deposits & Payouts',
      color: '#00D2FF',
    },
    {
      icon: RefreshCw,
      title: '100% Auto-Refund',
      desc: 'Instant Return on Match Cancellations',
      color: '#F59E0B',
    },
    {
      icon: ShieldCheck,
      title: 'Anti-Cheat & Fair Play',
      desc: 'Zero-Tolerance Policy & Verified Rosters',
      color: '#00C878',
    },
  ];

  return (
    <div className="relative z-20 border-y border-white/[0.08] bg-[#14171A]/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.04] transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-inner"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide truncate">{item.title}</h4>
                  <p className="text-[#A1A1AA] text-[11px] sm:text-xs leading-relaxed truncate">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;

