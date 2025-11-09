import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = '+923367135319';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-16 h-16 bg-[#25D366]/90 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 border border-white/20"
        data-testid="whatsapp-button"
      >
        <MessageCircle className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
            <div className="bg-[#1E1E1E]/95 backdrop-blur-xl text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/10 shadow-xl">
              Chat with us on WhatsApp
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;