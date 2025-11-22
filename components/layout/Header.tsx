"use client";

import React from "react";
import Image from "next/image";
import { apiQueue } from "@/lib/apiQueue";

export function Header() {
  const handleMoveMoney = () => {
    // trigger echo api on move money click
    apiQueue.enqueue("Move Money Request");
  };

  return (
    <header className="h-14 bg-gray-50 flex items-center justify-between px-3 md:px-6 flex-shrink-0">
      {/* greeting */}
      <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
        <Image
          src="/avatar.png"
          alt="Arthur Taylor"
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 object-cover"
        />
        <div className="text-sm min-w-0">
          <div className="truncate" style={{ fontSize: '16px', lineHeight: '20px', letterSpacing: '-1.5%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>Arthur Taylor</div>
          <div className="hidden sm:block" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
            Welcome back to Apex 👋
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
        {/* search */}
        <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Image
            src="/search.svg"
            alt="Search"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
        </button>

        {/* notifications */}
        <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Image
            src="/bell.svg"
            alt="Notifications"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* move money button */}
        <button
          onClick={handleMoveMoney}
          className="bg-blue-600 px-2 py-1 md:px-3 md:py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 md:space-x-1.5"
          style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#FFFFFF' }}
        >
          <span className="hidden sm:inline">Move Money</span>
          <span className="sm:hidden">Move</span>
          <Image
            src="/arrow-right-up.svg"
            alt="Arrow"
            width={14}
            height={14}
            className="flex-shrink-0"
          />
        </button>
      </div>
    </header>
  );
}

