"use client";

import React, { useState } from "react";
import Image from "next/image";
import { apiQueue } from "@/lib/apiQueue";

export function MyCards() {
  const [selectedTab, setSelectedTab] = useState("Weekly");

  const handleAddCard = () => {
    apiQueue.enqueue("Add Card Request");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col overflow-hidden min-h-0">
      {/* header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center space-x-2">
          <Image
            src="/cards.svg"
            alt="My Cards"
            width={20}
            height={20}
            className="shrink-0"
          />
          <h2 className="text-lg font-semibold text-gray-900">My Cards</h2>
        </div>
        <button
          onClick={handleAddCard}
          className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-900">+</span>
          <span>Add Card</span>
        </button>
      </div>

      {/* card display */}
      <div className="relative mb-2 flex-1 min-h-0">
        <div className="bg-white border border-gray-200 rounded-xl p-5 w-full h-full relative overflow-hidden">
          {/* card content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/apex.svg"
                  alt="Apex Logo"
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <Image
                  src="/wifi-line.svg"
                  alt="WiFi"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <div className="flex items-center space-x-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded-lg">
                  <Image
                    src="/green-tick.svg"
                    alt="Active"
                    width={12}
                    height={12}
                    className="shrink-0"
                  />
                  <span className="text-xs text-gray-900">Active</span>
                </div>
              </div>
              {/* mastercard logo */}
              <Image
                src="/mastercard.png"
                alt="Mastercard"
                width={32}
                height={20}
                className="shrink-0 opacity-80"
              />
            </div>

            <div>
              <div style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }} className="mb-1">Savings Card</div>
              <div style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.5%', fontFamily: 'Inter Display', fontWeight: 500, color: '#0E121B' }}>$16,058.94</div>
            </div>
          </div>

          {/* navigation arrows */}
          <div className="absolute bottom-4 right-4 flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
            <button className="w-8 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-200">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-8 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* tabs bar */}
      <div className="mb-2 shrink-0">
        <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg">
          {["Daily", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-2 text-xs rounded-md transition-colors ${
                selectedTab === tab
                  ? "bg-white text-gray-900 font-medium shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* spending limit */}
      <div className="shrink-0">
        <div className="flex items-center gap-3">
          {/* circular progress indicator */}
          <div className="shrink-0">
            <svg width="48" height="48" className="transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="6"
              />
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke="#2563eb"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 18 * 0.5} ${2 * Math.PI * 18}`}
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* text content */}
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-700 mb-1">Spending Limit</div>
            <div className="flex items-baseline gap-1">
              <div className="text-base font-bold text-gray-900">$1,500.00</div>
              <div className="text-xs text-gray-500">/ week</div>
            </div>
          </div>

          {/* arrow button */}
          <button className="shrink-0 w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

