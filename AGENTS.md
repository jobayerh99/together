<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Social Development Events Platform (ShomajBondhu)

The binding assignment spec lives in `docs/ASSIGNMENT.md` (design system, routes, auth/JWT rules, DB schema, API surface, commit/README/deployment requirements). It is loaded every session via `opencode.json` → `instructions`. On conflict, the spec wins.

## Commands (npm repo — don't introduce other lockfiles)

- `npm run dev` — dev server; Turbopack is the default bundler in Next 16.
- `npm run lint` — ESLint flat config (`eslint.config.mjs`).
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script.
- `npm run build` — production build.
- No test runner and no CI exist. Verify in this order: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Repo shape

- Single package, App Router under `src/`; alias `@/*` → `./src/*` (tsconfig).
- Still a scaffold: `src/app/page.tsx` is empty, `src/components/ui/` is the shadcn kit, plus `src/lib/` and `src/hooks/`. No backend, auth, database, or `.env*` files yet — the Express/Better Auth/MongoDB side is unbuilt work from the spec.

## Toolchain gotchas

- **Next.js 16.4.6 + React 19.3** — bundled docs in `node_modules/next/dist/docs/` differ from older Next; check them before writing code. Layouts use the generated `LayoutProps<"/route">` type (see `src/app/layout.tsx`).
- **React Compiler enabled** (`reactCompiler: true` in `next.config.ts`) — manual `memo`/`useMemo`/`useCallback` is unnecessary.
- **`cacheComponents: true`** (+ `partialPrefetching`) — data fetching follows the Next 16 cache model; don't copy pre-16 `revalidate`/`dynamic` idioms without checking the bundled docs.
- **Tailwind v4 is CSS-first** — no `tailwind.config`; theme tokens live in `src/app/globals.css` (`@theme inline` + oklch variables). CSS goes through the `@tailwindcss/turbopack` loader rule in `next.config.ts`.
- **shadcn style is `base-nova`** (`components.json`) — components wrap `@base-ui/react`, **not Radix**; most online shadcn examples won't match. `cn` is the npm package `cn` (ui components import it directly; `src/lib/utils.ts` re-exports it). Add components with `npx shadcn add <component>` (CLI is a dependency).
- **Fonts are half-wired** — `layout.tsx` loads Inter (spec also requires Hind Siliguri, not loaded yet). `globals.css` maps `--font-sans`/`--font-mono` to `var(--font-sans)`/`var(--font-geist-mono)`, which nothing defines since the Geist `variable:` prop was removed from the layout; body text works only via Inter's class on `<html>`, while `font-mono`/`font-heading` don't resolve to a real family.

## Managed `nextjs-agent-rules` block

- Never edit or insert text between the `BEGIN:nextjs-agent-rules` / `END:nextjs-agent-rules` comment markers at the top of this file. `next dev` rewrites that region wholesale (`upsertAgentRulesBlock` in `node_modules/next/dist/server/lib/generate-agent-files.js`) and deletes anything else stored there. Custom content always goes after the `END` marker.
- With `experimental.agentFeedback: true`, `next dev` may also append an agent-feedback block to this file — keep it rather than stripping it.
- Confirm the block is intact:
  `node -e "console.log(require('next/dist/server/lib/generate-agent-files.js').hasCurrentAgentRules(process.cwd()))"` → must print `true`.
