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
        className="group relative w-[52px] h-[52px] bg-whatsapp active:scale-95 rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-200 border border-white/20 cursor-pointer flex items-center justify-center"
        data-testid="whatsapp-button"
        aria-label="Chat with ArenaX Support on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white stroke-[2]" />

        {/* Subtle Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20 pointer-events-none" />

        {/* Tooltip: Hidden on mobile */}
        {isHovered && (
          <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
            <div className="p-2.5 rounded-control bg-bg-2 border border-line text-text-1 text-xs font-mono font-bold shadow-broadcast">
              Chat on WhatsApp
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
