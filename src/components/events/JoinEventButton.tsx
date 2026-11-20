
"use client";

import React, { useEffect, useState } from "react";
import {
    CheckCircle2,
    HandHeart,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { EventDetails } from "@/app/upcoming-events/[id]/page";
import { useRouter } from "next/navigation";


interface JoinEventButtonProps {
    eventId: string;
    event: EventDetails;
}

const STORAGE_KEY = "together_joined_events";

// Safely retrieve joined event IDs for a specific user.
function getJoinedEventIds(storageKey: string): string[] {
    try {
        const stored = localStorage.getItem(storageKey);

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
    const router = useRouter()

    const { data: session } = authClient.useSession();
    const user = session?.user;

    // Separate storage for each user.
    const userStorageKey = user?.email
        ? `${STORAGE_KEY}_${user.email}`
        : null;

    const [isJoined, setIsJoined] = useState<boolean | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    // Load joined status after the component mounts.
    useEffect(() => {
        if (!userStorageKey) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsJoined(null);
            return;
        }

        const joinedEvents = getJoinedEventIds(userStorageKey);

        setIsJoined(joinedEvents.includes(eventId));

    }, [eventId, userStorageKey]);

    const handleJoinEvent = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        // Prevent joining without authentication.
        if (!user || !userStorageKey) {
            toast.add({
                type: "error",
                title: "Please log in",
                description: "You need to log in before joining an event.",
            });
            router.push("/login")
            return;
        }

        // Prevent duplicate joining.
        if (isJoined === null || isJoined || isLoading) return;

        setIsLoading(true);

        try {
            const joinedEvents = getJoinedEventIds(userStorageKey);

            if (joinedEvents.includes(eventId)) {
                setIsJoined(true);
                return;
            }

            const data = {
                userName: user.name,
                email: user.email,
                image: user.image,
                ...event,
                eventId,
                joiningData: new Date(),
            };

            const res = await fetch("http://localhost:8000/joined", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to join event");
            }

            const joinedRes = await res.json();

            console.log(joinedRes);

            // Save event ID for this user only.
            const updatedEvents = [...joinedEvents, eventId];

            localStorage.setItem(
                userStorageKey,
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

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleJoinEvent}>
            <Button
                type="submit"
                disabled={isJoined === null || isJoined || isLoading}
                className="h-12 w-full gap-2 text-base font-semibold"
                aria-live="polite"
            >
                {isJoined === null || isLoading ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        {isLoading ? "Joining..." : "Checking..."}
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
