"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn } from "lucide-react"
import { cn } from "cn"
import { BrandLogo, BrandName } from "./brand"
import { MobileMenu } from "./mobile-menu"
import { type NavbarUser } from "./nav-items"
import { ThemeToggle } from "./theme-toggle"
import { UserMenu } from "./user-menu"
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"

interface NavbarProps {
  /** Pass the authenticated user (mapped to NavbarUser) once auth exists. */
  user?: NavbarUser | null
  /** Sign-out handler wired up when auth exists (toast + redirect live there). */
  onLogout?: () => void | Promise<void>
}

function CenterNavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group flex flex-col items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        className={cn(
          "px-1 pt-1 pb-1.5 text-sm font-medium transition-colors duration-200",
          active ? "text-primary" : "text-foreground/80 group-hover:text-primary",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-0.5 w-full rounded-full transition-colors duration-200",
          active ? "bg-primary" : "bg-transparent",
        )}
      />
    </Link>
  )
}

export function Navbar() {

  const {data: session} = authClient.useSession()
  const user = session?.user

  const onLogout = () => {
    authClient.signOut()
  }

  const pathname = usePathname()
  const isEventsActive =
    pathname === "/upcoming-events" || pathname.startsWith("/upcoming-events/")

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto h-[76px] max-w-[1280px] px-4 sm:px-6">
        {/* 1fr | auto | 1fr keeps the center column centered regardless of
            how wide the left or right sections are. */}
        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 justify-self-start rounded-lg py-1 pr-2 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BrandLogo />
            <BrandName />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden justify-self-center md:block"
          >
            <CenterNavLink href="/upcoming-events" active={isEventsActive}>
              Upcoming Events
            </CenterNavLink>
          </nav>

          <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">
            <ThemeToggle />
            <div className="hidden md:flex">
              {user ? (
                <UserMenu user={user} onLogout={onLogout} />
              ) : (
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "default" })}
                >
                  <LogIn />
                  Login
                </Link>
              )}
            </div>
            <MobileMenu
              user={user}
              onLogout={onLogout}
              className="md:hidden"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
