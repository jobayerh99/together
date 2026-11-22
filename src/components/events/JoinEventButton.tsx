
"use client";

import React, { useEffect, useState } from "react";

import { EventDetails } from "@/app/upcoming-events/[id]/page";
import { authClient } from "@/lib/auth-client";

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

                const res = await fetch(
                    `http://localhost:8000/joined-events/${encodeURIComponent(user.email)}`,
                    {
                        cache: "no-store",
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


    // Existing joining function - unchanged.
    const handleJoining = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { _id: eventId, ...eventDetails } = event;

        const data = {
            ...user,
            ...eventDetails,
            eventId,
            joiningDate: new Date()
        };

        const res = await fetch('http://localhost:8000/joined', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const joinedData = await res.json();

        console.log(joinedData);
    };


    // Handle button click and toast.
    const handleJoinClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {

        if (isJoined || isSubmitting || isChecking) return;

        if (!user) {
            toast.add({
                type: "error",
                title: "Please Login",
                description: "You need to log in before joining an event.",
            });
            router.push("/login");

            return;
        }

        setIsSubmitting(true);

        try {
            await handleJoining(e);

            setIsJoined(true);

            toast.add({
                type: "success",
                title: "Successfully Joined!",
                description: "You are now a participant in this event.",
            });

        } catch (error) {
            console.error("Failed to join event:", error);

            toast.add({
                type: "error",
                title: "Unable to Join Event",
                description: "Something went wrong. Please try again.",
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
