import classNames from "classnames";
import "./radio-group.scss";
/**
 * @example
 * <RadioGroup name="options" value="add" onChange={onChange}>
 *  <RadioGroup.Option variant="icon" value="add">
 *      <SVGAdd />
 * </RadioGroup.Option>
 * </RadioGroup>
 */

import { createContext, useContext, useId, type ReactNode } from "react";

type FieldSetProps = React.HTMLAttributes<HTMLFieldSetElement>;

interface RadioGroupProps extends FieldSetProps {
  name: string;
  label: string;
}

const RadioGroupContext = createContext({
  name: "",
});

export function RadioGroup(props: RadioGroupProps) {
  const { name, label, className, ...fieldSetProps } = props;
  return (
    <RadioGroupContext.Provider value={{ name }}>
      <fieldset
        className={classNames("radio-group", className)}
        {...fieldSetProps}
      >
        <legend>{label}</legend>
        {props.children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupOptionButtonProps {
  value: string;
  children: React.ReactNode;
}

function RadioGroupOptionButton(props: RadioGroupOptionButtonProps) {
  const { value, children } = props;
  const id = useId();
  const { name } = useContext(RadioGroupContext);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.currentTarget.click();
    }
  }

  return (
    <label className="radio-group-option-button__label" htmlFor={id}>
      <input
        className="radio-group-option-button__input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onKeyDown={onKeyDown}
      />
      {children}
    </label>
  );
}

function RadioGroupOptionButtonIcon(props: {
  children: ReactNode;
  size?: number;
  label: string;
}) {
  const { size = 24, label } = props;
  return (
    <div
      style={{ width: size, height: size }}
      className="radio-group-option-button__icon"
    >
      {props.children}
      <span tabIndex={-1} className="radio-group-option-button__text">
        {label}
      </span>
    </div>
  );
}

RadioGroup.OptionButton = RadioGroupOptionButton;
RadioGroup.OptionButtonIcon = RadioGroupOptionButtonIcon;
