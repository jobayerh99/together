"use client"

import { useEffect } from "react"
import { RotateCcwIcon, TriangleAlertIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

/**
 * Route error boundary for the upcoming-events page (e.g. the backend is
 * unreachable). Next 16 passes `retry` to re-fetch and re-render the segment.
 */
export default function UpcomingEventsError({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <div
        role="alert"
        className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center"
      >
        <span
          className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          aria-hidden="true"
        >
          <TriangleAlertIcon className="size-6" />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl">Unable to load upcoming events</h1>
          <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
            Unable to load events. Please try again — if the problem persists, check your
            connection and come back in a few minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={retry}
          className={cn(buttonVariants(), "mt-2 gap-2")}
        >
          <RotateCcwIcon aria-hidden="true" className="size-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}
