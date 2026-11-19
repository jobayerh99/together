import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  isAuthRequired,
  loginPathWithRedirect,
  parseSessionCookie,
  SESSION_COOKIE,
  type Session,
} from "@/lib/session"

export { isAuthRequired, type Session } from "@/lib/session"

/**
 * Returns the current session, or `null` when there is none.
 *
 * Always awaits the request cookie, so routes calling this render per request
 * instead of being statically prerendered (which would freeze the
 * `REQUIRE_AUTH` decision from build time).
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  return parseSessionCookie(cookieStore.get(SESSION_COOKIE)?.value)
}

/**
 * Server-side guard for protected pages: reads the session on every request
 * and redirects to `/login`, preserving the intended destination, when
 * authentication is required but no session exists.
 *
 * The same check runs earlier in `src/proxy.ts` so ordinary visits get a real
 * HTTP redirect before rendering; this guard is the in-render fallback.
 *
 * @param pathname - The protected path being requested (e.g. `/create-event`).
 */
export async function requireSession(pathname: string): Promise<Session | null> {
  const session = await getSession()

  if (isAuthRequired() && !session) {
    redirect(loginPathWithRedirect(pathname))
  }

  return session
}
