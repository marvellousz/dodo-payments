import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * Reusable Card component
 * Provides consistent card styling across the application
 */
export function Card({ children, className = "", title }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}
    >
      {title && (
        <h3 className="mb-4" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>{title}</h3>
      )}
      {children}
    </div>
  );
}

