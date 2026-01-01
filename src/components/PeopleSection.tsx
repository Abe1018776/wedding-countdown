"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import PersonAvatar, { Person } from "./PersonAvatar";

interface PeopleSectionProps {
  people: Person[];
  onPersonClick?: (person: Person) => void;
  onAddPerson?: () => void;
}

export default function PeopleSection({
  people,
  onPersonClick,
  onAddPerson,
}: PeopleSectionProps) {
  const livePeople = people.filter((p) => p.is_live);

  return (
    <div dir="rtl">
      {/* Live count */}
      {livePeople.length > 0 && (
        <div className="flex items-center gap-2 mb-3 text-sm text-[#34c759]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c759]" />
          </span>
          {livePeople.length} לייוו
        </div>
      )}

      {/* Scrollable Row */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {people.map((person) => (
          <PersonAvatar
            key={person.id}
            person={person}
            onClick={() => onPersonClick?.(person)}
          />
        ))}

        {/* Add Person Button */}
        <motion.button
          onClick={onAddPerson}
          className="flex flex-col items-center justify-center p-3 min-w-[80px]"
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <span className="text-xs text-gray-500">הוסף</span>
        </motion.button>
      </div>
    </div>
  );
}
