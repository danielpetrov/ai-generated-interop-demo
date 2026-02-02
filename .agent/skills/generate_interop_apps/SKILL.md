# io.Connect Interoperability Skill
**React + TypeScript | Code-First | Lifecycle-Safe | Agent-Grade**

## Skill Invariants (Hard Rules)

- All cross-application communication **MUST** use io.Connect APIs.
- Browser-native messaging **MUST NOT** be used.
- All side effects **MUST** live inside lifecycle hooks and include cleanup.
- React 18 Strict Mode **MUST NOT** cause duplicate registration.
- Prefer **Interop Methods** for explicit data exchange.
- Prefer **Intents** for workflows and navigation.
- Prefer **Shared Contexts / Channels** for state synchronization.
- Output **TypeScript only**.

---

## 🚦 Interaction Protocol

When a user requests to build Interop apps, do NOT start coding immediately.

### Step 1: Ask for Interaction Mode
You MUST first ask the user:

> "Do you want to run these apps in a standalone **BROWSER** (using io.Connect Browser) or inside **IO.CONNECT DESKTOP**?"

Also ask:
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

### If BROWSER Mode Selected:

### Platform App Decision (CRITICAL)

**You MUST ask this question FIRST:**

> "Do you already have a Platform App running or provided by your organization?"

**Response Handling:**

**If Platform Exists:**
- Generate **ONLY** client apps
- Client apps use `@interopio/browser`
- Skip Platform code entirely

**If Starting from Scratch:**
- Generate **Platform App** + client apps
- Platform uses `@interopio/browser-platform`
- Requires license key: `VITE_IOCONNECT_LICENSE_KEY`

**Why This Matters:**
- Prospects often have existing Platform Apps
- Duplicate Platform Apps cause initialization conflicts
- Saves development time and avoids confusion

**Architecture:**
- Create a **Platform App** (host) that embeds other apps as iframes
- Use CLI tool: https://docs.interop.io/browser/developers/cli/index.html
- Or install directly (requires license key)

**Communication:**
- Use **Shared Contexts** by default: https://docs.interop.io/browser/capabilities/data-sharing/shared-contexts/index.html

**Project Structure:**
```
platform/     (Vite + React, port 5175) - @interopio/browser-platform
app-1/        (Vite + React, port 3001) - @interopio/browser
app-2/        (Vite + React, port 3002) - @interopio/browser
```

---

## 🖥️ io.Connect Desktop Overview

Desktop container for integrating applications:
- Native desktop experience with workspace management
- Full io.Connect API including layouts and workspaces
- Supports window management and application lifecycle

### If IO.CONNECT DESKTOP Mode Selected:

**Follow-up Question:** Ask if they have io.Connect Desktop installed:
- **Not installed:** Direct to https://interop.io/free-trial/
- **Already installed:** Ask if they want to:
  - Use the seed project: https://docs.interop.io/desktop/developers/seed-project/index.html
  - Just add a client app

**Communication:**
- Use `@interopio/react-hooks` with `IOConnectProvider`
- Use `@interopio/desktop` factory

**State Management:**
- `io.contexts` - Shared contexts
- `io.channels` - Publish/subscribe pattern
- `io.workspaces` - Workspace management

**Project Structure:**
```
app-1/        (Vite + React)
app-2/        (Vite + React)
configs/      (JSON app definitions)
```

---

## Resources

- **Technical Briefing**: [`resources/TECHNICAL_BRIEFING.md`](resources/TECHNICAL_BRIEFING.md)
- **Setup Guide**: [`resources/io-connect-setup-guide.md`](resources/io-connect-setup-guide.md)
- **Architecture Mindmap**: [`resources/io-connect-components-mindmap.md`](resources/io-connect-components-mindmap.md)
- **External Links**: [`resources/external-links.md`](resources/external-links.md)
- **React/JS Developer Guide**: [`resources/react-js-developer-guide.md`](resources/react-js-developer-guide.md)

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

## AI-Assisted Documentation (NotebookLM)

You have access to a rich library of IO.Connect documentation via the `notebooklm` skill.

1. **Live Querying**: Query the "Interop.io Platform Overview" notebook (ID: `2d380932-aed8-44d2-8813-6dec341e4400`)
2. **Proactive Generation**: Generate guides using `mcp_notebooklm_report_create` or `mcp_notebooklm_mind_map_create` upon approval

**Browser-native messaging MUST NOT be used.**

## Initialization (React)

### Provider-Based Initialization - Desktop (Preferred)
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

root.render(
  <IOConnectProvider settings={settings} fallback={<div>Loading…</div>}>
    <App />
  </IOConnectProvider>
);
```

### Provider-Based Initialization - Browser Platform
```typescript
import IOBrowserPlatform from "@interopio/browser-platform";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
  browserPlatform: {
    factory: IOBrowserPlatform,
    config: {
      // REQUIRED: licenseKey is mandatory for Browser Platform
      licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY,
    },
  },
};

root.render(
  <IOConnectProvider settings={settings} fallback={<div>Loading Platform...</div>}>
    <App />
  </IOConnectProvider>
);
```

### Provider-Based Initialization - Browser Client
```typescript
import IOBrowser from "@interopio/browser";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
  browser: {
    factory: IOBrowser,
  },
};

root.render(
  <IOConnectProvider settings={settings} fallback={<div>Loading...</div>}>
    <App />
  </IOConnectProvider>
);
```


## Shared Contexts

### Definition
Global, session-scoped key-value synchronization across applications.

### Types
```typescript
export interface ClientContext {
  type: "fdc3.contact";
  id: { email: string };
  name: string;
}
```

### React Subscription (Lifecycle-Safe)
```typescript
import { useIOConnect } from "@interopio/react-hooks";
import { useState } from "react";

export const ClientSubscriber = () => {
  const [client, setClient] = useState<ClientContext | null>(null);

  useIOConnect((io) => {
    const unsubscribe = io.contexts.subscribe("Client", (data: ClientContext) => setClient(data));
    return unsubscribe;
  }, []);

  return <pre>{JSON.stringify(client, null, 2)}</pre>;
};
```

### Publish (Data is typed via the object)
```typescript
// Note: io.Connect Browser doesn't use type arguments
// The context data type is inferred from the object structure
await io.contexts.update("Client", {
  type: "fdc3.contact",
  id: { email: "alice@corp.com" },
  name: "Alice",
});
```

### Strict Mode Safe Pattern
```typescript
import { useIOConnect } from "@interopio/react-hooks";
import { useRef } from "react";

export const SafeContextSub = () => {
  const unsubscribeRef = useRef<null | (() => void)>(null);

  useIOConnect(async (io) => {
    if (unsubscribeRef.current) return;

    unsubscribeRef.current = await io.contexts.subscribe("Client", () => {});
    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, []);

  return null;
};
```

## Channels (Global, User-Driven)

### Definition
Channels are **global**, color-coded named contexts that allow **users** to dynamically group apps via a Channel Selector UI.

**Key Characteristics:**
- **Scope:** Global across entire platform
- **Control:** User-driven (not programmatic)
- **Implementation:** Built on top of Shared Contexts
- **FDC3 Mapping:** Can be mapped to FDC3 User Channels and Bloomberg Groups

### Types
```typescript
export interface ChannelClient {
  clientId: string;
  name: string;
}
```

### Subscribe to Current Channel
```typescript
import { useIOConnect } from "@interopio/react-hooks";

export const ChannelListener = () => {
  useIOConnect((io) => {
    const unsubscribe = io.channels.subscribe<ChannelClient>((data) => {
      console.log("Channel data:", data);
    });
    return unsubscribe;
  }, []);

  return null;
};
```

### Publish to Current Channel
```typescript
await io.channels.publish({
  clientId: "123",
  name: "Alice",
});
```

### Join a Specific Channel
```typescript
await io.channels.join("Red");
```

### Multi-Channel Safe Access
```typescript
const channels = await io.channels.myChannels();
if (!channels.length) {
  console.log("Not joined to any channel");
  return;
}
```

---

## Workspace Context (Scope Isolation)

### Definition
Workspace Context provides **local scope isolation** for apps within a specific Workspace instance.

**Key Characteristics:**
- **Scope:** Local to a single Workspace
- **Control:** Automatic isolation
- **Use Case:** Multi-tasking (e.g., two clients in separate workspaces)

### Set Workspace Context
```typescript
const myWorkspace = await io.workspaces.getMyWorkspace();
await myWorkspace.setContext({
  clientId: "123",
  name: "Alice"
});
```

### Subscribe to Workspace Context
```typescript
const myWorkspace = await io.workspaces.getMyWorkspace();
myWorkspace.onContextUpdated((context) => {
  console.log("Workspace context:", context);
});
```

> **CAUTION:** "Workspace Channels" Do Not Exist
> 
> Channels are **always global**. Workspace Context provides **scope isolation**.
> These are two separate mechanisms - do not conflate them.

---

## Intents

### Definition
Late-bound semantic workflow actions.

### Raise Intent (React)
```typescript
import { useIOConnect } from "@interopio/react-hooks";

export const ViewClientButton = () => {
  const raise = useIOConnect((io) => async () => {
    await io.intents.raise("ViewClient", {
      context: {
        type: "fdc3.contact",
        id: { email: "alice@corp.com" },
      },
    });
  });

  return <button onClick={raise}>View Client</button>;
};
```

## Interop Methods (RPC)

### Definition
Explicit request/response service calls.

### Register Method (Strict Mode Safe)
```typescript
import { useContext, useEffect, useRef } from "react";
import { IOConnectContext } from "@interopio/react-hooks";

export const RiskProvider = () => {
  const io = useContext(IOConnectContext);
  const registeredRef = useRef(false);

  useEffect(() => {
    if (!io || registeredRef.current) return;

    io.interop.register("Risk.Calculate", ({ amount }: { amount: number }) => {
      return { score: amount * 0.15 };
    });

    registeredRef.current = true;

    return () => {
      if (registeredRef.current) {
        io.interop.unregister("Risk.Calculate");
        registeredRef.current = false;
      }
    };
  }, [io]);

  return null;
};
```

### Invoke Method (Typed)
```typescript
const result = await io.interop.invoke<{ score: number }>(
  "Risk.Calculate",
  { amount: 1000 }
);

console.log(result.returned.score);
```

## Interop Streams

### Definition
High-frequency publish/subscribe data feeds.

```typescript
const stream = await io.interop.createStream("Market.Stream");

setInterval(() => {
  stream.push({ price: Math.random() * 100 });
}, 100);
```

## Workspaces

### Create Workspace (Builder API)
```typescript
const builder = io.workspaces.getBuilder({
  type: "workspace",
  definition: {
    config: { title: "Client Analysis" },
  },
});

builder
  .addColumn()
  .addWindow({ appName: "ClientList" })
  .addWindow({ appName: "Portfolio" });

await builder.create();
```

### Frame Control
```typescript
const frame = await io.workspaces.getMyFrame();

await frame.resize({ width: 1200, height: 800 });
await frame.show({ activate: true });
```

### Application Manifest (application.json)
```json
{
  "name": "react-app",
  "type": "window",
  "title": "React App",
  "details": {
    "url": "http://localhost:3000",
    "mode": "tab",
    "channelSelector": {
      "enabled": true,
      "type": "multi"
    }
  },
  "customProperties": {
    "includeInWorkspaces": true
  }
}
```

## Testing (Jest)

### Factory Mock
```typescript
export const ioFactory = () =>
  Promise.resolve({
    interop: {
      register: jest.fn(),
      unregister: jest.fn(),
      invoke: jest.fn(),
    },
    contexts: {
      subscribe: jest.fn(() => Promise.resolve(() => {})),
      update: jest.fn(),
    },
    channels: {
      subscribe: jest.fn(() => Promise.resolve(() => {})),
      setPath: jest.fn(),
      myChannels: jest.fn(() => []),
    },
    intents: {
      raise: jest.fn(),
    },
    workspaces: {
      getMyFrame: jest.fn(),
      getBuilder: jest.fn(),
    },
  });
```

## ❌ Forbidden APIs (Do Not Generate)

**Browser-Native Messaging:**
- BroadcastChannel
- window.postMessage
- window.addEventListener("storage", ...)
- localStorage-based sync
- custom WebSocket message buses
- SharedWorker
- MessageChannel

**Why These Are Forbidden:**
1. **Limited Scope:** Only work between web apps (no native app support)
2. **No Governance:** Bypass io.Connect's monitoring and permissioning
3. **Brittle:** Create point-to-point integrations that break easily
4. **No FDC3:** Cannot leverage industry standards or third-party interop

**Use io.Connect APIs Instead:**
- `io.contexts` for global state sync
- `io.channels` for user-driven grouping
- `io.interop` for RPC and streaming
- `io.intents` for workflow actions

---

## UI Styling (Interop Apps)

### Dark Theme Colors
```css
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-card: rgba(30, 41, 59, 0.8);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: rgba(148, 163, 184, 0.1);
  --accent: #3b82f6;
}
```

### Glassmorphism Cards
```css
.card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.card:hover {
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(148, 163, 184, 0.2);
}
```

### Full Width Layout
```css
.app-container {
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
}
```

---

## Troubleshooting

### Error: "Platform already started"
**Cause:** React StrictMode double-mounting

**Fix:** Remove StrictMode for Platform main.tsx:
```typescript
createRoot(document.getElementById('root')!).render(
  <IOConnectProvider settings={settings}>
    <App />
  </IOConnectProvider>
);
```

### Error: "Method already registered"
**Cause:** Double registration in StrictMode

**Fix:** Use ref guard pattern (see Interop Methods section above)

### Error: "Apps not communicating"
**Cause:** Missing provider or wrong context name

**Fix:**
1. Ensure `IOConnectProvider` wraps app in `main.tsx`
2. Verify context name matches between publisher and subscriber
3. Check browser console for initialization errors

### Error: "White screen / Blank iframe"
**Cause:** Wrong port or initialization failure

**Fix:**
1. Open iframe URL directly to see error
2. Check port numbers match in Platform
3. Verify licenseKey for Browser Platform

---

## 📖 Terminology Reference

### Correct Terms

| Term | Scope | Control | Use Case |
|------|-------|---------|----------|
| **Channels** | Global | User (UI) | User links apps on-the-fly |
| **Shared Contexts** | Global | Programmatic | Automatic state sync |
| **Workspace Context** | Local (Workspace) | Automatic | Multi-tasking isolation |

### Incorrect Terms

| ❌ Incorrect | ✅ Correct | Explanation |
|-------------|-----------|-------------|
| "Workspace Channels" | "Channels" or "Workspace Context" | Channels are global; Workspace Context is local |
| "Tabs" (for windows) | "Windows" | io.Connect manages windows, not browser tabs |
| "Shared financial language" (for FDC3) | "Open source standard under FINOS" | FDC3 is an industry specification, not just a language |

---

## 📚 Additional Resources

### NotebookLM Integration
Query the io.Connect notebook for verified answers:
- Notebook ID: `2d380932-aed8-44d2-8813-6dec341e4400`
- Title: "io.Connect React Hooks Integration Guide"
- Sources: 26 official documentation pages

### Key Documentation
- Browser Platform: https://docs.interop.io/browser/
- Desktop Platform: https://docs.interop.io/desktop/
- FDC3 Standard: https://fdc3.finos.org/
- React Integration: https://docs.interop.io/desktop/getting-started/how-to/interop-enable-your-apps/react/

