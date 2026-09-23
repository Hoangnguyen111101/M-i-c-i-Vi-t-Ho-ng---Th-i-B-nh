import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MusicPlayerProps {
  title?: string;
  musicUrl?: string;
  startTime?: number; // In seconds (e.g. 153 for 2:33)
  autoPlayTrigger?: boolean;
}

// Helper to extract YouTube video ID from various formats
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = 'Young and Beautiful (Violin Wedding Romance)',
  musicUrl = 'https://www.youtube.com/watch?v=PZVRF8bBZms',
  startTime = 153,
  autoPlayTrigger = false,
}) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const ytPlayerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const ytVideoId = getYouTubeId(musicUrl);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  // Smooth Fade-In function over ~2.5 seconds
  const fadeInSound = () => {
    clearFade();

    if (ytVideoId && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(0);
        let vol = 0;
        const targetVol = 85;
        const step = 3;
        const intervalMs = 90; // (85/3)*90ms ≈ 2.5s

        fadeIntervalRef.current = window.setInterval(() => {
          vol += step;
          if (vol >= targetVol) {
            vol = targetVol;
            clearFade();
          }
          try {
            ytPlayerRef.current?.setVolume(vol);
          } catch {
            clearFade();
          }
        }, intervalMs);
      } catch {
        // ignore
      }
    } else if (audioRef.current) {
      audioRef.current.volume = 0;
      let vol = 0;
      const targetVol = 0.85;
      const step = 0.03;
      const intervalMs = 90;

      fadeIntervalRef.current = window.setInterval(() => {
        vol += step;
        if (vol >= targetVol) {
          vol = targetVol;
          clearFade();
        }
        if (audioRef.current) {
          audioRef.current.volume = Math.min(1, vol);
        }
      }, intervalMs);
    }
  };

  // Smooth Fade-Out function when user pauses
  const fadeOutSoundAndPause = () => {
    clearFade();

    if (ytVideoId && ytPlayerRef.current) {
      try {
        let vol = ytPlayerRef.current.getVolume?.() ?? 80;
        const step = 6;
        fadeIntervalRef.current = window.setInterval(() => {
          vol -= step;
          if (vol <= 0) {
            clearFade();
            try {
              ytPlayerRef.current?.pauseVideo();
              ytPlayerRef.current?.setVolume(85);
            } catch {
              // ignore
            }
          } else {
            try {
              ytPlayerRef.current?.setVolume(vol);
            } catch {
              clearFade();
            }
          }
        }, 50);
      } catch {
        ytPlayerRef.current?.pauseVideo();
      }
      setIsPlaying(false);
    } else if (audioRef.current) {
      let vol = audioRef.current.volume;
      fadeIntervalRef.current = window.setInterval(() => {
        vol -= 0.06;
        if (vol <= 0) {
          clearFade();
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 0.85;
          }
        } else if (audioRef.current) {
          audioRef.current.volume = Math.max(0, vol);
        }
      }, 50);
      setIsPlaying(false);
    }
  };

  // Initialize YouTube IFrame API if video ID exists
  useEffect(() => {
    if (!ytVideoId) return;

    let isSubscribed = true;

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }

      const playerDiv = document.createElement('div');
      playerDiv.id = 'yt-hidden-wedding-player';
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(playerDiv);
      }

      ytPlayerRef.current = new window.YT.Player('yt-hidden-wedding-player', {
        height: '0',
        width: '0',
        videoId: ytVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          start: startTime,
          loop: 1,
          playlist: ytVideoId,
        },
        events: {
          onReady: (event: any) => {
            if (!isSubscribed) return;
            setIsReady(true);
            try {
              // Ensure iframe attributes also have playsinline for mobile Safari/Chrome
              const iframe = event.target.getIframe?.();
              if (iframe) {
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('webkit-playsinline', '1');
                iframe.style.width = '0px';
                iframe.style.height = '0px';
                iframe.style.opacity = '0';
                iframe.style.pointerEvents = 'none';
                iframe.style.position = 'absolute';
              }
              event.target.seekTo(startTime, true);
              event.target.setVolume(0);
            } catch {
              // ignore
            }
          },
          onStateChange: (event: any) => {
            if (!isSubscribed) return;
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
              if (event.data === 0) {
                // Loop with start time and fade in
                try {
                  event.target.seekTo(startTime, true);
                  event.target.playVideo();
                  fadeInSound();
                } catch {
                  // ignore
                }
              }
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevOnReady) prevOnReady();
        createPlayer();
      };
    } else if (window.YT.Player) {
      createPlayer();
    }

    return () => {
      isSubscribed = false;
      clearFade();
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [ytVideoId, startTime]);

  // Handle play action with Fade-In
  const playAudio = () => {
    if (ytVideoId && ytPlayerRef.current && isReady) {
      try {
        const currentTime = ytPlayerRef.current.getCurrentTime?.() ?? 0;
        if (currentTime < startTime - 1) {
          ytPlayerRef.current.seekTo(startTime, true);
        }
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        fadeInSound();
      } catch (e) {
        console.warn('YouTube play failed:', e);
      }
    } else if (audioRef.current) {
      if (audioRef.current.currentTime < startTime - 1) {
        audioRef.current.currentTime = startTime;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeInSound();
      }).catch(() => {
        // autoplay blocked
      });
    }
  };

  // Trigger play when user opens the door
  useEffect(() => {
    if (autoPlayTrigger) {
      setHasInteracted(true);
      playAudio();
    }
  }, [autoPlayTrigger, isReady]);

  // First interaction auto-play attempt (browser policy allows playback on first click)
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        playAudio();
      }
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, [hasInteracted, isReady]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      fadeOutSoundAndPause();
    } else {
      setHasInteracted(true);
      playAudio();
    }
  };

  return (
    <div id="wedding-music-player" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Hidden YouTube player container strictly hidden on mobile and desktop */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
          position: 'absolute',
          overflow: 'hidden',
          top: -9999,
          left: -9999,
        }}
      />

      {/* Fallback HTML5 audio element if direct audio url */}
      {!ytVideoId && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="metadata"
          onLoadedMetadata={() => {
            if (audioRef.current && startTime > 0) {
              audioRef.current.currentTime = startTime;
            }
          }}
        />
      )}

      {/* Music info pill on hover/active */}
      <div
        className={`bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#E8D8CC] text-xs text-[#5A453A] flex items-center gap-2 transition-all duration-300 ${
          isPlaying ? 'opacity-90 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden pointer-events-none'
        }`}
      >
        <Music className="w-3.5 h-3.5 text-[#B87A65] animate-pulse" />
        <span className="truncate max-w-[150px] font-medium">{title}</span>
      </div>

      {/* Floating Vinyl Button */}
      <button
        type="button"
        onClick={togglePlay}
        title={isPlaying ? t.music.playingTooltip : t.music.pausedTooltip}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 transition-transform transform active:scale-95 ${
          isPlaying
            ? 'bg-[#43302B] border-[#D4AF37] text-[#FAF7F2] animate-spin-slow'
            : 'bg-white border-[#E8D8CC] text-[#7A6154] hover:border-[#B87A65]'
        }`}
        style={{ animationDuration: '8s' }}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Center vinyl pin */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#43302B]"></div>
            </div>
            {/* Floating musical note indicator */}
            <span className="absolute -top-3 -right-2 text-xs animate-bounce">🎵</span>
          </div>
        ) : (
          <Play className="w-5 h-5 ml-0.5 text-[#B87A65]" />
        )}
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 7s linear infinite;
        }
      `}</style>
    </div>
  );
};
