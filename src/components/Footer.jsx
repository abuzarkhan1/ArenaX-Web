import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const scrollToTop = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101214] border-t border-white/5 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div
              className="flex items-center gap-3 mb-6 cursor-pointer group"
              onClick={() => scrollToTop('home')}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[#00C878]/25 border border-[#00C878]/40 bg-[#101214] flex items-center justify-center">
                <img src="/logo.png" alt="ArenaX Official Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-extrabold text-[#F3F4F6] font-heading tracking-tight">
                Arena<span className="text-[#00C878]">X</span>
              </span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
              Pakistan's premier mobile esports platform. Compete in daily Free Fire Bermuda & Clash Squad tournaments, verified by ArenaX Vision Engine.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00C878] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#00C878] tracking-wider uppercase">
                Platform Operational 24/7
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToTop('home')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('about')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('faq')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('contact')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base tracking-wide uppercase">Legal & Security</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToTop('terms')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('terms')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('terms')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  100% Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('terms')}
                  className="text-[#A1A1AA] hover:text-[#00C878] transition-colors text-sm font-medium cursor-pointer"
                >
                  Zero-Tolerance Fair Play
                </button>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base tracking-wide uppercase">Official Channels</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/share/17NfG8Syiq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/[0.04] hover:bg-[#1877F2]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#1877F2]/40 transition-all shadow-md group"
                aria-label="ArenaX Facebook"
              >
                <Facebook className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#1877F2] transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/arenaxbattlefield"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/[0.04] hover:bg-[#E4405F]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#E4405F]/40 transition-all shadow-md group"
                aria-label="ArenaX Instagram"
              >
                <Instagram className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#E4405F] transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@arenax_15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/[0.04] hover:bg-[#FF0050]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#FF0050]/40 transition-all shadow-md group"
                aria-label="ArenaX TikTok"
              >
                <svg className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FF0050] transition-colors fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@arenax_15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/[0.04] hover:bg-[#FF0000]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#FF0000]/40 transition-all shadow-md group"
                aria-label="ArenaX YouTube"
              >
                <Youtube className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FF0000] transition-colors" />
              </a>
            </div>
            <p className="text-[#A1A1AA] text-sm">
              Email:{' '}
              <a
                href="mailto:arenasupport@gmail.com"
                className="text-[#00C878] hover:underline font-medium"
              >
                arenasupport@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#30363A] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#71717A] text-sm text-center md:text-left">
              © 2026 ArenaX. All rights reserved. Built for competitive esports in Pakistan.
            </p>
            <div className="flex items-center gap-6 text-xs text-[#71717A]">
              <span>Free Fire Bermuda</span>
              <span>•</span>
              <span>Clash Squad 4v4</span>
              <span>•</span>
              <span>ArenaX Vision Verified</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#71717A] text-xs">
            ArenaX is a skill-based esports tournament platform. Outcomes depend entirely on player skill and strategy. Users must be 18+ or have parental consent.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
