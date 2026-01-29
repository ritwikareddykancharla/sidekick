import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

class GeminiService {
    private static instance: GeminiService;
    private model: GenerativeModel;
    private apiKey: string;

    private constructor() {
        // @ts-ignore - Manual type handling via wxt-env
        this.apiKey = import.meta.env.GOOGLE_AI_API_KEY || "";

        if (!this.apiKey) {
            console.warn("GOOGLE_AI_API_KEY is not set. Gemini features will fail.");
        }

        const genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    public static getInstance(): GeminiService {
        if (!GeminiService.instance) {
            GeminiService.instance = new GeminiService();
        }
        return GeminiService.instance;
    }

    public async generateStream(prompt: string) {
        if (!this.apiKey) {
            throw new Error("API Key missing");
        }
        return await this.model.generateContentStream(prompt);
    }

    public async generateText(prompt: string): Promise<string> {
        if (!this.apiKey) {
            throw new Error("API Key missing");
        }
        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }
}

export const geminiService = GeminiService.getInstance();
