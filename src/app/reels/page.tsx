'use client';

import { useEffect, useState } from 'react';
import ReelsContainer from '../components/ReelsContainer';
import { ReelData } from '@/types/reel';
import styles from './page.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';

// Sample data - replace with your API call
const sampleReels: ReelData[] = [
  {
    id: '1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://via.placeholder.com/400x600/000000/FFFFFF?text=Video+1',
    title: 'Amazing Nature Video',
    description: 'Check out this incredible nature footage! 🌿 #nature #wildlife',
    author: {
      name: 'Nature Lover',
      username: 'naturelover',
      avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=NL'
    },
    likes: 1234,
    comments: 89,
    shares: 45,
    isLiked: false
  },
  {
    id: '2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://via.placeholder.com/400x600/333333/FFFFFF?text=Video+2',
    title: 'Creative Animation',
    description: 'Mind-blowing 3D animation that will leave you speechless! ✨ #animation #art',
    author: {
      name: 'Creative Studio',
      username: 'creativestudio',
      avatar: 'https://via.placeholder.com/40x40/FF9800/FFFFFF?text=CS'
    },
    likes: 2567,
    comments: 156,
    shares: 78,
    isLiked: true
  },
  {
    id: '3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://via.placeholder.com/400x600/666666/FFFFFF?text=Video+3',
    title: 'Epic Adventure',
    description: 'Join us on this epic adventure through mountains and valleys! 🏔️ #adventure #travel',
    author: {
      name: 'Adventure Seeker',
      username: 'adventureseeker',
      avatar: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=AS'
    },
    likes: 3421,
    comments: 234,
    shares: 123,
    isLiked: false
  },
  {
    id: '4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://via.placeholder.com/400x600/999999/FFFFFF?text=Video+4',
    title: 'Peaceful Escape',
    description: 'Sometimes you just need to escape and find peace 🧘‍♀️ #peaceful #meditation',
    author: {
      name: 'Zen Master',
      username: 'zenmaster',
      avatar: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=ZM'
    },
    likes: 987,
    comments: 67,
    shares: 34,
    isLiked: true
  },
  {
    id: '5',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://via.placeholder.com/400x600/CCCCCC/FFFFFF?text=Video+5',
    title: 'Fun Times',
    description: 'Life is better when you are having fun! 🎉 #fun #party #goodvibes',
    author: {
      name: 'Party Planner',
      username: 'partyplanner',
      avatar: 'https://via.placeholder.com/40x40/E91E63/FFFFFF?text=PP'
    },
    likes: 5678,
    comments: 345,
    shares: 189,
    isLiked: false
  }
];

export default function ReelsPage() {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call - replace with your actual API
    const loadReels = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch from your API:
        // const response = await fetch('/api/reels');
        // const data = await response.json();
        
        setReels(sampleReels);
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
    <ProtectedRoute>
      <div className={styles.reelsPage}>
        <ReelsContainer reels={reels} />
      </div>
    </ProtectedRoute>
  );
}