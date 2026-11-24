
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    Clock3,
    MapPin,
    Users,
    CalendarCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { connection } from "next/server";

interface IRecentEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailUrl: string;
    location: string;
    eventDate: string;
    userName?: string;
    userImage?: string;
}



const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(date);
};

const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Time unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Dhaka",
    }).format(date);
};

const RecentUpcomingEvent = async () => {
    await connection();
    let events: IRecentEvent[] = [];
    let hasError = false;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-event`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch recent events");
        }

        const result: unknown = await response.json();

        if (!Array.isArray(result)) {
            throw new Error("Invalid events response");
        }

        events = result as IRecentEvent[];
    } catch (error) {
        hasError = true;
        console.error("Recent upcoming events error:", error);
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div className="max-w-2xl">

                        <Badge
                            variant="outline"
                            className="mb-4 gap-2 border-primary/20 bg-primary/5 px-3 py-1.5 text-primary"
                        >
                            <Users className="size-4" />
                            Together Community
                        </Badge>

                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Recent Upcoming{" "}
                            <span className="text-primary">
                                Events
                            </span>
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                            Discover meaningful community initiatives,
                            connect with people, and become part of
                            something that makes a difference.
                        </p>

                    </div>

                    {/* View All Events */}
                    <Link
                        href="/upcoming-events"
                        className="inline-flex h-9 w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md border border-primary/30 bg-background px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                        Explore All Events
                        <ArrowRight className="size-4" />
                    </Link>

                </div>

                {/* Events Grid */}
                {events.length > 0 ? (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {events.map((event) => {

                            const organizerName =
                                event.userName?.trim() || "Community Organizer";

                            return (
                                <Card
                                    key={event._id}
                                    className="group flex h-full flex-col overflow-hidden border-border bg-card py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                                >

                                    {/* Event Image */}
                                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">

                                        {event.thumbnailUrl && (
                                            <Image
                                                src={event.thumbnailUrl}
                                                alt={event.title}
                                                fill
                                                unoptimized
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}

                                        {/* Image Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                        {/* Event Category */}
                                        <Badge className="absolute left-4 top-4 border-0 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-300">
                                            {event.eventType || "Community Event"}
                                        </Badge>

                                    </div>

                                    {/* Event Content */}
                                    <CardContent className="flex flex-1 flex-col p-5 sm:p-6">

                                        {/* Date & Time */}
                                        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">

                                            <div className="flex items-center gap-1.5">
                                                <CalendarDays className="size-4 text-primary" />
                                                <span>
                                                    {formatEventDate(event.eventDate)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Clock3 className="size-4 text-primary" />
                                                <span>
                                                    {formatEventTime(event.eventDate)}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Event Title */}
                                        <h3 className="line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                                            {event.title}
                                        </h3>

                                        {/* Event Description */}
                                        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">
                                            {event.description}
                                        </p>

                                        {/* Event Location */}
                                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">

                                            <MapPin className="size-4 shrink-0 text-primary" />

                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>

                                        </div>

                                        {/* Organizer & Details */}
                                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">

                                            {/* Organizer */}
                                            <div className="flex min-w-0 items-center gap-2.5">

                                                {event.userImage ? (
                                                    <Image
                                                        src={event.userImage}
                                                        alt={organizerName}
                                                        width={36}
                                                        height={36}
                                                        unoptimized
                                                        className="size-9 shrink-0 rounded-full border border-border object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                        {organizerName.charAt(0).toUpperCase()}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="text-xs text-muted-foreground">
                                                        Organized by
                                                    </p>

                                                    <p className="truncate text-sm font-semibold text-foreground">
                                                        {organizerName}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* Details Button */}
                                            <Link
                                                href={`/upcoming-events/${event._id}`}
                                                className="inline-flex h-8 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-primary/30 bg-background px-3 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                                            >
                                                Details
                                                <ArrowRight className="size-4" />
                                            </Link>

                                        </div>

                                    </CardContent>

                                </Card>
                            );
                        })}

                    </div>

                ) : (

                    /* Empty / Error State */
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-5 py-16 text-center">

                        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CalendarCheck className="size-8" />
                        </div>

                        <h3 className="text-xl font-bold text-foreground">
                            {hasError
                                ? "Events Could Not Be Loaded"
                                : "No Upcoming Events Yet"}
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            {hasError
                                ? "Something went wrong while loading events. Please try again later."
                                : "There are no upcoming community events at the moment. Check back soon and be part of the change."}
                        </p>

                        {!hasError && (
                            <Link
                                href="/create-event"
                                className="mt-6 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                            >
                                Create an Event
                                <ArrowRight className="size-4" />
                            </Link>
                        )}

                    </div>

                )}

            </div>
        </section>
    );
};

export default RecentUpcomingEvent;
