import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rateLimiter";
import { echoRequestSchema } from "@/lib/validators";

/**
 * Echo API Route
 * 
 * POST /api/echo
 * 
 * Accepts: { message: string }
 * Returns: { status: "ok", echo: string }
 * 
 * Features:
 * - Zod validation
 * - Rate limiting (5 requests per minute per IP)
 * - 2 second processing delay simulation
 * - Proper error handling
 */

export async function POST(request: NextRequest) {
  try {
    // Extract and validate IP address
    const clientIP = getClientIP(request.headers);

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          error: "Invalid JSON",
          message: "Request body must be valid JSON",
        },
        { status: 400 }
      );
    }

    // Validate with Zod
    const validationResult = echoRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          message: validationResult.error.errors[0]?.message || "Invalid request",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { message } = validationResult.data;

    // Simulate processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return success response
    return NextResponse.json(
      {
        status: "ok",
        echo: message,
      },
      { status: 200 }
    );
  } catch (error) {
    // Unexpected error handling
    console.error("Echo API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed", message: "Only POST requests are supported" },
    { status: 405 }
  );
}

