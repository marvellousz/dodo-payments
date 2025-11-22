"use client";

import React, { useState } from "react";
import Image from "next/image";
import { apiQueue } from "@/lib/apiQueue";

const transactions = [
  {
    type: "incoming",
    title: "Salary Deposit",
    amount: 3500.0,
    icon: "🏢",
    description: "Monthly salary from Apex...",
    date: "Sep 18",
  },
  {
    type: "incoming",
    title: "Stock Dividend",
    amount: 846.14,
    icon: "📈",
    description: "Payment from stock investm...",
    date: "Sep 18",
  },
  {
    type: "incoming",
    title: "Rental Income",
    amount: 100.0,
    icon: "🏠",
    description: "Rental payment from Mr. Du...",
    date: "Sep 17",
  },
  {
    type: "incoming",
    title: "Refund from Amazon",
    amount: 36.24,
    icon: "a",
    description: "Refund of Order No #124235",
    date: "Sep 15",
  },
];

export function RecentTransactions() {
  const [activeTab, setActiveTab] = useState("Incoming");

  const handleSeeAll = () => {
    apiQueue.enqueue("View All Transactions");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/recent.svg"
            alt="Recent Transactions"
            width={20}
            height={20}
            className="flex-shrink-0"
          />
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <button
          onClick={handleSeeAll}
          className="px-3 py-1.5 font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.006em', fontFamily: 'Inter', fontWeight: 500 }}
        >
          See All
        </button>
      </div>

      {/* tabs */}
      <div className="flex space-x-1 mb-2 bg-gray-50 p-1 rounded-lg">
        {["Incoming", "Outgoing", "Pending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* transactions list */}
      <div className="space-y-1.5 flex-1 overflow-y-auto min-h-0 scrollbar-hide">
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div 
                className={`w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 ${
                  tx.title === "Rental Income" ? "" : "bg-white"
                }`}
                style={tx.title === "Rental Income" ? { backgroundColor: '#E0FAEC' } : {}}
              >
                {tx.title === "Salary Deposit" ? (
                  <Image
                    src="/salary-deposit.svg"
                    alt="Salary Deposit"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                ) : tx.title === "Stock Dividend" ? (
                  <Image
                    src="/stock-dividend.svg"
                    alt="Stock Dividend"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                ) : tx.title === "Rental Income" ? (
                  <Image
                    src="/rental-income.svg"
                    alt="Rental Income"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                ) : tx.title === "Refund from Amazon" ? (
                  <Image
                    src="/amazonn.png"
                    alt="Amazon"
                    width={20}
                    height={20}
                    className="flex-shrink-0 object-contain"
                  />
                ) : tx.icon === "a" ? (
                  <span className="text-blue-600 font-bold">a</span>
                ) : (
                  <span className="text-lg">{tx.icon}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                  {tx.title}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {tx.description}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ${tx.amount.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400">{tx.date}</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Image
                  src="/arrow-right.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="flex-shrink-0"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

