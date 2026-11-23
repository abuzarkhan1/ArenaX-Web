import { useState, useEffect, useCallback, useId, useRef, type RefObject } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronRight, DownloadCloud } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useMotionValue, useMotionValueEvent } from 'motion/react';
import { Button } from './primitives/Button';
import { trackDownload, trackButtonClick } from '../utils/analytics';
import { cn } from '../lib/utils';

interface NavItem {
  id: string;
  label: string;
  isSection?: boolean;
  path?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'tournaments', label: 'Tournaments', isSection: true },
  { id: 'organizers', label: 'Organizers', isSection: true },
  { id: 'how-it-works', label: 'How It Works', isSection: true },
  { id: 'faq', label: 'FAQs', path: '/faq' },
];

// Scroll-spy anchor set, kept in sync with the sections rendered on the home page.
const sections = ['tournaments', 'organizers', 'how-it-works'];

// Prestige UI "navbar-condense" hysteresis: condense past 40px, expand again
// only near the very top so a pointer resting on the threshold never flickers.
const CONDENSE_AT = 40;
const EXPAND_AT = 8;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ring =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#121212]';

const surface =
  'border border-white/[0.08] bg-[#161616] shadow-[0_1px_2px_rgba(0,0,0,0.4),0_24px_64px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl';

function useScrollY(ref: RefObject<HTMLElement | null>) {
  const y = useMotionValue(0);

  useEffect(() => {
    let source: HTMLElement | Window = window;
    let el = ref.current?.parentElement ?? null;
    while (el && el !== document.body) {
      if (/(auto|scroll|overlay)/.test(getComputedStyle(el).overflowY)) {
        source = el;
        break;
      }
      el = el.parentElement;
    }

    const read = () => {
      const top = source === window ? window.scrollY : (source as HTMLElement).scrollTop;
      y.set(Math.max(0, top));
    };
    read();
    source.addEventListener('scroll', read, { passive: true });
    return () => source.removeEventListener('scroll', read);
  }, [ref, y]);

  return y;
}

function useDismiss(
  open: boolean,
  close: () => void,
  refs: RefObject<HTMLElement | null>[],
  trigger?: RefObject<HTMLElement | null>
) {
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (refs.some((ref) => ref.current?.contains(target))) return;
      closeRef.current();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      closeRef.current();
      trigger?.current?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
    // refs are stable ref objects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-4">
      <span
        className={cn(
          'absolute left-0 top-[5px] h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'rotate-45' : '-translate-y-[3px]'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-[5px] h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? '-rotate-45' : 'translate-y-[3px]'
        )}
      />
    </span>
  );
}

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [condensed, setCondensed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const y = useScrollY(headerRef);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useMotionValueEvent(y, 'change', (value) => {
    if (!condensed && value > CONDENSE_AT) setCondensed(true);
    else if (condensed && value < EXPAND_AT) setCondensed(false);
  });

  useDismiss(mobileMenuOpen, () => setMobileMenuOpen(false), [panelRef, toggleRef], toggleRef);

  // Keep the capsule honest on reloads that begin mid-page.
  useEffect(() => {
    setCondensed(window.scrollY > CONDENSE_AT);
  }, []);

  // Reading progress + honest in-view section detection.
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const winScroll = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0);

      if (!isHomePage) {
        setActiveSection('');
        return;
      }

      // Mark a nav item active only while its section actually crosses the header line.
      const probe = 132;
      let current = '';
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probe && rect.bottom > probe) {
            current = sec;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Dedicated overflow synchronisation: the sheet and the document never diverge.
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

  // Crossing into the desktop layout retires the sheet instead of trapping scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (item: NavItem) => {
      setMobileMenuOpen(false);
      document.body.style.overflow = '';

      if (item.path) {
        navigate(item.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!item.isSection) return;

      if (!isHomePage) {
        navigate('/');
        setTimeout(() => {
          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
        }, 160);
      } else {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [isHomePage, navigate]
  );

  const handleDownloadClick = () => {
    trackButtonClick('download_app', 'navbar');
    trackDownload('ArenaX.apk', 'Android', 'navbar');
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
      }, 160);
    } else {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isItemActive = (item: NavItem) =>
    item.path ? location.pathname === item.path : isHomePage && activeSection === item.id;

  return (
    <MotionConfig reducedMotion="user">
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
          <div
            className={cn(
              'relative mx-auto flex h-16 items-center justify-between gap-4 border transition-[max-width,transform,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
              condensed || mobileMenuOpen
                ? 'translate-y-3 max-w-[960px] rounded-2xl border-white/[0.08] bg-[#121212]/80 pl-4 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.45),0_18px_48px_-16px_rgba(0,0,0,0.85)] backdrop-blur-xl'
                : 'translate-y-1 max-w-[1200px] rounded-none border-transparent bg-transparent px-1 shadow-none'
            )}
          >
            {/* Brand lockup */}
            <Link
              to="/"
              aria-label="ArenaX home"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
              className={cn('inline-flex shrink-0 items-center gap-2.5 rounded-lg', ring)}
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#141715] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_-12px_rgba(62,207,142,0.6)]">
                <img
                  src="/logo.webp"
                  alt=""
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px] object-contain"
                />
              </span>
              <span className="font-heading text-[1.06rem] font-bold tracking-[-0.02em] text-[#EDEDED]">
                Arena<span className="text-[#3ECF8E]">X</span>
              </span>
            </Link>

            {/* Desktop navigation â€” quiet text rail that rides the condense */}
            <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-200',
                      active
                        ? 'text-[#EDEDED]'
                        : 'text-[#A0A0A0] hover:bg-white/[0.05] hover:text-[#EDEDED]',
                      ring
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex flex-shrink-0 items-center gap-1.5">
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownloadClick}
                icon={<DownloadCloud className="h-4 w-4" strokeWidth={1.75} />}
                iconPosition="left"
                className="hidden sm:inline-flex"
              >
                Download App
              </Button>

              <button
                type="button"
                onClick={handleDownloadClick}
                aria-label="Download the ArenaX app"
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-lg text-[#3ECF8E] transition-colors duration-200 hover:bg-white/[0.06] sm:hidden',
                  ring
                )}
              >
                <DownloadCloud className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls={panelId}
                className={cn(
                  'grid h-10 w-10 cursor-pointer place-items-center rounded-lg text-[#EDEDED] transition-colors duration-200 hover:bg-white/[0.06] lg:hidden',
                  ring
                )}
              >
                <MenuGlyph open={mobileMenuOpen} />
              </button>
            </div>

            {/* Reading progress â€” a hairline that only appears as you travel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 bottom-0 h-[2px] overflow-hidden rounded-full"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#249361] to-[#3ECF8E] transition-[width] duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Floating mobile panel â€” the condensed bar reveals a frosted sheet */}
            <AnimatePresence>
              {mobileMenuOpen ? (
                <motion.div
                  ref={panelRef}
                  id={panelId}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } }}
                  exit={{ opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeOut' } }}
                  className={cn(
                    'absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain rounded-2xl p-2 lg:hidden',
                    surface
                  )}
                >
                  <nav aria-label="Mobile">
                    {NAV_ITEMS.map((item, index) => {
                      const active = isItemActive(item);
                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick(item)}
                          aria-current={active ? 'page' : undefined}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3, delay: 0.04 + index * 0.035, ease: EASE },
                          }}
                          className={cn(
                            'flex min-h-[44px] w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-[15px] font-medium transition-colors hover:bg-white/[0.05]',
                            active ? 'text-[#EDEDED]' : 'text-[#A0A0A0]',
                            ring
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                active ? 'bg-[#3ECF8E] shadow-[0_0_8px_rgba(62,207,142,0.8)]' : 'bg-white/20'
                              )}
                            />
                            {item.label}
                          </span>
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#707070]" strokeWidth={1.5} />
                        </motion.button>
                      );
                    })}
                  </nav>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-white/[0.08] px-1 pt-3">
                    <Link
                      to="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'inline-flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-[#A0A0A0] transition-colors hover:border-[#3ECF8E]/35 hover:text-[#EDEDED]',
                        ring
                      )}
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'inline-flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-[#A0A0A0] transition-colors hover:border-[#3ECF8E]/35 hover:text-[#EDEDED]',
                        ring
                      )}
                    >
                      Contact
                    </Link>
                    <Link
                      to="/terms"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'inline-flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-[#A0A0A0] transition-colors hover:border-[#3ECF8E]/35 hover:text-[#EDEDED]',
                        ring
                      )}
                    >
                      Terms
                    </Link>
                  </div>

                  <div className="px-1 pb-1 pt-3">
                    <Button
                      variant="primary"
                      fullWidth
                      size="md"
                      onClick={handleDownloadClick}
                      icon={<DownloadCloud className="h-4 w-4" strokeWidth={1.75} />}
                      iconPosition="left"
                    >
                      Download App
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
};

export default Navbar;


