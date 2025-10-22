'use client';

import { useState, useEffect, useRef } from 'react';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { ReelData } from '@/types/reel';
import ReelItem from './ReelItem';
import styles from './ReelsContainer.module.css';

interface ReelsContainerProps {
  reels: ReelData[];
}

export default function ReelsContainer({ reels }: ReelsContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const {
    currentIndex,
    isTransitioning,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipeNavigation({
    totalVideos: reels.length,
    onVideoChange: (index) => {
      setActiveVideoIndex(index);
      scrollToVideo(index);
    },
  });

  const scrollToVideo = (index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const targetScrollTop = index * window.innerHeight;
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  };

  const handleVideoEnd = () => {
    // Auto-advance to next video when current video ends
    if (currentIndex < reels.length - 1) {
      goToNext();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowDown':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          // Space bar handled by video player
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Handle scroll snap fallback
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const newIndex = Math.round(scrollTop / window.innerHeight);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < reels.length) {
          setActiveVideoIndex(newIndex);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, reels.length]);

  return (
    <div 
      ref={containerRef}
      className={styles.reelsContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {reels.map((reel, index) => (
        <ReelItem
          key={reel.id}
          reel={reel}
          index={index}
          isActive={index === activeVideoIndex}
          onVideoEnd={handleVideoEnd}
        />
      ))}
      
      {/* Navigation Indicators */}
      <div className={styles.indicators}>
        {reels.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>
      
      {/* Loading Overlay */}
      {isTransitioning && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
}