"use client";

import { motion } from "framer-motion";

interface LiveIndicatorProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function LiveIndicator({ size = "md", showLabel = true }: LiveIndicatorProps) {
  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      {showLabel && (
        <motion.span
          className={`text-red-500 font-bold ${textSizes[size]}`}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🔴 LIVE
        </motion.span>
      )}
      <div className="flex items-center gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`${dotSizes[size]} bg-red-500 rounded-full`}
            animate={{
              y: [0, -4, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: "0 0 8px rgba(239, 68, 68, 0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
