// Loading Screen Component
import React from 'react';

const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: '#0B0B1A',
        transition: 'opacity 0.5s ease-out'
      }}
    >
      <div className="text-center">
        {/* Orbital loading animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div
            className="absolute inset-0 rounded-full border-4 border-purple-500/20"
            style={{
              animation: 'spin 2s linear infinite'
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500"
            style={{
              animation: 'spin 1s linear infinite'
            }}
          />
          <div
            className="absolute inset-4 bg-purple-500 rounded-full"
            style={{
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 20px rgba(108, 77, 246, 0.6)'
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Loading Universe
        </h2>
        <p className="text-gray-400">Initializing orbital system...</p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
