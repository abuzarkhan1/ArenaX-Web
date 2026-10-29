import { ScanLine, ShieldCheck, Users, ShieldAlert } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';
import { SEO } from './SEO';

export const About = () => {
  const downloadUrl = 'https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk';

  const values = [
    {
      num: '01',
      icon: ScanLine,
      title: 'Dispute-Free Competition',
      desc: 'Automated AI scoreboard parsing eliminates human error and organizer bias in tournament scoring.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Financial Solvency & Escrow',
      desc: 'Guaranteed 100% solvency backed by isolated wallet vaults and 24-hour payouts via JazzCash & EasyPaisa.',
    },
    {
      num: '03',
      icon: Users,
      title: 'Empowering Guild Organizers',
      desc: 'Grassroots tournament hosts earn dedicated commissions while running custom community scrims.',
    },
    {
      num: '04',
      icon: ShieldAlert,
      title: 'Zero-Tolerance Fair Play',
      desc: 'Hardware bans for emulators and cheat software ensure a clean battlefield for mobile players.',
    },
  ];

  return (
    <>
      <SEO
        title="About ArenaX - Pakistan's Premier Free Fire Tournament Platform"
        description="Learn about the ArenaX mission: automated AI scoreboard verification, guaranteed escrow liquidity, and 24-hour cash payouts for mobile esports in Pakistan."
        canonical="https://marenax.site/about"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-bg-1 pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40" />
        <div aria-hidden="true" className="ambient-glow left-1/2 top-16 h-64 w-[36rem] max-w-[90vw] -translate-x-1/2" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <Pill dot={true} label="ABOUT ARENAX" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Built For <span className="text-accent text-glow-accent">Players</span>
            </h1>
            <p className="text-base sm:text-lg text-text-2 mt-3 leading-relaxed">
              We are building the future of competitive mobile gaming in Pakistan by delivering a seamless, dispute-free tournament ecosystem for Free Fire squads.
            </p>
          </div>

          {/* Our Story Card */}
          <div className="hud-card relative mx-auto mb-16 max-w-4xl overflow-hidden rounded-card p-8 sm:p-12">
            <HudCorners tone="neutral" size="sm" inset />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
            />
            <div className="relative flex items-center gap-4 mb-6 pb-4 border-b border-line">
              <div className="w-12 h-12 rounded-control overflow-hidden border border-line-accent bg-bg-2 flex items-center justify-center shadow-glow">
                <img src="/logo.webp" alt="ArenaX Emblem" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-text-1">Our Story</h2>
                <span className="text-xs font-mono text-accent">Pakistan's Mobile Esports Platform</span>
              </div>
            </div>

            <div className="relative space-y-4 text-base text-text-2 leading-relaxed">
              <p>
                ArenaX was founded by competitive gamers who experienced first-hand the pervasive challenges of organizing and participating in mobile esports tournaments across Pakistan. Players constantly struggled with delayed payouts, disputed scoreboards, unverified hosts on WhatsApp, and arbitrary disqualifications.
              </p>
              <p>
                Our mission is to democratize competitive esports by creating a platform where anyone can enter tournaments, improve their gameplay, and compete for real cash prizes. We believe in absolute fair play, total financial transparency, and building a thriving community of competitive gamers.
              </p>
            </div>
          </div>

          {/* Core Values 4-Column Grid */}
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-8 text-center">
              PLATFORM PILLARS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div
                  key={val.num}
                  className="group hud-card relative flex flex-col justify-between overflow-hidden rounded-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lift"
                >
                  <HudCorners
                    tone="neutral"
                    size="sm"
                    inset
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  <div>
                    <div className="mb-5 flex items-start justify-between">
                      <IconOrb icon={val.icon} tone="emerald" size="md" />
                      <span className="font-mono text-xs font-bold tracking-tight tabular-nums text-accent">/{val.num}</span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-text-1 mb-2">{val.title}</h3>
                    <p className="text-sm text-text-2 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="hud-card-highlight relative mx-auto max-w-2xl space-y-4 overflow-hidden rounded-card p-8 text-center">
            <HudCorners tone="emerald" size="sm" inset />
            <h3 className="text-2xl font-bold font-heading text-text-1">Ready to Compete?</h3>
            <p className="text-sm text-text-2">
              Download the official ArenaX application and register your squad for today's scrims.
            </p>
            <Button
              variant="primary"
              asAnchor
              href={downloadUrl}
              target="_blank"
              className="inline-flex"
            >
              Download Direct APK (v2.6)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
