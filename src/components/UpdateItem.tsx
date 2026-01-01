"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

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

export default function UpdateItem({ update, relativeTime, onEdit, onDelete }: UpdateItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm("Delete this update?")) {
      onDelete(update.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="px-4 py-3 bg-white group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-medium text-gray-900">{update.personName}</span>
            <span className="text-xs text-gray-400">{relativeTime}</span>
          </div>
          <p className="text-sm text-gray-600">{update.message}</p>
        </div>
        <div className="flex items-center gap-1">
          {update.type === "completed" && (
            <span className="text-[#34c759] text-sm">✓</span>
          )}
          {update.type === "milestone" && (
            <span className="text-[#ff9500] text-sm">🎉</span>
          )}
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={() => onEdit(update)}
                  className="p-1.5 text-gray-400 hover:text-[#007aff] hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 text-gray-400 hover:text-[#ff3b30] hover:bg-gray-100 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
