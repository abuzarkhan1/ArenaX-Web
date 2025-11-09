const Footer = ({ setCurrentPage }) => {
  const scrollToTop = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1E1E1E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <span className="text-2xl font-bold text-white">ArenaX</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's premier mobile esports tournament platform. Compete, win,
              and dominate in Free Fire and PUBG tournaments.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToTop('home')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('about')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('faq')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToTop('contact')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToTop('terms')}
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF7F] transition-colors text-sm"
                >
                  Fair Play Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#1E1E1E] rounded-lg flex items-center justify-center hover:bg-[#00FF7F] transition-colors group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📘
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1E1E1E] rounded-lg flex items-center justify-center hover:bg-[#00BFFF] transition-colors group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  🐦
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1E1E1E] rounded-lg flex items-center justify-center hover:bg-[#FF6B6B] transition-colors group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📸
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1E1E1E] rounded-lg flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  💬
                </span>
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Email:{' '}
              <a
                href="mailto:support@arenax.com"
                className="text-[#00FF7F] hover:text-[#00BFFF]"
              >
                support@arenax.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#1E1E1E] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 ArenaX. All rights reserved. Made with 💚 in India
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-500">🎮 Free Fire</span>
              <span className="text-gray-500">🎯 PUBG Mobile</span>
              <span className="text-gray-500">🏆 Tournaments</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs">
            ArenaX is a skill-based gaming platform. Play responsibly. Users
            must be 18+ or have parental consent.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
