/**
 * Pure session helpers shared by the proxy (pre-render guard) and the
 * server-side page guard.
 *
 * This is the seam that gets swapped for Better Auth: replace
 * `parseSessionCookie()` with a call to Better Auth's session lookup (and
 * `SESSION_COOKIE` with its cookie name) once authentication is wired up —
 * both guards keep working unchanged.
 */

export type Session = {
  user: {
    id: string
    name?: string | null
    email?: string
    image?: string | null
  }
}

/** Name of the cookie the session seam reads. Swap alongside `parseSessionCookie`. */
export const SESSION_COOKIE = "session"

/**
 * Whether protected routes must enforce authentication.
 *
 * Gated behind `REQUIRE_AUTH` (set to `1` or `true` in `.env.local`) so the
 * Create Event page stays reviewable until real authentication exists.
 * Always read at request time — never at build time.
 */
export function isAuthRequired(): boolean {
  const flag = process.env.REQUIRE_AUTH
  return flag === "1" || flag?.toLowerCase() === "true"
}

/** Parses the raw session cookie value into a `Session`, or `null` if invalid/absent. */
export function parseSessionCookie(raw: string | undefined): Session | null {
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Session> | null
    const user = parsed?.user
    if (!user || typeof user.id !== "string" || user.id.length === 0) {
      return null
    }

    return {
      user: {
        id: user.id,
        name: typeof user.name === "string" ? user.name : null,
        email: typeof user.email === "string" ? user.email : undefined,
        image: typeof user.image === "string" ? user.image : null,
      },
    }
  } catch {
    return null
  }
}

/** Login URL that preserves the page the visitor originally requested. */
export function loginPathWithRedirect(pathname: string): string {
  return `/login?redirect=${encodeURIComponent(pathname)}`
}
