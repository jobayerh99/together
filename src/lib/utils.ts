export { cn } from "cn"

/** Initials for avatar fallbacks, e.g. "Rahim Uddin" -> "RU". */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
