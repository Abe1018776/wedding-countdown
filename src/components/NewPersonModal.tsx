"use client";

import { useState } from "react";
import Modal from "./Modal";

interface NewPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (person: { name: string; shortName: string; emoji: string }) => void;
}

const EMOJI_OPTIONS = ["👩", "👨", "👴", "👵", "🧑", "👤"];

export default function NewPersonModal({
  isOpen,
  onClose,
  onSubmit,
}: NewPersonModalProps) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [emoji, setEmoji] = useState("👤");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortName.trim()) return;
    onSubmit({ name: name.trim(), shortName: shortName.trim(), emoji });
    setName("");
    setShortName("");
    setEmoji("👤");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setShortName("");
    setEmoji("👤");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="צולייג נייעם מענטש">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            נאָמען
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="פולער נאָמען"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            קורצער נאָמען
          </label>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="פאר אַוואַטאַר"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            עמאָדזשי
          </label>
          <div className="flex gap-2 flex-wrap">
            {EMOJI_OPTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all ${
                  emoji === e
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          צולייגן מענטש
        </button>
      </form>
    </Modal>
  );
}
