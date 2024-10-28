import { Input } from "../../components/Input";
import dayjs, { type Dayjs } from "dayjs";
import "./date-relative.scss";

export const OPERATION_ADD = "add" as const;
export const OPERATION_SUBTRACT = "subtract" as const;

export type DateRelativeOperation =
  | typeof OPERATION_ADD
  | typeof OPERATION_SUBTRACT;

export function checkDateRelativeOperation(
  operation: string | null
): operation is DateRelativeOperation {
  return operation === OPERATION_ADD || operation === OPERATION_SUBTRACT;
}

const timeUnit = ["day", "month", "year"] as const;

export function checkIsDateRelativeChange(unit: string) {
  return timeUnit.includes(unit as (typeof timeUnit)[number]);
}

function operationReducer(
  form: FormData,
  date: Dayjs,
  operation: DateRelativeOperation
) {
  const time = timeUnit.reduce((result, unit) => {
    const value = Number(form.get(unit));
    if (isNaN(value) || value <= 0) return result;

    if (operation === OPERATION_ADD) {
      return dayjs(result).add(value, unit).valueOf();
    } else {
      return dayjs(result).subtract(value, unit).valueOf();
    }
  }, date.valueOf());

  return dayjs(time);
}

export function calculateRelativeDays(
  startDate: string | null,
  form: FormData
) {
  if (!startDate) return null;

  const date = dayjs(startDate);
  const operation = form.get("operation") as string;

  const isInvalid = date.isValid() === false;

  if (isInvalid || !checkDateRelativeOperation(operation)) {
    return null;
  }

  return operationReducer(form, date, operation);
}

export function DateRelative() {
  return (
    <div className="date-relative">
      <label className="form-control">
        Day
        <Input
          className="date-relative__input"
          type="number"
          name="day"
          min="0"
        />
      </label>
      <label className="form-control">
        Month
        <Input
          className="date-relative__input"
          type="number"
          name="month"
          min="0"
        />
      </label>
      <label className="form-control">
        Year
        <Input
          className="date-relative__input"
          type="number"
          name="year"
          min="0"
        />
      </label>
    </div>
  );
}
