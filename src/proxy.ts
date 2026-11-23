import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

interface ProxySession {
  user?: unknown;
}

interface ProxyContext {
  session: ProxySession | null;
}



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest): Promise<NextResponse | undefined> {
  const session = await auth.api.getSession({
    headers: await headers(),
  }) as ProxyContext["session"];


  const user: ProxySession["user"] = session?.user;


  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}


export const config = {
  matcher: ["/create-event", "/joined-events", "/profile", "/manage-events"],
};
