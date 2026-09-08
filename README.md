# Nail Germany // Expat Bureaucratic Self-Defense Protocol

A purely static, client-side web application designed to help expats navigate German bureaucracy so they don't get screwed by landlords, predatory employers, or administrative traps.

Built with **Next.js (App Router, static export)**, **Tailwind CSS**, **TypeScript**, and **Zustand** with `localStorage` persistence.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build pure static export (generated in ./out)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Design System (Strict Anti-"AI Slop")
- **Utilitarian & brutally functional**: High-contrast, gov.uk / terminal styling.
- **Zero gradients, zero glassmorphism, zero rounded-3xl corners**.
- **Harsh black borders** (`border-2 border-black` / `border-4 border-black`) and sharp corners (`rounded-none`).
- **Flat utility alert colors**:
  - `bg-red-600` (Critical Priority)
  - `bg-yellow-400` (Recommended)
  - `bg-gray-200` (Optional / Informational)

## Deployment (Netlify)

The project is hosted at **[nail-germany.mokni.dev](https://nail-germany.mokni.dev)**.

- **Platform**: Netlify (Static Export)
- **Configuration**: [netlify.toml](./netlify.toml)
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Canonical Domain**: `https://nail-germany.mokni.dev`

---

## Detailed Documentation
For the complete architectural breakdown, condition filtering rules, database schema, and test verification results, see:
👉 **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**
