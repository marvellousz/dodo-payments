import React from "react";

/**
 * Navigation bar component
 * Simple, clean navbar matching the design requirements
 */
export function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-gray-900">Dodo Payments</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">React Intern Assignment</span>
        </div>
      </div>
    </nav>
  );
}

