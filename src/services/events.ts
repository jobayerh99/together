import type { CreateEventValues } from "@/lib/event-schema"

/**
 * Event creation API service.
 *
 * Isolated here so the endpoint wiring can be adjusted in exactly one place.
 * TODO(integration): the Express backend routes are not deployed yet — set
 * `NEXT_PUBLIC_API_URL` in `.env.local` (e.g. `http://localhost:5000`) and the
 * POST below starts working without any form changes. API authentication and
 * authorization (JWT) are handled by the backend, not by this service.
 */

/** Error thrown for configuration, network, and API failures. */
export class EventsApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message)
    this.name = "EventsApiError"
  }
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
  const url = "http://localhost:8000/create-event"
  const body = {
    title: payload.title,
    description: payload.description,
    eventType: payload.eventType,
    thumbnailUrl: payload.thumbnailUrl,
    location: payload.location,
    eventDate: toIsoDate(payload.eventDate),
  }

  let response: Response
  try {
    response = await fetch(url, {
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
