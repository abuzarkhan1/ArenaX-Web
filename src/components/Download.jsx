import { Download as DownloadIcon, Smartphone, Clock } from "lucide-react";

const Download = () => {
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
    <div id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Download{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF7F] to-[#00BFFF]">
              ArenaX
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started in seconds. Download our app and start competing today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#00FF7F]/10 to-transparent p-8 rounded-3xl border border-[#00FF7F]/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-2xl flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Android</h3>
                <p className="text-gray-400">Version 1.0.0</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00FF7F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00FF7F] text-sm">✓</span>
                </div>
                <span>Compatible with Android 8.0+</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00FF7F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00FF7F] text-sm">✓</span>
                </div>
                <span>Size: 45 MB</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00FF7F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00FF7F] text-sm">✓</span>
                </div>
                <span>Free to download</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00FF7F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00FF7F] text-sm">✓</span>
                </div>
                <span>No subscription required</span>
              </li>
            </ul>

            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00BFFF] text-black px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00FF7F]/50 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <DownloadIcon className="w-5 h-5 group-hover:animate-bounce" />
              Download APK
            </button>

            <p className="text-gray-500 text-sm mt-4 text-center">
              By downloading, you agree to our Terms & Conditions
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#00BFFF]/10 to-transparent p-8 rounded-3xl border border-[#00BFFF]/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] rounded-2xl flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">iOS</h3>
                <p className="text-gray-400">Coming Soon</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00BFFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3 h-3 text-[#00BFFF]" />
                </div>
                <span>Available on App Store soon</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00BFFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3 h-3 text-[#00BFFF]" />
                </div>
                <span>iOS 14.0 and later</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00BFFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3 h-3 text-[#00BFFF]" />
                </div>
                <span>Optimized for iPhone & iPad</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 bg-[#00BFFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3 h-3 text-[#00BFFF]" />
                </div>
                <span>In development</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full bg-[#2A2A2A] text-gray-500 px-6 py-4 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Clock className="w-5 h-5" />
              Coming Soon
            </button>

            <p className="text-gray-500 text-sm mt-4 text-center">
              Stay tuned for updates on our iOS release
            </p>
          </div>
        </div>

        <div className="mt-16 bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            How to Install APK
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-gray-400 text-sm">Download the APK file</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-gray-400 text-sm">Enable Unknown Sources</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-gray-400 text-sm">Install the application</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">4</span>
              </div>
              <p className="text-gray-400 text-sm">Open and start playing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
