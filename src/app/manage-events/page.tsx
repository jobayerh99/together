
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import {
    CalendarDays,
    Plus,
    Sparkles,
    FolderOpen,
} from "lucide-react";

import Link from "next/link";

import ManageEventCard, {
    IManageEvent,
} from "@/components/events/ManageEventCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";


// Dynamic content: authentication and API fetching
const ManageEventsContent = async () => {

    // Get authenticated user
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    // If user is not authenticated
    if (!user?.email) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <FolderOpen className="mb-4 size-14 text-muted-foreground" />

                <h2 className="text-2xl font-bold">
                    Please Sign In
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Sign in to manage your created events.
                </p>
            </div>
        );
    }

    

    // Fetch user's events (endpoint requires the verified JWT)
    const token = await getTokenFromServer()

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/manage-events/${encodeURIComponent(user.email)}`,
        {
            cache: "no-store",
            headers: token
                ? { authorization: `Bearer ${token}` }
                : undefined,
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch your events");
    }

    const events: IManageEvent[] = await res.json();

    return (
        <>
            {/* Event Statistics */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-4 rounded-xl border bg-card p-5">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CalendarDays className="size-6" />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Created Events
                        </p>

                        <h2 className="text-2xl font-bold">
                            {events.length}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border bg-card p-5">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                        <FolderOpen className="size-6" />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Managed By
                        </p>

                        <h2 className="max-w-52 truncate text-lg font-bold">
                            {user.name}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Events Section */}
            <section>
                <div className="mb-6">
                    <h2 className="text-xl font-bold">
                        Your Created Events
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage all your community events in one place.
                    </p>
                </div>

                {/* Event Cards */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <ManageEventCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-5 py-16 text-center">

                        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CalendarDays className="size-8" />
                        </div>

                        <h3 className="text-xl font-bold">
                            No Events Yet!
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                            You haven&apos;t created any events yet.
                            Start something meaningful and bring
                            your community together.
                        </p>

                        <Link
                            href="/create-event"
                            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <Plus className="size-4" />
                            Create Your First Event
                        </Link>
                    </div>
                )}
            </section>
        </>
    );
};


// Loading UI
const ManageEventsSkeleton = () => {
    return (
        <div className="space-y-8 animate-pulse">

            {/* Statistics Skeleton */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-24 rounded-xl bg-muted" />
                <div className="h-24 rounded-xl bg-muted" />
            </div>

            {/* Event Cards Skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="overflow-hidden rounded-xl border"
                    >
                        <div className="h-52 bg-muted" />

                        <div className="space-y-4 p-5">
                            <div className="h-5 w-3/4 rounded bg-muted" />
                            <div className="h-10 rounded bg-muted" />
                            <div className="h-4 w-1/2 rounded bg-muted" />

                            <div className="flex gap-3">
                                <div className="h-10 flex-1 rounded bg-muted" />
                                <div className="h-10 flex-1 rounded bg-muted" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// Main Page
const ManageEventsPage = () => {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Static Page Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <Sparkles className="size-4" />
                            <span>Event Dashboard</span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Manage Your Events
                        </h1>

                        <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Keep track of your created events, update
                            details, and manage your community activities.
                        </p>
                    </div>

                    <Link
                        href="/create-event"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <Plus className="size-4" />
                        Create New Event
                    </Link>
                </div>

                {/* Dynamic Content Inside Suspense */}
                <Suspense fallback={<ManageEventsSkeleton />}>
                    <ManageEventsContent />
                </Suspense>

            </div>
        </main>
    );
};

export default ManageEventsPage;
