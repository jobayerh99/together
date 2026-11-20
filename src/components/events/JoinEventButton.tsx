
"use client";

import React, { use, useEffect, useState } from "react";
import {
    CheckCircle2,
    HandHeart,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { EventDetails } from "@/app/upcoming-events/[id]/page";
import { email } from "zod";

interface JoinEventButtonProps {
    eventId: string;
    event: EventDetails
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
    event,
    eventId,
}: JoinEventButtonProps) {

    const { data: session } = authClient.useSession();
    const user = session?.user

    const [isJoined, setIsJoined] = useState<boolean | null>(null);

    // Load joined status after the component mounts.
    useEffect(() => {
        const joinedEvents = getJoinedEventIds();

        setIsJoined(joinedEvents.includes(eventId));
    }, [eventId]);

    const handleJoinEvent = async (e) => {
        e.preventDefault()
        const data = {
            userName: user?.name,
            email: user?.email,
            image: user?.image,
            ...event,
            eventId,
            joiningData: new Date()
        }

        const res = await fetch('http://localhost:8000/joined', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        const joinedRes = await res.json()
        console.log(joinedRes);

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
        <form onSubmit={handleJoinEvent}>
            <Button

                type="submit"
                // onClick={handleJoinEvent}
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
        </form>
    );
}
