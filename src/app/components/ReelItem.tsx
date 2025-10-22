'use client';

import { ReelItemProps } from '@/types/reel';
import VideoPlayer from './VideoPlayer';
import styles from './ReelItem.module.css';

export default function ReelItem({ reel, isActive, onVideoEnd, index }: ReelItemProps) {
  return (
    <div 
      className={`${styles.reelItem} ${isActive ? styles.active : ''}`}
      data-index={index}
    >
      <VideoPlayer 
        reel={reel} 
        isActive={isActive} 
        onVideoEnd={onVideoEnd}
      />
    </div>
  );
}