
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    ArrowRightIcon,
    CalendarDaysIcon,
    MapPinIcon,
    Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { EventImage } from "@/components/events/EventImage";
import { Router } from "next/router";
import { reddit } from "better-auth";
import { redirect } from "next/navigation";

export interface JoinedEvent {
    _id?: string;
    eventId: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailUrl: string;
    location: string;
    eventDate: string;
    joiningData?: string;
}

interface JoinedEventCardProps {
    event: JoinedEvent;
}

function formatEventDate(date: string): string {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsedDate);
}

const JoinedEventCard = ({ event }: JoinedEventCardProps) => {
    const [currentTime, setCurrentTime] = useState<number | null>(null);

    console.log(event);

    const handleRemoveEvent = async() => {
        const res = await fetch(`http://localhost:8000/joinedevents/${event._id}`, {
            method:'DELETE'
        })
        const data = await res.json()
        redirect('/joined-events')
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTime(Date.now());
    }, []);

    const isPastEvent =
        currentTime !== null &&
        event.eventDate !== "" &&
        !Number.isNaN(new Date(event.eventDate).getTime()) &&
        new Date(event.eventDate).getTime() <= currentTime;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Event Thumbnail */}
            <EventImage
                src={event.thumbnailUrl}
                alt={`${event.title} event thumbnail`}
            />

            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">

                {/* Event Type and Status */}
                <div className="flex flex-wrap items-center justify-between gap-2">

                    <Badge variant="secondary">
                        {event.eventType}
                    </Badge>

                    <Badge
                        variant={isPastEvent ? "outline" : "default"}
                    >
                        {isPastEvent ? "Completed" : "Upcoming"}
                    </Badge>

                </div>

                {/* Event Title */}
                <h3 className="line-clamp-2 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
                    {event.title}
                </h3>

                {/* Event Description */}
                <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                </p>

                {/* Event Information */}
                <div className="mt-1 flex flex-col gap-3 text-sm text-muted-foreground">

                    <div className="flex items-center gap-2">
                        <MapPinIcon className="size-4 shrink-0 text-primary" />

                        <span className="truncate">
                            {event.location}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="size-4 shrink-0 text-primary" />

                        <time dateTime={event.eventDate || undefined}>
                            {event.eventDate
                                ? formatEventDate(event.eventDate)
                                : "Date unavailable"}
                        </time>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4">

                    {/* View Event */}
                    <Link
                        href={`/upcoming-events/${event.eventId}`}
                        className={`${buttonVariants()} w-full justify-center gap-2`}
                    >
                        View Event
                        <ArrowRightIcon className="size-4" />
                    </Link>

                    {/* Remove Event */}
                    <button
                        onClick={handleRemoveEvent}
                        type="button"
                        className={`${buttonVariants({
                            variant: "destructive",
                        })} w-full justify-center gap-2`}
                        aria-label={`Remove ${event.title} from joined events`}
                    >
                        <Trash2Icon className="size-4" />
                        Remove
                    </button>

                </div>

            </div>
        </article>
    );
};

export default JoinedEventCard;
