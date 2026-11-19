import { z } from "zod"

/**
 * Event categories offered by the Create Event form.
 * Values double as their display labels so the database stores readable values.
 */
export const EVENT_CATEGORIES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Health Camp",
  "Food Distribution",
  "Winter Support",
  "Education",
  "Community Support",
  "Other",
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]

/**
 * Formats a date as the `YYYY-MM-DD` value a native `<input type="date">` uses,
 * in the local timezone (never UTC) so no day is shifted by timezone offsets.
 */
export function toLocalDateInputValue(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Minimum allowed value for the date field: tomorrow in local time.
 * Today is intentionally excluded, so past *and* today's dates are rejected.
 */
export function getMinEventDateInputValue(): string {
  const now = new Date()
  return toLocalDateInputValue(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1))
}

/**
 * Validates a `YYYY-MM-DD` date-input value as strictly later than today.
 *
 * Calendar dates are compared in the local timezone (rather than via
 * `new Date(string)`, which parses `YYYY-MM-DD` as UTC midnight and can
 * misclassify a valid future date as past for UTC-negative offsets).
 * Impossible dates such as `2026-02-31` are rejected as well.
 */
export function isFutureCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  const date = new Date(year, month - 1, day)
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  if (!isRealDate) {
    return false
  }

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return date.getTime() > startOfToday.getTime()
}

const requiredString = (emptyMessage: string, minMessage: string, min: number) =>
  z
    .string()
    .trim()
    .min(min, { error: (issue) => (issue.input === "" ? emptyMessage : minMessage) })

/**
 * Create Event form schema (frontend validation only).
 * Shared by the form and reusable anywhere the payload shape is needed;
 * the backend revalidates the same rules server-side.
 */
export const createEventSchema = z.object({
  title: requiredString(
    "Event title is required.",
    "Event title must be at least 5 characters.",
    5
  ).max(100, { error: "Event title cannot exceed 100 characters." }),

  description: requiredString(
    "Event description is required.",
    "Event description must be at least 20 characters.",
    20
  ).max(2000, { error: "Event description cannot exceed 2000 characters." }),

  eventType: z.enum(EVENT_CATEGORIES, {
    error: "Please select an event category.",
  }),

  thumbnailUrl: z
    .string()
    .trim()
    .min(1, { error: "Event thumbnail URL is required." })
    .pipe(z.url({ error: "Please provide a valid image URL (for example https://example.com/event.jpg)." })),

  location: requiredString(
    "Event location is required.",
    "Event location must be at least 3 characters.",
    3
  ).max(200, { error: "Event location cannot exceed 200 characters." }),

  eventDate: z
    .string()
    .trim()
    .min(1, { error: "Event date is required." })
    .refine(isFutureCalendarDate, {
      error: "Event date must be in the future. Today's date and past dates are not allowed.",
    }),
})

export type CreateEventValues = z.infer<typeof createEventSchema>
