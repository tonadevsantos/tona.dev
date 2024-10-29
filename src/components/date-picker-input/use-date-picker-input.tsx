import { useRef } from "react";
import type { InputProps } from "../Input";
import dayjs from "dayjs";

export interface DatePickerInputProps extends InputProps {
  /**
   * Let the user know what the input is for.
   */
  buttonLabel: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useDatePickerInput({
  buttonLabel,
  ...inputProps
}: DatePickerInputProps) {
  const ref = useRef<HTMLElement | null>(null);

  function handleInputDate(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    const isInvalid = dayjs(value).isValid() === false;
    if (isInvalid) {
      // trigger error
    }
  }

  const dateInputProps = {
    ...inputProps,
    onChange: handleInputDate,
    // value: dayjs(inputProps.value)
  };

  return {
    dateInputProps,
  };
}

// function checkShouldChangeDate(value: string) {
//   const [first] = value;
//   const prev = value[value.length - 2];
//   const last = value[value.length - 1];

//   if (isNaN(parseInt(first))) {
//     return false;
//   }

//   if (prev === "/" && last === "/") {
//     return false;
//   }

//   return last === "/" || typeof parseInt(last) === "number";
// }
