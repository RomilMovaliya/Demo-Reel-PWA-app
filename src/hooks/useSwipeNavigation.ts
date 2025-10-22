import { useState, useCallback, useRef } from 'react';

interface UseSwipeNavigationProps {
  totalVideos: number;
  onVideoChange?: (index: number) => void;
}

export const useSwipeNavigation = ({ totalVideos, onVideoChange }: UseSwipeNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const goToNext = useCallback(() => {
    if (isTransitioning || currentIndex >= totalVideos - 1) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    onVideoChange?.(newIndex);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, totalVideos, isTransitioning, onVideoChange]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || currentIndex <= 0) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    onVideoChange?.(newIndex);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, onVideoChange]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    
    const deltaY = startY.current - currentY.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        // Swipe up - next video
        goToNext();
      } else {
        // Swipe down - previous video
        goToPrevious();
      }
    }
    
    isDragging.current = false;
  }, [goToNext, goToPrevious]);

  return {
    currentIndex,
    isTransitioning,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};