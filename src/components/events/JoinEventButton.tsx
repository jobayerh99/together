
"use client";

import { useEffect, useState } from "react";
import {
    CheckCircle2,
    HandHeart,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface JoinEventButtonProps {
    eventId: string;
}

const STORAGE_KEY = "together_joined_events";

// Safely retrieve joined event IDs from localStorage.
function getJoinedEventIds(): string[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) return [];

        const parsed: unknown = JSON.parse(stored);

        if (!Array.isArray(parsed)) return [];

        return parsed.filter(
            (id): id is string => typeof id === "string"
        );
    } catch (error) {
        console.error("Failed to read joined events:", error);
        return [];
    }
}

export default function JoinEventButton({
    eventId,
}: JoinEventButtonProps) {
    const [isJoined, setIsJoined] = useState<boolean | null>(null);

    // Load joined status after the component mounts.
    useEffect(() => {
        const joinedEvents = getJoinedEventIds();

        setIsJoined(joinedEvents.includes(eventId));
    }, [eventId]);

    const handleJoinEvent = () => {
        if (isJoined === null || isJoined) return;

        try {
            const joinedEvents = getJoinedEventIds();

            // Prevent duplicate joining.
            if (joinedEvents.includes(eventId)) {
                setIsJoined(true);
                return;
            }

            // Save the event ID.
            const updatedEvents = [...joinedEvents, eventId];

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedEvents)
            );

            // Update UI immediately.
            setIsJoined(true);

            toast.add({
                type: "success",
                title: "Successfully Joined!",
                description:
                    "You are now marked as a participant in this event.",
            });
        } catch (error) {
            console.error("Failed to join event:", error);

            toast.add({
                type: "error",
                title: "Unable to join event",
                description: "Please try again.",
            });
        }
    };

    return (
        <Button
            
            type="button"
            onClick={handleJoinEvent}
            disabled={isJoined === null || isJoined}
            className="h-12 w-full gap-2 text-base font-semibold"
            aria-live="polite"
        >
            {isJoined === null ? (
                <>
                    <Loader2 className="size-5 animate-spin" />
                    Checking...
                </>
            ) : isJoined ? (
                <>
                    <CheckCircle2 className="size-5" />
                    Joined
                </>
            ) : (
                <>
                    <HandHeart className="size-5" />
                    Join Event
                </>
            )}
        </Button>
    );
}
