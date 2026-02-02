# io.Connect Quick Reference - Browser Mode

## ⚡ Initialization

### Platform App
```typescript
// main.tsx
import IOBrowserPlatform from '@interopio/browser-platform';
import { IOConnectProvider } from '@interopio/react-hooks';

const settings = {
  browserPlatform: {
    factory: IOBrowserPlatform,
    config: {
      // REQUIRED: licenseKey is mandatory
      licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY,
    },
  },
};

createRoot(document.getElementById('root')!).render(
  <IOConnectProvider settings={settings} fallback={<div>Loading Platform...</div>}>
    <App />
  </IOConnectProvider>
);
```

### React App (Client)
```typescript
// main.tsx
import IOBrowser from '@interopio/browser';
import { IOConnectProvider } from '@interopio/react-hooks';

const settings = {
  browser: {
    factory: IOBrowser,
  },
};

createRoot(document.getElementById('root')!).render(
  <IOConnectProvider settings={settings} fallback={<div>Loading...</div>}>
    <App />
  </IOConnectProvider>
);
```

## 📤 Publishing Data (Shared Contexts)

```typescript
import { useContext } from 'react';
import { IOConnectContext } from '@interopio/react-hooks';

function PublisherComponent() {
  const io = useContext(IOConnectContext);

  const handlePublish = async () => {
    if (io) {
      // Note: No type arguments - type is inferred from data
      await io.contexts.update('ContextName', {
        type: 'fdc3.contact',
        id: { email: 'user@example.com' },
        name: 'John Doe',
      });
    }
  };

  return <button onClick={handlePublish}>Publish</button>;
}
```

## 📥 Subscribing to Data (Shared Contexts)

```typescript
import { useState } from 'react';
import { useIOConnect } from '@interopio/react-hooks';

function SubscriberComponent() {
  const [data, setData] = useState(null);

  useIOConnect((io) => {
    const unsubscribe = io.contexts.subscribe('ContextName', (newData) => {
      setData(newData);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

## 🔧 Interop Methods (RPC)

### Register a Method
```typescript
import { useEffect, useContext, useRef } from 'react';
import { IOConnectContext } from '@interopio/react-hooks';

function MethodProvider() {
  const io = useContext(IOConnectContext);
  const registered = useRef(false);

  useEffect(() => {
    if (!io || registered.current) return;

    io.interop.register('MyMethod', ({ param }: { param: string }) => {
      return { result: `Processed: ${param}` };
    });

    registered.current = true;

    return () => {
      if (registered.current) {
        io.interop.unregister('MyMethod');
        registered.current = false;
      }
    };
  }, [io]);

  return null;
}
```

### Invoke a Method
```typescript
const result = await io.interop.invoke('MyMethod', { param: 'test' });
console.log(result.returned.result);
```

## 🎯 Intents

### Raise an Intent
```typescript
await io.intents.raise('ViewClient', {
  context: {
    type: 'fdc3.contact',
    id: { email: 'client@example.com' },
  },
});
```

### Register Intent Handler
```typescript
io.intents.addIntentListener('ViewClient', (context) => {
  console.log('Received context:', context);
});
```

## 📋 Channels

### Join a Channel
```typescript
await io.channels.join('Red');
```

### Subscribe to Channel
```typescript
io.channels.subscribe((data) => {
  console.log('Channel data:', data);
});
```

### Publish to Channel
```typescript
await io.channels.setPath({
  path: 'client',
  value: { id: '123', name: 'John' },
});
```

## ⚠️ Common Patterns

### Strict Mode Safe Subscription
```typescript
useIOConnect((io) => {
  const unsubscribe = io.contexts.subscribe('Context', handler);
  return unsubscribe;
}, []);
```

### Type-Safe Context
```typescript
interface MyContext {
  type: 'fdc3.contact';
  id: { email: string };
  name: string;
}

await io.contexts.update<MyContext>('MyContext', data);
```

## 🚫 Forbidden APIs

Never use these in io.Connect apps:
- ❌ `window.postMessage`
- ❌ `BroadcastChannel`
- ❌ `localStorage` for sync
- ❌ Custom WebSocket buses

## ✅ Best Practices

1. **Always clean up subscriptions** - Return unsubscribe in useIOConnect
2. **Use FDC3 types** - Prefer `fdc3.contact`, `fdc3.instrument`, etc.
3. **Type your contexts** - Use TypeScript interfaces
4. **Handle null io** - Always check if io is available before using
5. **One registration** - Use ref to prevent duplicate method registrations
