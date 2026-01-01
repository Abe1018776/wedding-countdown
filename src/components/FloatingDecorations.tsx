"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ELEGANT_SYMBOLS = ["✦", "❧", "☙", "✧", "◈", "❦", "✤", "❈"];

interface FloatingElement {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotates: boolean;
  color: string;
}

const COLORS = [
  "rgb(201, 162, 39)",    // Gold
  "rgb(212, 175, 55)",    // Rich gold
  "rgb(26, 92, 92)",      // Teal
  "rgb(224, 207, 160)",   // Light gold
];

function generateElements(count: number): FloatingElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: ELEGANT_SYMBOLS[Math.floor(Math.random() * ELEGANT_SYMBOLS.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 12 + Math.random() * 16,
    duration: 20 + Math.random() * 30,
    delay: Math.random() * -20,
    opacity: 0.08 + Math.random() * 0.12,
    rotates: Math.random() > 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function FloatingDecorations() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 8 : 15;
    setElements(generateElements(count));
    
    const handleResize = () => {
      const newCount = window.innerWidth < 768 ? 8 : 15;
      setElements(generateElements(newCount));
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute select-none"
          style={{
            left: `${el.x}%`,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            color: el.color,
          }}
          initial={{ y: "100vh" }}
          animate={{
            y: [
              `${el.y}vh`,
              `${el.y - 120}vh`,
            ],
            x: [
              `${el.x}%`,
              `${el.x + (Math.random() * 6 - 3)}%`,
              `${el.x}%`,
            ],
            ...(el.rotates && {
              rotate: [0, 360],
            }),
          }}
          transition={{
            y: {
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay,
            },
            x: {
              duration: el.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay,
            },
            rotate: el.rotates
              ? {
                  duration: el.duration * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: el.delay,
                }
              : undefined,
          }}
        >
          {el.symbol}
        </motion.div>
      ))}
    </div>
  );
}
