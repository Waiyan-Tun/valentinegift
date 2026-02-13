import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingHeart = ({ delay, left, size }: { delay: number; left: number; size: number }) => (
  <div
    className="fixed pointer-events-none text-accent"
    style={{
      left: `${left}%`,
      bottom: "-20px",
      fontSize: `${size}px`,
      animation: `float-heart ${8 + Math.random() * 6}s linear ${delay}s infinite`,
      opacity: 0,
    }}
  >
    💕
  </div>
);

const ValentinePage = () => {
  const navigate = useNavigate();
  const [noPosition, setNoPosition] = useState<{ top: string; left: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hearts = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 1.2,
    left: Math.random() * 90 + 5,
    size: 16 + Math.random() * 20,
  }));

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 120;
    const maxY = rect.height - 50;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoPosition({ top: `${newY}px`, left: `${newX}px` });
  }, []);

  const handleYes = () => {
    navigate("/password");
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4"
    >
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Heart className="h-16 w-16 text-accent animate-pulse-glow rounded-full" fill="hsl(350, 40%, 80%)" />

        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Will you be my
          <br />
          <span className="text-primary">Valentine?</span>
        </h1>

        <p className="max-w-md text-lg text-muted-foreground font-body">
          I have something special waiting for you... 💌
        </p>

        <div className="flex gap-6 mt-4">
          <Button
            onClick={handleYes}
            className="px-10 py-6 text-lg font-display rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
            size="lg"
          >
            Yes 💕
          </Button>

          <div className="relative" style={{ width: 120, height: 50 }}>
            <Button
              variant="outline"
              className="absolute px-10 py-6 text-lg font-display rounded-full border-2 border-primary/30 text-muted-foreground transition-all duration-150"
              size="lg"
              style={noPosition ? { ...noPosition, position: "fixed", zIndex: 50 } : {}}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={moveNoButton}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentinePage;
