import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  onClick?: () => void; // optional click handler
}

export function Card({ children, className = "", noPadding = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md ${noPadding ? "" : "p-4"} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
