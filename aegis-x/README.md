# Aegis‑X Digital Headquarters

**A cyber‑noir, high‑performance React application** built with React 18, Vite and TypeScript.

This repository contains the implementation for the **Aegis‑X** community dashboard, tailored for the SRM Madurai DEPLOYATHON. The design emphasizes an obsidian dark mode, electric cobalt & toxic neon‑green accents, glassmorphism, micro‑interactions and psychological UX patterns (F‑pattern, cognitive load reduction).

## 🏗 Architecture & Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (utility‑first with custom color palette and animations)
- **Animations:** Framer Motion for smooth entrances and micro‑interactions
- **Icons:** lucide‑react

## 📁 Component Structure

| File | Purpose |
|------|---------|
| `App.tsx` | Entry point; switches between modules after boot sequence |
| `components/Layout.tsx` | Shell with scanline/CRT overlays, floating shields, and navigation bar |
| `components/TerminalBoot.tsx` | Initial simulated cybersecurity boot sequence |
| `components/Nexus.tsx` | Hero module with particle/grid background, marquee ticker, floating shields and terminal‑video background |
| `components/OperationsHub.tsx` | Filterable mission list with glass cards |
| `components/Vanguard.tsx` | Leaderboard with rank‑up glow animations |
| `components/ThreatAnalyzer.tsx` | Fake AI URL scanner for demo purposes |
| `components/FloatingShields.tsx` | Decorative component used across the site to sprinkle shield icons |

**Note:** place a short looping `terminal-loop.mp4` video in the `public/` folder (or update the `<video>` source path) to activate the running‑terminal background effect on the Nexus hero page.

## 🎨 Styling & Theme

- **Background:** `#050505` (obsidian)
- **Accents:** `#39FF14` (neon green), `#0047AB` (electric cobalt)
- **Global utilities:** glass panels, text/box glow, scanline/CRT overlays

Custom Tailwind config defines colors, fonts, keyframes and utility classes.

## ✅ Verification & Testing

### Automated
1. `npm run build` – performs `tsc --noEmit` and a production build via Vite.
2. TypeScript compilation errors are surfaced during development and build.

### Manual
- Watch the terminal boot sequence on app startup.
- Resize browser to verify responsive layouts (desktop & mobile).
- Interact with **Operations Hub** filters and cards.
- Run scans in **Threat Analyzer** and observe log output.

## 🚀 Development

```bash
npm install
npm run dev   # start Vite dev server
```

Build for production:

```bash
npm run build
```

## 🔧 Notes

- The current README content from the original template is preserved below for ESLint/plugin guidance.

---


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
