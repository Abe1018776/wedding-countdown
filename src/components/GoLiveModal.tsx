"use client";

import { useState } from "react";
import Modal from "./Modal";

interface Person {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
}

interface Task {
  id: string;
  name: string;
}

interface GoLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person | null;
  tasks: Task[];
  onGoLive: (personId: string, taskId: string) => void;
  onStopLive: (personId: string) => void;
  isCurrentlyLive?: boolean;
  currentTaskId?: string;
}

export default function GoLiveModal({
  isOpen,
  onClose,
  person,
  tasks,
  onGoLive,
  onStopLive,
  isCurrentlyLive = false,
  currentTaskId,
}: GoLiveModalProps) {
  const [selectedPersonId, setSelectedPersonId] = useState(person?.id || "");
  const [selectedTaskId, setSelectedTaskId] = useState(currentTaskId || "");

  const handleGoLive = () => {
    if (!selectedPersonId || !selectedTaskId) return;
    onGoLive(selectedPersonId, selectedTaskId);
    onClose();
  };

  const handleStopLive = () => {
    if (!selectedPersonId) return;
    onStopLive(selectedPersonId);
    onClose();
  };

  const handleClose = () => {
    setSelectedPersonId(person?.id || "");
    setSelectedTaskId(currentTaskId || "");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="גיי לייוו">
      <div className="space-y-4">
        {!person && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ווער ביסטו?
            </label>
            <select
              value={selectedPersonId}
              onChange={(e) => setSelectedPersonId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">קלויב...</option>
            </select>
          </div>
        )}

        {person && (
          <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="text-2xl">{person.emoji}</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {person.name}
            </span>
          </div>
        )}

        {!isCurrentlyLive && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                וואָס טוסטו?
              </label>
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">קלויב אויפגאבע...</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGoLive}
              disabled={!selectedTaskId || (!person && !selectedPersonId)}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="animate-pulse">🔴</span>
              גיי לייוו!
            </button>
          </>
        )}

        {isCurrentlyLive && (
          <button
            onClick={handleStopLive}
            className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            ⏹️ איך בין פארטיג
          </button>
        )}
      </div>
    </Modal>
  );
}
