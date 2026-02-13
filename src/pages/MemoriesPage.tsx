import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photos, videos, backgroundMusic } from "@/config/mediaConfig";

const FloatingHeart = ({ delay, left, size }: { delay: number; left: number; size: number }) => (
  <div
    className="fixed pointer-events-none z-0"
    style={{
      left: `${left}%`,
      bottom: "-20px",
      fontSize: `${size}px`,
      animation: `float-heart ${10 + Math.random() * 8}s linear ${delay}s infinite`,
      opacity: 0,
    }}
  >
    💕
  </div>
);

const MemoriesPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const slideInterval = useRef<ReturnType<typeof setInterval>>();

  const hearts = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 2,
    left: Math.random() * 90 + 5,
    size: 14 + Math.random() * 16,
  }));

  // Auto-slide
  useEffect(() => {
    if (photos.length <= 1) return;
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(slideInterval.current);
  }, []);

  const goToSlide = useCallback((direction: "prev" | "next") => {
    clearInterval(slideInterval.current);
    setCurrentSlide((prev) =>
      direction === "next"
        ? (prev + 1) % photos.length
        : (prev - 1 + photos.length) % photos.length
    );
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 4000);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      {/* Background music */}
      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-lg border border-border transition-all hover:scale-110"
        aria-label="Toggle music"
      >
        {musicPlaying ? (
          <Volume2 className="h-5 w-5 text-primary" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-2xl font-bold leading-relaxed text-foreground sm:text-3xl md:text-4xl">
            Thank you for being with me through every high and every low.
            <br />
            I couldn't have done it without you, Shun 💕.
          </h1>
        </div>

        {/* Photo Carousel */}
        {photos.length > 0 && (
          <div className="relative mb-16">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-card">
              <div className="relative aspect-[4/3] w-full">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: currentSlide === i ? 1 : 0 }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Caption */}
              <div className="p-4 text-center bg-card">
                <p className="font-body text-lg text-foreground italic">
                  {photos[currentSlide]?.caption}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => goToSlide("prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-card"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={() => goToSlide("next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-card"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}

            {/* Dots */}
            {photos.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === i
                        ? "bg-primary w-6"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <div className="space-y-8">
            <h2 className="font-display text-2xl font-bold text-center text-foreground">
              Our Special Moments 🎬
            </h2>
            <div className="grid gap-8 sm:grid-cols-1">
              {videos.map((video, i) => (
                <div key={i} className="overflow-hidden rounded-2xl shadow-xl bg-card">
                  <video
                    src={video.src}
                    controls
                    preload="metadata"
                    className="w-full aspect-video bg-foreground/5"
                    controlsList="nodownload"
                  />
                  <div className="p-4 text-center">
                    <p className="font-body text-lg text-foreground italic">
                      {video.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center pb-8">
          <p className="font-display text-xl text-primary">
            Forever yours 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;
