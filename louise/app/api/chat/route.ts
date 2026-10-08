import { handleGeminiChatRequest } from "../../../src/server/gemini-chat";

export const runtime = "nodejs";

export function POST(request: Request): Promise<Response> {
  return handleGeminiChatRequest(request, {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  });
}
