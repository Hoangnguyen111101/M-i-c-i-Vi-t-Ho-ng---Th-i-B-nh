import React, { useState, useEffect, useRef } from 'react';
import { Music, Play } from 'lucide-react';
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
  const shouldPlayRef = useRef(false);

  const ytVideoId = getYouTubeId(musicUrl);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  // Smooth Fade-In function
  const fadeInSound = () => {
    clearFade();

    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.unMute();
        let vol = 30; // Start at audible volume so iOS doesn't stay silent
        ytPlayerRef.current.setVolume(vol);
        const targetVol = 85;
        const step = 5;
        const intervalMs = 90;

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
      try {
        audioRef.current.volume = 0.5;
        let vol = 0.5;
        const targetVol = 0.85;
        fadeIntervalRef.current = window.setInterval(() => {
          vol += 0.05;
          if (vol >= targetVol) {
            vol = targetVol;
            clearFade();
          }
          if (audioRef.current) {
            audioRef.current.volume = Math.min(1, vol);
          }
        }, 90);
      } catch {
        // Volume setting is read-only on iOS Safari
      }
    }
  };

  // Smooth Fade-Out function when user pauses
  const fadeOutSoundAndPause = () => {
    clearFade();

    if (ytPlayerRef.current) {
      try {
        let vol = ytPlayerRef.current.getVolume?.() ?? 80;
        const step = 10;
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
      try {
        audioRef.current.pause();
      } catch {
        // ignore
      }
      setIsPlaying(false);
    }
  };

  // Handle play action
  const playAudio = () => {
    shouldPlayRef.current = true;

    if (ytVideoId) {
      if (ytPlayerRef.current && isReady) {
        try {
          ytPlayerRef.current.unMute();
          const currentTime = ytPlayerRef.current.getCurrentTime?.() ?? 0;
          if (currentTime < startTime - 1) {
            ytPlayerRef.current.seekTo(startTime, true);
          }
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
          fadeInSound();
        } catch (e) {
          console.warn('YouTube play attempt failed:', e);
        }
      }
    } else if (audioRef.current) {
      try {
        if (audioRef.current.currentTime < startTime - 1) {
          audioRef.current.currentTime = startTime;
        }
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          fadeInSound();
        }).catch(() => {
          // autoplay policy
        });
      } catch {
        // ignore
      }
    }
  };

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!ytVideoId) {
      setIsReady(true);
      return;
    }

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

      // CRITICAL FOR IOS SAFARI (iPhone / iPad):
      // On iOS Safari, if a video iframe has 0 width/height or top: -9999px or display:none,
      // iOS WebKit detects it as hidden media and AUTOMATICALLY opens the fullscreen AVPlayer!
      // To prevent iPhone from popping up the video, the player MUST be rendered with 1px dimension
      // inside the viewport with opacity 0.001 and playsinline="1" attribute.
      ytPlayerRef.current = new window.YT.Player('yt-hidden-wedding-player', {
        height: '1',
        width: '1',
        videoId: ytVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
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
              // Ensure iframe attributes enforce inline playback on iOS Safari
              const iframe = event.target.getIframe?.();
              if (iframe) {
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('webkit-playsinline', '1');
                iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
                iframe.style.width = '1px';
                iframe.style.height = '1px';
                iframe.style.opacity = '0.001';
                iframe.style.position = 'fixed';
                iframe.style.bottom = '0';
                iframe.style.right = '0';
                iframe.style.pointerEvents = 'none';
                iframe.style.zIndex = '-9999';
              }
              event.target.unMute();
              event.target.seekTo(startTime, true);
              event.target.setVolume(80);

              // If user already clicked "Mở thiệp" while player was loading
              if (shouldPlayRef.current) {
                event.target.playVideo();
                setIsPlaying(true);
                fadeInSound();
              }
            } catch {
              // ignore
            }
          },
          onStateChange: (event: any) => {
            if (!isSubscribed) return;
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Loop with start time
              try {
                event.target.seekTo(startTime, true);
                event.target.playVideo();
              } catch {
                // ignore
              }
            }
          },
          onError: () => {
            console.warn('YouTube Player error occurred');
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

  // Trigger play when user opens the door
  useEffect(() => {
    if (autoPlayTrigger) {
      setHasInteracted(true);
      playAudio();
    }
  }, [autoPlayTrigger, isReady]);

  // Synchronous play trigger from door opening gesture
  useEffect(() => {
    const handleDoorOpened = () => {
      setHasInteracted(true);
      playAudio();
    };
    window.addEventListener('wedding:play-music', handleDoorOpened);
    return () => window.removeEventListener('wedding:play-music', handleDoorOpened);
  }, [isReady]);

  // First interaction auto-play fallback
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
      {/* 
        YouTube player container:
        Kept in viewport with 1px size and 0.001 opacity so iOS Safari recognizes it
        as an inline element and NEVER pops open the fullscreen video player!
      */}
      {ytVideoId && (
        <div
          ref={containerRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '1px',
            height: '1px',
            opacity: 0.001,
            pointerEvents: 'none',
            zIndex: -9999,
            overflow: 'hidden',
          }}
        />
      )}

      {/* Fallback HTML5 audio element if direct MP3/audio url */}
      {!ytVideoId && musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="auto"
          // @ts-ignore
          playsInline
          webkit-playsinline="true"
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
