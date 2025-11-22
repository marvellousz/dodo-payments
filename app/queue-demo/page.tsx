"use client";

import React, { useState, useEffect } from "react";
import { apiQueue, QueueJob } from "@/lib/apiQueue";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            API Queue System Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience a production-ready API queue system with sequential processing,
            2-second delays, and rate limiting (5 requests per minute per IP).
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Requests"
            value={stats.total}
            icon="📊"
            color="blue"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon="✅"
            color="green"
          />
          <StatCard
            label="Failed"
            value={stats.failed}
            icon="❌"
            color="red"
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            icon="⏳"
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Request Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Request
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Message"
                  placeholder="Enter your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="primary" className="w-full">
                  Add to Queue
                </Button>
              </form>

              {/* Quick Add Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quick Actions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Test Message 1",
                    "Test Message 2",
                    "Move Money",
                    "Add Card",
                  ].map((msg) => (
                    <Button
                      key={msg}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleQuickAdd(msg)}
                      className="text-xs"
                    >
                      {msg}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">
                  How it works
                </h3>
              </div>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Requests are queued sequentially</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>One request processes at a time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>2-second delay per request</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Rate limit: 5/min per IP</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>HTTP 429 on limit exceeded</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Queue Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Currently Processing */}
            {processingJob && (
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 animate-spin"
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
                      <h3 className="text-lg font-semibold">Processing</h3>
                      <p className="text-blue-100 text-sm">
                        {processingJob.message}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {Math.round((Date.now() - processingJob.timestamp) / 1000)}s
                    </div>
                    <div className="text-blue-100 text-xs">elapsed</div>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-white h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}

            {/* Pending Queue */}
            {pendingJobs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600 text-lg">⏳</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Pending Queue
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    {pendingJobs.length} waiting
                  </span>
                </div>
                <div className="space-y-2">
                  {pendingJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {job.message}
                        </p>
                        <p className="text-xs text-gray-500">
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
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-lg">✅</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Completed
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {completedJobs.length} success
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {completedJobs.slice().reverse().map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
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
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {job.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-xs text-gray-500">
                            {job.result?.echo && `Echo: "${job.result.echo}"`}
                          </p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-500">
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
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 text-lg">❌</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Failed
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {failedJobs.length} errors
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {failedJobs.slice().reverse().map((job) => (
                    <div
                      key={job.id}
                      className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
                        <p className="text-sm font-medium text-gray-900">
                          {job.message}
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          {job.error || "Unknown error"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
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
              <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg text-center">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No requests yet
                </h3>
                <p className="text-gray-500">
                  Add a request to see the queue system in action
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: "blue" | "green" | "red" | "yellow";
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    green: "bg-green-100 text-green-600 border-green-200",
    red: "bg-red-100 text-red-600 border-red-200",
    yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl border ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
