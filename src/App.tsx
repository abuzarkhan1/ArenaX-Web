import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TournamentModes from './components/TournamentModes';
import AIVisionShowcase from './components/AIVisionShowcase';
import LeaderboardTiers from './components/LeaderboardTiers';
import WalletSection from './components/WalletSection';
import OrganizerProgram from './components/OrganizerProgram';
import HowItWorks from './components/HowItWorks';
import ScoutRewards from './components/ScoutRewards';
import PlatformComparison from './components/PlatformComparison';
import Features from './components/Features';
import Download from './components/Download';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';
import { logPageView } from './utils/analytics';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const getPath = () => window.location.pathname.replace('/', '') || 'home';
    setCurrentPage(getPath());

    const handlePopState = () => {
      setCurrentPage(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const newPath = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    logPageView();
  }, [currentPage]);

  const getSEOProps = () => {
    switch (currentPage) {
      case 'home':
        return {
          title: 'ArenaX - Premier Free Fire Tournament Platform in Pakistan | Win Real Cash',
          description: 'Join ArenaX, Pakistan\'s #1 Free Fire esports tournament platform. Compete daily in Bermuda Battle Royale & Clash Squad 4v4 brackets. AI-verified scoreboards, Two-Wallet security, and instant JazzCash/EasyPaisa payouts.',
          keywords: 'ArenaX, Arena X, Marena, Free Fire tournament Pakistan, Bermuda Battle Royale, Clash Squad 4v4, esports Pakistan, gaming tournament, win cash prizes, Free Fire esports Pakistan, JazzCash gaming',
          canonical: 'https://marenax.com/',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'ArenaX - Free Fire Tournament Platform',
            description: 'Pakistan\'s premier mobile esports tournament platform',
            url: 'https://marenax.com/'
          }
        };
      case 'about':
        return {
          title: 'About ArenaX - Pakistan\'s Leading Mobile Esports Platform | Our Story',
          description: 'Learn about ArenaX, Pakistan\'s premier mobile esports platform. Discover our mission to democratize competitive Free Fire tournaments with dispute-free ArenaX Vision Engine and transparent payouts.',
          keywords: 'ArenaX about, mobile esports Pakistan, gaming platform, tournament platform, Free Fire Pakistan, esports company',
          canonical: 'https://marenax.com/about',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About ArenaX',
            description: 'About Pakistan\'s premier mobile esports tournament platform',
            url: 'https://marenax.com/about'
          }
        };
      case 'faq':
        return {
          title: 'FAQ - Frequently Asked Questions | ArenaX Help Center',
          description: 'Find answers about ArenaX Free Fire tournaments, AI-powered scoreboard verification, Two-Wallet isolation, deposits, and 24h JazzCash/EasyPaisa cashouts.',
          keywords: 'ArenaX FAQ, tournament help, gaming questions, Free Fire tournament help, payment help, withdrawal help, Two-Wallet system',
          canonical: 'https://marenax.com/faq',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            name: 'ArenaX FAQ',
            url: 'https://marenax.com/faq'
          }
        };
      case 'contact':
        return {
          title: 'Contact ArenaX - 24/7 Player & Organizer Support Desk',
          description: 'Contact ArenaX support team for tournament queries, room credentials, deposit verification, or organizer partnership opportunities. WhatsApp and email helpdesk available.',
          keywords: 'ArenaX contact, gaming support, tournament help, customer service, organizer partnerships',
          canonical: 'https://marenax.com/contact',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact ArenaX',
            url: 'https://marenax.com/contact'
          }
        };
      case 'terms':
        return {
          title: 'Terms & Conditions - ArenaX Rules, Fair Play & User Agreement',
          description: 'Read ArenaX terms and conditions, authoritative combat scoring rules, anti-cheat policy, Two-Wallet rules, and legal disclosures governed under the laws of Pakistan.',
          keywords: 'ArenaX terms, tournament rules, gaming policy, fair play policy, Pakistan arbitration',
          canonical: 'https://marenax.com/terms',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'ArenaX Terms & Conditions',
            url: 'https://marenax.com/terms'
          }
        };
      default:
        return {
          title: 'ArenaX - Premier Free Fire Tournament Platform in Pakistan',
          description: 'Join Pakistan\'s #1 mobile esports tournament platform. Play Free Fire tournaments daily, win real cash prizes!',
          canonical: 'https://marenax.com/'
        };
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <TrustBar />
            <TournamentModes />
            <AIVisionShowcase />
            <LeaderboardTiers />
            <WalletSection />
            <OrganizerProgram />
            <HowItWorks />
            <ScoutRewards />
            <PlatformComparison />
            <Features />
            <Download />
          </>
        );
      case 'about':
        return <About />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'terms':
        return <Terms />;
      default:
        return (
          <>
            <Hero />
            <TrustBar />
            <TournamentModes />
            <AIVisionShowcase />
            <LeaderboardTiers />
            <WalletSection />
            <OrganizerProgram />
            <HowItWorks />
            <ScoutRewards />
            <PlatformComparison />
            <Features />
            <Download />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#101214] text-[#F3F4F6]">
      <SmoothScroll />
      <SEO {...getSEOProps()} />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
