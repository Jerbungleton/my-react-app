import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'

export default function Player({ tracks = [] }) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100
      setProgress(value || 0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleNext)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('ended', handleNext)
    }
  }, [])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(true)
  }

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(true)
  }

  const handleProgressChange = (e) => {
    const value = e.target.value
    if (audioRef.current) {
      const time = (value / 100) * audioRef.current.duration
      audioRef.current.currentTime = time
      setProgress(value)
    }
  }

  if (!tracks.length) {
    return <div className="player-empty">No tracks available</div>
  }

  const currentTrackData = tracks[currentTrack]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-dark p-4">
      <audio
        ref={audioRef}
        src={currentTrackData.audioSrc}
        preload="metadata"
      />
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex-1 min-w-0">
          <div className="text-sm text-white truncate">{currentTrackData.title}</div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-2 text-white hover:text-music-primary"
          >
            <FaStepBackward />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="p-2 text-white hover:text-music-primary"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 text-white hover:text-music-primary"
          >
            <FaStepForward />
          </button>
        </div>

        <div className="flex-1">
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>
    </div>
  )
}