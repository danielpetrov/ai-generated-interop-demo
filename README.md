# Interop.io Demo Apps - Setup Guide

This guide explains how to set up Antigravity (Gemini Code Assist) to automatically generate Interop.io demo applications.

---

## 📁 Reference Files

| File | Purpose |
|------|---------|
| [`SYSTEM_PROMPT.md`](./SYSTEM_PROMPT.md) | System prompt for Antigravity (always-on memory) |
| [`INTEROP_RULES.md`](./INTEROP_RULES.md) | Conditional rule for general Interop development |
| [`RULE_GENERATE_APPS.md`](./RULE_GENERATE_APPS.md) | Conditional rule for **generating new apps** |
| [`PROMPT_CLIENT_LIST_AND_PORTFOLIO.md`](./PROMPT_CLIENT_LIST_AND_PORTFOLIO.md) | Simple prompt that triggers the rules |

---

## 🚀 Quick Setup for Antigravity

### 1. Add System Prompt (Always On)

In Antigravity settings → **Memory**, create a new file:
- **Name:** `interop-fdc3-standards.md`
- **Content:** Copy from [`SYSTEM_PROMPT.md`](./SYSTEM_PROMPT.md)

### 2. Add Conditional Rules (Model Decision)

**Important:** unlike the System Prompt, these rules should **NOT** be "Always On". Add them as standard rules so Antigravity can decide **when** to use them based on context.

In Antigravity settings → **Add Rules** (create two separate rules):

**Rule A: General Development Guidelines**
- **Description:** `Interop.io Development Rules`
- **Content:** Copy from [`INTEROP_RULES.md`](./INTEROP_RULES.md)
- *Why?* This provides lessons learned and patterns for general coding tasks.

**Rule B: App Generation Logic**
- **Description:** `Generate Interop Apps`
- **Content:** Copy from [`RULE_GENERATE_APPS.md`](./RULE_GENERATE_APPS.md)
- *Why?* This contains the logic to Ask "Browser vs Desktop" before generating code.

### 3. Generate the Apps

Simply copy the prompt from [`PROMPT_CLIENT_LIST_AND_PORTFOLIO.md`](./PROMPT_CLIENT_LIST_AND_PORTFOLIO.md):

> **"Generate the client list and portfolio apps."**

The chatbot will detect this request and ask: **"Browser or io.Connect Desktop?"** based on Rule B.

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
