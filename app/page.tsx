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
    <div className="min-h-screen md:h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto md:overflow-hidden p-3">
          <div className="h-full md:h-full">
            {/* Responsive Grid Layout - 1 column on mobile, 2 columns on tablet, 3 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-full md:h-full">
              {/* COLUMN 1: My Cards + Recent Transactions */}
              <div className="flex flex-col gap-3 h-full md:h-full">
                <div className="flex-1 min-h-[400px] md:min-h-0">
                  <MyCards />
                </div>
                <div className="flex-1 min-h-[400px] md:min-h-0">
                  <RecentTransactions />
                </div>
              </div>

              {/* COLUMN 2: Spending Summary + My Subscriptions */}
              <div className="flex flex-col gap-3 h-full md:h-full">
                <div className="flex-1 min-h-[400px] md:min-h-0">
                  <SpendingSummary />
                </div>
                <div className="flex-1 min-h-[400px] md:min-h-0">
                  <Subscriptions />
                </div>
              </div>

              {/* COLUMN 3: Total Expenses + Exchange + Credit Score */}
              <div className="flex flex-col gap-3 h-full md:h-full">
                <div className="flex-[1] min-h-[200px] md:min-h-0">
                  <TotalExpenses />
                </div>
                <div className="flex-[2] min-h-[400px] md:min-h-0">
                  <Exchange />
                </div>
                <div className="flex-[1] min-h-[200px] md:min-h-0">
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
