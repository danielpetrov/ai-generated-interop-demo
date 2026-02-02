---
trigger: always_on
description: Code Quality Requirements - Global Standards
---

# Rule: Code Quality and UI Standards

## TypeScript Requirements (Mandatory)

- **Never use `any`** - Define explicit interfaces
- **Type all parameters** - Function arguments must have types
- **Type event handlers** - Use `MessageEvent`, `React.ChangeEvent<HTMLInputElement>`, etc.
- **Export and share interfaces** - Reuse types across components
- **State uses generics** - `useState<Client | null>(null)`
- **Use `import type` for type-only imports** - Required when `verbatimModuleSyntax` is enabled

```typescript
// ✅ Correct
import type { Client, Portfolio } from "./types";
import { CONTEXT_NAME } from "./types";

// ❌ Wrong - will error with verbatimModuleSyntax
import { Client, Portfolio, CONTEXT_NAME } from "./types";
```

---

## Vite Project Structure (Mandatory)

### No Parent Directory Imports
Vite cannot resolve imports from outside the project root. Each app must have its own copy of shared files.

```typescript
// ❌ Wrong - Vite will fail
import { Client } from "../../shared/types";

// ✅ Correct - copy files into each app's src/
import { Client } from "./types";
```

### Multi-App Monorepo Pattern
When creating multiple Vite apps that share code:
1. Copy shared `types.ts` and `mockData.ts` into each app's `src/` folder
2. Or use a proper monorepo setup with workspaces and build step

---

## io.Connect React Patterns (Mandatory)

### Context Access - Use React's useContext
```typescript
// ✅ Correct
import { useContext } from "react";
import { IOConnectContext } from "@interopio/react-hooks";

const io = useContext(IOConnectContext);

// ❌ Wrong - useIOConnectContext doesn't exist
import { useIOConnectContext } from "@interopio/react-hooks";
```

### useIOConnect Hook - For Subscriptions
```typescript
import { useIOConnect } from "@interopio/react-hooks";

// Use for subscriptions with cleanup
useIOConnect(async (io) => {
  const unsubscribe = await io.contexts.subscribe("ContextName", callback);
  return () => unsubscribe(); // Cleanup function
}, []);
```

---




## Styling Standards (Mandatory)

### Dark Theme
All apps MUST use dark theme unless otherwise specified:
- **Base background**: `#0f172a` (dark slate)
- **Secondary background**: `#1e293b`
- **Text colors**: `#f1f5f9` (primary), `#94a3b8` (secondary), `#64748b` (muted)

**❌ NEVER**: Bright purple/pink gradients, plain bright backgrounds

### Glassmorphism (Required for Cards)
- Semi-transparent backgrounds with blur
- Subtle borders and shadows
- Smooth hover transitions

---

## Layout Requirements (Mandatory)

### Full Width for Iframe Apps
```css
.app-container {
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
}
```

### Platform Grid Layout
```css
.apps-container {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 0;
  overflow: hidden;
}
```

---

## Development Operations

### Port Management
1. Track ports consistently across all apps
2. Update Platform iframe sources when ports change
3. Check Vite output for actual port used
4. Hard refresh browser after port changes

### CSS Caching
1. **Hard Refresh**: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
2. **Restart dev servers** to clear Vite cache
3. **Disable cache** in DevTools Network tab during development

---

## Completion Checklist

Before saying "done", verify:

**TypeScript:**
- [ ] No `any` types
- [ ] All parameters typed
- [ ] All event handlers typed
- [ ] Type-only imports use `import type`

**Styling:**
- [ ] Dark theme applied (`#0f172a`)
- [ ] Glassmorphism on cards
- [ ] Smooth hover transitions

**Layout:**
- [ ] Full width (`100vw` for iframe apps)
- [ ] No wasted white space

**Testing:**
- [ ] Hard refresh tested
- [ ] No console errors

---

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Module not exported | Interface not exported | Add `export` keyword, restart server |
| White screen / Blank iframe | Wrong port or init hang | Check ports, open iframe URL directly |
| CSS not updating | Browser cache | Hard refresh, restart dev servers |
| `does not provide an export named 'X'` | Importing from parent directory | Copy shared files into each app's `src/` folder |
| `useIOConnectContext is not exported` | Wrong hook name | Use `useContext(IOConnectContext)` instead |
| `type must be imported using type-only import` | verbatimModuleSyntax enabled | Use `import type { X }` for types |
| Using BroadcastChannel/postMessage | Browser-native messaging | Use io.Connect APIs (`io.contexts`, `io.channels`, `io.interop`) |
| "Workspace channels" terminology | Incorrect conflation | Use "Channels" (global) or "Workspace Context" (scope isolation) |

---

**These are requirements, not suggestions.**