import { CalendarDays, CirclePlus, ClipboardList, House, Settings2, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

/**
 * Session user shape consumed by the Navbar UI.
 * When authentication is added later, map the session user to this shape —
 * no Navbar changes will be needed.
 */
export interface NavbarUser {
  name: string
  email: string
  image?: string | null
}

/** Links shown in the mobile sheet (always visible). */
export const mainNavItems: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/upcoming-events", label: "Upcoming Events", icon: CalendarDays },
]

/** Protected links: profile dropdown on desktop, mobile sheet when signed in. */
export const protectedNavItems: NavItem[] = [
  { href: "/create-event", label: "Create Event", icon: CirclePlus },
  { href: "/manage-events", label: "Manage Events", icon: Settings2 },
  { href: "/joined-events", label: "Joined Events", icon: ClipboardList },
  { href: "/profile", label: "My Profile", icon: User },
]
