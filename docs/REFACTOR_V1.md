# Refactoring Plan: Modular Architecture

**Goal**: Elevate codebase to industry standards by enforcing Separation of Concerns (SoC), Type Safety, and Scalability.

## 🏗️ New Directory Structure
```text
/
├── components/          # React Components
│   ├── ui/              # Generic Atoms (Button, Input) - Design System
│   └── chat/            # Feature-Specific (ChatBubble, MessageList)
├── services/            # API & external integrations (Singleton/Stateless)
│   ├── gemini.service.ts
│   └── mem0.service.ts
├── modules/             # Core Business Logic (Non-React)
│   └── pdf/
│       ├── PDFRenderer.ts
│       └── SelectionManager.ts
├── types/               # Shared Interfaces
│   └── index.ts
├── hooks/               # React Hooks (Controller Layer)
│   └── useChat.ts
└── entrypoints/         # Thin Mounting Points
    ├── sidepanel/
    └── pdf/
```

## 🔄 Execution Steps

### Phase 1: Foundation (Types & Services)
1.  Create `types/index.ts` to define `Message`, `User`, `PDFContext`.
2.  Refactor `utils/gemini.ts` → `services/gemini.service.ts` (Class-based, Error handling).
3.  Refactor `utils/mem0.ts` → `services/mem0.service.ts`.

### Phase 2: UI Component Architecture
4.  Create `components/ui/` for basic elements (Dry up Tailwind classes).
5.  Move ChatBubble to `components/chat/`.
6.  Update `App.tsx` to consume new components.

### Phase 3: Logic Encapsulation (PDF)
7.  Extract spaghetti code from `entrypoints/pdf/main.ts` into `modules/pdf/PDFViewer.ts`.
8.  Implement proper Event Emitter pattern for PDF actions.

## ✅ Verification
- Ensure `npm run compile` passes.
- distinct separation between "View" (React/HTML), "Logic" (Hooks/Modules), and "Data" (Services).
