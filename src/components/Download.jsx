import { Download as DownloadIcon, Smartphone, Clock, QrCode, ShieldCheck, CheckCircle2 } from "lucide-react";
import { trackDownload } from "../utils/analytics";

const Download = () => {
  const downloadUrl = "https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk";

  const handleDownload = () => {
    trackDownload("ArenaX.apk", "Android", "2.6.0");

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "ArenaX.apk";
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="download"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <Smartphone className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Official Android Release
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-heading tracking-tight">
            Download <span className="text-[#00C878]">ArenaX Mobile</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Get started in seconds. Download our official Android application and start competing in Free Fire tournaments today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Android Card */}
          <div className="premium-card-accent p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00C878]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-[#00C878]/25 border-2 border-[#00C878]/40 bg-[#101214] flex items-center justify-center flex-shrink-0">
                    <img src="/logo.png" alt="ArenaX Official App Icon" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">Android APK</h3>
                    <p className="text-xs text-[#00C878] font-semibold">Package: com.arenax.app</p>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#00C878]/20 text-[#00C878] border border-[#00C878]/40">
                  Release v2.6
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-[#F3F4F6]">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Compatible with Android 8.0 through Android 15</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Download Size: ~45–55 MB (Optimized native build)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Includes 25 AX Welcome Bonus for referred accounts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Google Play Protect compatible & SHA-256 verified</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 relative z-10">
              <button
                onClick={handleDownload}
                className="w-full min-h-[48px] bg-[#00C878] hover:bg-[#00A865] active:scale-[0.98] text-[#101214] py-4 rounded-xl font-extrabold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-xl shadow-[#00C878]/25 hover:scale-[1.02] cursor-pointer border border-[#00C878]/50"
              >
                <DownloadIcon className="w-5 h-5 stroke-[2.5]" />
                Download Direct APK
              </button>

              {/* QR Code Section for Desktop Users */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#101214] fill-current">
                      <rect x="10" y="10" width="25" height="25" />
                      <rect x="15" y="15" width="15" height="15" fill="#fff" />
                      <rect x="18" y="18" width="9" height="9" />
                      <rect x="65" y="10" width="25" height="25" />
                      <rect x="70" y="15" width="15" height="15" fill="#fff" />
                      <rect x="73" y="18" width="9" height="9" />
                      <rect x="10" y="65" width="25" height="25" />
                      <rect x="15" y="70" width="15" height="15" fill="#fff" />
                      <rect x="18" y="73" width="9" height="9" />
                      <rect x="42" y="15" width="8" height="8" />
                      <rect x="42" y="32" width="16" height="8" />
                      <rect x="42" y="60" width="8" height="20" />
                      <rect x="60" y="45" width="15" height="8" />
                      <rect x="70" y="65" width="20" height="8" />
                      <rect x="65" y="80" width="12" height="10" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Scan to Download on Phone</span>
                    <span className="text-[10px] text-[#A1A1AA]">Open your phone camera to scan</span>
                  </div>
                </div>
                <QrCode className="w-5 h-5 text-[#00C878] flex-shrink-0" />
              </div>

              <p className="text-[#71717A] text-xs text-center">
                By downloading, you agree to ArenaX Terms & Fair Play Rules.
              </p>
            </div>
          </div>

          {/* iOS Card */}
          <div className="premium-card-cyan p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D2FF]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#00D2FF]/15 rounded-2xl flex items-center justify-center border border-[#00D2FF]/30 shadow-lg shadow-[#00D2FF]/10">
                    <Smartphone className="w-8 h-8 text-[#00D2FF]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">iOS / Apple</h3>
                    <p className="text-xs text-[#00D2FF] font-semibold">Native iOS Client</p>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30">
                  Coming Soon
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-[#F3F4F6]">
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>Apple App Store submission in progress</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>Requires iOS 15.0 or later</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>Optimized for iPhone with ProMotion 120Hz support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>Cross-platform tournament matchmaking with Android</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 relative z-10">
              <button
                disabled
                className="w-full min-h-[48px] bg-white/[0.04] text-[#71717A] py-4 rounded-xl font-bold text-base cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
              >
                <Clock className="w-4 h-4" />
                In Development for App Store
              </button>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <p className="text-xs text-[#A1A1AA]">
                  Follow our official Instagram & YouTube for iOS beta announcements.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-[#71717A]">
                <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
                <span>Verified Official Distribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Installation Timeline */}
        <div className="mt-16 premium-card p-6 sm:p-8 md:p-10 rounded-3xl max-w-5xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center font-heading">
            Simple 4-Step Android Installation Guide
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00C878]/30 transition-all">
              <div className="w-11 h-11 bg-[#00C878]/15 rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#00C878]/30 font-black text-[#00C878] text-sm shadow-md">
                1
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Download APK</h4>
              <p className="text-xs text-[#A1A1AA]">Tap the Download APK button above.</p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00C878]/30 transition-all">
              <div className="w-11 h-11 bg-[#00C878]/15 rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#00C878]/30 font-black text-[#00C878] text-sm shadow-md">
                2
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Allow Unknown Apps</h4>
              <p className="text-xs text-[#A1A1AA]">Allow install from Chrome/Browser when prompted.</p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00C878]/30 transition-all">
              <div className="w-11 h-11 bg-[#00C878]/15 rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#00C878]/30 font-black text-[#00C878] text-sm shadow-md">
                3
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Install Package</h4>
              <p className="text-xs text-[#A1A1AA]">Tap Install to complete setup on your device.</p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00C878]/30 transition-all">
              <div className="w-11 h-11 bg-[#00C878]/15 rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#00C878]/30 font-black text-[#00C878] text-sm shadow-md">
                4
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Register & Play</h4>
              <p className="text-xs text-[#A1A1AA]">Launch ArenaX, link your Free Fire UID, and battle!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
