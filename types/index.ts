export type Role = 'user' | 'model' | 'system';

export interface ChatMessage {
    id: string;
    role: Role;
    text: string;
    timestamp: number;
}

export interface PDFContext {
    text: string;
    page: number;
    source: string; // filename or URL
    coordinates?: {
        x: number;
        y: number;
    };
}

export interface UserPreference {
    key: string;
    value: any;
}
