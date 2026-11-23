/** Error thrown for network, HTTP, and malformed-response failures. */
export class EventsApiError extends Error {
    constructor(message: string, readonly status?: number) {
        super(message)
        this.name = "EventsApiError"
    }
}

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



export function toIsoDate(value: string): string {
    const [year = "0", month = "1", day = "1"] = value.split("-")
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString()
}