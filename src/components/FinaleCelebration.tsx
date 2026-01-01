"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface FinaleCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingEmoji = ({
  emoji,
  delay,
  duration,
  startX,
}: {
  emoji: string;
  delay: number;
  duration: number;
  startX: number;
}) => (
  <motion.div
    className="absolute text-4xl md:text-5xl pointer-events-none"
    initial={{ y: "100vh", x: `${startX}vw`, opacity: 0, rotate: 0 }}
    animate={{
      y: "-20vh",
      opacity: [0, 1, 1, 0],
      rotate: [0, 15, -15, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  >
    {emoji}
  </motion.div>
);

export default function FinaleCelebration({
  isOpen,
  onClose,
}: FinaleCelebrationProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fireConfetti = useCallback(() => {
    const colors = ["#FFD700", "#FFF8DC", "#DAA520", "#F5DEB3", "#FFEFD5"];

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors,
      shapes: ["circle", "square"],
      scalar: 1.2,
    });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: 0.1, y: 0.6 },
      colors,
      angle: 60,
    });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: 0.9, y: 0.6 },
      colors,
      angle: 120,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      fireConfetti();
      setTimeout(fireConfetti, 300);
      setTimeout(fireConfetti, 600);

      intervalRef.current = setInterval(() => {
        fireConfetti();
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, fireConfetti]);

  const floatingEmojis = [
    { emoji: "💕", delay: 0, duration: 8, startX: 10 },
    { emoji: "💍", delay: 1, duration: 9, startX: 25 },
    { emoji: "❤️", delay: 0.5, duration: 7, startX: 40 },
    { emoji: "💒", delay: 2, duration: 10, startX: 55 },
    { emoji: "💕", delay: 1.5, duration: 8, startX: 70 },
    { emoji: "💍", delay: 0.8, duration: 9, startX: 85 },
    { emoji: "✨", delay: 2.5, duration: 6, startX: 15 },
    { emoji: "❤️", delay: 3, duration: 7, startX: 45 },
    { emoji: "✨", delay: 1.2, duration: 6, startX: 75 },
    { emoji: "💒", delay: 3.5, duration: 10, startX: 30 },
    { emoji: "💕", delay: 4, duration: 8, startX: 60 },
    { emoji: "💍", delay: 2.2, duration: 9, startX: 90 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-amber-950 via-amber-900 to-yellow-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingEmojis.map((item, i) => (
              <FloatingEmoji key={i} {...item} />
            ))}
          </div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 30% 20%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 80%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 20%, rgba(255,215,0,0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            dir="rtl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <motion.div
              className="mb-8"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)",
                  "0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.5)",
                  "0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200"
                style={{
                  fontFamily: "'David Libre', 'Times New Roman', serif",
                  textShadow:
                    "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.4)",
                }}
              >
                🎊 💍 🎉 מזל טוב! 🎉 💍 🎊
              </h1>
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100"
                style={{
                  fontFamily: "'David Libre', 'Times New Roman', serif",
                  textShadow: "0 0 20px rgba(255,215,0,0.4)",
                }}
                animate={{
                  color: ["#FEF3C7", "#FDE68A", "#FEF3C7"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                חתונה בבית לאנדא
              </motion.h2>
            </motion.div>

            <motion.div
              className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-900/50 via-yellow-800/50 to-amber-900/50 border-2 border-yellow-500/50 backdrop-blur-sm"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-yellow-100"
                style={{
                  fontFamily: "'David Libre', 'Times New Roman', serif",
                }}
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255,215,0,0.3)",
                    "0 0 25px rgba(255,215,0,0.6)",
                    "0 0 10px rgba(255,215,0,0.3)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                אַלעס איז גרייט צום חופה וקידושין!
              </motion.p>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <motion.div
                className="text-5xl sm:text-6xl md:text-7xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                💒✨👰🤵✨💒
              </motion.div>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p
                className="text-xl sm:text-2xl md:text-3xl text-amber-200 font-medium"
                style={{
                  fontFamily: "'David Libre', 'Times New Roman', serif",
                }}
              >
                י״ח טבת • וויליאַמסבורג
              </p>
            </motion.div>

            <motion.div
              className="mb-10"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.p
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300"
                style={{
                  fontFamily: "'David Libre', 'Times New Roman', serif",
                  textShadow: "0 0 30px rgba(255,215,0,0.5)",
                }}
                animate={{
                  color: ["#FDE047", "#FACC15", "#FDE047"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎊 לחיים! לחיים! 🎊
              </motion.p>
            </motion.div>

            <motion.button
              onClick={onClose}
              className="px-8 py-3 text-xl font-semibold text-amber-900 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-full shadow-lg hover:shadow-xl transition-shadow border-2 border-yellow-500"
              style={{
                fontFamily: "'David Libre', 'Times New Roman', serif",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              סגור
            </motion.button>
          </motion.div>

          <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-yellow-400/60 rounded-tl-3xl" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-400/60 rounded-tr-3xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-yellow-400/60 rounded-bl-3xl" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-yellow-400/60 rounded-br-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
