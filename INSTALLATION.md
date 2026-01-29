# 📥 Installation Instructions

## Prerequisites
- **Node.js**: v20.0 or higher
- **npm**: v10.0 or higher
- **Chrome/Edge/Brave**: Latest version

## 🚀 Local Development Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/ritwikareddykancharla/sidekick.git
    cd sidekick
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    # Required for Generative AI features
    GOOGLE_AI_API_KEY=your_gemini_api_key_here
    
    # Required for Long-term Memory features
    MEM0_API_KEY=your_mem0_api_key_here
    ```

4.  **Build the Extension**
    ```bash
    npm run build
    ```
    *This will create an `.output` directory containing the unpacked extension.*

5.  **Load into Browser**
    - Open your browser and navigate to `chrome://extensions/` (or `edge://extensions/`).
    - Toggle **Developer mode** in the top right corner.
    - Click **Load unpacked**.
    - Select the `sidekick/.output/chrome-mv3` folder.

## 🔄 Development Loop
To run the extension with hot-reloading (changes apply immediately):
```bash
npm run dev
```

## 📦 Production Build
To create a zip file for the Chrome Web Store:
```bash
npm run zip
```
