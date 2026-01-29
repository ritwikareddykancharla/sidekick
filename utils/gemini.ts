import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure you set this in your .env file
const API_KEY = import.meta.env.GOOGLE_AI_API_KEY || "";

if (!API_KEY) {
    console.warn("GOOGLE_AI_API_KEY is not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Defaulting to 1.5 Flash until 3.0 is publicly available in the SDK
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
