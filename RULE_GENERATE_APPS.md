# Rule: Generate Interop.io Apps

## When to Use This Rule
Apply this rule when the user asks to generate Interop.io/Glue42 applications or demos.

## 🚦 Interaction Protocol

When a user requests to build Interop apps, do NOT start coding immediately. 

**Step 1: Ask for Interaction Mode**
You MUST first ask the user:
> "Do you want to run these apps in a standalone **BROWSER** (using BroadcastChannel) or inside **IO.CONNECT DESKTOP**?"

**Step 2: wait for response**

**Step 3: Generate based on response**

### If BROWSER Mode Selected:
- **Architecture:** Create a **Platform App** (host) that embeds the other apps as iframes.
- **Communication:** Use `BroadcastChannel` (for same-origin) and `window.postMessage` (for cross-origin/iframe) to sync state.
- **License:** Set up `.env` for the platform license key.
- **Structure:**
  - `platform/` (Vite + React, port 5175)
  - `app-1/` (Vite + React, port 3001)
  - `app-2/` (Vite + React, port 3003)

### If IO.CONNECT DESKTOP Mode Selected:
- **Architecture:** Create standalone apps configured to run in the io.Connect container.
- **Communication:** Use `@interopio/react-hooks` with `IOConnectProvider`. 
- **State:** Use `io.channels` (publish/subscribe) and `io.workspaces`.
- **Structure:**
  - `app-1/` (Vite + React)
  - `app-2/` (Vite + React)
  - `configs/` (JSON app definitions)

## 🛠️ implementation Standards (Always Apply)
- **Tech Stack:** React + TypeScript + Vite.
- **Styling:** Modern Dark Theme (Glassmorphism, Financial aesthetic).
- **Data:** Use FDC3 standard contexts (e.g., `fdc3.contact`, `fdc3.instrument`).
- **Mock Data:** Always create realistic mock data services.
