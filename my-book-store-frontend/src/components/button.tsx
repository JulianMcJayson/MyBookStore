"use client";
import clsx from "clsx";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        "hover:cursor-pointer hover:opacity-70 duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
