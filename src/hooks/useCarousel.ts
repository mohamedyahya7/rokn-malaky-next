// Custom carousel hook - no external dependencies, just React
import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseCarouselOptions {
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function useCarousel(itemCount: number, options: UseCarouselOptions = {}) {
  const { loop = true, autoplay = false, autoplayInterval = 3000 } = options;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    
    if (index < 0) {
      setActiveIndex(loop ? itemCount - 1 : 0);
    } else if (index >= itemCount) {
      setActiveIndex(loop ? 0 : itemCount - 1);
    } else {
      setActiveIndex(index);
    }
    
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [itemCount, loop, isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const canGoNext = loop || activeIndex < itemCount - 1;
  const canGoPrevious = loop || activeIndex > 0;

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && itemCount > 1) {
      autoplayTimerRef.current = setInterval(() => {
        goToNext();
      }, autoplayInterval);

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }
  }, [autoplay, autoplayInterval, goToNext, itemCount]);

  // Stop autoplay on user interaction
  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  return {
    activeIndex,
    goToSlide,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
    isTransitioning,
    stopAutoplay,
  };
}
