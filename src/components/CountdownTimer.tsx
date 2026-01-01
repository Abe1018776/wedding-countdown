"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  eventDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => {
  const displayValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className="px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl min-w-[55px] sm:min-w-[80px]"
        style={{
          background: "linear-gradient(135deg, #1a5c5c 0%, #143c37 100%)",
          border: "2px solid #c9a227",
          boxShadow: "0 4px 20px rgba(26, 92, 92, 0.2)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-2xl sm:text-4xl font-bold text-center tabular-nums"
            style={{ 
              color: "#e0cfa0",
              textShadow: "0 0 10px rgba(201, 162, 39, 0.3)"
            }}
          >
            {displayValue}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-xs mt-2" style={{ color: "#1a5c5c" }}>{label}</span>
    </div>
  );
};

export default function CountdownTimer({ eventDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = eventDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const totalHours = useMemo(() => {
    return timeLeft.days * 24 + timeLeft.hours + timeLeft.minutes / 60;
  }, [timeLeft.days, timeLeft.hours, timeLeft.minutes]);

  const isUrgent = totalHours < 72;

  if (!mounted) {
    return (
      <div className="glass-card p-6 flex items-center justify-center">
        <div 
          className="animate-spin w-6 h-6 border-2 rounded-full"
          style={{ borderColor: "#c9a227", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="glass-card p-6" dir="rtl">
      <div className="flex justify-center items-center gap-1 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="טעג" />
        <span className="text-xl sm:text-2xl font-light" style={{ color: "#c9a227" }}>:</span>
        <TimeUnit value={timeLeft.hours} label="שעות" />
        <span className="text-xl sm:text-2xl font-light" style={{ color: "#c9a227" }}>:</span>
        <TimeUnit value={timeLeft.minutes} label="מינוט" />
        <span className="text-xl sm:text-2xl font-light" style={{ color: "#c9a227" }}>:</span>
        <TimeUnit value={timeLeft.seconds} label="סעק׳" />
      </div>

      {/* Subtitle */}
      <motion.p
        className="text-center mt-4 text-sm"
        style={{ color: "#1a5c5c" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ביז חופה וקידושין
      </motion.p>

      {isUrgent && (
        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span 
            className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full"
            style={{ 
              background: "rgba(201, 162, 39, 0.15)",
              color: "#c9a227"
            }}
          >
            ⚡ פחות מ-3 ימים!
          </span>
        </motion.div>
      )}
    </div>
  );
}
