# Interop.io Development Rules - Lessons Learned

## Browser Development Without io.Connect Desktop

When developing in a standalone browser (not inside io.Connect Desktop):
- **`@interopio/desktop`** requires the app to run inside io.Connect Desktop container
- **`@interopio/browser`** requires io.Connect Browser Platform with a valid license key
- **BroadcastChannel API** is a simple browser-native alternative for local development

---

## BroadcastChannel Pattern (License-Free Alternative)

```typescript
// Publisher (Client List)
const channel = new BroadcastChannel('client-sync')
channel.postMessage({
  type: 'fdc3.contact',
  name: client.name,
  id: { email: client.email }
})

// Subscriber (Client Portfolio)
const channel = new BroadcastChannel('client-sync')
channel.addEventListener('message', (event) => {
  if (event.data.type === 'fdc3.contact') {
    // Handle the message
  }
})
```

---

## Platform Embedding Pattern

For a unified dashboard view, embed apps as iframes:

```tsx
<iframe src="http://localhost:3001" title="Client List" />
<iframe src="http://localhost:3003" title="Client Portfolio" />
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "factory is not a function" | Running @interopio/desktop outside io.Connect Desktop | Use @interopio/browser or BroadcastChannel |
| "IoConnect Browser has already been started" | React StrictMode double-mounting | Remove StrictMode or handle cleanup |
| "window was not opened by a glue client" | App opened directly, not from platform | Use BroadcastChannel for standalone dev |
| "no license token provided" | Missing io.Connect Browser license | Get license from Interop.io or use BroadcastChannel |
| "Converting circular structure to JSON" | Error serialization in onInitError | Avoid JSON.stringify on error objects |

---

## Port Configuration

| App | Development Port |
|-----|-----------------|
| Client List | 3001 |
| Client Portfolio | 3003 |
| Platform | 5175 |

---

## io.Connect Browser Platform License

### Step 1: Create `.env` file in the platform folder

```env
# platform/.env
VITE_IOCONNECT_LICENSE_KEY=your_license_key_here
```

### Step 2: Add `.env` to `.gitignore`

```gitignore
# Don't commit license keys
.env
.env.local
```

### Step 3: Use the license key in `platform/src/main.tsx`

```typescript
import IOBrowserPlatform from '@interopio/browser-platform'

const platformConfig = {
  licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY,
  channels: {
    definitions: [
      { name: 'Red', meta: { color: '#ef4444' } },
      { name: 'Green', meta: { color: '#22c55e' } },
      { name: 'Blue', meta: { color: '#3b82f6' } }
    ]
  },
  applications: {
    local: [
      { name: 'client-list', type: 'window', details: { url: 'http://localhost:3001' } },
      { name: 'client-portfolio', type: 'window', details: { url: 'http://localhost:3003' } }
    ]
  }
}

IOBrowserPlatform(platformConfig).then((io) => {
  // Platform initialized
})
```

> **Note:** Vite exposes env variables prefixed with `VITE_` via `import.meta.env`
