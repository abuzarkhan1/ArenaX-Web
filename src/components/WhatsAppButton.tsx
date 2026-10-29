import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = '+923367135319';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-[52px] h-[52px] bg-whatsapp active:scale-95 rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_30px_-8px_rgba(37,211,102,0.65)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.55),0_0_36px_-6px_rgba(37,211,102,0.8)] hover:scale-105 transition-[transform,box-shadow] duration-200 border border-white/25 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
        data-testid="whatsapp-button"
        aria-label="Chat with ArenaX Support on WhatsApp"
      >
        {/* Icon core: subtle inner glow ring keeps the glyph tactile */}
        <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
          <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
        </span>

        {/* Subtle Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20 pointer-events-none" />

        {/* Tooltip: Hidden on mobile */}
        {isHovered && (
          <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
            <div className="p-2.5 rounded-control bg-bg-2/80 backdrop-blur-xl border border-white/[0.08] text-text-1 text-xs font-mono font-bold shadow-lift">
              Chat on WhatsApp
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
