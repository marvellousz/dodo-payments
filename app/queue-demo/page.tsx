"use client";

import React, { useState, useEffect } from "react";
import { apiQueue, QueueJob } from "@/lib/apiQueue";
import Image from "next/image";

export default function QueueDemo() {
  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState<QueueJob[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    pending: 0,
  });

  useEffect(() => {
    const unsubscribe = apiQueue.subscribe((updatedJobs) => {
      setJobs(updatedJobs);
      setStats({
        total: updatedJobs.length,
        completed: updatedJobs.filter((j) => j.status === "completed").length,
        failed: updatedJobs.filter((j) => j.status === "failed").length,
        pending: updatedJobs.filter((j) => j.status === "pending").length,
      });
    });
    setJobs(apiQueue.getJobs());
    return unsubscribe;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      apiQueue.enqueue(message);
      setMessage("");
    }
  };

  const handleQuickAdd = (msg: string) => {
    apiQueue.enqueue(msg);
  };

  const pendingJobs = jobs.filter((j) => j.status === "pending");
  const processingJob = jobs.find((j) => j.status === "processing");
  const completedJobs = jobs.filter((j) => j.status === "completed");
  const failedJobs = jobs.filter((j) => j.status === "failed");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/dodo.svg"
                alt="Dodo Payments"
                width={32}
                height={32}
                className="shrink-0"
              />
              <span style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-1.5%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B' }}>
                Dodo Payments
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-sm" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#525866' }}>
                Dashboard
              </a>
              <a href="/queue-demo" className="text-sm" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
                Queue Demo
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-2%', fontFamily: 'Inter', fontWeight: 700, color: '#0E121B', marginBottom: '16px' }}>
            API Queue System
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '28px', letterSpacing: '-0.5%', fontFamily: 'Inter', fontWeight: 400, color: '#525866', maxWidth: '640px', margin: '0 auto' }}>
            Experience a production-ready API queue system with sequential processing,
            2-second delays, and rate limiting (5 requests per minute per IP).
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Requests"
            value={stats.total}
            color="#0E121B"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            color="#10B981"
          />
          <StatCard
            label="Failed"
            value={stats.failed}
            color="#EF4444"
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            color="#F59E0B"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Request Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-1%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B', marginBottom: '24px' }}>
                Add Request
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="message" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B', display: 'block', marginBottom: '8px' }}>
                    Message
                  </label>
                  <input
                    id="message"
                    type="text"
                    placeholder="Enter your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#0E121B' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                  style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#FFFFFF', backgroundColor: '#0E121B' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1f2e'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0E121B'}
                >
                  Add to Queue
                </button>
              </form>

              {/* Quick Add Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, color: '#525866', marginBottom: '12px' }}>
                  Quick Actions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Test Message 1",
                    "Test Message 2",
                    "Move Money",
                    "Add Card",
                  ].map((msg) => (
                    <button
                      key={msg}
                      onClick={() => handleQuickAdd(msg)}
                      className="px-3 py-2 border border-gray-200 rounded-lg transition-colors text-left cursor-pointer"
                      style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, color: '#525866' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                      }}
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B', marginBottom: '16px' }}>
                How it works
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                    Requests are queued sequentially
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                    One request processes at a time
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                    2-second delay per request
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                    Rate limit: 5/min per IP
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                    HTTP 429 on limit exceeded
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Queue Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Currently Processing */}
            {processingJob && (
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                        Processing
                      </h3>
                      <p style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>
                        {processingJob.message}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 600, color: '#FFFFFF' }}>
                      {Math.round((Date.now() - processingJob.timestamp) / 1000)}s
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: 'rgba(255, 255, 255, 0.6)' }}>
                      elapsed
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}

            {/* Pending Queue */}
            {pendingJobs.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B' }}>
                    Pending Queue
                  </h3>
                  <span className="px-3 py-1 rounded-full" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, backgroundColor: '#FEF3C7', color: '#92400E' }}>
                    {pendingJobs.length} waiting
                  </span>
                </div>
                <div className="space-y-2">
                  {pendingJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                        <span style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 600 }}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
                          {job.message}
                        </p>
                        <p style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#99A0AE' }}>
                          Queued {new Date(job.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Jobs */}
            {completedJobs.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B' }}>
                    Completed
                  </h3>
                  <span className="px-3 py-1 rounded-full" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, backgroundColor: '#D1FAE5', color: '#065F46' }}>
                    {completedJobs.length} success
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {completedJobs.slice().reverse().map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#10B981' }}>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }} className="truncate">
                          {job.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#99A0AE' }}>
                            {job.result?.echo && `Echo: "${job.result.echo}"`}
                          </p>
                          <span style={{ fontSize: '12px', color: '#E5E7EB' }}>•</span>
                          <p style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#99A0AE' }}>
                            {new Date(job.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Failed Jobs */}
            {failedJobs.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-1.1%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B' }}>
                    Failed
                  </h3>
                  <span className="px-3 py-1 rounded-full" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 500, backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                    {failedJobs.length} errors
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {failedJobs.slice().reverse().map((job) => (
                    <div
                      key={job.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#EF4444' }}>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 500, color: '#0E121B' }}>
                          {job.message}
                        </p>
                        <p style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#DC2626', marginTop: '4px' }}>
                          {job.error || "Unknown error"}
                        </p>
                        <p style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0%', fontFamily: 'Inter', fontWeight: 400, color: '#99A0AE', marginTop: '4px' }}>
                          {new Date(job.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {jobs.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', lineHeight: '28px', letterSpacing: '-1.5%', fontFamily: 'Inter', fontWeight: 600, color: '#0E121B', marginBottom: '8px' }}>
                  No requests yet
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866' }}>
                  Add a request to see the queue system in action
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.6%', fontFamily: 'Inter', fontWeight: 400, color: '#525866', marginBottom: '8px' }}>
            {label}
          </p>
          <p style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.5%', fontFamily: 'Inter', fontWeight: 600, color: color }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
