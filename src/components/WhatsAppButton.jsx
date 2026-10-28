import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = '+923367135319';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] active:scale-95 rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 border border-white/20 cursor-pointer flex items-center justify-center"
        data-testid="whatsapp-button"
        aria-label="Chat with ArenaX Support on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="hidden sm:block absolute right-full mr-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap pointer-events-none">
            <div className="premium-card text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl">
              Chat with ArenaX on WhatsApp
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
