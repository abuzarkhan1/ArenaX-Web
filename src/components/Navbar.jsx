import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'terms', label: 'Terms & Conditions' },
  ];

  // Toggle body scroll when mobile menu opens/closes
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);

    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    document.body.style.overflow = ''; // Ensure scroll is restored
    if (pageId === 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' }); // Let Lenis handle smooth if needed, or instant reset
    } else {
      // Standard scroll behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/70 backdrop-blur-2xl border-b border-white/5 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white tracking-tight">ArenaX</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${currentPage === item.id
                  ? 'bg-[#00FF7F]/20 text-[#00FF7F] backdrop-blur-xl border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20'
                  : 'text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-xl border border-transparent hover:border-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E1E1E]/95 backdrop-blur-2xl border-t border-white/5 shadow-2xl">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${currentPage === item.id
                  ? 'text-[#00FF7F] bg-[#00FF7F]/20 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;