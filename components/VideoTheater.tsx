import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { ScanlineOverlay } from './effects';

// ============================================
// VIDEO THEATER COMPONENT - "The Command Center"
// ============================================

type VideoState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended';

interface VideoTheaterProps {
  videoUrl: string;
  posterUrl?: string;
  title?: string;
}

const VideoTheater: React.FC<VideoTheaterProps> = ({
  videoUrl,
  posterUrl,
  title = 'VIDEO INSTITUCIONAL'
}) => {
  const [state, setState] = useState<VideoState>('idle');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shutterLeftRef = useRef<HTMLDivElement>(null);
  const shutterRightRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  // Format time helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Breach sequence animation (GSAP)
  const playBreachSequence = useCallback(() => {
    if (!videoRef.current) return;

    setState('loading');
    setLoadProgress(0);

    // Simulate loading progress
    const loadInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Main breach animation
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(loadInterval);
        setLoadProgress(100);
        videoRef.current?.play();
        setState('playing');
      }
    });

    tl.addLabel('breach')
      // Play button fade out
      .to(playButtonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 'breach')
      // Shutters open
      .to(shutterLeftRef.current, {
        xPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut'
      }, 'breach+=0.2')
      .to(shutterRightRef.current, {
        xPercent: 100,
        duration: 0.7,
        ease: 'power3.inOut'
      }, 'breach+=0.2')
      // Frame glow
      .to(frameRef.current, {
        boxShadow: '0 0 60px rgba(245, 158, 11, 0.4), inset 0 0 30px rgba(245, 158, 11, 0.1)',
        duration: 0.5,
        ease: 'power2.out'
      }, 'breach+=0.4')
      // HUD fade
      .to(hudRef.current, {
        opacity: 0.2,
        duration: 0.4
      }, 'breach+=0.5');

  }, []);

  // Pause animation
  const pauseSequence = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setState('paused');

    gsap.timeline()
      .to(shutterLeftRef.current, {
        xPercent: -80,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .to(shutterRightRef.current, {
        xPercent: 80,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '<')
      .to(hudRef.current, {
        opacity: 0.5,
        duration: 0.3
      }, '<');
  }, []);

  // Resume animation
  const resumeSequence = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.play();
    setState('playing');

    gsap.timeline()
      .to(shutterLeftRef.current, {
        xPercent: -100,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .to(shutterRightRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '<')
      .to(hudRef.current, {
        opacity: 0.2,
        duration: 0.3
      }, '<');
  }, []);

  // Reset sequence (for replay)
  const resetSequence = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    setState('idle');

    gsap.timeline()
      .to(shutterLeftRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      })
      .to(shutterRightRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, '<')
      .to(playButtonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out'
      }, '-=0.2')
      .to(frameRef.current, {
        boxShadow: '0 0 0px rgba(245, 158, 11, 0)',
        duration: 0.3
      }, '<')
      .to(hudRef.current, {
        opacity: 1,
        duration: 0.3
      }, '<');
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (state === 'idle') {
      playBreachSequence();
    } else if (state === 'playing') {
      pauseSequence();
    } else if (state === 'paused') {
      resumeSequence();
    } else if (state === 'ended') {
      resetSequence();
      setTimeout(() => playBreachSequence(), 600);
    }
  }, [state, playBreachSequence, pauseSequence, resumeSequence, resetSequence]);

  // Handle video time update with throttling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastUpdate = 0;
    const throttleMs = 250; // Update every 250ms instead of every frame

    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;

      const current = video.currentTime;
      const total = video.duration || 0;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(video.duration));
    };

    const handleEnded = () => {
      setState('ended');
      gsap.to(hudRef.current, { opacity: 0.8, duration: 0.5 });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Seek handler
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  // Volume handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Hover animation handled via CSS transitions for better performance

  return (
    <div
      ref={containerRef}
      className="video-theater relative w-full max-w-5xl mx-auto"
    >
      {/* Main Video Frame */}
      <div
        ref={frameRef}
        className="relative aspect-video bg-black border-2 border-neutral-800 overflow-hidden transition-all duration-300"
      >
        {/* Scanline Overlay */}
        <ScanlineOverlay opacity={0.02} />

        {/* Shutters */}
        <div
          ref={shutterLeftRef}
          className="shutter-left absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 z-30 flex items-center justify-end pr-4"
        >
          {/* Minimal shutter texture - reduced for performance */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute h-px bg-brand-500/30" style={{ top: '20%', left: 0, right: 0 }} />
            <div className="absolute h-px bg-brand-500/30" style={{ top: '50%', left: 0, right: 0 }} />
            <div className="absolute h-px bg-brand-500/30" style={{ top: '80%', left: 0, right: 0 }} />
          </div>
          <div className="w-1 h-32 bg-gradient-to-b from-transparent via-brand-500/50 to-transparent" />
        </div>

        <div
          ref={shutterRightRef}
          className="shutter-right absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-neutral-900 via-neutral-800 to-neutral-900 z-30 flex items-center justify-start pl-4"
        >
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute h-px bg-brand-500/30" style={{ top: '20%', left: 0, right: 0 }} />
            <div className="absolute h-px bg-brand-500/30" style={{ top: '50%', left: 0, right: 0 }} />
            <div className="absolute h-px bg-brand-500/30" style={{ top: '80%', left: 0, right: 0 }} />
          </div>
          <div className="w-1 h-32 bg-gradient-to-b from-transparent via-brand-500/50 to-transparent" />
        </div>

        {/* HUD Overlay */}
        <div ref={hudRef} className="absolute inset-0 z-20 pointer-events-none">
          {/* Corner Brackets */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-brand-500" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-brand-500" />
          <div className="absolute bottom-20 left-4 w-12 h-12 border-l-2 border-b-2 border-brand-500" />
          <div className="absolute bottom-20 right-4 w-12 h-12 border-r-2 border-b-2 border-brand-500" />

          {/* Status Indicator */}
          <div className="absolute top-4 left-20 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              state === 'playing' ? 'bg-green-500 animate-pulse' :
              state === 'paused' ? 'bg-yellow-500' :
              state === 'ended' ? 'bg-red-500' :
              'bg-brand-500'
            }`} />
            <span className="font-mono text-xs text-brand-500 tracking-wider">
              STATUS: {state.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <div className="absolute top-4 right-20 font-mono text-xs text-brand-500/70 tracking-wider">
            {title}
          </div>

          {/* Center Reticle (idle state) */}
          {(state === 'idle' || state === 'ended') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 opacity-20 animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.5"
                />
                <line x1="50" y1="5" x2="50" y2="20" stroke="#f59e0b" strokeWidth="0.5" />
                <line x1="50" y1="80" x2="50" y2="95" stroke="#f59e0b" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="20" y2="50" stroke="#f59e0b" strokeWidth="0.5" />
                <line x1="80" y1="50" x2="95" y2="50" stroke="#f59e0b" strokeWidth="0.5" />
              </svg>
            </div>
          )}

          {/* Data Readouts */}
          <div className="absolute bottom-24 left-20 font-mono text-xs text-brand-500/50 space-y-1">
            <div>RES: 1920x1080</div>
            <div>FPS: 30</div>
          </div>

          <div className="absolute bottom-24 right-20 font-mono text-xs text-brand-500/50 text-right space-y-1">
            <div>CODEC: H.264</div>
            <div>BITRATE: AUTO</div>
          </div>
        </div>

        {/* Video Element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          poster={posterUrl}
          playsInline
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Play Button (idle state) */}
        <button
          ref={playButtonRef}
          onClick={togglePlay}
          className={`group absolute inset-0 z-40 flex items-center justify-center cursor-pointer ${
            state !== 'idle' && state !== 'ended' ? 'pointer-events-none' : ''
          }`}
        >
          <div className="relative">
            {/* Outer ring - CSS transitions for hover */}
            <div className="play-ring absolute -inset-8 border-2 border-brand-500/50 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 opacity-50" />

            {/* Inner button - CSS transitions for hover */}
            <div className="play-icon relative w-24 h-24 bg-neutral-900/80 backdrop-blur border-2 border-brand-500 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-105">
              {state === 'loading' ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                  <span className="font-mono text-xs text-brand-500">
                    {Math.min(100, Math.round(loadProgress))}%
                  </span>
                </div>
              ) : state === 'ended' ? (
                <RotateCcw className="w-10 h-10 text-brand-500" />
              ) : (
                <Play className="w-10 h-10 text-brand-500 ml-1" />
              )}
            </div>

            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-brand-500" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r border-t border-brand-500" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l border-b border-brand-500" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-brand-500" />
          </div>
        </button>

        {/* Paused Overlay */}
        {state === 'paused' && (
          <div
            className="absolute inset-0 z-35 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="font-mono text-2xl text-brand-500 tracking-widest animate-pulse">
              [ PAUSED ]
            </div>
          </div>
        )}

        {/* Ended Overlay */}
        {state === 'ended' && (
          <div className="absolute inset-0 z-35 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <div className="font-mono text-sm text-brand-500/70 mb-2">TRANSMISSION COMPLETE</div>
              <div className="font-display text-xl text-white uppercase tracking-wider">Click to Replay</div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Controls */}
      <div className="relative bg-neutral-900/95 backdrop-blur border-x-2 border-b-2 border-neutral-800 p-4">
        {/* Progress Bar */}
        <div
          className="relative h-1 bg-neutral-700 cursor-pointer mb-4 group"
          onClick={handleSeek}
        >
          {/* Buffer indicator */}
          <div className="absolute inset-y-0 left-0 bg-neutral-600" style={{ width: '100%' }} />

          {/* Progress */}
          <div
            className="absolute inset-y-0 left-0 bg-brand-500 transition-all"
            style={{ width: `${progress}%` }}
          >
            {/* Glow handle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-500 rounded-full shadow-[0_0_15px_#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Hover expand effect */}
          <div className="absolute inset-0 scale-y-100 group-hover:scale-y-[2] transition-transform origin-center" />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center text-brand-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all"
            >
              {state === 'playing' ? (
                <Pause className="w-5 h-5" />
              ) : state === 'ended' ? (
                <RotateCcw className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            {/* Time Display */}
            <div className="font-mono text-sm text-neutral-400">
              <span className="text-white">{currentTime}</span>
              <span className="mx-2 text-neutral-600">/</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Volume */}
            <div className="flex items-center gap-2 group">
              <button
                onClick={toggleMute}
                className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover:w-20 transition-all duration-300 accent-brand-500 cursor-pointer"
              />
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      </div>

      {/* Global styles for slow spin */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VideoTheater;
