import cn from "classnames";
import "./Input.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "unstyled" | "default";
}

export function Input({
  className,
  variant = "default",
  ...props
}: InputProps) {
  return (
    <input
      type="text"
      className={cn({ input: variant !== "unstyled" }, className)}
      {...props}
    />
  );
}
