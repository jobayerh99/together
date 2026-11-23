
import Image from "next/image";

import {
    CalendarDays,
    MapPin,
    CalendarCheck,
    Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import ManageEventActions from "./ManageEventActions";

export interface IManageEvent {
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userImage: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailUrl: string;
    location: string;
    eventDate: string;
}

interface ManageEventCardProps {
    event: IManageEvent;
}

const formatEventDate = (value: string | Date | undefined) => {
    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    const dateText = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(date);

    const timeText = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Dhaka",
    }).format(date);

    return { dateText, timeText };
};

const ManageEventCard = ({ event }: ManageEventCardProps) => {
    const eventDate = formatEventDate(event.eventDate);

    return (
        <Card className="group overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Event Thumbnail */}
            <div className="relative h-52 w-full overflow-hidden bg-muted">
                {event.thumbnailUrl ? (
                    <Image
                        src={event.thumbnailUrl}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <CalendarCheck className="size-14 text-muted-foreground" />
                    </div>
                )}

                <div className="absolute left-4 top-4">
                    <Badge className="border-0 bg-background/90 text-foreground shadow-sm backdrop-blur-sm hover:bg-background/90">
                        {event.eventType}
                    </Badge>
                </div>
            </div>

            {/* Event Details */}
            <CardContent className="space-y-4 p-5">

                <div className="space-y-2">
                    <h2 className="line-clamp-1 text-xl font-bold tracking-tight">
                        {event.title}
                    </h2>

                    <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                        {event.description}
                    </p>
                </div>

                <div className="space-y-3 border-t border-border/60 pt-4">

                    {/* Event Date */}
                    <div className="flex items-start gap-2 text-sm">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />

                        <span className="text-foreground">
                            {eventDate?.dateText ?? "Date unavailable"}
                        </span>
                    </div>

                    {/* Event Time */}
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="size-4 shrink-0 text-primary" />

                        <span className="text-muted-foreground">
                            {eventDate?.timeText ?? "Time unavailable"}
                            {eventDate && " (BDT)"}
                        </span>
                    </div>

                    {/* Event Location */}
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="size-4 shrink-0 text-primary" />

                        <span className="line-clamp-1 text-muted-foreground">
                            {event.location || "Location not specified"}
                        </span>
                    </div>
                </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex gap-3 border-t border-border/60 bg-muted/20 p-5">
                <ManageEventActions event={event} />
            </CardFooter>
        </Card>
    );
};

export default ManageEventCard;
