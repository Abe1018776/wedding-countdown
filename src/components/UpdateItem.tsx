"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, CheckCircle2, PartyPopper, MessageCircle } from "lucide-react";

export type UpdateType = "update" | "completed" | "milestone";

export interface Update {
  id: string;
  personName: string;
  personId?: string;
  message: string;
  timestamp: Date;
  type: UpdateType;
  isNew?: boolean;
}

interface UpdateItemProps {
  update: Update;
  relativeTime: string;
  onEdit?: (update: Update) => void;
  onDelete?: (updateId: string) => void;
}

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-600",
];

function getAvatarColor(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
}

function getTypeIcon(type: UpdateType) {
  switch (type) {
    case "completed":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "milestone":
      return <PartyPopper className="w-4 h-4 text-amber-500" />;
    default:
      return <MessageCircle className="w-4 h-4 text-blue-400" />;
  }
}

function getTypeBadge(type: UpdateType) {
  switch (type) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
          <CheckCircle2 className="w-3 h-3" />
          פארטיק
        </span>
      );
    case "milestone":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">
          <PartyPopper className="w-3 h-3" />
          מיילסטאון
        </span>
      );
    default:
      return null;
  }
}

export default function UpdateItem({ update, relativeTime, onEdit, onDelete }: UpdateItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm("Delete this update?")) {
      onDelete(update.id);
    }
  };

  const initials = update.personName
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-4 py-4 bg-white hover:bg-gray-50/50 transition-colors group border-b border-gray-100 last:border-b-0"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarColor(update.personName)} flex items-center justify-center shadow-sm`}>
            <span className="text-white text-sm font-bold">{initials}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 text-[15px]">{update.personName}</span>
            <span className="text-gray-400">·</span>
            <span className="text-sm text-gray-400">{relativeTime}</span>
            {getTypeBadge(update.type)}
          </div>

          {/* Message */}
          <p className="mt-1 text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
            {update.message}
          </p>

          {/* Actions row */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-gray-400">
              {getTypeIcon(update.type)}
            </div>

            {(onEdit || onDelete) && (
              <div className="flex items-center gap-2 mr-auto opacity-0 group-hover:opacity-100 transition-opacity">
                {onEdit && (
                  <button
                    onClick={() => onEdit(update)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-[#007aff] hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <Pencil size={12} />
                    <span>עדיט</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-[#ff3b30] hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                    <span>אויסמעקן</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
