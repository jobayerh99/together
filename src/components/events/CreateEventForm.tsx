"use client"

import { useForm, useWatch, type DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { CalendarPlusIcon, MapPinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import {
  createEventSchema,
  EVENT_CATEGORIES,
  getMinEventDateInputValue,
  type CreateEventValues,
  type EventCategory,
} from "@/lib/event-schema"
import { createEvent } from "@/services/events"

import { EventImagePreview } from "./EventImagePreview"
import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFromClient"

const defaultValues: DefaultValues<CreateEventValues> = {
  title: "",
  description: "",
  thumbnailUrl: "",
  location: "",
  eventDate: "",
}

const DESCRIPTION_MAX = 2000

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-destructive">
      *
    </span>
  )
}

export function CreateEventForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  })

  /**
   * "Minimum date = tomorrow" is set on the DOM after hydration instead of
   * during render: server and client would otherwise disagree about what
   * "today" is (UTC vs. local time) and trigger a hydration mismatch.
   */
  const dateRegistration = register("eventDate")
  const setDateInputRef = (element: HTMLInputElement | null) => {
    dateRegistration.ref(element)
    if (element) {
      element.min = getMinEventDateInputValue()
    }
  }

  const descriptionValue = useWatch({ control, name: "description" }) ?? ""
  const thumbnailUrl = useWatch({ control, name: "thumbnailUrl" }) ?? ""
  const eventType = useWatch({ control, name: "eventType" })
  const descriptionLength = descriptionValue.length

  const submit = handleSubmit(async (values) => {
    // Guard against duplicate submissions while a request is in flight.
    const token = await getTokenFromClient()

    try {
      await createEvent(values, token)
      toast.add({
        type: "success",
        title: "Your event has been created successfully!",
        description: "It will now appear on the Upcoming Events page.",
      })
      router.push("/upcoming-events")
    } catch (error) {
      // Form data stays intact so the visitor can review and retry.
      toast.add({
        type: "error",
        title: "Something went wrong while creating your event.",
        description:
          error instanceof Error && error.message
            ? error.message
            : "Please try again in a moment.",
      })
    }
  })

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    void submit(event)
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Event Details</CardTitle>
        <CardDescription className="leading-relaxed">
          Fields marked with <span className="text-destructive">*</span> are required.
          Volunteers will see this information on your event page.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleFormSubmit} noValidate className="flex flex-col gap-6">
          <FieldGroup>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Event title */}
              <Field>
                <FieldLabel htmlFor="event-title">
                  Event Title
                  <RequiredMark />
                </FieldLabel>
                <Input
                  id="event-title"
                  placeholder="e.g. Winter Blanket Distribution 2026"
                  autoComplete="off"
                  required
                  {...register("title")}
                  aria-invalid={errors.title ? true : undefined}
                />
                <FieldError errors={[errors.title]} />
              </Field>

              {/* Event category */}
              <Field>
                <FieldLabel htmlFor="event-category">
                  Event Category
                  <RequiredMark />
                </FieldLabel>
                <Select
                  value={eventType ?? null}
                  onValueChange={(value) => {
                    if (value === null) return
                    setValue("eventType", value as EventCategory, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                >
                  <SelectTrigger
                    id="event-category"
                    className="w-full"
                    aria-required="true"
                    aria-invalid={errors.eventType ? true : undefined}
                  >
                    <SelectValue placeholder="Select an event category" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.eventType]} />
              </Field>
            </div>

            {/* Description */}
            <Field>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor="event-description">
                  Event Description
                  <RequiredMark />
                </FieldLabel>
                <span
                  className={
                    descriptionLength > DESCRIPTION_MAX
                      ? "text-xs font-medium tabular-nums text-destructive"
                      : "text-xs tabular-nums text-muted-foreground"
                  }
                >
                  {descriptionLength}/{DESCRIPTION_MAX}
                </span>
              </div>
              <Textarea
                id="event-description"
                placeholder="Describe the purpose of your event, who will benefit, and how volunteers can participate."
                className="min-h-40 resize-y"
                required
                {...register("description")}
                aria-invalid={errors.description ? true : undefined}
              />
              <FieldError errors={[errors.description]} />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Location */}
              <Field>
                <FieldLabel htmlFor="event-location">
                  Event Location
                  <RequiredMark />
                </FieldLabel>
                <div className="relative">
                  <MapPinIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="event-location"
                    placeholder="e.g. Mirpur 10, Dhaka"
                    autoComplete="off"
                    className="pl-9"
                    required
                    {...register("location")}
                    aria-invalid={errors.location ? true : undefined}
                  />
                </div>
                <FieldError errors={[errors.location]} />
              </Field>

              {/* Date */}
              <Field>
                <FieldLabel htmlFor="event-date">
                  Event Date
                  <RequiredMark />
                </FieldLabel>
                <Input
                  id="event-date"
                  type="date"
                  required
                  className="dark:[color-scheme:dark]"
                  {...dateRegistration}
                  ref={setDateInputRef}
                  aria-invalid={errors.eventDate ? true : undefined}
                />
                <FieldDescription>
                  Only future dates are allowed — today cannot be selected.
                </FieldDescription>
                <FieldError errors={[errors.eventDate]} />
              </Field>
            </div>

            {/* Thumbnail */}
            <Field>
              <FieldLabel htmlFor="event-thumbnail">
                Event Thumbnail URL
                <RequiredMark />
              </FieldLabel>
              <Input
                id="event-thumbnail"
                type="url"
                inputMode="url"
                placeholder="https://example.com/event-image.jpg"
                autoComplete="off"
                required
                {...register("thumbnailUrl")}
                aria-invalid={errors.thumbnailUrl ? true : undefined}
              />
              <FieldError errors={[errors.thumbnailUrl]} />
            </Field>
            <EventImagePreview url={thumbnailUrl} />
          </FieldGroup>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Your event will be visible to everyone on the Upcoming Events page once it is
              created.
            </p>
            <Button
              type="submit"
              size="lg"
              className="w-full px-6 sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : <CalendarPlusIcon />}
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
