"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

const STAR_COLORS = [
  "rgb(201, 162, 39)",    // Gold
  "rgb(212, 175, 55)",    // Rich gold
  "rgb(224, 207, 160)",   // Light gold
  "rgb(26, 92, 92)",      // Teal accent
];

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    opacity: 0.15 + Math.random() * 0.25,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    animationDuration: 3 + Math.random() * 5,
    animationDelay: Math.random() * 5,
  }));
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(35));
  }, []);

  if (stars.length === 0) return null;

  return (
    <>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: var(--base-opacity);
            transform: scale(1);
          }
          50% {
            opacity: calc(var(--base-opacity) * 0.4);
            transform: scale(0.85);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            opacity: var(--base-opacity);
            box-shadow: 0 0 3px currentColor;
          }
          50% {
            opacity: calc(var(--base-opacity) * 1.3);
            box-shadow: 0 0 8px currentColor;
          }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              color: star.color,
              ["--base-opacity" as string]: star.opacity,
              opacity: star.opacity,
              animation: `${star.size > 3 ? "shimmer" : "twinkle"} ${star.animationDuration}s ease-in-out infinite`,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
