import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, DownloadCloud } from 'lucide-react';
import { Button } from './primitives/Button';

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
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Simple active section detection on home page
      if (isHomePage) {
        if (window.scrollY < 160) {
          setActiveSection('home');
          return;
        }
        const sections = ['home', 'tournaments', 'ai-vision', 'wallet', 'ranks', 'organizers', 'how-it-works'];
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
    const next = !mobileMenuOpen;
    setMobileMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-0/70 backdrop-blur-xl border-b border-white/[0.08] transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-control overflow-hidden border border-line-accent bg-white/[0.02] flex items-center justify-center transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-105 group-hover:border-emerald-500/50 shadow-[0_0_24px_-12px_rgba(0,200,120,0.6)]">
              <img src="/logo.webp" alt="ArenaX Logo" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-text-1 font-heading tracking-tight">
                Arena<span className="text-accent">X</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-3 -mt-0.5 hidden sm:block">
                ESPORTS CLIENT
              </span>
            </div>
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
                  className={`link-underline px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-control transition-colors cursor-pointer ${
                    isActive
                      ? 'text-accent font-bold bg-accent-dim'
                      : 'text-text-2 hover:text-text-1 hover:bg-bg-2'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Download APK Button */}
          <div className="flex items-center gap-3">
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
              className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.06] rounded-control border border-white/[0.08] hover:border-emerald-500/40 text-text-1 cursor-pointer transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Emerald Scroll Progress Line */}
      <div className="w-full bg-white/[0.06] h-[2px]">
        <div
          className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 h-[2px] shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bg-0/95 backdrop-blur-2xl border-t border-white/[0.08] shadow-broadcast">
          <div className="px-6 py-6 space-y-2 max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive =
                item.path && location.pathname === item.path
                  ? true
                  : isHomePage && item.isSection && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full min-h-[48px] text-left px-4 py-3 rounded-control text-sm font-mono uppercase tracking-wider transition-colors cursor-pointer border-l-2 ${
                    isActive
                      ? 'text-accent bg-accent-dim border-emerald-500/60'
                      : 'text-text-2 hover:text-accent hover:bg-bg-2 border-transparent'
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
                className="px-3.5 py-2 rounded-control bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-text-2 hover:text-text-1 hover:border-emerald-500/40 transition-colors active:scale-[0.98]"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-control bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-text-2 hover:text-text-1 hover:border-emerald-500/40 transition-colors active:scale-[0.98]"
              >
                Contact
              </Link>
              <Link
                to="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-control bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-text-2 hover:text-text-1 hover:border-emerald-500/40 transition-colors active:scale-[0.98]"
              >
                Terms
              </Link>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                fullWidth
                onClick={handleDownloadClick}
                icon={<DownloadCloud className="w-4 h-4" strokeWidth={1.5} />}
              >
                Download APK (v2.6)
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
