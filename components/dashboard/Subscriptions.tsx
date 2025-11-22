"use client";

import React from "react";
import Image from "next/image";
import { apiQueue } from "@/lib/apiQueue";

const subscriptions = [
  {
    name: "Spotify",
    amount: "$7.99",
    frequency: "/month",
    logo: "/spotify.png",
    status: "Paid",
    statusColor: "#E0FAEC",
    statusTextColor: "#065F46",
  },
  {
    name: "Youtube Music",
    amount: "$79.99",
    frequency: "/year",
    logo: "/youtube.png",
    status: "Expiring",
    statusColor: "#F2F5F8",
    statusTextColor: "#525866",
  },
  {
    name: "Prime Video",
    amount: "$9.99",
    frequency: "/month",
    logo: "/amazon.png",
    status: "Paused",
    statusColor: "#FFF1EB",
    statusTextColor: "#EA580C",
  },
];

export function Subscriptions() {
  const handleSeeAll = () => {
    apiQueue.enqueue("View All Subscriptions");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/subscriptions.svg"
            alt="Subscriptions"
            width={20}
            height={20}
            className="shrink-0"
          />
          <h2 className="text-lg font-semibold text-gray-900">
                My Subscriptions
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

      {/* promo card */}
      <div className="rounded-xl p-3 mb-2 relative overflow-hidden w-full" style={{ backgroundColor: '#F5F7FA', minHeight: '124px' }}>
        <div className="absolute top-0 right-0">
          <Image
            src="/semi-circle.png"
            alt="Decorative"
            width={120}
            height={120}
            className="opacity-20"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="mb-2">
            <Image
              src="/apple.png"
              alt="Apple Music"
              width={40}
              height={40}
              className="shrink-0"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium mb-1" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.006em', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
              50% discount on Apple Music
            </div>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                For only $4.99 per month!
              </span>
              <span className="underline" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, color: '#525866' }}>
                Learn More
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* subscriptions list */}
      <div className="space-y-1.5 flex-1 overflow-y-auto min-h-0">
        {subscriptions.map((sub, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2 flex-1">
              <div className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center overflow-hidden bg-white">
                <Image
                  src={sub.logo}
                  alt={sub.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>{sub.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.006em', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>{sub.amount}</span>
                  <span className="font-medium" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#99A0AE' }}>{sub.frequency}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{ backgroundColor: sub.statusColor, color: sub.statusTextColor }}
              >
                {sub.status}
              </span>
              <button className="text-gray-400 hover:text-gray-600 flex flex-col items-center justify-center">
                <span className="w-1 h-1 bg-current rounded-full mb-0.5"></span>
                <span className="w-1 h-1 bg-current rounded-full mb-0.5"></span>
                <span className="w-1 h-1 bg-current rounded-full"></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

