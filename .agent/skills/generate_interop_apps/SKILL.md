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

## Resources

- **Technical Briefing**: For a comprehensive conceptual overview, architectural diagrams, and high-level mentoring explanations, refer to [`resources/TECHNICAL_BRIEFING.md`](resources/TECHNICAL_BRIEFING.md).
- **Setup Guide**: Detailed step-by-step setup for browser context sharing [`resources/io-connect-setup-guide.md`](resources/io-connect-setup-guide.md).
- **Architecture Mindmap**: Visual breakdown of platform components [`resources/io-connect-components-mindmap.md`](resources/io-connect-components-mindmap.md).
- **External Links**: Official docs, GitHub repos, NPM packages, and FDC3 resources [`resources/external-links.md`](resources/external-links.md).
- **React/JS Developer Guide**: Comprehensive code reference for all APIs (Contexts, Channels, Intents, Interop, Streams) [`resources/react-js-developer-guide.md`](resources/react-js-developer-guide.md).

## AI-Assisted Documentation (NotebookLM)

You have access to a rich library of IO.Connect documentation and generated assets via the `notebooklm` skill.

1.  **Live Querying**: You can use the `notebooklm` skill to query specific details from the "Interop.io Platform Overview" notebook (ID: `2d380932-aed8-44d2-8813-6dec341e4400`).
2.  **Proactive Generation**: If you encounter a complex topic or need a specific architectural diagram that is missing:
    *   **PROMPT the user** to let you generate it using NotebookLM (e.g., "Would you like me to generate a specific guide for [Topic] in your NotebookLM?").
    *   Use tools like `mcp_notebooklm_report_create` or `mcp_notebooklm_mind_map_create` upon approval.

Browser-native messaging **MUST NOT** be used.

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

## Channels

### Definition
User-controlled scoped synchronization.

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
      console.log(data);
    });
    return unsubscribe;
  }, []);

  return null;
};
```

### Publish Nested Data Safely
```typescript
await io.channels.setPath<ChannelClient>({
  path: "client",
  value: {
    clientId: "123",
    name: "Alice",
  },
});
```

### Multi-Channel Safe Access
```typescript
const channels = await io.channels.myChannels();
if (!channels.length) return;
```

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
- BroadcastChannel
- window.postMessage
- window.addEventListener("storage", ...)
- localStorage-based sync
- custom WebSocket message buses
- SharedWorker
- MessageChannel

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

