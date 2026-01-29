import { defineBackground } from 'wxt/sandbox';

export default defineBackground(() => {
    console.log('Sidekick background service worker started.', { id: browser.runtime.id });
});
