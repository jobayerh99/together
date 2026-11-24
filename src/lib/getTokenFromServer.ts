import { headers } from "next/headers"
import { auth } from "./auth"

/**
 * Returns the Better Auth JWT for the current request, or `null` when there
 * is no session. Never throws — callers must omit the Authorization header
 * when this returns `null`.
 */
export const getTokenFromServer = async (): Promise<string | null> => {
    try {
        const jwtToken = await auth.api.getToken({
            headers: await headers(),
        })
        return jwtToken?.token ?? null
    } catch {
        // No session (or token generation failed) — public callers still work.
        return null
    }
}
