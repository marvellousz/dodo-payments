"use client";

import React, { useState } from "react";
import Image from "next/image";

// sidebar nav items
const mainItems = [
  { name: "Dashboard", icon: "dashboard" },
  { name: "My Cards", icon: "cards" },
  { name: "Transfer", icon: "transfer" },
  { name: "Transactions", icon: "transactions" },
  { name: "Payments", icon: "payments" },
  { name: "Exchange", icon: "exchange" },
];

const otherItems = [
  { name: "Settings", icon: "settings" },
  { name: "Support", icon: "support" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 h-screen flex-col flex-shrink-0">
      {/* logo section */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/apex.svg"
              alt="Apex Logo"
              width={40}
              height={40}
              className="flex-shrink-0"
            />
            <div>
              <div style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>Apex</div>
              <div style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>Finance & Banking</div>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 8l7-7 7 7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 16l7 7 7-7"
              />
            </svg>
          </button>
        </div>
        {/* Half-width border line */}
        <div className="mt-4 mx-4 border-b border-gray-200"></div>
      </div>

      {/* nav items */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div>
          <div className="text-xs font-medium text-gray-400 uppercase mb-3 px-3 tracking-[0.04em]" style={{ fontSize: '12px', lineHeight: '16px', fontFamily: 'Inter' }}>
            MAIN
          </div>
          <div className="space-y-1">
            {mainItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center justify-between space-x-3 px-3 py-2.5 rounded-lg transition-colors relative cursor-pointer ${
                    isActive
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500 }}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {/* Blue bar indicator for active item */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{ backgroundColor: '#335CFF' }}></div>
                    )}
                    {item.icon === "dashboard" ? (
                      <Image
                        src="/dashboard.svg"
                        alt="Dashboard"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? {} : { filter: 'brightness(0) saturate(0%) invert(40%)' }}
                      />
                    ) : item.icon === "cards" ? (
                      <Image
                        src="/cards.svg"
                        alt="My Cards"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : item.icon === "transfer" ? (
                      <Image
                        src="/transfer.svg"
                        alt="Transfer"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : item.icon === "transactions" ? (
                      <Image
                        src="/transactions.svg"
                        alt="Transactions"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : item.icon === "payments" ? (
                      <Image
                        src="/payments.svg"
                        alt="Payments"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : item.icon === "exchange" ? (
                      <Image
                        src="/exchange.svg"
                        alt="Exchange"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : (
                      <span>{item.icon}</span>
                    )}
                    <span style={{ color: isActive ? '#0E121B' : '#525866' }}>{item.name}</span>
                  </div>
                  {/* Right chevron for active item */}
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-gray-400 uppercase mb-3 px-3 tracking-[0.04em]" style={{ fontSize: '12px', lineHeight: '16px', fontFamily: 'Inter' }}>
            OTHERS
          </div>
          <div className="space-y-1">
            {otherItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center justify-between space-x-3 px-3 py-2.5 rounded-lg transition-colors relative cursor-pointer ${
                    isActive
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500 }}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {/* Blue bar indicator for active item */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{ backgroundColor: '#335CFF' }}></div>
                    )}
                    {item.icon === "settings" ? (
                      <Image
                        src="/settings.svg"
                        alt="Settings"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : item.icon === "support" ? (
                      <Image
                        src="/support.svg"
                        alt="Support"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                        style={isActive ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(221deg) brightness(98%) contrast(101%)' } : {}}
                      />
                    ) : (
                      <span>{item.icon}</span>
                    )}
                    <span style={{ color: isActive ? '#0E121B' : '#525866' }}>{item.name}</span>
                  </div>
                  {/* Right chevron for active item */}
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* profile footer */}
      <div className="p-4 pt-0">
        {/* Half-width border line */}
        <div className="mb-4 mx-4 border-t border-gray-200"></div>
        <div className="flex items-center space-x-3">
          <Image
            src="/avatar.png"
            alt="Arthur Taylor"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <div className="truncate" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
                Arthur Taylor
              </div>
              <Image
                src="/verified.svg"
                alt="Verified"
                width={16}
                height={16}
                className="flex-shrink-0"
              />
            </div>
            <div className="truncate" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
              arthur@alignui.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

