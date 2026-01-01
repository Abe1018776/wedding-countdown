"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { TaskCard, Task, TaskStage } from "./TaskCard";

interface ProductionLineProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, newStage: TaskStage) => void;
  onAddTask: () => void;
  onEditTask?: (task: Task) => void;
}

type TabType = "backlog" | "active" | "done";

const TABS: { id: TabType; label: string }[] = [
  { id: "backlog", label: "To Do" },
  { id: "active", label: "In Progress" },
  { id: "done", label: "Done" },
];

export function ProductionLine({ tasks, onTaskUpdate, onAddTask, onEditTask }: ProductionLineProps) {
  const [activeTab, setActiveTab] = useState<TabType>("backlog");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.stage === activeTab);
  }, [tasks, activeTab]);

  const tabCounts = useMemo(() => {
    return {
      backlog: tasks.filter((t) => t.stage === "backlog").length,
      active: tasks.filter((t) => t.stage === "active").length,
      done: tasks.filter((t) => t.stage === "done").length,
    };
  }, [tasks]);

  return (
    <div dir="ltr">
      {/* Segmented Control */}
      <div className="flex p-1 bg-gray-100 rounded-lg mx-4 mt-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            {tab.label} ({tabCounts[tab.id]})
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="mt-2">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStageChange={onTaskUpdate}
              onEdit={onEditTask}
            />
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">No tasks</p>
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="p-4">
        <button
          onClick={onAddTask}
          className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-[#1a5c5c] text-white"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
