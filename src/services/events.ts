
import type { CreateEventValues } from "@/lib/event-schema"


/**
 * Events API service — the single place where backend URLs, request payloads,
 * and response shapes are mapped for the frontend.
 *
 * The Express backend runs locally for development; adjust
 * {@link EVENTS_API_BASE} when it is deployed. API authentication and
 * authorization (JWT) are handled by the backend, not by this service.
 */

/** Base URL of the Express backend. */
const EVENTS_API_BASE = "http://localhost:8000"

/** Error thrown for network, HTTP, and malformed-response failures. */
export class EventsApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message)
    this.name = "EventsApiError"
  }
}

/**
 * Normalized event record as rendered by the UI.
 *
 * The backend returns Mongo's `_id`; `id` is assigned during normalization so
 * consumers never deal with two id shapes.
 */
export interface EventRecord {
  id: string
  title: string
  description: string
  eventType: string
  thumbnailUrl: string
  location: string
  /** ISO timestamp of the event date (MongoDB Date on the backend). */
  eventDate: string
}

/**
 * Converts the `YYYY-MM-DD` date-input value into an ISO timestamp the backend
 * can store as a MongoDB Date (local midnight of the chosen day).
 */
function toIsoDate(value: string): string {
  const [year = "0", month = "1", day = "1"] = value.split("-")
  return new Date(Number(year), Number(month) - 1, Number(day)).toISOString()
}

/**
 * Creates an event on the backend.
 *
 * Payload: `title`, `description`, `eventType`, `thumbnailUrl`, `location`,
 * `eventDate`. Throws {@link EventsApiError} with a human-readable message on
 * failure — callers must never treat a failure as a success.
 */



export async function createEvent(payload: CreateEventValues): Promise<unknown> {

  

  const body = {
    description: payload.description,
    eventType: payload.eventType,
    thumbnailUrl: payload.thumbnailUrl,
    location: payload.location,
    eventDate: toIsoDate(payload.eventDate),
  }

  let response: Response
  try {
    response = await fetch(`${EVENTS_API_BASE}/create-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Forward session cookies so the backend can authorize the request (JWT later).
    })
  } catch {
    throw new EventsApiError("Unable to reach the event API. Check your connection and try again.")
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: unknown; message?: unknown }
      | null
    const message =
      typeof data?.error === "string"
        ? data.error
        : typeof data?.message === "string"
          ? data.message
          : `The server rejected the request (HTTP ${response.status}).`
    throw new EventsApiError(message, response.status)
  }

  return response.json().catch(() => null)
}

/**
 * Converts one backend payload item into an {@link EventRecord},
 * or returns `null` when required fields are missing or unusable.
 */
function normalizeEvent(item: unknown): EventRecord | null {
  if (typeof item !== "object" || item === null) {
    return null
  }
  const raw = item as Record<string, unknown>

  const id =
    typeof raw._id === "string" ? raw._id : typeof raw.id === "string" ? raw.id : null
  const title = typeof raw.title === "string" ? raw.title.trim() : ""
  const dateValue =
    typeof raw.eventDate === "string" || typeof raw.eventDate === "number"
      ? new Date(raw.eventDate)
      : null

  if (!id || !title || dateValue === null || Number.isNaN(dateValue.getTime())) {
    return null
  }

  return {
    id,
    title,
    description: typeof raw.description === "string" ? raw.description : "",
    eventType:
      typeof raw.eventType === "string" && raw.eventType.trim().length > 0
        ? raw.eventType
        : "Other",
    thumbnailUrl: typeof raw.thumbnailUrl === "string" ? raw.thumbnailUrl : "",
    location: typeof raw.location === "string" ? raw.location : "",
    eventDate: dateValue.toISOString(),
  }
}

/**
 * Fetches upcoming events, normalized for the UI.
 *
 * - Accepts a bare array or an `{ events: [] }` / `{ data: [] }` envelope.
 * - Drops records without a usable id, title, or date.
 * - Defensively excludes events that already started and sorts ascending by
 *   date, because the backend currently neither sorts nor provably filters.
 *
 * Throws {@link EventsApiError} when the API is unreachable, responds with an
 * error status, or returns a payload that is not a usable event list.
 */
export async function getUpcomingEvents(): Promise<EventRecord[]> {
  let response: Response
  try {
    response = await fetch(`${EVENTS_API_BASE}/upcoming-events`, {
      // Events change over time (and past ones must disappear), so never reuse
      // a cached response.
      cache: "no-store",
    })
  } catch {
    throw new EventsApiError("Unable to reach the event API. Check your connection and try again.")
  }

  if (!response.ok) {
    throw new EventsApiError(
      `The server could not load upcoming events (HTTP ${response.status}).`,
      response.status
    )
  }

  const payload: unknown = await response.json().catch((): never => {
    throw new EventsApiError("The server returned an unreadable response.")
  })

  const raw = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { events?: unknown } | null)?.events)
      ? (payload as { events: unknown[] }).events
      : Array.isArray((payload as { data?: unknown } | null)?.data)
        ? (payload as { data: unknown[] }).data
        : null

  if (!raw) {
    throw new EventsApiError("The server returned an unexpected events response.")
  }

  const now = Date.now()
  const events: EventRecord[] = []

  for (const item of raw) {
    const event = normalizeEvent(item)
    if (!event) continue
    if (new Date(event.eventDate).getTime() > now) {
      events.push(event)
    }
  }

  return events.sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  )
}
