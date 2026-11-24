
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";



import type { IManageEvent } from "./ManageEventCard";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "@/components/ui/toast";


// Only the fields that users are allowed to edit
type EditableEvent = Pick<
    IManageEvent,
    | "title"
    | "description"
    | "eventType"
    | "thumbnailUrl"
    | "location"
    | "eventDate"
>;

// Convert UTC date to Bangladesh datetime-local format
const toDhakaDateTimeLocal = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);

    const get = (type: string) =>
        parts.find((part) => part.type === type)?.value ?? "";

    return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
};

// Prepare initial form data
const getInitialFormData = (event: IManageEvent): EditableEvent => ({
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnailUrl: event.thumbnailUrl,
    location: event.location,
    eventDate: toDhakaDateTimeLocal(event.eventDate),
});

const ManageEventActions = ({ event }: { event: IManageEvent }) => {
    const router = useRouter();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [minDateTime, setMinDateTime] = useState("");

    const [form, setForm] = useState<EditableEvent>(() =>
        getInitialFormData(event)
    );

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState("");

    // Update form fields
    const update = (field: keyof EditableEvent, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    // Open edit dialog with fresh event data
    const handleEditOpen = () => {
        setForm(getInitialFormData(event));

        setMinDateTime(
            toDhakaDateTimeLocal(new Date().toISOString())
        );

        setUpdateError("");
        setEditOpen(true);
    };

    // Update event
    const handleUpdatedData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUpdateError("");

        // Convert Bangladesh local datetime to UTC ISO string
        const selectedDate = new Date(`${form.eventDate}:00+06:00`);

        if (Number.isNaN(selectedDate.getTime())) {
            setUpdateError("Please select a valid event date.");
            return;
        }

        if (selectedDate.getTime() <= Date.now()) {
            setUpdateError("Please select a future date and time.");
            return;
        }

        // Only send editable fields
        const updatedData = {
            title: form.title.trim(),
            description: form.description.trim(),
            eventType: form.eventType.trim(),
            thumbnailUrl: form.thumbnailUrl.trim(),
            location: form.location.trim(),
            eventDate: selectedDate.toISOString(),
        };

        if (
            !updatedData.title ||
            !updatedData.description ||
            !updatedData.eventType ||
            !updatedData.location
        ) {
            setUpdateError("Please fill in all required fields.");
            return;
        }

        try {
            setIsUpdating(true);

            const token = await getTokenFromClient()

            if (!token) {
                throw new Error("Your session has expired. Please log in again.");
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/event/${event._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(
                    data?.message || data?.msg || "Failed to update event."
                );
            }

            // Close dialog after successful update
            setEditOpen(false);

            toast.add({
                type: "success",
                title: "Event updated",
                description: "Your changes have been saved successfully.",
            });

            // Refresh Server Component data
            router.refresh();

        } catch (error) {
            console.error("Update event error:", error);

            const message =
                error instanceof Error && error.message
                    ? error.message
                    : "Something went wrong.";

            setUpdateError(message);

            toast.add({
                type: "error",
                title: "Unable to update event",
                description: message,
            });
        } finally {
            setIsUpdating(false);
        }
    };


    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            setDeleteError("");

            const token = await getTokenFromClient()

            if (!token) {
                throw new Error("Your session has expired. Please log in again.");
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/event/${event._id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(
                    data?.message || data?.msg || "Failed to delete event"
                );
            }

            // Close confirmation dialog
            setDeleteOpen(false);

            toast.add({
                type: "success",
                title: "Event deleted",
                description: "Your event has been removed permanently.",
            });

            // Refresh updated event list
            router.refresh();

        } catch (error) {
            console.error("Delete error:", error);

            const message =
                error instanceof Error && error.message
                    ? error.message
                    : "Something went wrong";

            setDeleteError(message);

            toast.add({
                type: "error",
                title: "Unable to delete event",
                description: message,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Edit Button */}
            <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={handleEditOpen}
            >
                <Pencil className="size-4" />
                Edit
            </Button>

            {/* Delete Button */}
            <Button
                type="button"
                variant="destructive"
                className="flex-1 gap-2"
                onClick={() => setDeleteOpen(true)}
            >
                <Trash2 className="size-4" />
                Delete
            </Button>

            {/* Edit Dialog */}
            <Dialog
                open={editOpen}
                onOpenChange={setEditOpen}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">

                    <form
                        onSubmit={handleUpdatedData}
                        className="space-y-5"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Edit Your Event
                            </DialogTitle>

                            <DialogDescription>
                                Update your event information.
                                Your existing information is already filled in.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">

                            {/* Event Title */}
                            <div className="space-y-2">
                                <Label htmlFor={`title-${event._id}`}>
                                    Event Title
                                </Label>

                                <Input
                                    id={`title-${event._id}`}
                                    value={form.title}
                                    onChange={(e) =>
                                        update("title", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor={`description-${event._id}`}>
                                    Description
                                </Label>

                                <Textarea
                                    id={`description-${event._id}`}
                                    value={form.description}
                                    onChange={(e) =>
                                        update("description", e.target.value)
                                    }
                                    rows={4}
                                    className="resize-none"
                                    required
                                />
                            </div>

                            {/* Event Type */}
                            <div className="space-y-2">
                                <Label htmlFor={`type-${event._id}`}>
                                    Event Type
                                </Label>

                                <Input
                                    id={`type-${event._id}`}
                                    value={form.eventType}
                                    onChange={(e) =>
                                        update("eventType", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Thumbnail */}
                            <div className="space-y-2">
                                <Label htmlFor={`thumbnail-${event._id}`}>
                                    Thumbnail URL
                                </Label>

                                <Input
                                    id={`thumbnail-${event._id}`}
                                    type="url"
                                    value={form.thumbnailUrl}
                                    onChange={(e) =>
                                        update("thumbnailUrl", e.target.value)
                                    }
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label htmlFor={`location-${event._id}`}>
                                    Location
                                </Label>

                                <Input
                                    id={`location-${event._id}`}
                                    value={form.location}
                                    onChange={(e) =>
                                        update("location", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Event Date */}
                            <div className="space-y-2">
                                <Label htmlFor={`date-${event._id}`}>
                                    Event Date & Time
                                </Label>

                                <Input
                                    id={`date-${event._id}`}
                                    type="datetime-local"
                                    value={form.eventDate}
                                    min={minDateTime}
                                    onChange={(e) =>
                                        update("eventDate", e.target.value)
                                    }
                                    required
                                />

                                <p className="text-xs text-muted-foreground">
                                    Select a future date and time (Bangladesh time).
                                </p>
                            </div>
                        </div>

                        {/* Error Message */}
                        {updateError && (
                            <p className="text-sm text-destructive" role="alert">
                                {updateError}
                            </p>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditOpen(false)}
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isUpdating}
                            >
                                {isUpdating
                                    ? "Updating..."
                                    : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Delete This Event?
                        </DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                {event.title}
                            </span>
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {deleteError && (
                        <p className="text-sm text-destructive">
                            {deleteError}
                        </p>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {deleteError && (
                <p className="text-sm text-destructive">
                    {deleteError}
                </p>
            )}
        </>
    );
};

export default ManageEventActions;
