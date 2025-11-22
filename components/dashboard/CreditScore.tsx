"use client";

import React from "react";
import Image from "next/image";

export function CreditScore() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Image
                src="/credit.svg"
                alt="Credit Score"
                width={20}
                height={20}
                className="shrink-0"
              />
              <h2 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>Credit Score</h2>
            </div>
        <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#525866' }}>
          Details
        </button>
      </div>

      {/* score */}
      <div className="mb-1 flex-1">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="mb-0.5" style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-1.5%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
              Your <span style={{ color: '#0E121B' }}>credit score</span> is <span style={{ fontWeight: 500, color: '#0E121B' }}>710</span>
            </div>
            <div className="mb-0" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
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
      <div className="flex items-end space-x-0.5 h-6">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-full ${
              i < 25 ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

