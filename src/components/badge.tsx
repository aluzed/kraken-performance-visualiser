import React from "react";
import cn from "classnames";

export type BadgeParams = {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  color: "green" | "red";
};

function Badge({ children, color, title, className }: BadgeParams) {
  return (
    <span
      className={cn(className, "font-medium me-2 px-2.5 py-0.5 rounded", {
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
          color === "red",
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
          color === "green",
      })}
      {...(title ? { title } : {})}
    >
      {children}
    </span>
  );
}

export default Badge;
