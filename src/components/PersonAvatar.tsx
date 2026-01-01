"use client";

import { motion } from "framer-motion";

export interface Person {
  id: string;
  emoji: string;
  name: string;
  tasks: { id: string; title: string; completed: boolean }[];
  is_live: boolean;
  current_task?: string;
}

interface PersonAvatarProps {
  person: Person;
  onClick?: () => void;
}

export default function PersonAvatar({ person, onClick }: PersonAvatarProps) {
  const completedCount = person.tasks.filter((t) => t.completed).length;
  const totalTasks = person.tasks.length;

  return (
    <motion.div
      onClick={onClick}
      className="flex flex-col items-center p-3 cursor-pointer select-none"
      dir="rtl"
      whileTap={{ scale: 0.95 }}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
          {person.emoji}
        </div>
        {person.is_live && (
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#34c759] rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Name */}
      <p className="mt-2 text-sm font-medium text-gray-900 text-center">
        {person.name}
      </p>

      {/* Progress */}
      <p className="text-xs text-gray-500">
        {completedCount}/{totalTasks}
      </p>

      {/* Current task if live */}
      {person.is_live && person.current_task && (
        <p className="text-xs text-[#34c759] mt-0.5 text-center truncate max-w-[80px]">
          {person.current_task}
        </p>
      )}
    </motion.div>
  );
}
