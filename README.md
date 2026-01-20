# Interop.io Demo Apps - Setup Guide

This guide explains how to set up Antigravity (Gemini Code Assist) to automatically generate Interop.io demo applications.

---

## � Reference Files

| File | Purpose |
|------|---------|
| [`SYSTEM_PROMPT.md`](./SYSTEM_PROMPT.md) | System prompt for Antigravity (always-on memory) |
| [`INTEROP_RULES.md`](./INTEROP_RULES.md) | Conditional rules for model decision |
| [`PROMPT_CLIENT_LIST_AND_PORTFOLIO.md`](./PROMPT_CLIENT_LIST_AND_PORTFOLIO.md) | Prompt to generate the demo apps |

---

## 🚀 Quick Setup

### 1. Add System Prompt (Always On)

In Antigravity settings → **Memory**, create a new file:
- **Name:** `interop-fdc3-standards.md`
- **Content:** Copy from [`SYSTEM_PROMPT.md`](./SYSTEM_PROMPT.md)

This makes Antigravity always act as an Interop.io expert.

### 2. Add Conditional Rule

In Antigravity settings → **Add Rules**:
- **Description:** `Interop.io Development Rules - Lessons Learned`
- **Content:** Copy from [`INTEROP_RULES.md`](./INTEROP_RULES.md)

This triggers when building Interop.io apps.

### 3. Generate the Apps

Copy the prompt from [`PROMPT_CLIENT_LIST_AND_PORTFOLIO.md`](./PROMPT_CLIENT_LIST_AND_PORTFOLIO.md) and paste it into the chat.

The chatbot will ask: **"Browser or io.Connect Desktop?"**
- **Browser:** Creates platform + 2 apps with BroadcastChannel
- **io.Connect Desktop:** Creates 2 apps with IOConnectProvider

---

## 🔑 License Key Setup

The io.Connect Browser Platform requires a license key.

### 1. Get a License
Contact Interop.io at https://interop.io

### 2. Configure
```bash
# .env (at project root)
VITE_IOCONNECT_LICENSE_KEY=your_license_key_here
```

### 3. Already in .gitignore
```gitignore
.env
.env.local
.agent/
```

See [`INTEROP_RULES.md`](./INTEROP_RULES.md) for full setup details.

---

## 📁 Project Structure

```
demo-app/
├── .env                   # License key (at root, gitignored)
├── .gitignore             # Ignores .env and .agent/
├── client-list/           # Publisher app (port 3001)
├── client-portfolio/      # Subscriber app (port 3003)
├── platform/              # Browser Platform (port 5175)
├── configs/               # io.Connect app definitions
├── SYSTEM_PROMPT.md       # Antigravity system prompt
├── INTEROP_RULES.md       # Development rules
├── PROMPT_CLIENT_LIST_AND_PORTFOLIO.md  # Generation prompt
└── README.md              # This file
```

---

## 📋 Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Node.js** | 18+ recommended | JavaScript runtime |
| **npm** | Comes with Node.js | Package manager |

**Optional (for io.Connect Desktop mode):**
- io.Connect Desktop installed
- Valid license key in `.env`

---

## 🏃 Running the Apps

### 1. Install Dependencies (first time only)
```bash
cd client-list && npm install
cd client-portfolio && npm install
cd platform && npm install
```

### 2. Start the Servers

**Browser Mode:**
```bash
# Terminal 1
cd client-list && npx vite --port 3001

# Terminal 2
cd client-portfolio && npx vite --port 3003

# Terminal 3
cd platform && npx vite --port 5175
```

### 3. Open in Browser
Navigate to **http://localhost:5175** to see both apps side by side.

---

### io.Connect Desktop Mode
1. Copy `configs/*.json` to io.Connect Desktop apps folder
2. Start io.Connect Desktop
3. Open apps from the Launcher
4. Join both to the same channel (e.g., Red)
