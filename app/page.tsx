"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MyCards } from "@/components/dashboard/MyCards";
import { SpendingSummary } from "@/components/dashboard/SpendingSummary";
import { TotalExpenses } from "@/components/dashboard/TotalExpenses";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Subscriptions } from "@/components/dashboard/Subscriptions";
import { Exchange } from "@/components/dashboard/Exchange";
import { CreditScore } from "@/components/dashboard/CreditScore";

export default function Home() {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden p-3">
          <div className="h-full">
            {/* 3 Column Grid Layout - All 7 Cards */}
            <div className="grid grid-cols-3 gap-3 w-full h-full">
              {/* COLUMN 1: My Cards + Recent Transactions (equal heights) */}
              <div className="flex flex-col gap-3 h-full">
                <div className="flex-1 min-h-0">
                  <MyCards />
                </div>
                <div className="flex-1 min-h-0">
                  <RecentTransactions />
                </div>
              </div>

              {/* COLUMN 2: Spending Summary + My Subscriptions (equal heights) */}
              <div className="flex flex-col gap-3 h-full">
                <div className="flex-1 min-h-0">
                  <SpendingSummary />
                </div>
                <div className="flex-1 min-h-0">
                  <Subscriptions />
                </div>
              </div>

              {/* COLUMN 3: Total Expenses + Exchange + Credit Score (1:2:1 ratio) */}
              <div className="flex flex-col gap-3 h-full">
                {/* Total Expenses - 1 part */}
                <div className="flex-[1] min-h-0">
                  <TotalExpenses />
                </div>
                {/* Exchange - 2 parts (double height) */}
                <div className="flex-[2] min-h-0">
                  <Exchange />
                </div>
                {/* Credit Score - 1 part */}
                <div className="flex-[1] min-h-0">
                  <CreditScore />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
