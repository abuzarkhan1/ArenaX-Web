import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import Statement from './components/Statement';
import AppExperienceShowcase from './components/AppExperienceShowcase';
import TournamentModes from './components/TournamentModes';
import AIVisionShowcase from './components/AIVisionShowcase';
import WalletSection from './components/WalletSection';
import LeaderboardTiers from './components/LeaderboardTiers';
import OrganizerProgram from './components/OrganizerProgram';
import HowItWorks from './components/HowItWorks';
import PlatformComparison from './components/PlatformComparison';
import ScoutRewards from './components/ScoutRewards';
import Download from './components/Download';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import RefundPolicy from './components/RefundPolicy';
import FairPlay from './components/FairPlay';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { SEO } from './components/SEO';
import { logPageView } from './utils/analytics';

const HomePage = () => {
  return (
    <>
      <SEO
        title="ArenaX - Pakistan's Premier Free Fire Tournament Platform"
        description="Join Pakistan's premier Free Fire esports platform. Daily Bermuda BR & 4v4 Clash Squad scrims, automated AI scoreboard verification, and 24-hour payouts."
        canonical="https://marenax.site/"
      />
      {/* SECTION 01: Hero */}
      <Hero />

      {/* SECTION 02: Full-Bleed Editorial Statement (Replaces TrustBar) */}
      <Statement />

      {/* SECTION 03: App Experience (Signature Scene 1: 3D Phone) */}
      <AppExperienceShowcase />

      {/* SECTION 04: Tournament Modes (Bermuda & Clash Squad) */}
      <TournamentModes />

      {/* SECTION 05: Vision Engine (Signature Scene 2: Scoreboard in Perspective) */}
      <AIVisionShowcase />

      {/* SECTION 06: Two-Vault Wallet Flow */}
      <WalletSection />

      {/* SECTION 07: Competitive Ranks (Mounted LeaderboardTiers) */}
      <LeaderboardTiers />

      {/* SECTION 08: Organizer Program */}
      <OrganizerProgram />

      {/* SECTION 09: How It Works Vertical Timeline */}
      <HowItWorks />

      {/* SECTION 10: Platform Comparison */}
      <PlatformComparison />

      {/* SECTION 11: Scout Program & In-App Rewards Store */}
      <ScoutRewards />

      {/* SECTION 12: Download Client (Giant ARENAX Echo + QR + Steps) */}
      <Download />
    </>
  );
};

export default function App() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg-1 text-text-1">
      <SmoothScroll />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/fair-play" element={<FairPlay />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
