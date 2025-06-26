import React from "react";
import cn from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
  };

const btnClass =
  "text-text-300 bg-icon-600 hover:bg-icon-700 focus:ring-4 focus:ring-link-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-icon-600 dark:hover:bg-icon-700 focus:outline-none dark:focus:ring-accent-300";

export const Button: React.FC<ButtonProps> = ({
  href,
  type = "button",
  className,
  children,
  ...rest
}) => {
  const classes = cn(className, btnClass);
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
