// Planet Modal Component for Orbital System
import React from 'react';
import { X } from 'lucide-react';

const PlanetModal = ({ isOpen, onClose, planet }) => {
  if (!isOpen || !planet) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: 'rgba(11, 11, 26, 0.8)',
        backdropFilter: 'blur(8px)',
        animation: isOpen ? 'fadeIn 0.3s ease-out' : 'none'
      }}
    >
      <div
        className="orbital-panel max-w-2xl w-full p-8 relative"
        style={{
          animation: isOpen ? 'modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-400 hover:text-white" />
        </button>

        <div className="mt-2">
          <div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: `${planet.color}20` }}
          >
            <span className="text-sm font-semibold" style={{ color: planet.color }}>
              {planet.type === 'skill' ? 'SKILL' : planet.type === 'service' ? 'SERVICE' : 'PROJECT'}
            </span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {planet.name}
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {planet.description}
          </p>

          {planet.details && (
            <div className="space-y-4">
              {planet.details.map((detail, index) => (
                <div key={index} className="orbital-panel p-4 bg-purple-500/5">
                  <div className="text-sm text-purple-400 mb-1">{detail.label}</div>
                  <div className="text-white">{detail.value}</div>
                </div>
              ))}
            </div>
          )}

          {planet.link && (
            <a
              href={planet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              View Project →
            </a>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PlanetModal;
