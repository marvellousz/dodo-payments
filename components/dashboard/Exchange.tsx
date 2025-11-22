"use client";

import React from "react";
import Image from "next/image";
import { apiQueue } from "@/lib/apiQueue";

export function Exchange() {
  const handleExchange = () => {
    apiQueue.enqueue("Exchange Currency");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-full w-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/exchangee.svg"
            alt="Exchange"
            width={20}
            height={20}
            className="shrink-0"
          />
          <h2 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>Exchange</h2>
        </div>
        <button className="px-3 py-1.5 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          Currencies
        </button>
      </div>

      {/* main exchange card */}
      <div className="bg-white border border-gray-200 rounded-lg mb-2 flex-1 flex flex-col min-h-0">
        {/* currency selectors side by side */}
        <div className="flex items-center justify-between p-3 pb-2">
          {/* From */}
          <div className="flex items-center space-x-2">
            <Image
              src="/us.png"
              alt="USD"
              width={24}
              height={24}
              className="shrink-0 rounded-full"
            />
            <div className="text-sm font-semibold text-gray-900 flex items-center space-x-1 cursor-pointer">
              <span>USD</span>
              <div className="w-5 h-5 border border-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Vertical line before double arrow */}
          <div className="w-px h-6 bg-gray-200"></div>

          {/* Double arrow */}
          <div className="flex items-center">
            <Image
              src="/double-arrows.svg"
              alt="Swap"
              width={24}
              height={24}
              className="shrink-0"
            />
          </div>

          {/* Vertical line after double arrow */}
          <div className="w-px h-6 bg-gray-200"></div>

          {/* To */}
          <div className="flex items-center space-x-2">
            <Image
              src="/eur.png"
              alt="EUR"
              width={24}
              height={24}
              className="shrink-0 rounded-full"
            />
            <div className="text-sm font-semibold text-gray-900 flex items-center space-x-1 cursor-pointer">
              <span>EUR</span>
              <div className="w-5 h-5 border border-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal line below currency selectors */}
        <div className="h-px bg-gray-200 mx-3"></div>

        {/* Amount and Available balance - centered */}
        <div className="flex-1 flex flex-col justify-center items-center px-3">
          {/* Amount */}
          <div className="mb-2 text-center" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.5%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>$100.00</div>

          {/* Available balance */}
          <div className="text-center" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
            Available : <span style={{ fontWeight: 500, color: '#0E121B' }}>$16,058.94</span>
          </div>
        </div>

        {/* Exchange rate bar at bottom */}
        <div className="bg-gray-50 rounded-b-lg px-3 py-2 border-t border-gray-100">
          <div className="text-center" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
            1 USD = <span style={{ fontWeight: 500, color: '#0E121B' }}>0.94 EUR</span>
          </div>
        </div>
      </div>

      {/* fees breakdown */}
      <div className="space-y-2 mb-2 shrink-0">
        <div className="flex justify-between" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400 }}>
          <span className="text-gray-600">Tax (2%)</span>
          <span className="text-gray-900" style={{ fontWeight: 500 }}>$2.00</span>
        </div>
        <div className="flex justify-between" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400 }}>
          <span className="text-gray-600">Exchange fee (1%)</span>
          <span className="text-gray-900" style={{ fontWeight: 500 }}>$1.00</span>
        </div>
        <div className="flex justify-between" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400 }}>
          <span className="text-gray-900">Total amount</span>
          <span className="text-gray-900" style={{ fontWeight: 500 }}>€90.7</span>
        </div>
      </div>

      {/* exchange button */}
      <button
        onClick={handleExchange}
        className="w-full bg-white border border-gray-200 text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
      >
        <Image
          src="/exchangee.svg"
          alt="Exchange"
          width={16}
          height={16}
          className="shrink-0"
        />
        <span>Exchange</span>
      </button>
    </div>
  );
}
