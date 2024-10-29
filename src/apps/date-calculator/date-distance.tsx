import dayjs, { type Dayjs } from "dayjs";
import type { ReactNode } from "react";

export const OPERATION_DISTANCE = "distance" as const;

export type DateDistanceOperation = typeof OPERATION_DISTANCE;

export function checkIsDateDistanceChange(unit: string | null) {
  return unit === OPERATION_DISTANCE;
}

export type CalculateDistanceOutput = NonNullable<
  ReturnType<typeof calculateDistance>
>;

export function calculateDistance(form: FormData) {
  const startDate = form.get("start-date-calendar") as string;
  const endDate = form.get("end-date-calendar") as string;

  if (!startDate || !endDate) return null;

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const isInvalid = start.isValid() === false || end.isValid() === false;

  if (isInvalid) return null;

  const when: "future" | "past" | "same" = start.isSame(end)
    ? "same"
    : start.isBefore(end)
      ? "future"
      : "past";

  return {
    when,
    distance: getDateDifference(start, end),
  };
}

function getDateDifference(start: Dayjs, end: Dayjs) {
  // Ensure the start date is before the end date
  if (end.isBefore(start)) {
    return getDateDifference(end, start);
  }

  const endDate = end.toDate();
  const startDate = start.toDate();

  var years = endDate.getFullYear() - startDate.getFullYear();
  var months = endDate.getMonth() - startDate.getMonth();
  var days = endDate.getDate() - startDate.getDate();

  // Adjust days and months if necessary
  if (days < 0) {
    months -= 1;
    // Get the number of days in the previous month
    var prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const units = {
    years: years,
    months: months,
    days: days,
  };

  const result = Object.entries(units).reduce(
    (acc, [unit, value]) => {
      if (value === 0) return acc;

      const item = {
        unit: unit as keyof typeof units,
        value: value,
      };

      return [...acc, item];
    },
    [] as { unit: keyof typeof units; value: number }[]
  );

  return result;
}

export function DistanceOutput({
  output,
  children,
}: {
  output: CalculateDistanceOutput;
  children: ReactNode;
}) {
  const { when } = output;

  return (
    <span>
      {when === "same" ? "The dates are the same " : ""}
      {when === "future" ? "It'll happen " : ""}
      {when === "past" ? "It has happened " : ""}
      {children}
      {when === "past" ? " ago" : "after"}
    </span>
  );
}

const units = {
  days: "day",
  months: "month",
  years: "year",
};

export function presentUnit(
  rules: Intl.PluralRules,
  unit: string,
  value: number
) {
  const plural = rules.select(value);
  const unitName = units[unit as keyof typeof units];
  return `${unitName}${plural === "one" ? "" : "s"}`;
}
