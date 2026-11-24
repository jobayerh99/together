
"use client";

import { useEffect, useState } from "react";

import { EventDetails } from "@/app/upcoming-events/[id]/page";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { Button } from "../ui/button";
import { toast } from "@/components/ui/toast";

import {
    CheckCircle2,
    HandHeart,
    Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const JoinEventButton = ({
    event,
}: {
    event: EventDetails;
}) => {

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [isJoined, setIsJoined] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    // Check whether the user already joined this event.
    useEffect(() => {

        if (isPending) return;

        if (!user?.email) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsChecking(false);
            return;
        }

        let active = true;

        const checkJoinedEvent = async () => {
            try {
                setIsChecking(true);

                // The joined-events endpoint requires the verified JWT.
                const token = await getTokenFromClient();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(user.email)}`,
                    {
                        cache: "no-store",
                        headers: token
                            ? { authorization: `Bearer ${token}` }
                            : undefined,
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to check joined events");
                }

                const joinedEvents = await res.json();

                const alreadyJoined = Array.isArray(joinedEvents)
                    && joinedEvents.some(
                        (item) =>
                            item.eventId === event._id ||
                            item._id === event._id
                    );

                if (active) {
                    setIsJoined(alreadyJoined);
                }

            } catch (error) {
                console.error("Joined event check failed:", error);

            } finally {
                if (active) {
                    setIsChecking(false);
                }
            }
        };

        checkJoinedEvent();

        return () => {
            active = false;
        };

    }, [user?.email, event._id, isPending]);


    // Join the event using the verified JWT — identity comes from the server.
    const handleJoining = async (): Promise<"joined" | "already-joined"> => {
        const token = await getTokenFromClient();

        if (!token) {
            throw new Error("Your session has expired. Please log in again.");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ eventId: event._id })
        });

        // Duplicate registration (unique index or pre-check on the server).
        if (res.status === 409) {
            return "already-joined";
        }

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            throw new Error(
                (data && typeof data.message === "string" && data.message) ||
                (data && typeof data.msg === "string" && data.msg) ||
                "Failed to join event. Please try again."
            );
        }

        return "joined";
    };


    // Handle button click and toast.
    const handleJoinClick = async () => {

        if (isJoined || isSubmitting || isChecking) return;

        if (!user) {
            toast.add({
                type: "error",
                title: "Please Login",
                description: "You need to log in before joining an event.",
            });
            // Preserve the intended destination so login returns here.
            router.push(
                `/login?redirect=${encodeURIComponent(`/upcoming-events/${event._id}`)}`
            );

            return;
        }

        setIsSubmitting(true);

        try {
            const result = await handleJoining();

            setIsJoined(true);

            if (result === "already-joined") {
                toast.add({
                    type: "info",
                    title: "Already Joined",
                    description: "You are already a participant in this event.",
                });
            } else {
                toast.add({
                    type: "success",
                    title: "Successfully Joined!",
                    description: "You are now a participant in this event.",
                });
            }

        } catch (error) {
            console.error("Failed to join event:", error);

            toast.add({
                type: "error",
                title: "Unable to Join Event",
                description:
                    error instanceof Error && error.message
                        ? error.message
                        : "Something went wrong. Please try again.",
            });

        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Button
            type="button"
            onClick={handleJoinClick}
            disabled={
                isPending ||
                isChecking ||
                isSubmitting ||
                isJoined
            }
            className=" w-full gap-2 rounded-lg bg-primary text-base font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            aria-live="polite"
        >

            {isPending || isChecking ? (
                <>
                    <Loader2 className="size-5 animate-spin" />
                    Checking...
                </>
            ) : isSubmitting ? (
                <>
                    <Loader2 className="size-5 animate-spin" />
                    Joining...
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
};

export default JoinEventButton;
