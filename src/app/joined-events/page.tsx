
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CalendarDaysIcon,
    CalendarHeartIcon,
    HeartHandshakeIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import JoinedEventCard, { JoinedEvent } from "@/components/events/JoinedEventCard";


// API URL
const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Normalize joined events from API response.
function normalizeJoinedEvents(data: unknown): JoinedEvent[] {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.flatMap((item): JoinedEvent[] => {
        if (typeof item !== "object" || item === null) {
            return [];
        }

        const raw = item as Record<string, unknown>;

        // Get actual event ID, not the registration document ID.
        const eventId =
            typeof raw.eventId === "string"
                ? raw.eventId
                : "";

        // Validate required properties.
        if (!eventId || typeof raw.title !== "string") {
            return [];
        }

        // Validate event date.
        const rawDate = raw.eventDate;

        const parsedDate =
            typeof rawDate === "string" || typeof rawDate === "number"
                ? new Date(rawDate)
                : null;

        return [
            {
                _id:
                    typeof raw._id === "string"
                        ? raw._id
                        : undefined,

                eventId,

                title: raw.title,

                description:
                    typeof raw.description === "string"
                        ? raw.description
                        : "",

                eventType:
                    typeof raw.eventType === "string"
                        ? raw.eventType
                        : "Community Event",

                thumbnailUrl:
                    typeof raw.thumbnailUrl === "string"
                        ? raw.thumbnailUrl
                        : "",

                location:
                    typeof raw.location === "string"
                        ? raw.location
                        : "Location unavailable",

                eventDate:
                    parsedDate &&
                        !Number.isNaN(parsedDate.getTime())
                        ? parsedDate.toISOString()
                        : "",

                joiningData:
                    typeof raw.joiningData === "string"
                        ? raw.joiningData
                        : undefined,
            },
        ];
    });
}

function countUpcomingEvents(events: JoinedEvent[]): number {
    const now = Date.now();

    return events.filter((event) => {
        if (!event.eventDate) return false;

        return new Date(event.eventDate).getTime() > now;
    }).length;
}

const JoinedEvents = async () => {

    // 1. Get authenticated user session.
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    // 2. Redirect unauthenticated users.
    if (!user?.email) {
        redirect("/login");
    }

    // 3. Fetch user's joined events.
    let joinedEvents: JoinedEvent[] = [];
    let fetchError = false;

    try {
        const res = await fetch(
            `${API_URL}/joined-events/${encodeURIComponent(user.email)}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch joined events");
        }

        const data: unknown = await res.json();

        // 4. Normalize API response.
        joinedEvents = normalizeJoinedEvents(data);

        // 5. Sort events by event date.
        joinedEvents.sort((a, b) => {
            const dateA = a.eventDate
                ? new Date(a.eventDate).getTime()
                : Infinity;

            const dateB = b.eventDate
                ? new Date(b.eventDate).getTime()
                : Infinity;

            return dateA - dateB;
        });

    } catch (error) {
        console.error("Joined events error:", error);
        fetchError = true;
    }

    // 6. Calculate upcoming event count.
    const upcomingCount = countUpcomingEvents(joinedEvents);

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">

                {/* Back Navigation */}
                <div className="mb-8">
                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeftIcon className="size-4" />
                        Back to Upcoming Events
                    </Link>
                </div>

                {/* Page Header */}
                <header className="rounded-2xl border border-primary/10 bg-secondary p-6 sm:p-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm ring-1 ring-primary/10">
                            <HeartHandshakeIcon className="size-7" />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
                                My Joined Events
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-7 text-secondary-foreground/80 sm:text-base">
                                All the community events you have joined
                                are collected here. Stay connected, keep
                                track of your activities, and make a
                                positive impact together.
                            </p>
                        </div>
                    </div>

                    {/* Event Statistics */}
                    {!fetchError && (
                        <div className="mt-6 flex flex-wrap gap-3">

                            <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                                <CalendarHeartIcon className="size-4 text-primary" />
                                {joinedEvents.length} Total Joined
                            </div>

                            <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                                <CalendarDaysIcon className="size-4 text-primary" />
                                {upcomingCount} Upcoming Events
                            </div>

                        </div>
                    )}
                </header>

                {/* Joined Events Section */}
                <section className="mt-10">

                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Your Events
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Manage and explore the events you have joined.
                            </p>
                        </div>

                        {!fetchError && (
                            <Badge
                                variant="secondary"
                                className="w-fit px-3 py-1"
                            >
                                {joinedEvents.length} Events
                            </Badge>
                        )}

                    </div>

                    {/* API Error State */}
                    {fetchError ? (

                        <div className="rounded-2xl border border-destructive/20 bg-card px-6 py-12 text-center">

                            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                <HeartHandshakeIcon className="size-7" />
                            </div>

                            <h3 className="text-xl font-semibold">
                                Unable to Load Events
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                                Something went wrong while loading your
                                joined events. Please try again.
                            </p>

                            <Link
                                href="/joined-event"
                                className={`${buttonVariants()} mt-6`}
                            >
                                Try Again
                            </Link>

                        </div>

                    ) : joinedEvents.length === 0 ? (

                        /* Empty State */

                        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">

                            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <CalendarHeartIcon className="size-8" />
                            </div>

                            <h3 className="text-xl font-bold sm:text-2xl">
                                No Joined Events Yet!
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                                You haven&apos;t joined any community
                                events yet. Explore upcoming events
                                and become part of something meaningful.
                            </p>

                            <Link
                                href="/upcoming-events"
                                className={`${buttonVariants()} mt-6 gap-2`}
                            >
                                Explore Events
                                <ArrowRightIcon className="size-4" />
                            </Link>

                        </div>

                    ) : (

                        /* Joined Events Grid */

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {joinedEvents.map((event) => (
                                <JoinedEventCard
                                    key={event._id || event.eventId}
                                    event={event}
                                />
                            ))}

                        </div>

                    )}

                </section>

                {/* Footer Message */}
                {!fetchError && joinedEvents.length > 0 && (
                    <div className="mt-12 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-center sm:p-8">

                        <div className="mb-3 flex justify-center">
                            <HeartHandshakeIcon className="size-8 text-primary" />
                        </div>

                        <h3 className="text-lg font-bold">
                            Together, We Make a Difference!
                        </h3>

                        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                            Thank you for being part of our community.
                            Your participation helps create a better
                            and more connected world.
                        </p>

                    </div>
                )}

            </div>
        </main>
    );
};

export default JoinedEvents;
