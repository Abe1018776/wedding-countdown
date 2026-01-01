"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "./Modal";

interface Person {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
}

interface NewUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (update: { personId: string; message: string; goLive: boolean }) => void;
  onAddPerson?: (person: { name: string; shortName: string; emoji: string }) => void;
  people: Person[];
}

const EMOJI_OPTIONS = ["👤", "👨", "👩", "👴", "👵", "🧔", "👨‍💼", "👩‍💼", "🤵", "👰"];

export default function NewUpdateModal({
  isOpen,
  onClose,
  onSubmit,
  onAddPerson,
  people,
}: NewUpdateModalProps) {
  const [personId, setPersonId] = useState("");
  const [message, setMessage] = useState("");
  const [goLive, setGoLive] = useState(false);
  
  // New person form
  const [showNewPerson, setShowNewPerson] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonEmoji, setNewPersonEmoji] = useState("👤");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personId || !message.trim()) return;
    onSubmit({ personId, message: message.trim(), goLive });
    setPersonId("");
    setMessage("");
    setGoLive(false);
    onClose();
  };

  const handleClose = () => {
    setPersonId("");
    setMessage("");
    setGoLive(false);
    setShowNewPerson(false);
    setNewPersonName("");
    onClose();
  };

  const handleAddPerson = () => {
    if (!newPersonName.trim() || !onAddPerson) return;
    onAddPerson({
      name: newPersonName.trim(),
      shortName: newPersonName.trim().split(" ")[0],
      emoji: newPersonEmoji,
    });
    setNewPersonName("");
    setNewPersonEmoji("👤");
    setShowNewPerson(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Post Update" dir="ltr">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Who are you?
          </label>
          <select
            value={personId}
            onChange={(e) => {
              if (e.target.value === "__new__") {
                setShowNewPerson(true);
              } else {
                setPersonId(e.target.value);
              }
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
            required
          >
            <option value="">Select person...</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.emoji} {person.name}
              </option>
            ))}
            <option value="__new__">+ Add new person...</option>
          </select>
        </div>

        {/* Inline new person form */}
        {showNewPerson && (
          <div className="p-3 bg-gray-50 rounded-xl space-y-3">
            <p className="text-sm font-medium text-gray-700">Add New Person</p>
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
              placeholder="Person's name"
            />
            <div>
              <p className="text-xs text-gray-500 mb-2">Select emoji:</p>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewPersonEmoji(emoji)}
                    className={`w-10 h-10 rounded-lg text-xl ${
                      newPersonEmoji === emoji
                        ? "bg-[#1a5c5c] ring-2 ring-[#1a5c5c]"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowNewPerson(false)}
                className="flex-1 py-2 px-3 bg-gray-200 text-gray-700 font-medium rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddPerson}
                disabled={!newPersonName.trim()}
                className="flex-1 py-2 px-3 bg-[#34c759] text-white font-medium rounded-xl disabled:opacity-50 flex items-center justify-center gap-1"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What&apos;s the update?
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

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={goLive}
            onChange={(e) => setGoLive(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-[#ff3b30] focus:ring-[#ff3b30]"
          />
          <span className="text-sm text-gray-700">
            🔴 I&apos;m working on this now
          </span>
        </label>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#1a5c5c] text-white font-medium rounded-xl"
        >
          Post Update
        </button>
      </form>
    </Modal>
  );
}
