"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import { Task, TaskStage } from "./TaskCard";

interface Category {
  id: string;
  name: string;
}

interface Person {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (taskId: string, updates: { name: string; stage: TaskStage; categoryId?: string; assigneeId?: string }) => void;
  onDelete: (taskId: string) => void;
  categories: Category[];
  people: Person[];
}

const STAGES: { id: TaskStage; label: string }[] = [
  { id: "backlog", label: "To Do" },
  { id: "active", label: "In Progress" },
  { id: "done", label: "Done" },
];

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
  onSave,
  onDelete,
  categories,
  people,
}: EditTaskModalProps) {
  const [name, setName] = useState("");
  const [stage, setStage] = useState<TaskStage>("backlog");
  const [categoryId, setCategoryId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setStage(task.stage);
      // Find category by name
      const category = categories.find(c => c.name === task.category);
      setCategoryId(category?.id || "");
      // Find person by shortName/name
      const person = people.find(p => p.shortName === task.assignedTo || p.name === task.assignedTo);
      setAssigneeId(person?.id || "");
    }
  }, [task, categories, people]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !name.trim()) return;
    onSave(task.id, { 
      name: name.trim(), 
      stage,
      categoryId: categoryId || undefined,
      assigneeId: assigneeId || undefined
    });
    onClose();
  };

  const handleDelete = () => {
    if (!task) return;
    if (confirm("Delete this task?")) {
      onDelete(task.id);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" dir="ltr">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex gap-2">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStage(s.id)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
                  stage === s.id
                    ? "bg-[#1a5c5c] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
          >
            <option value="">Unassigned</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.emoji} {person.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleDelete}
            className="py-3 px-4 bg-[#ff3b30] text-white font-medium rounded-xl flex items-center gap-2"
          >
            <Trash2 size={18} />
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-[#1a5c5c] text-white font-medium rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
