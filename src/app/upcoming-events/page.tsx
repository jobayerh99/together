import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { EventsExplorer } from "@/components/events/EventsExplorer"
import { EventGridSkeleton } from "@/components/events/EventListSkeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getUpcomingEvents } from "@/services/events"


export const metadata: Metadata = {
  title: "Upcoming Events | Together",
  description:
    "Discover upcoming social development events near you — cleanups, donation drives, blood donation camps, health camps, and more — and join as a volunteer.",
}

/**
 * Loads the page data at request time. Everything runs inside the page's
 * `<Suspense>` boundary, as required by `cacheComponents`: the uncached fetch
 * and the session cookie read suspend here instead of blocking the shell.
 */
async function UpcomingEventsSection() {
  const events = await getUpcomingEvents()

  return <EventsExplorer events={events} canCreateEvent={false} />
}

export default function UpcomingEventsPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href="/" />}
              className="transition-colors hover:text-foreground"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Upcoming Events</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* <header className="rounded-2xl border border-primary/10 bg-secondary p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background text-primary ring-1 ring-primary/20">
            <CalendarSearchIcon aria-hidden="true" className="size-6" />
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl leading-tight font-bold text-secondary-foreground sm:text-4xl">
              Discover Upcoming Events
            </h1>
            <p className="max-w-[62ch] text-base leading-relaxed text-secondary-foreground/80">
              Browse local volunteer opportunities — from winter clothes drives to blood donation
              camps — and join the people making a positive difference in their communities.
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-secondary-foreground">
              <SparklesIcon aria-hidden="true" className="size-4" />
              Find an opportunity. Make an impact.
            </p>
          </div>
        </div>
      </header> */}

      <section aria-labelledby="upcoming-events-heading" className="mt-10">
        <div className="mb-6 flex flex-col gap-3">
          <h2 id="upcoming-events-heading" className="text-3xl leading-tight font-bold sm:text-4xl">
            Explore Community Events
          </h2>
          <p className="max-w-[68ch] text-base leading-relaxed text-muted-foreground">
            Events are listed soonest first. Search by name or place, or narrow the list by
            category to find the opportunity that fits your schedule.
          </p>
        </div>

        <Suspense fallback={<EventGridSkeleton />}>
          <UpcomingEventsSection />
        </Suspense>
      </section>
    </div>
  )
}
