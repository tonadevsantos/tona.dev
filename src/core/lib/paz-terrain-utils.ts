import dayjs from "dayjs";

export interface MonthItem {
  monthNumber: number;
  date: dayjs.Dayjs;
  text: string;
  isCurrent: boolean;
}

export function generatePazTerrainMonths(): MonthItem[] {
  const startDate = dayjs("2023-09-03");
  const currentDate = dayjs();
  const months: MonthItem[] = [];

  for (let i = 0; i < 96; i++) {
    const monthDate = startDate.add(i, "month");
    const monthNumber = i;
    const text = `${monthNumber.toString().padStart(2, "0")} Mensualidad MTGS`;
    const isCurrent =
      monthDate.format("YYYY-MM") === currentDate.format("YYYY-MM");

    months.push({
      monthNumber,
      date: monthDate,
      text,
      isCurrent,
    });
  }

  return months;
}

export function getCurrentMonthIndex(): number {
  const months = generatePazTerrainMonths();
  return months.findIndex((month) => month.isCurrent);
}
