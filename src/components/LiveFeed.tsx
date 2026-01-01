"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { he } from "date-fns/locale";
import { Plus } from "lucide-react";
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

  return (
    <div className="glass-card overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-600">
          {updates.length} אַפּדעיטס
        </span>
        {onAddUpdate && (
          <button
            onClick={onAddUpdate}
            className="flex items-center gap-1 text-sm font-medium text-[#007aff]"
          >
            <Plus size={16} />
            <span>נייע</span>
          </button>
        )}
      </div>

      {/* Updates list */}
      <div
        ref={scrollContainerRef}
        className="max-h-80 overflow-y-auto divide-y divide-gray-100"
      >
        <AnimatePresence mode="popLayout">
          {typingUser && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 px-4 py-3 bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">{typingUser}</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400"
                  />
                ))}
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
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">קיין אַפּדעיטס נאָך</p>
          </div>
        )}
      </div>
    </div>
  );
}
