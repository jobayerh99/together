import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    MapPin,
    HeartHandshake,
    Users,
    HandHeart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


import JoinEventButton from "@/components/events/JoinEventButton";
 
export interface EventDetails {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailUrl: string;
    location: string;
    eventDate: string;
}

interface EventDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const getCurrentTimestamp = () => Date.now();

const formatEventDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsedDate);
};

const formatEventTime = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Time unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(parsedDate);
};

const EventDetailsPage = async ({
    params,
}: EventDetailsPageProps) => {
    const { id } = await params;

    let event: EventDetails;

    try {
        const response = await fetch(
            `${API_URL}/upcoming-event/${id}`,
            {
                cache: "no-store",
            }
        );

        if (response.status === 404) {
            notFound();
        }

        if (!response.ok) {
            throw new Error("Failed to fetch event details");
        }

        event = await response.json();

        if (!event?._id || !event.title) {
            throw new Error("Invalid event response");
        }
    } catch (error) {
        console.error("Event details error:", error);
        throw error;
    }

    const eventDate = new Date(event.eventDate);
    const isPastEvent =
        !Number.isNaN(eventDate.getTime()) &&
        eventDate.getTime() <= getCurrentTimestamp();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Upcoming Events
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary">
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            href="/upcoming-events"
                            className="hover:text-primary"
                        >
                            Events
                        </Link>
                        <span>/</span>
                        <span className="font-medium text-foreground">
                            Details
                        </span>
                    </div>
                </div>

                {/* Event Header */}
                <div className="mb-8 max-w-3xl">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <Badge className="border-0 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-300">
                            {event.eventType}
                        </Badge>

                        <Badge variant={isPastEvent ? "secondary" : "outline"}>
                            {isPastEvent ? "Event Completed" : "Upcoming Event"}
                        </Badge>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {event.title}
                    </h1>

                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                        Be part of something meaningful. Connect with your community
                        and help create positive change through this social initiative.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">

                    {/* Left Column */}
                    <div className="space-y-8">

                        {/* Event Image */}
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted shadow-sm">
                            <Image
                                src={event.thumbnailUrl}
                                alt={event.title}
                                fill
                                priority
                                unoptimized
                                sizes="(max-width: 1024px) 100vw, 800px"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                                <HeartHandshake className="size-4" />
                                Together for a better community
                            </div>
                        </div>

                        {/* About Event */}
                        <Card className="border-border shadow-sm">
                            <CardContent className="p-5 sm:p-7">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <HandHeart className="size-6" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            About This Event
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Learn more about this community initiative.
                                        </p>
                                    </div>
                                </div>

                                <Separator className="mb-5" />

                                <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                                    {event.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Community Message */}
                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Users className="size-6" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">
                                        Be Part of the Change
                                    </h2>

                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        Every small action can create a meaningful impact.
                                        Join Together and become part of a community that
                                        cares, supports, and makes a difference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Event Information */}
                    <aside className="lg:sticky lg:top-24">
                        <Card className="overflow-hidden border-border shadow-md">
                            <div className="bg-primary px-6 py-5 text-primary-foreground">
                                <p className="text-sm font-medium text-white/80">
                                    Event Information
                                </p>

                                <h2 className="mt-1 text-xl font-bold">
                                    Join the Initiative
                                </h2>
                            </div>

                            <CardContent className="space-y-5 p-6">

                                {/* Date */}
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <CalendarDays className="size-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-muted-foreground">
                                            Event Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-foreground">
                                            {formatEventDate(event.eventDate)}
                                        </p>
                                    </div>
                                </div>

                                {/* Time */}
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Clock3 className="size-5" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Event Time
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {formatEventTime(event.eventDate)}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <MapPin className="size-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-muted-foreground">
                                            Location
                                        </p>

                                        <p className="mt-1 break-words text-sm font-semibold">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Category */}
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm text-muted-foreground">
                                        Event Category
                                    </span>

                                    <Badge variant="secondary">
                                        {event.eventType}
                                    </Badge>
                                </div>

                                <Separator />

                                {/* Join Event */}
                                {isPastEvent ? (
                                    <div className="rounded-lg bg-muted p-4 text-center">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            This event has already taken place.
                                        </p>
                                    </div>
                                ) : (
                                    <JoinEventButton event={event} eventId={event._id} />
                                )}

                                <p className="text-center text-xs leading-5 text-muted-foreground">
                                    Join this community initiative and help make a
                                    positive difference.
                                </p>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default EventDetailsPage;