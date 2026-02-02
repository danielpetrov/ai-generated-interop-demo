---
trigger: model_decision
description: Generate Interop.io Apps
---

# Rule: Generate Interop.io Apps

## When to Use This Rule
Apply this rule when the user asks to generate Interop.io/io.Connect/Glue42 applications or demos.

## 🚦 Interaction Protocol

When a user requests to build Interop apps, do NOT start coding immediately.

### Step 1: Ask for Interaction Mode
You MUST first ask the user:

> "Do you want to run these apps in a standalone **BROWSER** (using io.Connect Browser) or inside **IO.CONNECT DESKTOP**?"

Also ask about mentorship preference:

> "Would you like **Mentor Mode** (I explain *what* I'm doing and *why*) or **Expert Mode** (just the code)?"

### Step 2: Wait for Response

### Step 3: Generate Based on Response

---

## 🌐 io.Connect Browser Overview

Web platform for integrating web apps:
- Enables standalone web apps to share data, expose functionality, and manipulate windows
- Can be used as a Progressive Web App (PWA)
- Main app acts as a hub using `@interopio/browser-platform` library
- Client apps use `@interopio/browser` library
- Provides communication connection between all client apps

### Key Features:
- App Management, Intents, Shared Contexts, Channels
- Interop (methods and streams)
- Window Management, Workspaces, Layouts
- Plugins, Notifications, Dev Tools
- io.Manager integration
- Application Adapters for third-party apps
- Cross-machine interoperability via io.Connect Gateway

---

## If BROWSER Mode Selected:

### Platform App Decision (CRITICAL)

**You MUST ask this question FIRST:**

> "Do you already have a Platform App running or provided by your organization?"

**If YES (Platform exists):**
- Generate **ONLY** client apps
- Client apps use `@interopio/browser` library
- No Platform code needed

**If NO (Starting from scratch):**
- Generate **Platform App** + client apps
- Platform uses `@interopio/browser-platform` library
- Requires license key in `.env`

**Context:**
- Prospects and existing users often have Platform Apps already deployed
- Creating duplicate Platform Apps causes conflicts
- Always verify before generating Platform code

### Architecture:
- Create a **Platform App** (host) that embeds other apps as iframes
- Use the CLI tool to spin up a browser platform: https://docs.interop.io/browser/developers/cli/index.html
- Or install and run it directly (requires license key)

### Communication:
- Use **Shared Contexts** by default for state synchronization
- Reference: https://docs.interop.io/browser/capabilities/data-sharing/shared-contexts/index.html
- **DO NOT** use BroadcastChannel, postMessage, or other browser-native messaging

### License:
- Set up `.env` for the platform license key: `VITE_IOCONNECT_LICENSE_KEY`

### Project Structure:
```
platform/     (Vite + React, port 5175) - Uses @interopio/browser-platform
app-1/        (Vite + React, port 3001) - Uses @interopio/browser
app-2/        (Vite + React, port 3002) - Uses @interopio/browser
```

### Platform main.tsx Pattern:
```typescript
import IOBrowserPlatform from "@interopio/browser-platform";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
  browserPlatform: {
    factory: IOBrowserPlatform,
    config: {
      licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY,
    },
  },
};

// Note: Remove StrictMode to prevent double-initialization
createRoot(document.getElementById("root")!).render(
  <IOConnectProvider settings={settings} fallback={<Loading />}>
    <App />
  </IOConnectProvider>
);
```

### Client App main.tsx Pattern:
```typescript
import IOBrowser from "@interopio/browser";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
  browser: {
    factory: IOBrowser,
  },
};

createRoot(document.getElementById("root")!).render(
  <IOConnectProvider settings={settings} fallback={<Loading />}>
    <App />
  </IOConnectProvider>
);
```

---

## If IO.CONNECT DESKTOP Mode Selected:

### Follow-up Question:
Ask if they have io.Connect Desktop already installed:
- **Not installed:** Direct them to https://interop.io/free-trial/ or contact interop.io directly
- **Already installed:** Ask if they want to:
  - Build, deliver, customize, and package io.Connect Desktop: Use the seed project
  - Install it for them: https://docs.interop.io/desktop/developers/seed-project/index.html
  - Just add a client app: Create standalone apps configured to run in the io.Connect container

### Communication:
- Use `@interopio/react-hooks` with `IOConnectProvider`
- Use `@interopio/desktop` factory

### State Synchronization APIs:

**Channels (Global, User-Driven)**
- `io.channels` - Color-coded channels (Red, Green, Blue, etc.)
- **Scope:** Global across entire platform
- **Control:** User joins apps to channels via Channel Selector UI
- Apps in the same channel share data automatically
- Example: `await io.channels.join("Red")`

**Shared Contexts (Global, Programmatic)**
- `io.contexts` - Named context objects (e.g., "SelectedClient")
- **Scope:** Global across entire platform
- **Control:** Developer-defined via code
- Any app can subscribe to a named context
- Example: `await io.contexts.update("SelectedClient", data)`

**Workspace Context (Local, Scope Isolation)**
- Workspace-specific context for multi-tasking scenarios
- **Scope:** Local to a single Workspace instance
- **Control:** Automatically isolated per workspace
- Prevents data "bleeding" between workspaces
- Example: `await myWorkspace.setContext(data)`

**❌ NEVER say "workspace channels" - this term does not exist**

### Other APIs:
- `io.interop` - Methods (RPC) and Streams (real-time data)
- `io.intents` - Intents (workflow actions)
- Other APIs: https://docs.interop.io/desktop/getting-started/what-is-io-connect-desktop/general-overview/index.html

### Project Structure:
```
app-1/        (Vite + React)
app-2/        (Vite + React)
configs/      (JSON app definitions)
```

### Desktop main.tsx Pattern:
```typescript
import IODesktop from "@interopio/desktop";
import { IOConnectProvider } from "@interopio/react-hooks";
import IOWorkspaces from "@interopio/workspaces-api";

const settings = {
  desktop: {
    factory: IODesktop,
    config: {
      channels: true,
      libraries: [IOWorkspaces],
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <IOConnectProvider settings={settings} fallback={<Loading />}>
    <App />
  </IOConnectProvider>
);
```

---

## 🔒 FDC3 Compliance

**What is FDC3:**
- **FDC3** (Financial Desktop Connectivity and Collaboration Consortium) is an **open source standard** under the FINOS Foundation
- Not just a "shared language" - it's an industry specification for financial app interoperability
- Ensures apps from different vendors can communicate seamlessly

**io.Connect FDC3 Support:**
- Full compliance with FDC3 standard contexts (e.g., `fdc3.contact`, `fdc3.instrument`)
- Channels mapped to **FDC3 User Channels** for cross-vendor compatibility
- Integration with third-party implementations:
  - Bloomberg Groups
  - Fidessa Tracking Groups
  - Other FDC3-compliant platforms

**Always use FDC3 contexts when applicable:**
```typescript
// ✅ FDC3-compliant
const context = {
  type: "fdc3.contact",
  id: { email: "user@example.com" },
  name: "User Name"
};

// ❌ Custom context (use only when FDC3 doesn't fit)
const context = {
  clientId: "123",
  name: "User Name"
};
```

**Reference:** https://fdc3.finos.org/

---

## 🔄 Browser vs Desktop API Differences

> **Warning:** While Browser and Desktop APIs overlap, they have differences in:
> - Available options and configuration
> - Workspaces API implementation
> - Application Configuration structure
> 
> **Always prefer platform-specific documentation:**
> - Browser apps → https://docs.interop.io/browser/
> - Desktop apps → https://docs.interop.io/desktop/

**Key Differences:**

| Feature | Browser | Desktop |
|---------|---------|----------|
| **Platform App** | Required (iframe host) | Not needed (native container) |
| **License Key** | Required in `.env` | Not required for client apps |
| **Workspaces API** | Limited to browser context | Full OS-level window management |
| **Native App Support** | Web apps only | Web + .NET + Java + legacy |
| **Window Management** | Browser-constrained | OS-level (multi-monitor, sticky windows) |

---



## 🎓 Mentorship Mode Guidelines

If **Mentor Mode** is selected:
- **Tone:** Patient, educational, and jargon-free
- **Content:** Before writing a block of code, explain the concept
- **Context:** Use analogies (e.g., comparing Channels to a radio frequency)
- **References:** Point to `TECHNICAL_BRIEFING.md` or official docs for further reading

If **Expert Mode** is selected:
- **Tone:** Professional, terse, efficient
- **Content:** Focus on correct implementation, best practices, and edge cases
- **Output:** Primarily code and configuration

---

## 🛠️ Implementation Standards (Always Apply)

- **Tech Stack:** React + TypeScript + Vite
- **Styling:** Modern Dark Theme (Glassmorphism, Financial aesthetic)
- **Data:** Use FDC3 standard contexts (e.g., `fdc3.contact`, `fdc3.instrument`)
- **Mock Data:** Always create realistic mock data services
- **Types:** Use `import type` for type-only imports
- **Shared Code:** Copy shared files into each app's `src/` folder (Vite constraint)
- **Context Access:** Use `useContext(IOConnectContext)`, not `useIOConnectContext`

---

## 📚 Key Documentation Links

| Topic | URL |
|-------|-----|
| Browser Platform | https://docs.interop.io/browser/ |
| Browser CLI | https://docs.interop.io/browser/developers/cli/index.html |
| Shared Contexts (Browser) | https://docs.interop.io/browser/capabilities/data-sharing/shared-contexts/index.html |
| Desktop Overview | https://docs.interop.io/desktop/getting-started/what-is-io-connect-desktop/general-overview/index.html |
| React Integration | https://docs.interop.io/desktop/getting-started/how-to/interop-enable-your-apps/react/index.html |
| Channels | https://docs.interop.io/desktop/capabilities/data-sharing/channels/javascript/index.html |
| FDC3 | https://fdc3.finos.org/docs/context/overview |
