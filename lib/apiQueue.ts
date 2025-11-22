/**
 * Global API Queue System
 * 
 * Singleton pattern to manage API request queue across the application.
 * Handles queuing, processing, and state management for API requests.
 * 
 * In production, this could be extended to:
 * - Persist queue state (localStorage, IndexedDB)
 * - Retry failed requests with exponential backoff
 * - Priority queues for different request types
 * - WebSocket integration for real-time updates
 */

export interface QueueJob {
  id: string;
  message: string;
  status: "pending" | "processing" | "completed" | "failed";
  result?: {
    status: string;
    echo: string;
  };
  error?: string;
  timestamp: number;
}

type QueueListener = (jobs: QueueJob[]) => void;

class APIQueue {
  private jobs: QueueJob[] = [];
  private listeners: Set<QueueListener> = new Set();
  private processing: boolean = false;

  /**
   * Subscribe to queue updates
   */
  subscribe(listener: QueueListener): () => void {
    this.listeners.add(listener);
    this.notifyListeners();
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of queue changes
   */
  private notifyListeners(): void {
    const jobsCopy = [...this.jobs];
    this.listeners.forEach((listener) => listener(jobsCopy));
  }

  /**
   * Add a new job to the queue
   */
  enqueue(message: string): string {
    const job: QueueJob = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      status: "pending",
      timestamp: Date.now(),
    };

    this.jobs.push(job);
    this.notifyListeners();
    this.processQueue();

    return job.id;
  }

  /**
   * Process the queue (one job at a time)
   */
  private async processQueue(): Promise<void> {
    if (this.processing) {
      return;
    }

    const pendingJob = this.jobs.find((job) => job.status === "pending");
    if (!pendingJob) {
      return;
    }

    this.processing = true;
    pendingJob.status = "processing";
    this.notifyListeners();

    try {
      const response = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: pendingJob.message }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Rate limit exceeded");
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      pendingJob.status = "completed";
      pendingJob.result = data;
    } catch (error) {
      pendingJob.status = "failed";
      pendingJob.error =
        error instanceof Error ? error.message : "Unknown error";
    } finally {
      this.processing = false;
      this.notifyListeners();
      // Continue processing if there are more pending jobs
      this.processQueue();
    }
  }

  /**
   * Get all jobs
   */
  getJobs(): QueueJob[] {
    return [...this.jobs];
  }

  /**
   * Get pending jobs count
   */
  getPendingCount(): number {
    return this.jobs.filter((job) => job.status === "pending").length;
  }

  /**
   * Get currently processing job
   */
  getProcessingJob(): QueueJob | undefined {
    return this.jobs.find((job) => job.status === "processing");
  }

  /**
   * Clear completed jobs (optional cleanup)
   */
  clearCompleted(): void {
    this.jobs = this.jobs.filter(
      (job) => job.status !== "completed" && job.status !== "failed"
    );
    this.notifyListeners();
  }
}

// Singleton instance
export const apiQueue = new APIQueue();

