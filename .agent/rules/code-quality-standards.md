---
trigger: always_on
description: Code Quality Requirements for Interop Apps - Lessons Learned
---

---
trigger: always_on
description: Code Quality Requirements for Interop Apps - Lessons Learned
---

# Rule: Code Quality and UI Standards for Interop Apps

## TypeScript Requirements

### Always Use Proper Types
- **Never use `any`** - Define explicit interfaces
- **Type all parameters** - Function arguments must have types
- **Type event handlers** - Use `MessageEvent`, `React.ChangeEvent<HTMLInputElement>`, etc.
- **Export and share interfaces** - Reuse types across components

```typescript
// ✅ CORRECT
interface Client {
  id: string;
  name: string;
  value: string;
}

const handleClick = (client: Client) => {
  setSelected(client);
};

const handleMessage = (event: MessageEvent) => {
  if (event.data.type === 'SELECT_CLIENT') {
    setClient(event.data.client);
  }
};

// ❌ WRONG
const handleClick = (client) => {  // Missing type
  setSelected(client);
};

const handleMessage = (event) => {  // Missing MessageEvent type
  // ...
};
```

### Common TypeScript Fixes
1. **Parameter types**: Always add type annotations
2. **Event handlers**: Use specific event types (`MessageEvent`, `ChangeEvent`, `MouseEvent`)
3. **State types**: Use generic type parameters: `useState<Client | null>(null)`
4. **Exported interfaces**: Make sure interfaces are exported if used elsewhere

---

## Styling Standards

### Dark Theme is MANDATORY unless otherwise specified
All Interop apps MUST use:
- **Base background**: `#0f172a` (dark slate)
- **Secondary background**: `#1e293b`
- **Text colors**: `#f1f5f9` (primary), `#94a3b8` (secondary), `#64748b` (muted)

**❌ NEVER use bright colors like**:
- Bright purple/pink gradients
- Plain `#667eea` backgrounds
---

## Layout Requirements

### Full Width is CRITICAL

**The Problem We Had:**
Portfolio was centered and not filling the iframe width.

**The Solution:**
```css
/* For apps in iframes, use viewport units */
.app-container {
  width: 100vw;   /* Forces full viewport width */
  height: 100vh;  /* Forces full viewport height */
  padding: 1.5rem;
}

/* NOT width: 100% - this can be constrained by parent */
```

**Platform Grid Layout:**
```css
.apps-container {
  display: grid;
  grid-template-columns: 400px 1fr;  /* Fixed sidebar, flexible main */
  gap: 0;
  overflow: hidden;
}
```

---

## Communication Patterns

**CRITICAL: Use io.Connect APIs Only**

As per `/agent/skills/generate_interop_apps/SKILL.md`:
- ✅ **REQUIRED**: Use `io.contexts` (Shared Contexts) for state synchronization
- ✅ **REQUIRED**: Use `io.interop` methods for explicit data exchange
- ✅ **REQUIRED**: Use `io.intents` for workflow actions
- ❌ **FORBIDDEN**: `window.postMessage`
- ❌ **FORBIDDEN**: `BroadcastChannel`
- ❌ **FORBIDDEN**: `localStorage` sync
- ❌ **FORBIDDEN**: Custom WebSocket buses

### Platform Initialization

**CRITICAL: Browser Platform REQUIRES licenseKey**

```typescript
// platform/src/main.tsx
import IOBrowserPlatform from '@interopio/browser-platform';
import { IOConnectProvider } from '@interopio/react-hooks';

const settings = {
  browserPlatform: {
    factory: IOBrowserPlatform,
    config: {
      licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY, // REQUIRED!
    },
  },
};

createRoot(document.getElementById('root')!).render(
  <IOConnectProvider settings={settings}>
    <App />
  </IOConnectProvider>
);
```

**Error if missing:** `Cannot start the IoConnect Browser Platform without a config object`


**Pattern: Publisher (Client List)**
```typescript
import { useContext } from 'react';
import { IOConnectContext } from '@interopio/react-hooks';

const io = useContext(IOConnectContext);

const handleClick = async (client: Client) => {
  if (io) {
    // Note: No type arguments - type is inferred from data
    await io.contexts.update('SelectedClient', {
      type: 'fdc3.contact',
      id: { email: client.email },
      name: client.name,
    });
  }
};
```

**Pattern: Subscriber (Client Portfolio)**
```typescript
import { useIOConnect } from '@interopio/react-hooks';

useIOConnect((io) => {
  const unsubscribe = io.contexts.subscribe(
    'SelectedClient',
    (data: ClientContext) => {
      setClient(data);
    }
  );
  return unsubscribe; // Cleanup
}, []);
```

---

## Port Management

### The Problem We Had:
- Multiple servers running on different ports
- Platform pointing to wrong port
- Cache issues from port changes

### The Solution:

**1. Track Ports Consistently:**
```
Platform:         localhost:5175
Client List:      localhost:3001
Client Portfolio: localhost:3003
```

**2. Update Platform iframe sources:**
```tsx
<iframe src="http://localhost:3001" />  {/* Client List */}
<iframe src="http://localhost:3003" />  {/* Portfolio */}
```

**3. Check running servers before starting:**
```powershell
# Stop all first
# Then start in order:
cd platform && npm run dev       # Will use 5175
cd client-list && npm run dev    # Will use 3001  
cd client-portfolio && npm run dev  # Will use 3003
```

**4. If port conflict:**
- Check Vite output for actual port used
- Update Platform App.tsx with correct port
- Hard refresh browser (Ctrl+Shift+R)

---

## CSS Caching Issues

### The Problem We Had:
Browser cached old CSS, changes not reflecting.

### The Solution:

**1. Hard Refresh:**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**2. Add timestamp to force reload:**
```css
/* Updated: 2026-01-26 14:05 */
```

**3. Stop and restart dev servers:**
```powershell
# Ctrl+C in each terminal
npm run dev  # Fresh start clears Vite cache
```

**4. Clear browser cache:**
- F12 → Network tab → Disable cache (checkbox)
- Or close browser completely and reopen

---

## Error Prevention Checklist

### Before Saying "I'm Done"

**✅ TypeScript:**
- [ ] No `any` types
- [ ] All parameters typed
- [ ] All event handlers typed
- [ ] State uses generics

**✅ Styling:**
- [ ] Dark theme applied (`#0f172a` background)
- [ ] Glassmorphism on all cards
- [ ] No bright/colorful gradients
- [ ] Smooth transitions on hover

**✅ Layout:**
- [ ] Full width (`100vw` for iframe apps)
- [ ] No wasted white space
- [ ] Custom scrollbars
- [ ] Responsive grid

**✅ Communication:**
- [ ] Using `io.contexts` (Shared Contexts)
- [ ] IOConnectProvider in main.tsx
- [ ] Cleanup in useIOConnect returns
- [ ] NO `window.postMessage` or `BroadcastChannel`

**✅ Testing:**
- [ ] All ports correct in Platform
- [ ] Hard refresh tested
- [ ] Click client → Portfolio updates
- [ ] No console errors

---

## Common Errors and Fixes

### Error: "Module does not provide export"

**Cause:** Interface not exported or file cached

**Fix:**
```typescript
// Make sure to export
export interface FDC3Contact {
  type: "fdc3.contact";
  id: { email: string };
  name: string;
}

// Then restart dev server
```

### Error: "White screen / Blank iframe"

**Cause:** Wrong port, initialization hang, or error not displayed

**Fix:**
1. Check ports match in Platform App.tsx
2. Open iframe URL directly to see error
3. Check browser console
4. Add error boundaries

### Error: "Apps not communicating"

**Cause:** Not using io.Connect APIs or missing IOConnectProvider

**Fix:**
1. Ensure `IOConnectProvider` wraps your app in `main.tsx`
2. Use `io.contexts.update()` to publish
3. Use `io.contexts.subscribe()` to listen
4. Check that io.Connect Browser Platform is running

### Error: "CSS not updating"

**Cause:** Browser cache

**Fix:**
1. Hard refresh (Ctrl+Shift+R)
2. Restart dev servers
3. Add timestamp comment to CSS

### Error: "Platform already started"

**Cause:** React StrictMode double-mounting with io.Connect Platform

**Fix:**
```typescript
// Platform main.tsx - Consider removing StrictMode for Platform only
createRoot(document.getElementById('root')!).render(
  <IOConnectProvider settings={settings}>
    <App />
  </IOConnectProvider>
);
```

---

## Why These Rules Matter

1. **TypeScript** - Prevents runtime errors, improves DX
2. **Dark Theme** - Professional financial UI standard
3. **Glassmorphism** - Modern, premium aesthetic  
4. **Full Width** - Maximizes screen real estate
5. **io.Connect APIs** - Enterprise-grade interop with proper lifecycle management
6. **Port Management** - Prevents mismatched URLs
## Final Rule

**If ANY of these are violated, the work is INCOMPLETE:**
1. TypeScript errors must be ZERO
2. Dark theme must be applied
3. Full width must be achieved
4. Communication must work via io.Connect APIs (NOT postMessage/BroadcastChannel)
5. All ports must be correct and verified

**Test EVERY change by:**
1. Hard refresh browser
2. Click a client in list
3. Verify portfolio updates
4. Check console for errors
5. Verify width fills screen

---

## Why These Rules Matter

1. **TypeScript** - Prevents runtime errors, improves DX
2. **Dark Theme** - Professional financial UI standard
3. **Glassmorphism** - Modern, premium aesthetic  
4. **Full Width** - Maximizes screen real estate
5. **io.Connect APIs** - Enterprise-grade interop with proper lifecycle management
6. **Port Management** - Prevents mismatched URLs
7. **Cache Handling** - Ensures changes are visible

**These are requirements, not suggestions.**
