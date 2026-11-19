import { NextResponse, type NextRequest } from "next/server"

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
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value

  if (isAuthRequired() && !parseSessionCookie(sessionCookie)) {
    // Preserve the full original target (path + query) for the post-login return.
    const requestedPath = request.nextUrl.pathname + request.nextUrl.search
    return NextResponse.redirect(new URL(loginPathWithRedirect(requestedPath), request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Keep in sync with the protected routes listed in docs/ASSIGNMENT.md.
  matcher: ["/create-event"],
}
