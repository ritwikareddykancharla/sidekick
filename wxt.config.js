const { defineConfig } = require('wxt');

module.exports = defineConfig({
    manifest: {
        permissions: ['sidePanel', 'storage', 'tabs', 'scripting', 'activeTab'],
        action: {},
        name: 'Sidekick - AI Browser Assistant',
        description: 'A cross-browser AI assistant with memory and HITL architecture.',
        default_locale: 'en',
        side_panel: {
            default_path: 'entrypoints/sidepanel/index.html',
        },
    },
    runner: {
        startUrls: ["https://www.google.com"],
    },
});
