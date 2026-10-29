import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Badge, IconOrb } from './primitives';

export const Footer = () => {
  return (
    <footer
      className="bg-bg-0 border-t border-white/[0.08] py-14 sm:py-18 relative overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Low-opacity ambient texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 hud-grid opacity-30" />
        <div className="ambient-glow -bottom-32 left-1/2 h-64 w-[560px] -translate-x-1/2 opacity-60" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-control overflow-hidden border border-line-accent bg-white/[0.02] flex items-center justify-center transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-105 group-hover:border-emerald-500/50 shadow-[0_0_24px_-12px_rgba(0,200,120,0.6)]">
                <img src="/logo.webp" alt="ArenaX Logo" width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-extrabold text-text-1 font-heading tracking-tight">
                Arena<span className="text-accent">X</span>
              </span>
            </Link>

            <p className="text-sm text-text-2 leading-relaxed">
              Pakistan's premier mobile esports platform. Compete in daily Free Fire Bermuda and Clash Squad tournaments with automated AI scoreboard verification.
            </p>

            <Badge tone="emerald" dot pulse className="w-fit">
              PLATFORM OPERATIONAL 24/7
            </Badge>
          </div>

          {/* Group 1: Navigation */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-3 block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="link-underline text-text-2 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline text-text-2 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link-underline text-text-2 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline text-text-2 hover:text-white transition-colors">
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
                <Link to="/terms" className="link-underline text-text-2 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="link-underline text-text-2 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="link-underline text-text-2 hover:text-white transition-colors">
                  100% Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/fair-play" className="link-underline text-text-2 hover:text-white transition-colors">
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
                className="group inline-flex rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:duration-100"
                aria-label="Facebook"
              >
                <IconOrb
                  icon={Facebook}
                  tone="neutral"
                  size="md"
                  className="transition-colors duration-200 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:shadow-lift"
                />
              </a>
              <a
                href="https://www.instagram.com/arenaxbattlefield"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:duration-100"
                aria-label="Instagram"
              >
                <IconOrb
                  icon={Instagram}
                  tone="neutral"
                  size="md"
                  className="transition-colors duration-200 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:shadow-lift"
                />
              </a>
              <a
                href="https://youtube.com/@arenax_15"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:duration-100"
                aria-label="YouTube"
              >
                <IconOrb
                  icon={Youtube}
                  tone="neutral"
                  size="md"
                  className="transition-colors duration-200 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:shadow-lift"
                />
              </a>
            </div>
            <p className="text-xs text-text-3 font-mono">
              Direct Helpline:{' '}
              <a
                href="mailto:arenasupport@gmail.com"
                className="link-underline text-text-2 hover:text-white transition-colors"
              >
                arenasupport@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-text-3">
          <p className="tabular-nums">© 2026 ArenaX. All rights reserved. Built for competitive esports in Pakistan.</p>
          <div className="flex items-center gap-4">
            <span>Free Fire Bermuda</span>
            <span className="text-white/20">•</span>
            <span>Clash Squad 4v4</span>
            <span className="text-white/20">•</span>
            <span className="text-accent">AI Vision Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
