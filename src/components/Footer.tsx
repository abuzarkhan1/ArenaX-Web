import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { IconOrb } from './primitives';

export const Footer = () => {
  return (
    <footer
      className="bg-[#161616] border-t border-white/[0.08] py-14 sm:py-18 relative overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Precision Supabase subtle top hairline gradient accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616] rounded-md"
            >
              <div className="w-8 h-8 rounded-md overflow-hidden border border-white/[0.08] bg-[#171717] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]">
                <img src="/logo.webp" alt="ArenaX Logo" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-lg sm:text-xl font-semibold text-[#EDEDED] font-heading tracking-tight group-hover:text-white transition-colors">
                Arena<span className="text-[#3ECF8E]">X</span>
              </span>
            </Link>
          </div>

          {/* Group 1: Navigation */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0] block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 2: Legal & Protection */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0] block mb-4">
              Legal & Rules
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/terms" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/fair-play" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Fair Play & Anti-Cheat
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Channels & Socials */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0] block mb-4">
              Official Channels
            </span>
            <div className="flex items-center gap-2.5 mb-4">
              <a
                href="https://www.facebook.com/share/17NfG8Syiq/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70"
                aria-label="Facebook"
              >
                <IconOrb
                  icon={Facebook}
                  tone="neutral"
                  size="md"
                  className="transition-all duration-200 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E] group-hover:shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]"
                />
              </a>
              <a
                href="https://www.instagram.com/arenaxbattlefield"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70"
                aria-label="Instagram"
              >
                <IconOrb
                  icon={Instagram}
                  tone="neutral"
                  size="md"
                  className="transition-all duration-200 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E] group-hover:shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]"
                />
              </a>
              <a
                href="https://youtube.com/@arenax_15"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70"
                aria-label="YouTube"
              >
                <IconOrb
                  icon={Youtube}
                  tone="neutral"
                  size="md"
                  className="transition-all duration-200 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E] group-hover:shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]"
                />
              </a>
            </div>
            <p className="text-xs text-[#707070] font-mono">
              <a
                href="mailto:arenasupport@gmail.com"
                className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150"
              >
                arenasupport@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#707070]">
          <p className="tabular-nums">© 2026 ArenaX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
