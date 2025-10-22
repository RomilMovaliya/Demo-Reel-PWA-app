'use client';

import { useVideoControl } from '@/hooks/useVideoControl';
import { VideoPlayerProps } from '@/types/reel';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ reel, isActive, onVideoEnd }: VideoPlayerProps) {
  const {
    videoRef,
    isPlaying,
    isMuted,
    isLongPressing,
    handleTouchStart,
    handleTouchEnd,
    handleContextMenu,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleVideoEnd,
    handleVideoClick,
    toggleMute,
  } = useVideoControl({ isActive, onVideoEnd });

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={reel.videoUrl}
        poster={reel.thumbnail}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onContextMenu={handleContextMenu}
        onClick={handleVideoClick}
      />
      
      {/* Video Info Overlay */}
      <div className={styles.videoInfo}>
        <div className={styles.userInfo}>
          {reel.author?.avatar && (
            <img 
              src={reel.author.avatar} 
              alt={reel.author.name}
              className={styles.avatar}
            />
          )}
          <div className={styles.userDetails}>
            <h3 className={styles.username}>@{reel.author?.username}</h3>
            {reel.title && <p className={styles.title}>{reel.title}</p>}
            {reel.description && <p className={styles.description}>{reel.description}</p>}
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{reel.likes || 0}</span>
          </button>
          
          <button className={styles.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M21 6h-2l-1.27-1.27c-.4-.4-.86-.73-1.73-.73H8c-.87 0-1.33.33-1.73.73L5 6H3c-.55 0-1 .45-1 1s.45 1 1 1h1v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h1c.55 0 1-.45 1-1s-.45-1-1-1zM8 19c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1z"/>
            </svg>
            <span>{reel.comments || 0}</span>
          </button>
          
          <button className={styles.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            <span>{reel.shares || 0}</span>
          </button>
        </div>
      </div>
      
      {/* Sound Control Button */}
      <div className={styles.soundControl}>
        <button 
          className={styles.soundButton}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            // Muted icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            // Unmuted icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Long Press Pause Indicator */}
      {isLongPressing && (
        <div className={styles.longPressOverlay}>
          <div className={styles.pauseIndicator}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}