import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

import { isAuthRequired, loginPathWithRedirect, parseSessionCookie, SESSION_COOKIE } from "@/lib/session"

/**
 * Runs before rendering, so protected routes get a real HTTP redirect (307)
 * to `/login` — no JavaScript required and no flash of content. The `?redirect=`
 * parameter preserves the page the visitor originally requested.
 *
 * The matcher scopes the guard to protected routes; add future protected
 * paths there. The same session seam runs again inside the page itself
 * (`requireSession` in `src/lib/auth.ts`) as an in-render fallback.
 */
export function proxy(request: NextRequest): NextResponse {
  const requestedPath = request.nextUrl.pathname + request.nextUrl.search

  // Better Auth guard for /profile. `getSessionCookie` is the official
  // edge-safe helper (cookie presence only), so the redirect happens before
  // any HTML streams — the page then re-validates the session against the
  // database, which is what actually rejects expired or forged cookies.
  if (request.nextUrl.pathname === "/profile" && !getSessionCookie(request)) {
    return NextResponse.redirect(new URL(loginPathWithRedirect(requestedPath), request.url))
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value

  if (isAuthRequired() && !parseSessionCookie(sessionCookie)) {
    // Preserve the full original target (path + query) for the post-login return.
    return NextResponse.redirect(new URL(loginPathWithRedirect(requestedPath), request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Keep in sync with the protected routes listed in docs/ASSIGNMENT.md.
  matcher: ["/create-event", "/profile"],
}
