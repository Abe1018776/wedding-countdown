"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ChevronRight } from "lucide-react";

export type TaskStage = "backlog" | "active" | "done";

export interface Task {
  id: string;
  name: string;
  category: string;
  categoryEmoji: string;
  assignedTo?: string;
  stage: TaskStage;
  subtasks?: { total: number; completed: number };
  stuck_since?: Date | null;
  categoryProgress?: number;
}

interface TaskCardProps {
  task: Task;
  onStageChange: (taskId: string, newStage: TaskStage) => void;
  onEdit?: (task: Task) => void;
}

const STAGE_ORDER: TaskStage[] = ["backlog", "active", "done"];

export function TaskCard({ task, onStageChange, onEdit }: TaskCardProps) {
  const cycleStage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = STAGE_ORDER.indexOf(task.stage);
    const nextIndex = (currentIndex + 1) % STAGE_ORDER.length;
    onStageChange(task.id, STAGE_ORDER[nextIndex]);
  };

  const handleEdit = () => {
    onEdit?.(task);
  };

  const getStageIcon = () => {
    switch (task.stage) {
      case "done":
        return <CheckCircle2 className="w-6 h-6 text-[#34c759]" />;
      case "active":
        return <Clock className="w-6 h-6 text-[#c9a227]" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer border-b border-gray-100 last:border-b-0 active:bg-gray-50"
      onClick={handleEdit}
    >
      {/* Stage icon - clickable to change stage */}
      <button
        onClick={cycleStage}
        className="flex-shrink-0 p-1 -m-1"
      >
        {getStageIcon()}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${task.stage === "done" ? "text-gray-400 line-through" : "text-gray-900"}`}>
          {task.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500">
            {task.categoryEmoji} {task.category}
          </span>
          {task.assignedTo && (
            <span className="text-xs text-[#1a5c5c]">• {task.assignedTo}</span>
          )}
        </div>
      </div>

      {/* Edit indicator */}
      {onEdit && (
        <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
      )}
    </motion.div>
  );
}
