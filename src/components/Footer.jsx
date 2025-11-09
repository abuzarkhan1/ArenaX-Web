const Footer = ({ setCurrentPage }) => {
  const scrollToTop = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
                <span className="text-3xl">🎮</span>
              </div>
              <span className="text-3xl font-bold text-white">ArenaX</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Pakistan's premier mobile esports tournament platform. Compete, win,
              and dominate in Free Fire and PUBG tournaments.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToTop('home')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('about')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('faq')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('contact')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToTop('terms')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-base"
                >
                  Fair Play Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-12 h-12 bg-[#1E1E1E]/60 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-[#00FF7F]/20 transition-all group border border-white/10 hover:border-[#00FF7F]/30 shadow-lg"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  📘
                </span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-[#1E1E1E]/60 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-[#00BFFF]/20 transition-all group border border-white/10 hover:border-[#00BFFF]/30 shadow-lg"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  🐦
                </span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-[#1E1E1E]/60 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-[#00FF7F]/20 transition-all group border border-white/10 hover:border-[#00FF7F]/30 shadow-lg"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  📸
                </span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-[#1E1E1E]/60 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-[#00BFFF]/20 transition-all group border border-white/10 hover:border-[#00BFFF]/30 shadow-lg"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  💬
                </span>
              </a>
            </div>
            <p className="text-gray-400 text-base">
              Email:{' '}
              <a
                href="mailto:support@arenax.com"
                className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors"
              >
                support@arenax.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-base text-center md:text-left">
              © 2025 ArenaX. All rights reserved. Made with 💚 in Pakistan
            </p>
            <div className="flex items-center gap-8 text-base">
              <span className="text-gray-500">🎮 Free Fire</span>
              <span className="text-gray-500">🎯 PUBG Mobile</span>
              <span className="text-gray-500">🏆 Tournaments</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            ArenaX is a skill-based gaming platform. Play responsibly. Users
            must be 18+ or have parental consent.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;