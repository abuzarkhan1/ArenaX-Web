import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import Features from './components/Features';
import Download from './components/Download';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const currentUrl = window.location.pathname.replace('/', '') || 'home';
    setCurrentPage(currentUrl);
  }, []);

  useEffect(() => {
    const newPath = currentPage === 'home' ? '/' : `/${currentPage}`;
    window.history.pushState({}, '', newPath);
  }, [currentPage]);

  const getSEOProps = () => {
    switch (currentPage) {
      case 'home':
        return {
          title: 'ArenaX - Best Free Fire & PUBG Mobile Tournament Platform in Pakistan | Win Real Cash',
          description: 'Join ArenaX, Pakistan\'s #1 mobile esports tournament platform. Play Free Fire & PUBG tournaments daily, compete with 10,000+ players, win real cash prizes. Safe payments, instant withdrawals. Download now!',
          keywords: 'ArenaX, Arena X, Marena, Marenax, Free Fire tournament, PUBG Mobile tournament, esports Pakistan, gaming tournament, mobile gaming, win cash prizes, online tournament, battle royale',
          canonical: 'https://marenax.com/',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'ArenaX - Mobile Tournament Platform',
            description: 'Pakistan\'s premier mobile esports tournament platform',
            url: 'https://marenax.com/'
          }
        };
      case 'about':
        return {
          title: 'About ArenaX - Pakistan\'s Leading Mobile Esports Platform | Our Story',
          description: 'Learn about ArenaX, Pakistan\'s fastest-growing mobile esports platform. Discover our mission to democratize competitive gaming and provide fair tournaments for Free Fire and PUBG players.',
          keywords: 'ArenaX about, mobile esports Pakistan, gaming platform, tournament platform, Free Fire Pakistan, PUBG Pakistan, esports company',
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
          title: 'FAQ - Frequently Asked Questions | ArenaX Tournament Help Center',
          description: 'Find answers to common questions about ArenaX tournaments, payments, withdrawals, game rules, and more. Get help with Free Fire and PUBG tournament registration, prize distribution, and account issues.',
          keywords: 'ArenaX FAQ, tournament help, gaming questions, Free Fire tournament help, PUBG tournament FAQ, payment help, withdrawal help',
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
          title: 'Contact ArenaX - Get Support | 24/7 Gaming Tournament Help',
          description: 'Contact ArenaX support team for tournament queries, technical issues, payment problems, or partnership opportunities. Email, phone, and live chat support available 24/7.',
          keywords: 'ArenaX contact, gaming support, tournament help, customer service, technical support, gaming platform contact',
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
          title: 'Terms & Conditions - ArenaX Tournament Platform Rules & Policies',
          description: 'Read ArenaX terms and conditions, tournament rules, fair play policy, payment terms, and user agreement. Understand your rights and responsibilities on Pakistan\'s leading mobile esports platform.',
          keywords: 'ArenaX terms, tournament rules, gaming policy, terms and conditions, user agreement, fair play policy',
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
          title: 'ArenaX - Best Free Fire & PUBG Mobile Tournament Platform in Pakistan',
          description: 'Join Pakistan\'s #1 mobile esports tournament platform. Play Free Fire & PUBG tournaments daily, win real cash prizes!',
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
            <Features />
            <Download />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
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