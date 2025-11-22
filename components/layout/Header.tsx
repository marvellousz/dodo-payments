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
    <header className="h-14 bg-gray-50 flex items-center justify-between px-6 flex-shrink-0">
      {/* greeting */}
      <div className="flex items-center space-x-3">
        <Image
          src="/avatar.png"
          alt="Arthur Taylor"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
        />
        <div className="text-sm">
          <div className="font-bold text-gray-900" style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.015em', fontFamily: 'Inter', fontWeight: 700 }}>Arthur Taylor</div>
          <div className="text-gray-600" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.006em', fontFamily: 'Inter', fontWeight: 400 }}>
            Welcome back to Apex <span className="text-sm">👋</span>
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center space-x-3">
        {/* search */}
        <button className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Image
            src="/search.svg"
            alt="Search"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
        </button>

        {/* notifications */}
        <button className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
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
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1.5"
          style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.006em', fontFamily: 'Inter', fontWeight: 500 }}
        >
          <span>Move Money</span>
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

