import { useState } from "react";
import {
  getCurrentWeek,
  getWeekStart,
  getWeekEnd,
  addWeeks,
  formatDateRange,
} from "../core/lib/week-utils";
import Copy from "./Copy";
import { Button } from "./button";

interface WeekRangeInputProps {
  className?: string;
}

export function WeekRangeInput({ className = "" }: WeekRangeInputProps) {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  const weekStart = getWeekStart(currentWeek);
  const weekEnd = getWeekEnd(currentWeek);
  const timesheetText = formatDateRange(weekStart, weekEnd);

  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, -1));
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  return (
    <div className={`${className} space-y-4`}>
      <div className="flex items-center gap-4">
        <Button onClick={goToPreviousWeek} aria-label="Previous week">
          <span className="text-lg font-bold">&lt;</span>
        </Button>

        <div className="flex-1 text-center">
          <div className="text-lg font-medium">
            Week of {weekStart.format("MMM DD, YYYY")}
          </div>
        </div>

        <Button onClick={goToNextWeek} aria-label="Next week">
          <span className="text-lg font-bold">&gt;</span>
        </Button>
      </div>

      <div className="bg-bg-700 flex items-center justify-center gap-3 p-4 rounded font-sans">
        <span className="text-lg">{timesheetText}</span>
        <Copy text={timesheetText} />
      </div>
    </div>
  );
}
