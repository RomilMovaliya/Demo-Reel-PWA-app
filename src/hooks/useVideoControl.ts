import { useEffect, useRef, useState, useCallback } from 'react';

interface UseVideoControlProps {
    isActive: boolean;
    onVideoEnd?: () => void;
}

export const useVideoControl = ({ isActive, onVideoEnd }: UseVideoControlProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // Start unmuted by default
    const [isLongPressing, setIsLongPressing] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const wasPlayingBeforeLongPress = useRef(false);

    // Handle visibility change (background/foreground)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!videoRef.current) return;

            if (document.hidden) {
                // App went to background - pause video
                if (!videoRef.current.paused) {
                    videoRef.current.pause();
                    setIsPaused(true);
                }
            } else {
                // App came to foreground - resume if it was playing
                if (isPaused && isActive) {
                    videoRef.current.play();
                    setIsPaused(false);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isPaused, isActive]);

    // Auto play/pause based on active state
    useEffect(() => {
        if (!videoRef.current) return;

        if (isActive && !document.hidden) {
            // Reset video to start when becoming active
            videoRef.current.currentTime = 0;
            setCurrentTime(0);
            setIsPlaying(false);
            setIsPaused(false);
            
            // Try to play with sound first
            videoRef.current.play().then(() => {
                setIsPlaying(true);
                setIsPaused(false);
                console.log('Video playing with sound');
            }).catch((error) => {
                console.log('Autoplay with sound failed, trying muted:', error);
                // If autoplay fails with sound, try muted autoplay
                if (!videoRef.current!.muted) {
                    videoRef.current!.muted = true;
                    setIsMuted(true);
                    videoRef.current!.play().then(() => {
                        setIsPlaying(true);
                        setIsPaused(false);
                        console.log('Video playing muted due to browser restrictions');
                    }).catch((mutedError) => {
                        console.error('Even muted autoplay failed:', mutedError);
                        setIsPlaying(false);
                    });
                }
            });
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
            setIsPaused(true);
            // Reset video to start when becoming inactive
            videoRef.current.currentTime = 0;
            setCurrentTime(0);
            // Clear any long press state when video becomes inactive
            setIsLongPressing(false);
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
        }
    }, [isActive]);

    // Cleanup effect to reset state when component unmounts or video changes
    useEffect(() => {
        return () => {
            // Cleanup when component unmounts
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
            setIsLongPressing(false);
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentTime(0);
        };
    }, []);

    // Reset video state when video source changes
    useEffect(() => {
        if (videoRef.current) {
            setCurrentTime(0);
            setDuration(0);
            setIsPlaying(false);
            setIsPaused(false);
            setIsLongPressing(false);
        }
    }, [videoRef.current?.src]);

    // Prevent context menu
    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    // Long press handlers
    const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        if (!videoRef.current) return;
        
        // Prevent context menu on long press
        e.preventDefault();

        longPressTimer.current = setTimeout(() => {
            wasPlayingBeforeLongPress.current = !videoRef.current!.paused;
            if (wasPlayingBeforeLongPress.current) {
                videoRef.current!.pause();
                setIsPlaying(false);
                setIsLongPressing(true);
            }
        }, 200); // 200ms for long press detection
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }

        if (!videoRef.current) return;

        if (isLongPressing && wasPlayingBeforeLongPress.current) {
            videoRef.current.play();
            setIsPlaying(true);
            setIsLongPressing(false);
            wasPlayingBeforeLongPress.current = false;
        }
    }, [isLongPressing]);

    // Video event handlers
    const handleLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    }, []);

    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    }, []);

    const handleVideoEnd = useCallback(() => {
        setIsPlaying(false);
        onVideoEnd?.();
    }, [onVideoEnd]);

    // Handle video click - prevent default behavior since we only want long press control
    const handleVideoClick = useCallback((e: React.MouseEvent) => {
        // Prevent any click actions - only long press should control playback
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;

        const newMutedState = !isMuted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
        
        // If unmuting, try to play the video
        if (!newMutedState && isActive) {
            videoRef.current.play().catch((error) => {
                console.log('Play failed after unmuting:', error);
                // If play fails, mute again
                videoRef.current!.muted = true;
                setIsMuted(true);
            });
        }
    }, [isMuted, isActive]);

    return {
        videoRef,
        isPlaying,
        isMuted,
        isLongPressing,
        currentTime,
        duration,
        handleTouchStart,
        handleTouchEnd,
        handleContextMenu,
        handleLoadedMetadata,
        handleTimeUpdate,
        handleVideoEnd,
        handleVideoClick,
        toggleMute,
    };
};