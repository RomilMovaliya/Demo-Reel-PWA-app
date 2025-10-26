'use client';

import { useEffect, useState } from 'react';
import ReelsContainer from '../components/ReelsContainer';
import { ReelData } from '@/types/reel';
import styles from './page.module.css';

export default function ReelsPage() {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReels = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from your Next.js API route
        const response = await fetch('/api/reels');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response:', data);
        
        // The API route now returns the array directly
        if (Array.isArray(data)) {
          setReels(data);
        } else {
          console.error('Invalid data format:', data);
          setError('Invalid data format received from server');
        }
      } catch (err) {
        setError('Failed to load reels');
        console.error('Error loading reels:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReels();
  }, []);

  // Prevent body scroll when on reels page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading reels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>No reels available</h2>
        <p>Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className={styles.reelsPage}>
      <ReelsContainer reels={reels} />
    </div>
  );
}