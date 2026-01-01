"use client";

import { motion } from "framer-motion";

export type UpdateType = "update" | "completed" | "milestone";

export interface Update {
  id: string;
  personName: string;
  message: string;
  timestamp: Date;
  type: UpdateType;
  isNew?: boolean;
}

interface UpdateItemProps {
  update: Update;
  relativeTime: string;
}

export default function UpdateItem({ update, relativeTime }: UpdateItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="px-4 py-3 bg-white"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-medium text-gray-900">{update.personName}</span>
            <span className="text-xs text-gray-400">{relativeTime}</span>
          </div>
          <p className="text-sm text-gray-600">{update.message}</p>
        </div>
        {update.type === "completed" && (
          <span className="text-[#34c759] text-sm">✓</span>
        )}
        {update.type === "milestone" && (
          <span className="text-[#ff9500] text-sm">🎉</span>
        )}
      </div>
    </motion.div>
  );
}
