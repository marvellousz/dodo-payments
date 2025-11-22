import { z } from "zod";

/**
 * Validator for the echo API endpoint
 * Ensures the message is a non-empty string
 */
export const echoRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export type EchoRequest = z.infer<typeof echoRequestSchema>;

