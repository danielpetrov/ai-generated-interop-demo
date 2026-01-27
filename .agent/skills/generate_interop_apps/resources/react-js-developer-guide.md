# io.Connect Developer Reference Guide: React & JavaScript

> **Source**: Generated from [NotebookLM](https://notebooklm.google.com/notebook/2d380932-aed8-44d2-8813-6dec341e4400)  
> **Artifact ID**: `f7f0bef9-48f8-4995-9075-8be81a665af2`

---

## 1. Library Setup and Initialization

Choose the appropriate library based on your environment (**Browser** or **Desktop**) and your app's role (Platform/Main or Client). The `@interopio/react-hooks` library acts as a wrapper for these underlying libraries.

### A. Browser Platform (Main Application)
The **Main Application** acts as the hub that manages the environment.

```bash
npm install @interopio/react-hooks @interopio/browser-platform
```

```javascript
import IOConnectBrowserPlatform from "@interopio/browser-platform";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
    browserPlatform: {
        factory: IOConnectBrowserPlatform,
        config: { licenseKey: "YOUR_LICENSE_KEY" }
    }
};

// Wrap your root component
<IOConnectProvider settings={settings} fallback={<div>Loading Platform...</div>}>
    <App />
</IOConnectProvider>
```

### B. Browser Client
**Client Applications** connect to the Main Platform.

```bash
npm install @interopio/react-hooks @interopio/browser
```

```javascript
import IOConnectBrowser from "@interopio/browser";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
    browser: { factory: IOConnectBrowser }
};

<IOConnectProvider settings={settings}>
    <ClientApp />
</IOConnectProvider>
```

### C. Desktop Application

```bash
npm install @interopio/react-hooks @interopio/desktop
```

```javascript
import IODesktop from "@interopio/desktop";
import { IOConnectProvider } from "@interopio/react-hooks";

const settings = {
    desktop: { factory: IODesktop }
};

<IOConnectProvider settings={settings}>
    <DesktopApp />
</IOConnectProvider>
```

---

## 2. React Hooks

### IOConnectProvider
Wraps your application and initializes the io.Connect library. Provides the `io` object via React Context.

### useIOConnect
The primary hook for accessing the `io` object.

```javascript
import { useIOConnect } from "@interopio/react-hooks";

const MyComponent = () => {
  useIOConnect((io) => {
    // Access io.Connect APIs here
    console.log("io.Connect initialized:", io);
  }, []);

  return <div>My Component</div>;
};
```

### IOConnectContext
Access the `io` object directly via Context.

```javascript
import { useContext } from "react";
import { IOConnectContext } from "@interopio/react-hooks";

const MyComponent = () => {
  const io = useContext(IOConnectContext);
  // Use io directly
};
```

---

## 3. Shared Contexts API

Global key/value pairs for cross-application data synchronization.

### Subscribe
```javascript
useIOConnect((io) => {
    const unsubscribe = io.contexts.subscribe("SelectedClient", (data) => {
        console.log("Client selected:", data);
    });
    return unsubscribe; // Cleanup
}, []);
```

### Update
```javascript
await io.contexts.update("SelectedClient", {
    type: "fdc3.contact",
    id: { email: "alice@corp.com" },
    name: "Alice"
});
```

### Set (Overwrite)
```javascript
await io.contexts.set("AppTheme", { mode: "dark", accent: "blue" });
```

---

## 4. Channels API

User-controlled context synchronization via color-coded channels.

### Subscribe to Current Channel
```javascript
useIOConnect((io) => {
    const unsubscribe = io.channels.subscribe((data) => {
        console.log("Channel data:", data);
    });
    return unsubscribe;
}, []);
```

### Publish to Channel
```javascript
await io.channels.publish({ clientId: "123", name: "Alice" });
```

### Join a Channel
```javascript
await io.channels.join("Red");
```

### Get Available Channels
```javascript
const channels = await io.channels.list();
```

---

## 5. Intents API

Workflow orchestration via semantic actions.

### Raise an Intent
```javascript
await io.intents.raise("ViewClient", {
    context: {
        type: "fdc3.contact",
        id: { email: "alice@corp.com" }
    }
});
```

### Register an Intent Handler
```javascript
useIOConnect((io) => {
    const handler = io.intents.addIntentListener("ViewClient", (context) => {
        console.log("Received intent:", context);
        setClient(context.data);
    });
    return () => handler.unsubscribe();
}, []);
```

### Find Intents
```javascript
const intents = await io.intents.find("ViewClient");
```

---

## 6. Interop Methods API

RPC-style request/response and streaming.

### Register a Method
```javascript
useIOConnect((io) => {
    io.interop.register("Calculate.Sum", ({ a, b }) => {
        return { sum: a + b };
    });
    return () => io.interop.unregister("Calculate.Sum");
}, []);
```

### Invoke a Method
```javascript
const result = await io.interop.invoke("Calculate.Sum", { a: 5, b: 3 });
console.log("Sum:", result.returned.sum);
```

### Create a Stream (Publisher)
```javascript
const stream = await io.interop.createStream("MarketData", {
    subscriptionRequestHandler: (request) => request.accept(),
});
stream.push({ price: 100 });
```

### Subscribe to Stream (Consumer)
```javascript
const subscription = await io.interop.subscribe("MarketData", {
    onData: (streamData) => console.log("Received:", streamData.data)
});
```

---

## 7. Best Practices

1. **Cleanup**: Always return unsubscribe functions from `useIOConnect` to prevent memory leaks.
2. **Method Registration**: Use empty dependency arrays `[]` for one-time registration.
3. **Dependency Arrays**: Include `io` in dependency arrays when using `useEffect`.
4. **IOConnectProvider**: Always wrap root component for global access.

---

## 8. TypeScript Types

```typescript
import { IOConnectContext } from "@interopio/react-hooks";
import IOConnectBrowser from "@interopio/browser";
import IOConnectDesktop from "@interopio/desktop";

// Cast io object for proper typing
const io = useContext(IOConnectContext) as IOConnectBrowser.API | IOConnectDesktop.API;
```

### Common Interfaces
```typescript
interface ClientContext {
    type: "fdc3.contact";
    id: { email: string };
    name: string;
}

interface ChannelData {
    clientId: string;
    name: string;
}
```
