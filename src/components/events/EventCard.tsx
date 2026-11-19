import Link from "next/link"
import { format } from "date-fns"
import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react"

import { EventImage } from "@/components/events/EventImage"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { EventRecord } from "@/services/events"
import { cn } from "cn"

/**
 * Event card: 16:9 thumbnail, category badge, description, location/date
 * metadata, and a CTA pinned to the bottom so grid rows stay aligned.
 */
export function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none">
      <EventImage src={event.thumbnailUrl} alt={`${event.title} event thumbnail`} />

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <Badge variant="secondary" className="w-fit">
          {event.eventType}
        </Badge>

        <h3 className="text-xl font-semibold leading-snug">{event.title}</h3>

        {event.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {event.location ? (
            <span className="flex items-center gap-2">
              <MapPinIcon aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <span className="truncate">{event.location}</span>
            </span>
          ) : null}
          {/* Dates are formatted in the viewer's timezone; suppress the
              server/client text difference during hydration. */}
          <time
            dateTime={event.eventDate}
            suppressHydrationWarning
            className="flex items-center gap-2"
          >
            <CalendarDaysIcon aria-hidden="true" className="size-4 shrink-0 text-primary" />
            {format(new Date(event.eventDate), "MMMM d, yyyy")}
          </time>
        </div>

        <Link
          href={`/upcoming-events/${event.id}`}
          className={cn(
            buttonVariants(),
            "mt-auto w-full justify-center gap-2"
          )}
        >
          View Event
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  )
}
