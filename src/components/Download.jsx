import { Download as DownloadIcon, Smartphone, Clock } from "lucide-react";

const Download = () => {
const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v1.0/ArenaX.apk';
    link.download = 'ArenaX.apk';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="download" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Download <span className="text-[#00FF7F]">ArenaX</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Get started in seconds. Download our app and start competing today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-[#00FF7F]/20 shadow-2xl shadow-[#00FF7F]/10 hover:border-[#00FF7F]/40 transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 bg-[#00FF7F]/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-[#00FF7F]/30 shadow-xl shadow-[#00FF7F]/20">
                <Smartphone className="w-10 h-10 text-[#00FF7F]" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Android</h3>
                <p className="text-gray-400 text-lg">Version 1.0.0</p>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00FF7F]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00FF7F]/30">
                  <span className="text-[#00FF7F] font-bold">✓</span>
                </div>
                <span>Compatible with Android 8.0+</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00FF7F]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00FF7F]/30">
                  <span className="text-[#00FF7F] font-bold">✓</span>
                </div>
                <span>Size: 45 MB</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00FF7F]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00FF7F]/30">
                  <span className="text-[#00FF7F] font-bold">✓</span>
                </div>
                <span>Free to download</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00FF7F]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00FF7F]/30">
                  <span className="text-[#00FF7F] font-bold">✓</span>
                </div>
                <span>No subscription required</span>
              </li>
            </ul>

            <button
              onClick={handleDownload}
              className="w-full bg-[#00FF7F]/90 backdrop-blur-xl text-black px-8 py-5 rounded-2xl font-bold text-xl hover:bg-[#00FF7F] transition-all duration-300 flex items-center justify-center gap-4 group shadow-2xl shadow-[#00FF7F]/30 hover:shadow-[#00FF7F]/50 border border-[#00FF7F]/30"
            >
              <DownloadIcon className="w-6 h-6 group-hover:animate-bounce" />
              Download APK
            </button>

            <p className="text-gray-500 text-sm mt-5 text-center">
              By downloading, you agree to our Terms & Conditions
            </p>
          </div>

          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-[#00BFFF]/20 shadow-2xl shadow-[#00BFFF]/10 hover:border-[#00BFFF]/40 transition-all duration-300">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 bg-[#00BFFF]/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-[#00BFFF]/30 shadow-xl shadow-[#00BFFF]/20">
                <Smartphone className="w-10 h-10 text-[#00BFFF]" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">iOS</h3>
                <p className="text-gray-400 text-lg">Coming Soon</p>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00BFFF]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00BFFF]/30">
                  <Clock className="w-4 h-4 text-[#00BFFF]" />
                </div>
                <span>Available on App Store soon</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00BFFF]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00BFFF]/30">
                  <Clock className="w-4 h-4 text-[#00BFFF]" />
                </div>
                <span>iOS 14.0 and later</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00BFFF]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00BFFF]/30">
                  <Clock className="w-4 h-4 text-[#00BFFF]" />
                </div>
                <span>Optimized for iPhone & iPad</span>
              </li>
              <li className="flex items-center gap-4 text-gray-300 text-lg">
                <div className="w-8 h-8 bg-[#00BFFF]/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00BFFF]/30">
                  <Clock className="w-4 h-4 text-[#00BFFF]" />
                </div>
                <span>In development</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full bg-[#2A2A2A]/60 backdrop-blur-xl text-gray-500 px-8 py-5 rounded-2xl font-bold text-xl cursor-not-allowed flex items-center justify-center gap-4 border border-white/5"
            >
              <Clock className="w-6 h-6" />
              Coming Soon
            </button>

            <p className="text-gray-500 text-sm mt-5 text-center">
              Stay tuned for updates on our iOS release
            </p>
          </div>
        </div>

        <div className="mt-20 bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 max-w-5xl mx-auto shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            How to Install APK
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">Download the APK file</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">Enable Unknown Sources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">Install the application</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">Open and start playing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;