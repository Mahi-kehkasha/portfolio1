import React, { useState, useEffect } from 'react';
import { navItems } from '../../mock';
import { Menu, X } from 'lucide-react';

const Navigation = ({ onGetInTouchClick }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change nav background on scroll
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-purple-500/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity z-50"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          MK
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-purple-500/20">
          {navItems.filter(item => item.id !== 'hero').map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-purple-400 scale-110'
                  : 'text-gray-400 hover:text-purple-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <button
          onClick={onGetInTouchClick}
          className="hidden lg:block px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
        >
          Get in Touch
        </button>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-purple-400 transition-colors z-50"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-[280px] bg-[#0B0B1A] border-l border-purple-500/20 shadow-2xl
        transform transition-transform duration-300 ease-out z-40 lg:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col gap-4 p-8 mt-20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-purple-500/20 text-purple-400 font-semibold'
                  : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Mobile CTA */}
          <button
            onClick={() => {
              onGetInTouchClick();
              setIsMobileMenuOpen(false);
            }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
