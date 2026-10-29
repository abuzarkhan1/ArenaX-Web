import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-bg-0 border-t border-line py-14 sm:py-18 relative" aria-label="Site Footer">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-control overflow-hidden border border-line-accent bg-bg-2 flex items-center justify-center shadow-sm">
                <img src="/logo.webp" alt="ArenaX Logo" width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-extrabold text-text-1 font-heading tracking-tight">
                Arena<span className="text-accent">X</span>
              </span>
            </Link>

            <p className="text-sm text-text-2 leading-relaxed">
              Pakistan's premier mobile esports platform. Compete in daily Free Fire Bermuda and Clash Squad tournaments with automated AI scoreboard verification.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>PLATFORM OPERATIONAL 24/7</span>
            </div>
          </div>

          {/* Group 1: Navigation */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-3 block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-text-2 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-2 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-text-2 hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-2 hover:text-accent transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 2: Legal & Protection */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-3 block mb-4">
              Legal & Rules
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/terms" className="text-text-2 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-text-2 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-text-2 hover:text-accent transition-colors">
                  100% Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/fair-play" className="text-text-2 hover:text-accent transition-colors">
                  Fair Play & Anti-Cheat
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Channels & Socials */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-3 block mb-4">
              Official Channels
            </span>
            <div className="flex gap-2.5 mb-4">
              <a
                href="https://www.facebook.com/share/17NfG8Syiq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-control bg-bg-2 hover:bg-bg-3 border border-line hover:border-line-strong flex items-center justify-center text-text-2 hover:text-text-1 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/arenaxbattlefield"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-control bg-bg-2 hover:bg-bg-3 border border-line hover:border-line-strong flex items-center justify-center text-text-2 hover:text-text-1 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@arenax_15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-control bg-bg-2 hover:bg-bg-3 border border-line hover:border-line-strong flex items-center justify-center text-text-2 hover:text-text-1 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-text-3 font-mono">
              Direct Helpline:{' '}
              <a href="mailto:arenasupport@gmail.com" className="text-text-2 hover:text-accent transition-colors">
                arenasupport@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-line pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-text-3">
          <p>© 2026 ArenaX. All rights reserved. Built for competitive esports in Pakistan.</p>
          <div className="flex items-center gap-4">
            <span>Free Fire Bermuda</span>
            <span>•</span>
            <span>Clash Squad 4v4</span>
            <span>•</span>
            <span className="text-accent">AI Vision Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
