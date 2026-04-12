import React, { useState, useEffect } from 'react';
import { navItems } from '../../mock';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const sectionIndex = Math.floor(scrollPercent * navItems.length);
      setActiveSection(Math.min(sectionIndex, navItems.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    setIsScrolling(true);
    const targetScroll = (index / navItems.length) * (document.body.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection(0)}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          MK
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-purple-500/20">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(index)}
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === index
                  ? 'text-purple-400 scale-110'
                  : 'text-gray-400 hover:text-purple-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection(navItems.length - 1)}
          className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="flex gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/20">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? 'bg-purple-400 w-8'
                  : 'bg-gray-600 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
