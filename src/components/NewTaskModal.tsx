"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "./Modal";

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

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: { name: string; categoryId: string; assigneeId: string }) => void;
  onAddPerson?: (person: { name: string; shortName: string; emoji: string }) => void;
  onAddCategory?: (category: { name: string; emoji: string }) => void;
  categories: Category[];
  people: Person[];
}

const PERSON_EMOJI_OPTIONS = ["👤", "👨", "👩", "👴", "👵", "🧔", "👨‍💼", "👩‍💼", "🤵", "👰"];
const CATEGORY_EMOJI_OPTIONS = ["📋", "🎉", "🍽️", "📸", "🚗", "💒", "🎁", "✈️", "🏨", "💄"];

export default function NewTaskModal({
  isOpen,
  onClose,
  onSubmit,
  onAddPerson,
  onAddCategory,
  categories,
  people,
}: NewTaskModalProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  
  // New person form
  const [showNewPerson, setShowNewPerson] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonEmoji, setNewPersonEmoji] = useState("👤");
  
  // New category form
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryEmoji, setNewCategoryEmoji] = useState("📋");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), categoryId, assigneeId });
    setName("");
    setCategoryId("");
    setAssigneeId("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setCategoryId("");
    setAssigneeId("");
    setShowNewPerson(false);
    setNewPersonName("");
    setShowNewCategory(false);
    setNewCategoryName("");
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

  const handleAddCategory = () => {
    if (!newCategoryName.trim() || !onAddCategory) return;
    onAddCategory({
      name: newCategoryName.trim(),
      emoji: newCategoryEmoji,
    });
    setNewCategoryName("");
    setNewCategoryEmoji("📋");
    setShowNewCategory(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Task" dir="ltr">
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
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="flex gap-2">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewCategory(true)}
              className="px-3 py-2 bg-[#1a5c5c] text-white rounded-xl flex items-center gap-1 text-sm font-medium whitespace-nowrap"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {/* Inline new category form */}
        {showNewCategory && (
          <div className="p-3 bg-gray-50 rounded-xl space-y-3">
            <p className="text-sm font-medium text-gray-700">Add New Category</p>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
              placeholder="Category name"
            />
            <div>
              <p className="text-xs text-gray-500 mb-2">Select icon:</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewCategoryEmoji(emoji)}
                    className={`w-10 h-10 rounded-lg text-xl ${
                      newCategoryEmoji === emoji
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
                onClick={() => setShowNewCategory(false)}
                className="flex-1 py-2 px-3 bg-gray-200 text-gray-700 font-medium rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="flex-1 py-2 px-3 bg-[#1a5c5c] text-white font-medium rounded-xl disabled:opacity-50 flex items-center justify-center gap-1"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <div className="flex gap-2">
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#1a5c5c] focus:border-transparent"
            >
              <option value="">Who is responsible?</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.emoji} {person.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewPerson(true)}
              className="px-3 py-2 bg-[#34c759] text-white rounded-xl flex items-center gap-1 text-sm font-medium whitespace-nowrap"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
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
                {PERSON_EMOJI_OPTIONS.map((emoji) => (
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

        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#1a5c5c] text-white font-medium rounded-xl"
        >
          Add Task
        </button>
      </form>
    </Modal>
  );
}
