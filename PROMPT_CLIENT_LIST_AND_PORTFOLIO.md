# Prompt: Generate Client List & Portfolio Apps

Use this prompt to generate the Interop.io demo applications from scratch.

---

## The Prompt

```
Create two interconnected demo apps for client management:

1. **Client List** (port 3001) - Displays a searchable list of clients with modern dark UI
2. **Client Portfolio** (port 3003) - Displays portfolio details for the selected client

Before you start, ask me:
**"Do you want to run these apps in a standalone BROWSER or inside IO.CONNECT DESKTOP?"**

---

## IF USER CHOOSES: BROWSER MODE

Create 3 apps with this structure:

### client-list/
- `src/main.tsx` - Simple render without IOConnectProvider
- `src/App.tsx` - Creates BroadcastChannel('client-sync'), passes to ClientList
- `src/components/ClientList.tsx` - On client click: `channel.postMessage({ type: 'fdc3.contact', name, id: { email } })`
- `src/components/ClientList.css` - Modern dark theme with glassmorphism
- `src/services/clientData.ts` - Mock data with 5+ clients (name, email, company, riskProfile, totalAssets)
- `src/index.css` - Global dark theme styles
- `src/App.css` - App layout with header

### client-portfolio/
- `src/main.tsx` - Simple render without IOConnectProvider
- `src/App.tsx` - Creates BroadcastChannel('client-sync'), passes to ClientPortfolio
- `src/components/ClientPortfolio.tsx` - Listens: `channel.addEventListener('message', handler)`, displays portfolio
- `src/components/ClientPortfolio.css` - Matching dark theme
- `src/services/portfolioData.ts` - Mock portfolios keyed by email (holdings, performance, allocation)
- `src/index.css` - Global styles
- `src/App.css` - App layout

### platform/
- `.env` - Contains `VITE_IOCONNECT_LICENSE_KEY=your_key_here`
- `src/config.ts` - Exports `{ licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY }`
- `src/vite-env.d.ts` - TypeScript types for import.meta.env
- `src/main.tsx` - Initializes IOBrowserPlatform with config.licenseKey, channel definitions (Red, Green, Blue, Yellow, Purple), and app definitions pointing to localhost:3001 and localhost:3003
- `src/App.tsx` - Dashboard with two iframes embedding client-list and client-portfolio side by side
- `src/App.css` - Grid layout for side-by-side panels
- `src/index.css` - Global platform styles
- `vite.config.ts` - React plugin enabled
- `index.html` - Points to src/main.tsx with div#root

### configs/
- `client-list.json` - io.Connect app definition
- `client-portfolio.json` - io.Connect app definition

---

## IF USER CHOOSES: IO.CONNECT DESKTOP MODE

Create 2 apps (no platform needed):

### client-list/
- `src/main.tsx` - IOConnectProvider with @interopio/desktop factory, channels: true, libraries: [IOWorkspaces]
- `src/App.tsx` - Uses useIOConnect hook, passes io to ClientList
- `src/components/ClientList.tsx` - Uses `io.channels.publish({ type: 'fdc3.contact', ... })` and `io.workspaces.getMyWorkspace().updateContext()`

### client-portfolio/
- `src/main.tsx` - Same IOConnectProvider setup
- `src/App.tsx` - Uses useIOConnect hook
- `src/components/ClientPortfolio.tsx` - Uses `io.channels.subscribe()` and restores from workspace context

### configs/
- `client-list.json` - App definition with includeInWorkspaces: true
- `client-portfolio.json` - App definition with includeInWorkspaces: true

---

## FOR BOTH MODES:
- Use React + TypeScript + Vite
- Use fdc3.contact context format
- Modern dark-themed financial UI with:
  - Dark background (#0f172a)
  - Glassmorphism effects
  - Smooth animations
  - Search functionality in Client List
  - Performance charts, allocation bars, holdings table in Portfolio
- Include educational comments explaining patterns
- Create mock data services with TypeScript interfaces
```

---

## Expected Output

After running the prompt:
- 3 Vite projects (browser mode) or 2 projects (desktop mode)
- All styling complete with dark theme
- Mock data services with realistic financial data
- Working inter-app communication
- App configuration files for io.Connect
