import Mem0 from "mem0ai";

// Ensure you set this in your .env file
const API_KEY = import.meta.env.MEM0_API_KEY || "";

if (!API_KEY) {
    console.warn("MEM0_API_KEY is not set.");
}

export const mem0 = new Mem0({
    apiKey: API_KEY,
});
