import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSlideshowProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageSlideshow({ images, alt, className = "h-80 w-full" }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const hasMultiple = images.length > 1;

  const startAutoplay = () => {
    if (!hasMultiple) return;
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 3500);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIndex, images]);

  const handlePrev = () => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0]?.clientX || null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchEndX.current = e.touches[0]?.clientX || null;
  };

  const handleTouchEnd = () => {
    if (!hasMultiple || !touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // swipe threshold in px
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={`relative group overflow-hidden select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Images container */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => {
          const isLogo = img.includes("logo.jpeg");
          return (
            <img
              key={idx}
              src={img}
              alt={hasMultiple ? `${alt} slide ${idx + 1}` : alt}
              className="h-full w-full shrink-0 animate-fade-in object-cover"
              loading="lazy"
            />
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-carbon/60 hover:bg-volt hover:text-carbon border border-border/20 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs cursor-pointer focus:opacity-100 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-carbon/60 hover:bg-volt hover:text-carbon border border-border/20 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs cursor-pointer focus:opacity-100 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Indicator dots */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx ? "w-4 bg-volt" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
