import { useEffect, useRef } from "react";
import {
  generatePazTerrainMonths,
  getCurrentMonthIndex,
} from "../core/lib/paz-terrain-utils";
import Copy from "./Copy";

export function PazTerrain() {
  const months = generatePazTerrainMonths();
  const currentMonthIndex = getCurrentMonthIndex();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentItemRef.current && scrollContainerRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-0 md:p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Paz Lot</h2>

      <div
        ref={scrollContainerRef}
        className="h-96 overflow-y-auto bg-white/10 rounded-lg bg-bg/50"
      >
        <div className="space-y-4 py-4 px-2">
          {months.map((month, index) => (
            <div
              key={month.monthNumber}
              ref={month.isCurrent ? currentItemRef : undefined}
              className={`relative flex items-center justify-between p-3 md:p-3 bg-terminal-bg rounded-lg bg-bg border transition-all duration-200 ${
                month.isCurrent
                  ? "bg-accent/10 border-accent/50 shadow-lg shadow-accent/20"
                  : "bg-bg-input/5 border-icon/20 hover:bg-icon/10 hover:border-icon/40"
              }`}
            >
              <div className="flex items-center gap-3 h-24">
                <span className="text-sm text-text/60 w-8 font-mono">
                  #{month.monthNumber.toString().padStart(2, "0")}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    month.isCurrent ? "font-semibold text-accent" : "text-text"
                  }`}
                >
                  {month.text}
                </span>
                {month.isCurrent && (
                  <span className="absolute scale-90 top-[8px] right-[8px] px-2 py-1 bg-tertiary-300 text-bg text-xs rounded-full font-medium">
                    {index === months.length - 1 ? "Last!!!" : "Current"}
                  </span>
                )}
              </div>

              <Copy text={month.text} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-text/70">
        <p>96 months starting from September 3rd, 2023</p>
        {currentMonthIndex >= 0 && (
          <p>
            Currently on month{" "}
            <span className="text-accent font-semibold">
              {currentMonthIndex + 1}
            </span>{" "}
            of <span className="text-accent font-semibold">96</span>
          </p>
        )}
      </div>
    </div>
  );
}
