import React from 'react';
import SceneManager from '../components/3d/SceneManager';
import Navigation from '../components/overlay/Navigation';
import ContentOverlay from '../components/overlay/ContentOverlay';

const Home3D = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0B0B1A]">
      {/* 3D Scene - Base Layer */}
      <SceneManager />
      
      {/* Navigation - Top Layer */}
      <Navigation />
      
      {/* Content Overlays - Middle Layer */}
      <ContentOverlay />
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="text-purple-400 text-sm font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-purple-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home3D;
