# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ds-markdown is a React component library for rendering Markdown with smooth typing animations, designed for AI chat interfaces. It handles streaming data, code highlighting, math formulas (KaTeX), and Mermaid charts.

Published as `ds-markdown` on npm. Peer dependencies: React 18+.

## Commands

```bash
# Development server (Vite, serves example app)
npm run dev

# Build library (compiles TS + Less → es/ directory)
npm run build

# Run all tests
npm test

# Run a single test file
npx jest test/unit/components.test.tsx

# Lint
npm run lint

# Build docs site
npm run build:docs
```

## Build System

The library build (`npm run build`) uses a custom script (`scripts/build-lib-ts.js`) that:
1. Compiles TypeScript via `tsc -p tsconfig.esm.json` → outputs to `es/`
2. Compiles `.less` files to `.css` in the same structure
3. Post-processes JS/DTS import paths (adds `.js` extensions, converts `.less` → `.css`)

Output goes to `es/` directory (published to npm). No bundler — ships as ES modules.

## Architecture

### Core Components

- **`src/Markdown/`** — Default export. Stateful wrapper that detects content changes (diffing prefix) and pushes deltas to MarkdownCMD. Used when content is passed as `children` string.
- **`src/MarkdownCMD/`** — Lower-level imperative component (exposed as `MarkdownCMD`). Wraps `react-markdown-typer` with code highlighting, math support, plugins, and cursor rendering. Controlled via ref methods (`push`, `clear`, `restart`).
- **`react-markdown-typer`** — External dependency that handles the core typing animation and character-by-character rendering.

### Context Providers

- `src/context/ConfigProvider/` — Global config (locale, i18n)
- `src/context/MarkdownThemeProvider.tsx` — Theme (light/dark) and answer type
- `src/context/MarkdownProvider.tsx` — Per-instance markdown config (plugins, math, code block settings)

### Supporting Modules

- `src/components/CodeComponent/` — Code block rendering with syntax highlighting, copy/download actions
- `src/components/ui/` — Reusable UI primitives (Button, IconButton, Segmented, SuccessButton)
- `src/plugins/` — Plugin system entry point
- `src/utils/remarkMathBracket.ts` — Preprocessor converting bracket-style math (`\[...\]`) to dollar syntax
- `src/i18n/` — Locale files (zh, en)
- `src/defined/` — TypeScript type definitions

### Data Flow (Streaming)

1. User passes growing string as `children` to `<Markdown>`
2. `Markdown` diffs against previous content, extracts the new delta
3. Delta is pushed to `MarkdownCMD` via `cmdRef.current.push(delta)`
4. `react-markdown-typer` queues characters and types them at configured `interval`
5. On each render tick, the full typed-so-far string is rendered through react-markdown with remark/rehype plugins

## Testing

Tests live in `test/unit/`. Uses Jest + jsdom + @testing-library/react. Style imports are mocked via `identity-obj-proxy`. Many ESM-only remark/rehype packages are listed in `transformIgnorePatterns`.

## Key Conventions

- Styles use Less (`.less` files co-located with components)
- CSS class prefix: `ds-markdown-`
- Component props interfaces defined in `src/defined/index.ts`
- The `example/` directory contains demo pages used by the Vite dev server
