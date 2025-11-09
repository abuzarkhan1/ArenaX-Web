import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Download from './components/Download';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </div>
  );
}

export default App;