"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  title: string;
}

export default function SectionDivider({ title }: SectionDividerProps) {
  return (
    <motion.div
      className="w-full py-6 sm:py-8 flex items-center justify-center gap-3 sm:gap-4"
      dir="rtl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Right ornamental line */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ transformOrigin: "right" }}
      >
        <motion.span
          className="text-sm"
          style={{ color: "#c9a227" }}
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ❧
        </motion.span>
        <div 
          className="h-[2px] w-12 sm:w-20 md:w-28" 
          style={{ background: "linear-gradient(to left, #c9a227, transparent)" }}
        />
        <div 
          className="h-[1px] w-8 sm:w-12 md:w-16" 
          style={{ background: "linear-gradient(to left, #d4af37, transparent)" }}
        />
      </motion.div>

      {/* Title with elegant frame */}
      <motion.div
        className="relative px-6 sm:px-8 py-2"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Decorative frame */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            border: "1px solid rgba(201, 162, 39, 0.3)",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        />
        
        {/* Corner ornaments */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 rounded-tl" style={{ borderColor: "#c9a227" }} />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 rounded-tr" style={{ borderColor: "#c9a227" }} />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 rounded-bl" style={{ borderColor: "#c9a227" }} />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 rounded-br" style={{ borderColor: "#c9a227" }} />
        
        {/* Title text */}
        <h2
          className="relative text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap"
          style={{
            fontFamily: "'David Libre', 'Times New Roman', serif",
            color: "#1a5c5c",
            textShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {title}
        </h2>
      </motion.div>

      {/* Left ornamental line */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      >
        <div 
          className="h-[1px] w-8 sm:w-12 md:w-16" 
          style={{ background: "linear-gradient(to right, #d4af37, transparent)" }}
        />
        <div 
          className="h-[2px] w-12 sm:w-20 md:w-28" 
          style={{ background: "linear-gradient(to right, #c9a227, transparent)" }}
        />
        <motion.span
          className="text-sm"
          style={{ color: "#c9a227" }}
          animate={{ rotate: [360, 180, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ☙
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
