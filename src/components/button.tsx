import React from "react";
import cn from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    variant?: "primary" | "alternative";
  };

const btnClass =
  "font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4";

const primaryColors =
  "dark:focus:ring-accent-300 focus:ring-link-300 text-text-300 bg-icon-600 hover:bg-icon-700 dark:bg-icon-600 dark:hover:bg-icon-700";

const alternativeColors =
  "bg-bg-600 text-text-300 hover:bg-bg-500 dark:bg-bg-600 dark:hover:bg-bg-700";

const coloring = {
  primary: primaryColors,
  alternative: alternativeColors,
};

export const Button: React.FC<ButtonProps> = ({
  href,
  type = "button",
  className,
  children,
  variant = "primary",
  ...rest
}) => {
  const classes = cn(className, btnClass, coloring[variant]);
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};
