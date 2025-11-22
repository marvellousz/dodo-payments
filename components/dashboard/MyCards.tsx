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
          <h2 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>My Cards</h2>
        </div>
        <button
          onClick={handleAddCard}
          className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
          style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#525866' }}
        >
          <span>+</span>
          <span>Add Card</span>
        </button>
      </div>

      {/* card display */}
      <div className="relative mb-2 flex-1 min-h-0">
        <div className="bg-white border border-gray-200 rounded-xl p-5 w-full h-full relative overflow-hidden">
          {/* decorative design lines - top right */}
          <div className="absolute top-0 right-0 opacity-60 pointer-events-none">
            <Image
              src="/tri2.svg"
              alt="Decorative pattern"
              width={86}
              height={68}
              className="shrink-0"
            />
          </div>
          
          {/* decorative design lines - side */}
          <div className="absolute top-0 right-0 opacity-60 pointer-events-none" style={{ transform: 'translateY(10%)' }}>
            <Image
              src="/tri.svg"
              alt="Decorative pattern"
              width={48}
              height={129}
              className="shrink-0"
            />
          </div>
          
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
              <div style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.5%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>$16,058.94</div>
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
        <div className="flex bg-gray-50 rounded-lg overflow-hidden">
          {["Daily", "Weekly", "Monthly"].map((tab, index) => {
            const isSelected = selectedTab === tab;
            return (
              <React.Fragment key={tab}>
                <button
                  onClick={() => setSelectedTab(tab)}
                  className="flex-1 py-2 transition-colors relative"
                  style={{ 
                    fontSize: '12px', 
                    lineHeight: '16px', 
                    letterSpacing: '0%', 
                    fontFamily: 'Inter', 
                    fontWeight: 500, 
                    color: isSelected ? '#0E121B' : '#525866',
                    backgroundColor: isSelected ? '#E1E4EA' : 'transparent',
                    borderRadius: index === 0 ? '0.5rem 0 0 0.5rem' : index === 2 ? '0 0.5rem 0.5rem 0' : '0'
                  }}
                >
                  {tab}
                </button>
                {index < 2 && (
                  <div className="w-px bg-gray-200 self-stretch"></div>
                )}
              </React.Fragment>
            );
          })}
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
            <div className="mb-1" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>Spending Limit</div>
            <div className="flex items-baseline gap-1">
              <div style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-1.5%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>$1,500.00</div>
              <div style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, color: '#99A0AE' }}>/ week</div>
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

