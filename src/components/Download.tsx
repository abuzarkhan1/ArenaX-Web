import { DownloadCloud, Smartphone, Clock, QrCode, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { trackDownload } from '../utils/analytics';
import { Button } from './primitives/Button';
import { Badge } from './primitives';

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
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Download ArenaX Mobile Client"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Giant ARENAX Echo of Hero Typography */}
        <div className="text-center mb-10 select-none pointer-events-none">
          <span className="text-[14vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/15 via-white/5 to-transparent font-heading whitespace-nowrap block">
            ARENA<span className="text-[#3ECF8E]/30">X</span>
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-14 -mt-10 sm:-mt-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Download <span className="text-[#3ECF8E]">ArenaX</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mx-auto mt-3 leading-relaxed">
            Get started in seconds. Download our official Android application and start competing in Free Fire tournaments today.
          </p>
        </div>

        {/* Dual Release Cards: Android Primary & iOS Secondary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16 relative isolate">
          {/* Subtle atmospheric glow behind the primary card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 top-0 h-[350px] w-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.08)_0%,rgba(62,207,142,0)_70%)]"
          />

          {/* Card 1: Android APK (Highlighted Card) */}
          <div className="relative z-10 p-6 sm:p-8 rounded-card bg-[#171717] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_20px_48px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-[#3ECF8E]/50">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Android Client</h3>
                    <span className="text-xs font-mono text-[#3ECF8E] tabular-nums tracking-tight">Package: com.arenax.app</span>
                  </div>
                </div>
                <Badge tone="emerald" dot>
                  v2.6.0
                </Badge>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#A0A0A0] mb-8 tabular-nums">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span>Compatible with Android 8.0 through Android 15</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span>Build Size: ~45–55 MB (Native optimized client)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
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
                icon={<DownloadCloud className="w-5 h-5" strokeWidth={1.5} />}
              >
                Download Direct APK
              </Button>

              {/* QR Code for Desktop Users: scannable, encodes the live APK URL */}
              <div className="hidden sm:flex items-center justify-between p-3.5 rounded-control bg-[#121212] border border-white/[0.08] transition-colors duration-200 hover:border-[#3ECF8E]/30">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-md p-1.5 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <QRCodeSVG
                      value={downloadUrl}
                      size={48}
                      level="L"
                      bgColor="#FFFFFF"
                      fgColor="#121212"
                      includeMargin={false}
                      aria-label="QR code: download ArenaX APK on your Android phone"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#EDEDED] block">Scan on Android Phone</span>
                  </div>
                </div>
                <QrCode className="w-4 h-4 text-[#3ECF8E]" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Card 2: iOS Client (Muted Secondary Card) */}
          <div className="relative z-10 p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col justify-between opacity-80 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#181A19] border border-white/[0.08] flex items-center justify-center text-[#707070] flex-shrink-0">
                    <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Apple iOS</h3>
                  </div>
                </div>
                <Badge tone="neutral">Coming Soon</Badge>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#707070] mb-8 tabular-nums">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#707070] flex-shrink-0" strokeWidth={1.5} />
                  <span>Apple App Store submission in review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#707070] flex-shrink-0" strokeWidth={1.5} />
                  <span>Requires iOS 15.0 or later</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#707070] flex-shrink-0" strokeWidth={1.5} />
                  <span>Cross-platform scrim matchmaking with Android</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="lg" fullWidth disabled>
              Coming Soon for iOS
            </Button>
          </div>
        </div>

        {/* 4 Install Steps as a Simple Numbered Row */}
        <div className="p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] max-w-4xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {installSteps.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-control bg-[#121212] border border-white/[0.08] flex flex-col justify-between transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-[#3ECF8E]/30 hover:bg-[#181A19]"
              >
                <span className="text-xs font-mono font-bold text-[#3ECF8E] tabular-nums tracking-tight mb-2">/{step.num}</span>
                <div>
                  <h4 className="text-sm font-bold text-[#EDEDED] font-heading mb-1">{step.title}</h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed tabular-nums">{step.desc}</p>
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
