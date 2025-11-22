/**
 * In-memory rate limiter
 * 
 * In production, this would use Redis or a distributed cache
 * to handle rate limiting across multiple server instances.
 * 
 * Current implementation: Simple in-memory Map with IP-based tracking
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configuration: 5 requests per minute
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Checks if an IP address has exceeded the rate limit
 * @param ip - The IP address to check
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // If no entry exists or window has expired, create new entry
  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    rateLimitStore.set(ip, newEntry);
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: newEntry.resetTime,
    };
  }

  // If within window, increment count
  if (entry.count < MAX_REQUESTS) {
    entry.count++;
    rateLimitStore.set(ip, entry);
    return {
      allowed: true,
      remaining: MAX_REQUESTS - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Rate limit exceeded
  return {
    allowed: false,
    remaining: 0,
    resetTime: entry.resetTime,
  };
}

/**
 * Extracts IP address from request headers
 * Handles various proxy scenarios (x-forwarded-for, x-real-ip, etc.)
 */
export function getClientIP(headers: Headers): string {
  // Check x-forwarded-for header (most common in production)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  // Check x-real-ip header
  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Fallback (for local development)
  return "127.0.0.1";
}

/**
 * Cleans up expired entries periodically
 * In production, Redis TTL would handle this automatically
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// Cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

