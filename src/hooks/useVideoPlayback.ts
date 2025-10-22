import { useEffect, useRef } from 'react'

// Custom hook for video playback management
export const useVideoPlayback = (currentVideoIndex: number, playerRefs: React.MutableRefObject<Array<{ getInternalPlayer: () => HTMLVideoElement | null }>>) => {
  const isPlayingRef = useRef(true)
  const isPausedByUserRef = useRef(false)
  const isLongPressRef = useRef(false)

  useEffect(() => {
    const handleVisibilityChange = () => {
      const currentPlayer = playerRefs.current[currentVideoIndex]
      if (!currentPlayer) return

      if (document.hidden) {
        // Going to background - pause video
        isPausedByUserRef.current = false
        currentPlayer.getInternalPlayer()?.pause()
      } else {
        // Coming back to foreground - resume if it was playing
        if (isPlayingRef.current && !isPausedByUserRef.current) {
          setTimeout(() => {
            currentPlayer.getInternalPlayer()?.play()
          }, 100)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currentVideoIndex, playerRefs])

  return { isPlayingRef, isPausedByUserRef, isLongPressRef }
}
