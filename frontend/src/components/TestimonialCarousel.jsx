import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000); // 4 seconds per slide
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isHovered, nextSlide]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-all duration-700 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0 px-4"
              style={{
                opacity: index === currentIndex ? 1 : 0.3,
                transition: 'opacity 0.7s ease-in-out',
              }}
            >
              <div
                className="orbital-panel p-8 md:p-10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500"
                style={{
                  background: 'rgba(15, 15, 30, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: `2px solid ${testimonial.color}40`,
                  boxShadow: `0 8px 32px 0 ${testimonial.color}20`,
                }}
              >
                {/* Gradient Border Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}20, transparent)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Quote Icon */}
                <div className="relative z-10">
                  <Quote
                    size={56}
                    className="text-purple-400 opacity-20 mb-6"
                    style={{ color: testimonial.color }}
                  />

                  {/* Testimonial Text */}
                  <p className="text-gray-200 text-xl md:text-2xl leading-relaxed mb-8 italic font-light">
                    "{testimonial.text}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 border-t border-purple-500/20 pt-6">
                    {/* Client Logo/Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-purple-500/30">
                      <img
                        src={testimonial.image}
                        alt={testimonial.company}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Client Details */}
                    <div>
                      <p
                        className="text-white text-xl font-bold mb-1"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {testimonial.author}
                      </p>
                      <p
                        className="text-base font-medium"
                        style={{ color: testimonial.color }}
                      >
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 focus:outline-none"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 focus:outline-none"
        aria-label="Next testimonial"
      >
        <ChevronRight size={28} />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none ${
              index === currentIndex
                ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-purple-400'
                : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar (optional) */}
      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
