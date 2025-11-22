"use client";

import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Reusable Input component
 * Includes label and error message support
 * Properly styled with TailwindCSS
 */
export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-2 border rounded-lg text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

