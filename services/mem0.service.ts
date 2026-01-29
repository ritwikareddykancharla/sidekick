import Mem0 from "mem0ai";

class Mem0Service {
    private static instance: Mem0Service;
    private client: Mem0;
    private apiKey: string;

    private constructor() {
        // @ts-ignore
        this.apiKey = import.meta.env.MEM0_API_KEY || "";

        if (!this.apiKey) {
            console.warn("MEM0_API_KEY is not set.");
        }

        this.client = new Mem0({
            apiKey: this.apiKey,
        });
    }

    public static getInstance(): Mem0Service {
        if (!Mem0Service.instance) {
            Mem0Service.instance = new Mem0Service();
        }
        return Mem0Service.instance;
    }

    public getClient(): Mem0 {
        return this.client;
    }

    public async addMemory(text: string, userId: string) {
        if (!this.apiKey) return;
        try {
            await this.client.add([
                {
                    role: "user",
                    content: text
                }
            ], { user_id: userId });
        } catch (e) {
            console.error("Mem0 Add Error:", e);
        }
    }

    public async search(query: string, userId: string) {
        if (!this.apiKey) return [];
        try {
            return await this.client.search(query, { user_id: userId, limit: 3 });
        } catch (e) {
            console.error("Mem0 Search Error:", e);
            return [];
        }
    }
}

export const mem0Service = Mem0Service.getInstance();
