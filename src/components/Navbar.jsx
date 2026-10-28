import { Menu, X, Download } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tournaments', label: 'Tournaments', isSection: true },
    { id: 'leaderboard', label: 'Ranks & Rules', isSection: true },
    { id: 'organizers', label: 'Organizers', isSection: true },
    { id: 'how-it-works', label: 'How It Works', isSection: true },
    { id: 'faq', label: 'FAQs', isPage: true },
  ];

  const secondaryPages = [
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'terms', label: 'Terms & Conditions' },
  ];

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);

    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';

    if (item.id === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (item.isSection) {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Standalone page
    setCurrentPage(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadClick = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    const downloadSection = document.getElementById('download');
    if (downloadSection && currentPage === 'home') {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#101214]/85 backdrop-blur-2xl border-b border-[#30363A] shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Official App Emblem */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick({ id: 'home' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick({ id: 'home' })}
            aria-label="ArenaX Home"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[#00C878]/25 group-hover:scale-105 transition-transform duration-300 border border-[#00C878]/40 bg-[#101214] flex items-center justify-center">
              <img src="/logo.png" alt="ArenaX Official Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#F3F4F6] font-heading flex items-center gap-1">
                Arena<span className="text-[#00C878]">X</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA] -mt-1 hidden sm:block">
                Esports Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.isPage ? currentPage === item.id : (currentPage === 'home' && item.id === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#00C878] font-bold'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action & CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadClick}
              className="min-h-[44px] bg-[#00C878] hover:bg-[#00A865] active:scale-95 text-[#101214] font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#00C878]/20 hover:shadow-[#00C878]/40 hover:scale-105 cursor-pointer border border-[#00C878]/30"
              aria-label="Download ArenaX Mobile App"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Download App</span>
              <span className="sm:hidden">App</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden text-[#F3F4F6] w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101214]/98 backdrop-blur-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-6 space-y-2 max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = item.isPage ? currentPage === item.id : (currentPage === 'home' && item.id === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full min-h-[48px] text-left px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#00C878] font-bold bg-white/[0.04]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-3 pb-1 border-t border-white/10 flex flex-wrap gap-2">
              {secondaryPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleNavClick({ id: page.id })}
                  className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentPage === page.id
                      ? 'text-[#00C878] font-bold bg-white/[0.04]'
                      : 'text-[#A1A1AA] hover:text-white bg-white/[0.02] border border-white/5'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10">
              <button
                onClick={handleDownloadClick}
                className="w-full min-h-[48px] bg-[#00C878] hover:bg-[#00A865] active:scale-[0.98] text-[#101214] font-bold py-3.5 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg shadow-[#00C878]/25 cursor-pointer border border-[#00C878]/40"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                Download ArenaX App
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
