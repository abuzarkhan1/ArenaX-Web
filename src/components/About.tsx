import { ScanLine, ShieldCheck, Users, ShieldAlert } from 'lucide-react';
import { Button } from './primitives/Button';
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

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-20 sm:pt-36">
        {/* Supabase ambient atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-16 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Built For <span className="text-[#3ECF8E]">Players</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] mt-3 leading-relaxed">
              We are building the future of competitive mobile gaming in Pakistan by delivering a seamless, dispute-free tournament ecosystem for Free Fire squads.
            </p>
          </div>

          {/* Our Story Card (Supabase Carbon Architecture) */}
          <div className="relative mx-auto mb-16 max-w-4xl overflow-hidden rounded-2xl bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#3ECF8E]/5 blur-3xl"
            />
            <div className="relative flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.08]">
              <div className="w-12 h-12 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center shadow-[0_0_15px_rgba(62,207,142,0.15)] flex-shrink-0">
                <img src="/logo.webp" alt="ArenaX Emblem" width={48} height={48} className="w-full h-full object-cover rounded-md" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-[#EDEDED]">Our Story</h2>
              </div>
            </div>

            <div className="relative space-y-4 text-base text-[#A0A0A0] leading-relaxed">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={val.num}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-[#3ECF8E]/40 p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(62,207,142,0.18)]"
                  >
                    <div>
                      <div className="mb-5 flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] group-hover:border-[#3ECF8E]/60 transition-colors">
                          <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <span className="font-mono text-xs font-semibold tabular-nums tracking-wider px-2 py-0.5 rounded-full bg-[#041B10] border border-[#3ECF8E]/25 text-[#3ECF8E]">
                          /{val.num}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-heading text-[#EDEDED] mb-2">{val.title}</h3>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Box (Supabase Highlighted Carbon Card) */}
          <div className="relative mx-auto max-w-2xl space-y-4 overflow-hidden rounded-2xl bg-gradient-to-b from-[#181A19] to-[#141514] border border-[#3ECF8E]/35 p-8 sm:p-10 text-center shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_0_40px_-18px_rgba(62,207,142,0.25),0_20px_48px_-20px_rgba(0,0,0,0.8)]">
            <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Ready to Compete?</h3>
            <p className="text-sm sm:text-base text-[#A0A0A0] max-w-lg mx-auto">
              Download the official ArenaX application and register your squad for today's scrims.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                asAnchor
                href={downloadUrl}
                target="_blank"
                className="inline-flex"
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
