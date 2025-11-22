"use client";

import React from "react";
import Image from "next/image";
import GaugeBar from "./GaugeBar";

export function SpendingSummary() {
  const categories = [
    { name: "Shopping", amount: 900.0, icon: "/shopping.svg", bgColor: "#EBF1FF" },
    { name: "Utilities", amount: 600.0, icon: "/utilities.svg", bgColor: "#EBF8FF" },
    { name: "Others", amount: 300.0, icon: "/others.svg", bgColor: "#F2F5F8" },
  ];

  // Calculate cumulative amounts for gauge segments
  const shoppingAmount = categories[0].amount; // 900
  const utilitiesAmount = categories[0].amount + categories[1].amount; // 1500
  const othersAmount = categories[0].amount + categories[1].amount + categories[2].amount; // 1800
  const maxValue = 2000;
  const totalSpending = othersAmount;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Image
            src="/spending-summary.svg"
            alt="Spending Summary"
            width={20}
            height={20}
            className="shrink-0"
          />
          <h2 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
            Spending Summary
          </h2>
        </div>
        <button className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center space-x-1 cursor-pointer">
          <span>Last Week</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* donut chart - semi-circle */}
      <div className="flex justify-center mb-4 pb-4 border-b border-gray-100 flex-shrink-0">
        <GaugeBar
          value={totalSpending}
          max={maxValue}
          label="SPEND"
          size={200}
          thickness={20}
          segments={[
            { limit: shoppingAmount, color: '#3B4EF5' },      // Shopping - Dark Blue
            { limit: utilitiesAmount, color: '#5BA8FF' },     // Utilities - Light Blue
            { limit: othersAmount, color: '#E8EAED' },        // Others - Light Gray
            { limit: maxValue, color: '#E8EAED' }            // Remaining - Light Gray
          ]}
        />
      </div>

      {/* categories - horizontal layout */}
      <div className="flex items-start justify-between mb-3 flex-1">
        {categories.map((cat, index) => (
          <React.Fragment key={cat.name}>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: cat.bgColor }}>
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={24}
                  height={24}
                  className="shrink-0"
                />
              </div>
              <div className="mb-1 text-center" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>{cat.name}</div>
              <div className="text-sm text-gray-900 text-center">
                ${cat.amount.toFixed(2)}
              </div>
            </div>
            {index < categories.length - 1 && (
              <div className="h-16 border-l border-gray-100 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* note */}
      <div className="mt-auto pt-1 flex items-center justify-between shrink-0">
        <div className="px-3 py-2 border border-gray-200 rounded-lg flex items-center justify-between flex-1">
          <p className="text-xs text-gray-500">
            Your weekly spending limit is $2000.
          </p>
          <button className="w-4 h-4 flex items-center justify-center ml-2 hover:opacity-70 transition-opacity cursor-pointer">
            <Image
              src="/icon.svg"
              alt="Info"
              width={16}
              height={16}
              className="shrink-0"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
