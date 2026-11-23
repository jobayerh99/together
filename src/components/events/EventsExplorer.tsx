"use client"

import { useState } from "react"

import { EmptyEventsState } from "@/components/events/EmptyEventsState"
import {
  DEFAULT_EVENT_FILTERS,
  EventFilters,
  type EventFilterState,
  type EventSort,
} from "@/components/events/EventFilters"
import { EventGrid } from "@/components/events/EventGrid"
import { EventRecord } from "@/services/events.types"


/** Case-insensitive match against the event title or location. */
function matchesQuery(event: EventRecord, query: string): boolean {
  if (!query) return true
  const needle = query.toLowerCase()
  return (
    event.title.toLowerCase().includes(needle) ||
    event.location.toLowerCase().includes(needle)
  )
}

/**
 * Comparator for each sort option. Title sorting lowercases first so the
 * order is identical on server and client regardless of locale rules.
 */
function compareBySort(sort: EventSort): (a: EventRecord, b: EventRecord) => number {
  switch (sort) {
    case "date-desc":
      return (a, b) => Date.parse(b.eventDate) - Date.parse(a.eventDate)
    case "title-asc":
      return (a, b) => {
        const left = a.title.toLowerCase()
        const right = b.title.toLowerCase()
        return left < right ? -1 : left > right ? 1 : 0
      }
    case "date-asc":
      return (a, b) => Date.parse(a.eventDate) - Date.parse(b.eventDate)
  }
}

interface EventsExplorerProps {
  /** Upcoming events, already sorted soonest-first by the service. */
  events: EventRecord[]
  /** Whether the visitor may create events (session, or auth not required). */
  canCreateEvent: boolean
}

/**
 * Interactive part of the upcoming-events page: owns the toolbar state,
 * filters/sorts the events client-side, and renders the grid, result count,
 * or the matching empty state.
 */
export function EventsExplorer({ events, canCreateEvent }: EventsExplorerProps) {
  const [filters, setFilters] = useState<EventFilterState>(DEFAULT_EVENT_FILTERS)

  if (events.length === 0) {
    return <EmptyEventsState variant="no-events" canCreateEvent={canCreateEvent} />
  }

  const query = filters.query.trim()
  const visible = events
    .filter((event) => filters.category === "all" || event.eventType === filters.category)
    .filter((event) => matchesQuery(event, query))
    .sort(compareBySort(filters.sort))

  return (
    <div className="flex flex-col gap-6">
      <EventFilters value={filters} onChange={setFilters} />

      <p aria-live="polite" className="text-sm text-muted-foreground">
        Showing {visible.length} of {events.length} {events.length === 1 ? "event" : "events"}
      </p>

      {visible.length === 0 ? (
        <EmptyEventsState
          variant="no-matches"
          onClearFilters={() => setFilters(DEFAULT_EVENT_FILTERS)}
        />
      ) : (
        <EventGrid events={visible} />
      )}
    </div>
  )
}
