import { EventCardSkeleton } from "@/components/events/EventCardSkeleton"
import { EVENT_GRID_CLASS } from "@/components/events/EventGrid"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Grid of card skeletons, announced as a single loading region.
 * Used as the in-page Suspense fallback and inside {@link EventListSkeleton}.
 */
export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading upcoming events">
      <span className="sr-only">Loading upcoming events…</span>
      <div className={EVENT_GRID_CLASS}>
        {Array.from({ length: count }, (_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

/** Full-page skeleton for `loading.tsx` (mirrors the real page structure). */
export function EventListSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <Skeleton className="mb-6 h-4 w-40" />

      {/* Header band */}
      <div className="rounded-2xl border border-primary/10 bg-secondary p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <Skeleton className="size-12 shrink-0 rounded-xl" />
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-9 w-72 max-w-full" />
            <Skeleton className="h-4 w-full max-w-[54ch]" />
            <Skeleton className="h-4 w-2/3 max-w-[40ch]" />
            <Skeleton className="mt-1 h-5 w-56 rounded-full" />
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div className="mt-10 mb-6 flex flex-col gap-3">
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <Skeleton className="h-9 w-full lg:flex-1" />
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-9 w-[190px]" />
          <Skeleton className="h-9 w-[190px]" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </div>

      <EventGridSkeleton />
    </div>
  )
}
