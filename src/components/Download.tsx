import { Download as DownloadIcon, Smartphone, Clock, QrCode, CheckCircle2 } from 'lucide-react';
import { trackDownload } from '../utils/analytics';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';

export const Download = () => {
  const downloadUrl = 'https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk';

  const handleDownload = () => {
    trackDownload('ArenaX.apk', 'Android', '2.6.0');

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'ArenaX.apk';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const installSteps = [
    { num: '01', title: 'Download APK', desc: 'Tap Download Direct APK to save v2.6.0.' },
    { num: '02', title: 'Allow Source', desc: 'Enable unknown app installation in browser settings.' },
    { num: '03', title: 'Install Package', desc: 'Open the installer package and confirm.' },
    { num: '04', title: 'Link UID & Play', desc: 'Enter referral code for 25 AX bonus and join scrims.' },
  ];

  return (
    <section
      id="download"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Download ArenaX Mobile Client"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Giant ARENAX Echo of Hero Typography */}
        <div className="text-center mb-10 select-none pointer-events-none">
          <span className="text-[14vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent font-heading whitespace-nowrap block">
            ARENA<span className="text-accent/35">X</span>
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-14 -mt-10 sm:-mt-16">
          <Pill dot={true} label="OFFICIAL RELEASE v2.6.0" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Download <span className="text-accent">ArenaX</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mx-auto mt-3 leading-relaxed">
            Get started in seconds. Download our official Android application and start competing in Free Fire tournaments today.
          </p>
        </div>

        {/* Dual Release Cards: Android Primary & iOS Secondary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16">
          {/* Card 1: Android APK (Highlighted Card) */}
          <div className="hud-card-highlight p-6 sm:p-8 rounded-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-control bg-accent-dim border border-line-accent flex items-center justify-center text-accent">
                    <Smartphone className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-text-1">Android Client</h3>
                    <span className="text-xs font-mono text-accent">Package: com.arenax.app</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-control text-xs font-mono font-bold bg-accent text-bg-1">
                  v2.6.0
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-text-2 mb-8">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Compatible with Android 8.0 through Android 15</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Build Size: ~45–55 MB (Native optimized client)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 stroke-[2]" />
                  <span>Google Play Protect compatible & SHA-256 verified</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleDownload}
                icon={<DownloadIcon className="w-5 h-5 stroke-[2]" />}
              >
                Download Direct APK
              </Button>

              {/* QR Code for Desktop Users */}
              <div className="hidden sm:flex items-center justify-between p-3.5 rounded-control bg-bg-1 border border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded p-0.5 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-bg-1 fill-current">
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
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-text-1 block">Scan on Android Phone</span>
                    <span className="text-[10px] font-mono text-text-3">Direct APK download link</span>
                  </div>
                </div>
                <QrCode className="w-4 h-4 text-accent" />
              </div>
            </div>
          </div>

          {/* Card 2: iOS Client (Muted Secondary Card) */}
          <div className="hud-card p-6 sm:p-8 rounded-card flex flex-col justify-between opacity-80">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-control bg-bg-1 border border-line flex items-center justify-center text-text-3">
                    <Smartphone className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-text-1">Apple iOS</h3>
                    <span className="text-xs font-mono text-text-3">Native iOS Client</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-control text-xs font-mono font-bold bg-bg-3 text-text-3 border border-line">
                  Coming Soon
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-text-3 mb-8">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-text-3 flex-shrink-0" />
                  <span>Apple App Store submission in review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-text-3 flex-shrink-0" />
                  <span>Requires iOS 15.0 or later</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-text-3 flex-shrink-0" />
                  <span>Cross-platform scrim matchmaking with Android</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="lg" fullWidth disabled>
              In Development for iOS
            </Button>
          </div>
        </div>

        {/* 4 Install Steps as a Simple Numbered Row */}
        <div className="p-6 sm:p-8 rounded-card bg-bg-2 border border-line max-w-4xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-6 text-center">
            FOUR-STEP INSTALLATION GUIDE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {installSteps.map((step) => (
              <div key={step.num} className="p-4 rounded-control bg-bg-1 border border-line flex flex-col justify-between">
                <span className="text-xs font-mono font-bold text-accent mb-2">/{step.num}</span>
                <div>
                  <h4 className="text-sm font-bold text-text-1 font-heading mb-1">{step.title}</h4>
                  <p className="text-xs text-text-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
