"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

interface ProgressBarProps {
  progress: number;
  done: number;
  total: number;
  inProgress: number;
}

export default function ProgressBar({ progress, done, total, inProgress }: ProgressBarProps) {
  const [hasReached100, setHasReached100] = useState(false);
  const prevProgressRef = useRef(progress);

  const toDo = useMemo(() => total - done - inProgress, [total, done, inProgress]);

  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const displayProgress = useTransform(springProgress, (val) =>
    Math.round(val)
  );

  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  useEffect(() => {
    const prev = prevProgressRef.current;
    if (progress >= 100 && prev < 100 && !hasReached100) {
      setHasReached100(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 },
        colors: ["#c9a227", "#d4af37", "#1a5c5c", "#e0cfa0"],
      });
    }
    prevProgressRef.current = progress;
  }, [progress, hasReached100]);

  const segments = useMemo(() => {
    if (total === 0) return { toDoWidth: 0, inProgressWidth: 0, doneWidth: 0 };
    return {
      toDoWidth: (toDo / total) * 100,
      inProgressWidth: (inProgress / total) * 100,
      doneWidth: (done / total) * 100,
    };
  }, [toDo, inProgress, done, total]);

  return (
    <div 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm"
      style={{ borderColor: "rgba(201, 162, 39, 0.2)" }}
    >
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Stats Row */}
        <div className="flex items-center justify-between gap-2 mb-2" dir="ltr">
          {/* Left: Task counts - responsive grid */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm min-w-0 flex-1">
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-gray-500 hidden xs:inline">To Do</span>
              <span className="text-gray-500 xs:hidden">TD</span>
              <span className="font-semibold text-gray-700">{toDo}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-gray-500 hidden xs:inline">In Progress</span>
              <span className="text-gray-500 xs:hidden">IP</span>
              <span className="font-semibold" style={{ color: "#c9a227" }}>{inProgress}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-gray-500 hidden xs:inline">Done</span>
              <span className="text-gray-500 xs:hidden">D</span>
              <span className="font-semibold" style={{ color: "#1a5c5c" }}>{done}</span>
            </div>
          </div>

          {/* Right: Summary & Percentage */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-xs text-gray-400 hidden sm:inline">
              {done} of {total} tasks done
            </span>
            <motion.span 
              className="text-base sm:text-lg font-bold"
              style={{ color: "#1a5c5c" }}
            >
              <motion.span>{displayProgress}</motion.span>%
            </motion.span>
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div 
          className="h-2 sm:h-2.5 rounded-full overflow-hidden flex"
          style={{ background: "rgba(26, 92, 92, 0.1)" }}
        >
          {/* Done segment (green/teal) */}
          <motion.div
            className="h-full"
            style={{ background: "#1a5c5c" }}
            initial={{ width: "0%" }}
            animate={{ width: `${segments.doneWidth}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          />
          {/* In Progress segment (gold) */}
          <motion.div
            className="h-full"
            style={{ background: "#c9a227" }}
            initial={{ width: "0%" }}
            animate={{ width: `${segments.inProgressWidth}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0.05 }}
          />
          {/* To Do segment - shown as transparent/empty, uses background */}
        </div>
      </div>
    </div>
  );
}
