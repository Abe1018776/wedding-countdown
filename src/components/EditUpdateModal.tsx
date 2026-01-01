"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";

export type UpdateType = "update" | "completed" | "milestone";

interface Person {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
}

export interface UpdateData {
  id: string;
  personId: string;
  message: string;
  type: UpdateType;
}

interface EditUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  update: UpdateData | null;
  onSave: (updateId: string, data: { personId: string; message: string; type: UpdateType }) => void;
  onDelete: (updateId: string) => void;
  people: Person[];
}

const UPDATE_TYPES: { id: UpdateType; label: string; icon: string }[] = [
  { id: "update", label: "Update", icon: "💬" },
  { id: "completed", label: "Completed", icon: "✓" },
  { id: "milestone", label: "Milestone", icon: "🎉" },
];

export default function EditUpdateModal({
  isOpen,
  onClose,
  update,
  onSave,
  onDelete,
  people,
}: EditUpdateModalProps) {
  const [personId, setPersonId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<UpdateType>("update");

  useEffect(() => {
    if (update) {
      setPersonId(update.personId);
      setMessage(update.message);
      setType(update.type);
    }
  }, [update]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!update || !personId || !message.trim()) return;
    onSave(update.id, {
      personId,
      message: message.trim(),
      type,
    });
    onClose();
  };

  const handleDelete = () => {
    if (!update) return;
    if (confirm("Delete this update?")) {
      onDelete(update.id);
      onClose();
    }
  };

  if (!update) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Update" dir="ltr">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Who posted this?
          </label>
          <select
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
            required
          >
            <option value="">Select person...</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.emoji} {person.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent resize-none"
            placeholder="Write your update..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="flex gap-2">
            {UPDATE_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-1 ${
                  type === t.id
                    ? "bg-[#1a5c5c] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
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
