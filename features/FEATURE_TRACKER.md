# 🚀 Sidekick Feature Tracker

**Last Updated:** 2026-01-30
**Version:** v0.1.0 (Prototype)

This document tracks the implementation status of all planned features for the Sidekick AI Assistant.

---

## 🏗️ Core Infrastructure
- [x] **WXT + React Scaffold**: Manifest V3 extension structure setup.
- [x] **UI System**: Tailwind CSS + Headless UI integration.
- [x] **Backend Utils**:
    - [x] Gemini 3 Flash / 1.5 Flash Client (`utils/gemini.ts`)
    - [x] Mem0 Memory Client (`utils/mem0.ts`)
- [x] **Build System**: Fixed TypeScript/Vite environment issues.

## 💬 Assistant Interface (Side Panel)
- [x] **Chat UI**: React-based split-view messaging interface.
- [x] **Streaming**: Real-time token streaming from Gemini.
- [x] **State Management**: `useChat` hook for history.
- [ ] **Markdown Rendering**: Render code blocks and typical markdown in chat bubbles.

## 📄 PDF DeepLink (Custom Viewer)
- [x] **PDF.js Integration**: Bundled library for rendering PDFs.
- [x] **Custom Viewer UI**: `entrypoints/pdf/index.html` with basic navigation.
- [x] **Context Listener**: Captures text selection + page number.
- [ ] **Context Bridge**: Wire selection directly to Chat input.
- [ ] **File Ingestion**: Upload PDF bytes to Gemini API.

## 📊 Kaggle Companion
- [ ] **Competition Detection**: Parse URL to get Competition ID.
- [ ] **Cell Focus Observer**: Detect which code cell is active.
- [ ] **Monaco Editor Bridge**: Read/Write code to Kaggle cells.
- [ ] **Execution Output Reader**: Capture logs/errors from cell runs.

## 🧠 Memory & Context
- [ ] **Context Injection**: Automatically append "Current Screen Context" to Gemini prompt.
- [ ] **Long-term Retrieval**: Query Mem0 before answering.
- [ ] **Session Storage**: Persist chat history across tab reloads (local storage).

## ✍️ Google Docs Support (Planned)
- [ ] **Canvas/DOM Reader**: Extract text from Google Docs kix-engine.
- [ ] **Comment Writer**: Suggest edits via comments instead of direct text replacement.

---

## 🐛 Known Issues / To-Do
- `wxt prepare` requires manual type fixes (Handled via `wxt-env.d.ts`).
- PDF Viewer needs styling polish (zoom controls, better toolbar).
- Need to securely handle API Keys (currently expecting `.env` in build).
