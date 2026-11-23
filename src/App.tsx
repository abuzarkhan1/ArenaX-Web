import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import ArenaFilm from './components/ArenaFilm';
import AppExperienceShowcase from './components/AppExperienceShowcase';
import TournamentModes from './components/TournamentModes';
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
        title="ArenaX | Free Fire Tournaments in Pakistan"
        description="Explore Free Fire competition with ArenaX. Discover Bermuda Battle Royale and Clash Squad formats, understand the match journey, and download the Android app."
        canonical="https://marenax.site/"
      />
      <Hero />

      <TournamentModes />
      <ArenaFilm />
      <AppExperienceShowcase />

      <LeaderboardTiers />

      <WalletSection />

      <HowItWorks />

      <OrganizerProgram />

      <PlatformComparison />

      <ScoutRewards />

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
      <a className="ax-skip" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className={location.pathname !== '/' ? 'ax-support-page' : undefined}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/fair-play" element={<FairPlay />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}




