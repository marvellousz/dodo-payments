"use client";

import React from "react";
import Image from "next/image";
import LineGraph from "./LineGraph";

export function TotalExpenses() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <div className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shrink-0">
          <Image
            src="/arrow-left-down.svg"
            alt="Total Expenses"
            width={20}
            height={20}
            className="shrink-0"
          />
        </div>
      </div>

      {/* graph */}
      <div className="mb-2 flex-1 min-h-0 flex items-center justify-end pr-4">
        <LineGraph
          data={[20, 85, 25, 70, 45, 80]}
          width={200}
          height={80}
          lineColor="#4F63F6"
          strokeWidth={3}
        />
      </div>

      {/* total */}
      <div className="mt-auto">
        <h2 className="mb-2" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
          Total Expenses
        </h2>
        <div className="flex items-center space-x-2">
          <div style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.5%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
            $6,240.28
          </div>
          <span className="px-2 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#FFC0C5', color: '#681219' }}>-2%</span>
        </div>
      </div>
    </div>
  );
}

