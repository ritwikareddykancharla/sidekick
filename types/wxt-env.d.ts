/// <reference types="vite/client" />
/// <reference types="@types/chrome" />

declare module 'wxt/sandbox' {
    export function defineBackground(callback: () => void): any;
    export function defineContentScript(options: any): any;
}

// Global browser namespace for WebExtensions
declare const browser: typeof chrome;
