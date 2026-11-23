import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappNumber = '+923367135319';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="group/label fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 sm:bottom-6 sm:right-6">
      {/* Desktop hover label */}
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 items-center whitespace-nowrap rounded-full border border-white/[0.08] bg-[#171717]/95 px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#EDEDED] opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-200 group-hover/label:translate-x-0 group-hover/label:opacity-100 sm:flex">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#3ECF8E]" />
        ArenaX Support
      </span>

      <button
        type="button"
        onClick={handleClick}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-whatsapp shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_30px_-8px_rgba(37,211,102,0.65)] transition-[transform,box-shadow,border-color] duration-200 hover:scale-105 hover:border-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.55),0_0_36px_-6px_rgba(37,211,102,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 active:scale-95 sm:h-[52px] sm:w-[52px]"
        data-testid="whatsapp-button"
        aria-label="Chat with ArenaX Support on WhatsApp"
      >
        {/* Supabase status badge indicator: active quick-support beacon */}
        <span
          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3ECF8E] border-2 border-[#121212] shadow-[0_0_8px_rgba(62,207,142,0.8)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon core: tactile inner circular disc with hairline highlight */}
        <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-200">
          <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
        </span>

        {/* Pulse halo effect */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp opacity-20 motion-safe:animate-ping" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
