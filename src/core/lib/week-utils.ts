import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export function getCurrentWeek() {
  return dayjs().startOf('isoWeek');
}

export function getWeekStart(date: dayjs.Dayjs | Date | string) {
  return dayjs(date).startOf('isoWeek');
}

export function getWeekEnd(date: dayjs.Dayjs | Date | string) {
  return dayjs(date).endOf('isoWeek');
}

export function addWeeks(date: dayjs.Dayjs | Date | string, weeks: number) {
  return dayjs(date).add(weeks, 'week');
}

export function formatDateRange(startDate: dayjs.Dayjs | Date | string, endDate: dayjs.Dayjs | Date | string): string {
  const start = dayjs(startDate).format('M/DD');
  const end = dayjs(endDate).format('M/DD');
  return `${start} - ${end} Timesheet`;
}