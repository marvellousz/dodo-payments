"use client";

import React from "react";
import Image from "next/image";

export function CreditScore() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Image
                src="/credit.svg"
                alt="Credit Score"
                width={20}
                height={20}
                className="shrink-0"
              />
              <h2 className="text-lg font-semibold text-gray-900">Credit Score</h2>
            </div>
        <button className="px-3 py-1.5 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.006em', fontFamily: 'Inter', fontWeight: 500, color: '#525866' }}>
          Details
        </button>
      </div>

      {/* score */}
      <div className="mb-2 flex-1">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="mb-0.5" style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.015em', fontFamily: 'Inter', fontWeight: 400, color: '#0E121B' }}>
              Your <span style={{ fontWeight: 700 }}>credit score</span> is <span style={{ fontWeight: 700 }}>710</span>
            </div>
            <div style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
              This score is considered to be Excellent.
            </div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFF1EB' }}>
            <Image
              src="/emoji.png"
              alt="Emoji"
              width={24}
              height={24}
              className="shrink-0"
            />
          </div>
        </div>
      </div>

      {/* bar graph */}
      <div className="flex items-end space-x-0.5 h-6 mt-auto">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t h-full ${
              i < 40 ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

