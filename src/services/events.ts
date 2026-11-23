"use server"

import { auth } from "@/lib/auth"
import type { CreateEventValues } from "@/lib/event-schema"
import { headers } from "next/headers"
import  { type EventRecord, EventsApiError, toIsoDate } from "./events.types"

export async function createEvent( 
  payload: CreateEventValues,
  token: string
): Promise<{ success: boolean; message?: string; data?: unknown }> {
  const reqHeaders = await headers()

  const session = await auth.api.getSession({ headers: reqHeaders })
  const user = session?.user
  if (!user) {
    return { success: false, message: "You must be logged in to create an event." }
  }

  const body = {
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userImage: user.image,
    title: payload.title,
    description: payload.description,
    eventType: payload.eventType,
    thumbnailUrl: payload.thumbnailUrl,
    location: payload.location,
    eventDate: toIsoDate(payload.eventDate),
  }

  let response: Response
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body),
    })
  } catch {
    return {
      success: false,
      message: "Unable to reach the event API. Check your connection and try again.",
    }
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
    return { success: false, message }
  }

  return { success: true, data: await response.json().catch(() => null) }
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
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`, {
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