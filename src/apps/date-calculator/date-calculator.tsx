import { useRef, useState } from "react";
import { DatePickerInput } from "../../components/date-picker-input/date-picker-input";
import "./date-calculators.scss";
import { RadioGroup } from "../../components/radio-group";
import {
  calculateRelativeDays,
  checkIsDateRelativeChange,
  DateRelative,
  type DateRelativeOperation,
} from "./date-relative";
import type { Dayjs } from "dayjs";
import {
  calculateDistance,
  checkIsDateDistanceChange,
  DistanceOutput,
  type CalculateDistanceOutput,
  type DateDistanceOperation,
} from "./date-distance";

type DateCalculatorResultDistance = {
  type: "distance";
  output: CalculateDistanceOutput;
};

type DateCalculatorResultCalc = {
  type: "relative";
  output: Dayjs;
};

type DateCalculatorResult =
  | DateCalculatorResultDistance
  | DateCalculatorResultCalc
  | null;

export function DateCalculatorApp() {
  const [app, setApp] = useState<{
    mode: DateRelativeOperation | DateDistanceOperation | "none";
    result: DateCalculatorResult;
  }>({ mode: "none", result: null });
  const numberFormat = useRef(new Intl.NumberFormat("en-US"));

  const { mode, result } = app;
  function setResult(result: DateCalculatorResult) {
    setApp({ mode: app.mode, result });
  }

  function setMode(
    mode: DateRelativeOperation | DateDistanceOperation | "none"
  ) {
    setApp({ mode, result: null });
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleFormChange(event: React.ChangeEvent<HTMLFormElement>) {
    const isOperationChange = event.target.name === "operation";
    const form = new FormData(event.currentTarget);
    if (isOperationChange) {
      setMode(event.target.value as "add" | "subtract" | "distance");
      return;
    }

    const isDateRelativeChange = mode === "add" || mode === "subtract";
    if (isDateRelativeChange) {
      const output = calculateRelativeDays(
        form.get("start-date-calendar") as string,
        form
      );

      if (output === null) return setResult(null);

      setResult({ type: "relative", output });
    }

    const isDistanceChange = checkIsDateDistanceChange(mode);
    if (isDistanceChange) {
      const output = calculateDistance(form);
      if (output === null) return setResult(null);

      setResult({ type: "distance", output });
    }
  }

  const output =
    result?.type === "relative" ? (
      <>
        <p>
          The date is{" "}
          <span className="text-accent">
            {result.output.format("dddd, D MMMM YYYY")}
          </span>
        </p>
      </>
    ) : result?.type === "distance" ? (
      <DistanceOutput output={result.output}>
        {result.output.distance.map(({ unit, value }) => (
          <span key={unit}>
            {numberFormat.current.format(value)}{" "}
            <span className="text-accent">{unit} </span>{" "}
          </span>
        ))}
      </DistanceOutput>
    ) : null;

  return (
    <div className="date-calculator-app">
      <p>Apps / Date Calculator</p>
      <form
        className="date-calculator-form"
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      >
        <label className="control" htmlFor="start-date-calendar">
          Start Date
          <DatePickerInput
            className="input__date"
            name="start-date-calendar"
            id="start-date-calendar"
            placeholder="mm/dd/yyyy"
            buttonLabel="Select start date"
          />
        </label>
        <RadioGroup name="operation" label="Operation">
          <RadioGroup.OptionButton value="add">
            <RadioGroup.OptionButtonIcon size={40} label="Add">
              <svg
                data-slot="icon"
                aria-hidden="true"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.5v15m7.5-7.5h-15"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </RadioGroup.OptionButtonIcon>
          </RadioGroup.OptionButton>
          <RadioGroup.OptionButton value="subtract">
            <RadioGroup.OptionButtonIcon size={40} label="Minus">
              <svg
                data-slot="icon"
                aria-hidden="true"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </RadioGroup.OptionButtonIcon>
          </RadioGroup.OptionButton>
          <RadioGroup.OptionButton value="distance">
            <RadioGroup.OptionButtonIcon size={40} label="Between">
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#a)">
                  <g clip-path="url(#b)">
                    <path
                      d="M6.75 4v2.25M17.25 4v2.25M3 19.75V8.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 8.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 22h13.5A2.25 2.25 0 0 0 21 19.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 10h13.5A2.25 2.25 0 0 1 21 12.25v7.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM18 18a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                      fill="currentColor"
                    />
                    <path d="M9 14c5.648-.19 0 4 6 4" stroke="currentColor" />
                  </g>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="currentColor" d="M0 0h24v24H0z" />
                  </clipPath>
                  <clipPath id="b">
                    <path fill="currentColor" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </svg>
            </RadioGroup.OptionButtonIcon>
          </RadioGroup.OptionButton>
        </RadioGroup>
        {mode === "distance" ? (
          <>
            <label className="control" htmlFor="end-date-calendar">
              End Date
              <DatePickerInput
                className="input__date"
                name="end-date-calendar"
                id="end-date-calendar"
                placeholder="mm/dd/yyyy"
                buttonLabel="Select end date"
              />
            </label>
          </>
        ) : null}
        {mode === "add" || mode === "subtract" ? <DateRelative /> : null}
      </form>
      <div className="date-calculator__result">
        {result ? (
          <p>{output}</p>
        ) : (
          <div aria-hidden="true" className="text-invisible">
            Result will be shown here
          </div>
        )}
      </div>
    </div>
  );
}
