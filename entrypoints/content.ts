import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
    matches: ['<all_urls>'],
    main() {
        console.log('Sidekick content script loaded.');
    },
});
