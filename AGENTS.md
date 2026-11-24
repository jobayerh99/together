<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — "Together" (Social Development Events Platform)

`docs/ASSIGNMENT.md` is the binding assignment spec (design system, routes, auth rules, DB/API requirements, commit rules). It is loaded every session via `opencode.json` → `instructions`; don't duplicate it here. On conflict, the spec wins — except where it describes code that doesn't exist (e.g. the `/api/events/...` endpoints in spec §19 never got built; see Data layer).

## Commands

- `npm run dev` — dev server (Turbopack). Verify in this order: `npm run lint` → `npx tsc --noEmit` → `npm run build`. There is no `typecheck` script, no test runner, no CI, no pre-commit hooks; `build` also typechecks.
- Baseline at last verification (don't assume you caused these): lint exits 1 with 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`, plus ~9 unused-import warnings. tsc and build pass.
- `.env` is gitignored and there is no `.env.example` — a fresh clone has no env at all, and every backend fetch then hits `undefined/...`. Required keys: `NEXT_PUBLIC_API_URL` (Express backend, e.g. `http://localhost:8000`), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI` (this app's own Better Auth connects to Mongo directly from `src/lib/auth.ts`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## Architecture you can't infer from filenames

- This repo is frontend only. The Express/MongoDB backend is a **separate git repo**: `C:\projects\together-server` (plain ESM JS — `"type": "module"` — run `node index.js`, port 8000, database `together`, collections `event` and `joined`; the same DB holds Better Auth's user collections). Event pages fail without it running.
- Every backend call reads `process.env.NEXT_PUBLIC_API_URL` (single source of truth, in `.env`); there are no hardcoded hosts left in `src/`.
- Auth is Better Auth (`src/lib/auth.ts`: MongoDB adapter, `jwt()` plugin, Google OAuth + email/password; client in `src/lib/auth-client.ts`). Prefer `authClient` — it has the baseURL and `jwtClient`; the extra bare `createAuthClient()` export on line 11 is unused legacy.
- Authenticated backend calls send `Authorization: Bearer <jwt>` from `getTokenFromServer()` (server) or `getTokenFromClient()` (client). together-server builds its JWKS URL as `` `${CLIENT_URL}pr/api/auth/jwks` `` — with the current `.env` (`CLIENT_URL=http://localhost:3000`, no trailing slash) `new URL()` throws, so every JWT-checked endpoint errors out. The real endpoint this app serves is `GET /api/auth/jwks`. First suspect when create/update/joined-detail requests return 401/500.
- Route protection is `src/proxy.ts` — Next 16 renamed `middleware` → `proxy`. Matcher: `/create-event`, `/joined-events`, `/profile`, `/manage-events`.
- Dead code: `src/lib/session.ts` (`parseSessionCookie`, `isAuthRequired`, `REQUIRE_AUTH`) is a pre-Better-Auth seam nothing imports — don't build on it.

## Next 16 specifics (bundled docs: `node_modules/next/dist/docs/`)

- `cacheComponents: true` (+ `partialPrefetching`): request-time data must sit inside a `<Suspense>` (see `upcoming-events/page.tsx`), or the page opts into blocking with `export const instant = false` (`create-event`, `profile`).
- Layouts use the generated `LayoutProps<"/route">` type.
- React Compiler is on — no manual `memo`/`useMemo`/`useCallback`.

## UI conventions

- Tailwind v4 is CSS-first: no `tailwind.config`; tokens live in `src/app/globals.css` (`@theme inline` + light/dark semantic vars).
- shadcn style is `base-nova`: components wrap `@base-ui/react`, **not Radix** (most online shadcn examples won't match). `cn` is the npm package `cn` (import directly; `src/lib/utils.ts` re-exports it). Add components with `npx shadcn add <component>`.
- Toasts use `src/components/ui/toast` (Base UI, mounted in `providers.tsx`) — the assignment mentions Sonner, but don't add it; never use `alert()`.
- Fonts: only Inter is loaded (`layout.tsx`); `globals.css` maps `--font-sans` to itself and `--font-mono` to `--font-geist-mono` (defined nowhere), so `font-sans`/`font-mono`/`font-heading` utilities resolve to no real family — body text works only via Inter's class on `<html>`. Hind Siliguri (spec) is not loaded.

## Data layer

- Server components/actions call the backend directly (`src/services/events.ts`, `"use server"`); responses are normalized there — accepts a bare array or `{events}`/`{data}` envelope, drops invalid rows, and filters/re-sorts client-side because the backend guarantees neither (`GET /upcoming-events` is a bare `find().toArray()`).
- Actual backend routes (no `/api` prefix, irregular names — copy from existing call sites, don't guess): `POST /create-event`, `GET /upcoming-events`, `GET /upcoming-event/:id`, `POST /joined`, `GET /joined-events/:email`, `DELETE /joinedevents/:id`, `GET /manage-events/:email`, `PATCH|DELETE /event/:id`. Note `POST /joined` and `DELETE /joinedevents/:id` currently skip JWT verification.
- `EventRecord` is exported from `@/services/events.types`; `@/services/events` imports it but does not re-export it.
- Shared Zod schema + category list: `src/lib/event-schema.ts` (used by CreateEventForm and EventFilters; the manage-events edit dialog is hand-rolled `useState` validation, not Zod).
- Event details live at `/upcoming-events/[id]` (the assignment's `/events/[id]` was implemented here — don't create a second route).

## Managed `nextjs-agent-rules` block

- Never edit or insert text between the `BEGIN:nextjs-agent-rules` / `END:nextjs-agent-rules` markers at the top of this file. `next dev` rewrites that region wholesale (`upsertAgentRulesBlock` in `node_modules/next/dist/server/lib/generate-agent-files.js`) and deletes anything else stored there. Custom content always goes after the `END` marker.
- With `experimental.agentFeedback: true`, `next dev` may also append an agent-feedback block to this file — keep it rather than stripping it.
- Confirm the block is intact:
  `node -e "console.log(require('next/dist/server/lib/generate-agent-files.js').hasCurrentAgentRules(process.cwd()))"` → must print `true`.
