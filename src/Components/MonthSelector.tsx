// components/MonthSelector.tsx
import React from "react";

type MonthSelectorProps = {
  availableMonths: string[];
  selectedMonth: string | null;
  onSelect: (month: string) => void;
};

export default function MonthSelector({ availableMonths, selectedMonth, onSelect }: MonthSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {availableMonths.map((month) => (
        <button
          key={month}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            selectedMonth === month ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => onSelect(month)}
        >
          {month}
        </button>
      ))}
    </div>
  );
}
