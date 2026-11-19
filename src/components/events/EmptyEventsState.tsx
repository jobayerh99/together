import Link from "next/link"
import {
  CalendarXIcon,
  LogInIcon,
  PlusIcon,
  SearchXIcon,
  UserPlusIcon,
  XIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

interface EmptyEventsStateProps {
  /**
   * - `no-events`: the backend returned no upcoming events at all.
   * - `no-matches`: filters hid every event; `onClearFilters` resets them.
   */
  variant: "no-events" | "no-matches"
  /** Whether the visitor may create events (signed in, or auth not required). */
  canCreateEvent?: boolean
  onClearFilters?: () => void
}

/**
 * Empty state for the upcoming-events list. The no-events CTA adapts to the
 * visitor: signed-in users (or everyone, while auth is optional) are offered
 * event creation; signed-out visitors under required auth get login/register.
 */
export function EmptyEventsState({
  variant,
  canCreateEvent,
  onClearFilters,
}: EmptyEventsStateProps) {
  const isNoMatches = variant === "no-matches"

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <span
        className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
        aria-hidden="true"
      >
        {isNoMatches ? <SearchXIcon className="size-6" /> : <CalendarXIcon className="size-6" />}
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">
          {isNoMatches ? "No events match your search." : "No upcoming events found."}
        </h3>
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
          {isNoMatches
            ? "Try a different keyword or category, or clear your filters to see every upcoming event."
            : "New community events are added regularly. Check back soon, or create one to bring neighbours together."}
        </p>
      </div>

      {isNoMatches ? (
        <button
          type="button"
          onClick={onClearFilters}
          className={cn(buttonVariants({ variant: "outline" }), "mt-2 gap-2")}
        >
          <XIcon aria-hidden="true" className="size-4" />
          Clear filters
        </button>
      ) : canCreateEvent ? (
        <Link href="/create-event" className={cn(buttonVariants(), "mt-2 gap-2")}>
          <PlusIcon aria-hidden="true" className="size-4" />
          Create an Event
        </Link>
      ) : (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login" className={cn(buttonVariants(), "gap-2")}>
            <LogInIcon aria-hidden="true" className="size-4" />
            Log in
          </Link>
          <Link href="/register" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
            <UserPlusIcon aria-hidden="true" className="size-4" />
            Register
          </Link>
        </div>
      )}
    </div>
  )
}
