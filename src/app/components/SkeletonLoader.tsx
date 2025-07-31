import React from "react";
import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx("animate-pulse bg-blue-300 dark:bg-blue-700 rounded", className)}
    />
  );
}
