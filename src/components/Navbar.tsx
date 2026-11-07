import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, DownloadCloud } from 'lucide-react';
import { Button } from './primitives/Button';
import { trackDownload, trackButtonClick } from '../utils/analytics';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Track scroll progress for the top emerald indicator
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;
      setScrollProgress(scrolled);

      // Simple active section detection on home page
      if (isHomePage) {
        if (window.scrollY < 160) {
          setActiveSection('home');
          return;
        }
        const sections = ['tournaments', 'ai-vision', 'wallet', 'ranks', 'organizers', 'how-it-works'];
        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140 && rect.bottom >= 140) {
              setActiveSection(sec);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Synchronize document body overflow with mobile menu open state
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'tournaments', label: 'Tournaments', isSection: true },
    { id: 'ai-vision', label: 'Vision Engine', isSection: true },
    { id: 'wallet', label: 'Wallet', isSection: true },
    { id: 'ranks', label: 'Ranks', isSection: true },
    { id: 'organizers', label: 'Organizers', isSection: true },
    { id: 'how-it-works', label: 'How It Works', isSection: true },
    { id: 'faq', label: 'FAQs', path: '/faq' },
  ];

  const handleNavClick = (item: { id: string; label: string; isSection?: boolean; path?: string }) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';

    if (item.path) {
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item.isSection) {
      if (!isHomePage) {
        navigate('/');
        setTimeout(() => {
          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDownloadClick = () => {
    trackButtonClick('download_app', 'navbar');
    trackDownload('ArenaX.apk', 'Android', 'navbar');
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0E0D]/85 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md overflow-hidden border border-white/[0.08] bg-[#171717] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]">
              <img src="/logo.webp" alt="ArenaX Logo" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-[#EDEDED] font-heading tracking-tight group-hover:text-white transition-colors">
              Arena<span className="text-[#3ECF8E]">X</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.path && location.pathname === item.path
                  ? true
                  : isHomePage && item.isSection && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  data-active={isActive}
                  className={`px-3 py-1.5 text-sm font-medium tracking-normal rounded-md transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#3ECF8E] font-medium bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 shadow-[0_0_12px_-4px_rgba(62,207,142,0.3)]'
                      : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Download App Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadClick}
              icon={<DownloadCloud className="w-3.5 h-3.5" strokeWidth={1.5} />}
              className="hidden sm:inline-flex"
            >
              Download App
            </Button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#171717] hover:bg-[#1E201F] rounded-md border border-white/[0.08] hover:border-[#3ECF8E]/40 text-[#EDEDED] cursor-pointer transition-[background-color,border-color,transform] duration-200 active:scale-[0.97]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>

      {/* Supabase Brand Green Scroll Progress Line */}
      <div className="w-full bg-white/[0.04] h-[2px]">
        <div
          className="bg-gradient-to-r from-[#249361] to-[#3ECF8E] h-[2px] shadow-[0_0_8px_rgba(62,207,142,0.45)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171717]/98 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.8)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
          <div className="px-5 py-5 space-y-2 max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive =
                item.path && location.pathname === item.path
                  ? true
                  : isHomePage && item.isSection && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full min-h-[44px] text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer border-l-2 ${
                    isActive
                      ? 'text-[#3ECF8E] bg-[#3ECF8E]/10 border-[#3ECF8E] font-medium'
                      : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F] border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap gap-2">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-md bg-[#121212] border border-white/[0.08] text-xs font-medium text-[#A0A0A0] hover:text-[#EDEDED] hover:border-[#3ECF8E]/40 transition-colors active:scale-[0.97]"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-md bg-[#121212] border border-white/[0.08] text-xs font-medium text-[#A0A0A0] hover:text-[#EDEDED] hover:border-[#3ECF8E]/40 transition-colors active:scale-[0.97]"
              >
                Contact
              </Link>
              <Link
                to="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-md bg-[#121212] border border-white/[0.08] text-xs font-medium text-[#A0A0A0] hover:text-[#EDEDED] hover:border-[#3ECF8E]/40 transition-colors active:scale-[0.97]"
              >
                Terms
              </Link>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={handleDownloadClick}
                icon={<DownloadCloud className="w-4 h-4" strokeWidth={1.5} />}
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
