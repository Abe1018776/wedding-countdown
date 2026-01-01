"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingHeader() {
  return (
    <header className="py-6 sm:py-8 px-4" dir="rtl">
      <div className="flex flex-col items-center">
        {/* Logo - simple circular display */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: "clamp(140px, 45vw, 220px)",
              height: "clamp(140px, 45vw, 220px)",
            }}
          >
            <Image
              src="/logo/wedding_logo.jpeg"
              alt="Wedding Logo"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          
          {/* Decorative sparkle */}
          <motion.span
            className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg sm:text-xl"
            style={{ color: "#c9a227" }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: "#1a5c5c" }}
        >
          חתונה בבית לאנדא
        </motion.h1>

        {/* Flourish */}
        <motion.div
          className="flex items-center gap-2 mt-2 sm:mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span style={{ color: "#c9a227" }}>❧</span>
          <div className="w-12 sm:w-16 h-px" style={{ background: "linear-gradient(90deg, #c9a227, transparent)" }} />
          <span style={{ color: "#c9a227" }}>☙</span>
        </motion.div>

        {/* Date & Location */}
        <motion.p
          className="mt-2 sm:mt-3 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: "#3a3a3a" }}
        >
          י״ח טבת • וויליאַמסבורג
        </motion.p>
      </div>
    </header>
  );
}
