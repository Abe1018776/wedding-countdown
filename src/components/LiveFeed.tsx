"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { he } from "date-fns/locale";
import { Plus, Radio } from "lucide-react";
import UpdateItem, { Update } from "./UpdateItem";

interface LiveFeedProps {
  updates: Update[];
  onAddUpdate?: () => void;
  onEditUpdate?: (update: Update) => void;
  onDeleteUpdate?: (updateId: string) => void;
  typingUser?: string | null;
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} סעק צוריק`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} מינוט צוריק`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} שעה צוריק`;
  }

  try {
    return formatDistanceToNow(date, { addSuffix: true, locale: he });
  } catch {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} טעג צוריק`;
  }
}

export default function LiveFeed({ updates, onAddUpdate, onEditUpdate, onDeleteUpdate, typingUser }: LiveFeedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [relativeTimeKeys, setRelativeTimeKeys] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTimeKeys((k) => k + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [updates.length]);

  const marqueeText = "לייוו אפדיעטס";

  return (
    <div className="glass-card overflow-hidden" dir="rtl">
      {/* Animated Marquee Header */}
      <div className="relative bg-gradient-to-l from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] py-4 overflow-hidden">
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Radio className="w-5 h-5 text-red-500" />
          </motion.div>
          <span className="text-xs font-medium text-red-400 uppercase tracking-wider">LIVE</span>
        </div>
        <div className="relative overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee-rtl">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mx-6 flex-shrink-0"
                style={{ fontFamily: "'David Libre', 'Frank Ruhl Libre', serif" }}
              >
                ✦ {marqueeText} ✦ {marqueeText}
              </span>
            ))}
          </div>
          <style jsx>{`
            @keyframes marquee-rtl {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(50%);
              }
            }
            .animate-marquee-rtl {
              animation: marquee-rtl 20s linear infinite;
            }
          `}</style>
        </div>
      </div>

      {/* Sub-header with count and add button */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50/80 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-500">
          {updates.length} אַפּדעיטס
        </span>
        {onAddUpdate && (
          <button
            onClick={onAddUpdate}
            className="flex items-center gap-1.5 text-sm font-medium text-[#007aff] hover:text-[#005ecb] transition-colors"
          >
            <Plus size={16} />
            <span>נייע</span>
          </button>
        )}
      </div>

      {/* Updates list - Twitter/RSS style */}
      <div
        ref={scrollContainerRef}
        className="max-h-96 overflow-y-auto bg-white"
      >
        <AnimatePresence mode="popLayout">
          {typingUser && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 px-4 py-4 border-b border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{typingUser.charAt(0)}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">{typingUser}</span>
                <div className="flex gap-1 mt-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-gray-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {updates.map((update) => (
            <UpdateItem
              key={`${update.id}-${relativeTimeKeys}`}
              update={update}
              relativeTime={formatRelativeTime(update.timestamp)}
              onEdit={onEditUpdate}
              onDelete={onDeleteUpdate}
            />
          ))}
        </AnimatePresence>

        {updates.length === 0 && !typingUser && (
          <div className="text-center py-16 text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Radio className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm font-medium">קיין אַפּדעיטס נאָך</p>
            <p className="text-xs mt-1 text-gray-300">אפדיעטס וועלן דא אויפווייזן</p>
          </div>
        )}
      </div>
    </div>
  );
}
