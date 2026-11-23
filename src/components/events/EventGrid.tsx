import { EventCard } from "@/components/events/EventCard"
import { EventRecord } from "@/services/events.types"


/**
 * Shared responsive event grid: 1 column on mobile, 2 on tablet, 3 on desktop,
 * 4 on large screens — sized for the 1280px content container.
 */
export const EVENT_GRID_CLASS =
  "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"

/** Renders equal-height event cards in the shared responsive grid. */
export function EventGrid({ events }: { events: EventRecord[] }) {
  return (
    <div className={EVENT_GRID_CLASS}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
