"use client";

import { motion } from "framer-motion";

interface CategoryBadgeProps {
  emoji: string;
  name: string;
  progress: number; // 0-100
}

export function CategoryBadge({ emoji, name, progress }: CategoryBadgeProps) {
  const isComplete = progress >= 100;
  
  const getProgressStyles = () => {
    if (progress >= 100) return { 
      bg: "rgba(26, 92, 92, 0.15)", 
      text: "#1a5c5c", 
      border: "#1a5c5c" 
    };
    if (progress >= 70) return { 
      bg: "rgba(201, 162, 39, 0.15)", 
      text: "#c9a227", 
      border: "#c9a227" 
    };
    if (progress >= 40) return { 
      bg: "rgba(201, 162, 39, 0.1)", 
      text: "#3a3a3a", 
      border: "rgba(201, 162, 39, 0.5)" 
    };
    return { 
      bg: "rgba(58, 58, 58, 0.05)", 
      text: "#6b7280", 
      border: "rgba(201, 162, 39, 0.3)" 
    };
  };

  const styles = getProgressStyles();

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium"
      style={{
        background: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
      }}
      initial={false}
      animate={
        isComplete
          ? {
              scale: [1, 1.15, 1],
              rotate: [0, -3, 3, 0],
            }
          : {}
      }
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.span
        animate={
          isComplete
            ? {
                scale: [1, 1.3, 1],
              }
            : {}
        }
        transition={{
          duration: 0.4,
          repeat: isComplete ? 2 : 0,
          repeatDelay: 0.1,
        }}
      >
        {emoji}
      </motion.span>
      <span>{name}</span>
      {isComplete && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ color: "#c9a227" }}
        >
          ✦
        </motion.span>
      )}
    </motion.div>
  );
}
