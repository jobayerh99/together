import type { Metadata } from "next"
import Link from "next/link"
import { CalendarPlusIcon, HeartHandshakeIcon } from "lucide-react"

import { CreateEventForm } from "@/components/events/CreateEventForm"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * This protected route reads the session cookie at request time so the
 * `REQUIRE_AUTH` decision is made per request instead of at build time.
 * `instant = false` opts the route out of Cache Components' static-shell
 * validation and lets it block on the request (Next 16 docs: "Set
 * `export const instant = false` to allow a blocking route").
 */
export const instant = false

export const metadata: Metadata = {
  title: "Create a Community Event | Together",
  description:
    "Bring people together and turn your ideas into meaningful community action. Create an event and inspire others to make a difference.",
}

const PARTICIPATION_TIPS = [
  "Use a clear, specific title so volunteers know what to expect.",
  "Share the exact location and time volunteers should arrive.",
  "Add an image that reflects the community activity you are organizing.",
]

export default async function CreateEventPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 py-8 sm:px-6 sm:py-12">
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
            <BreadcrumbPage>Create Event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <CalendarPlusIcon aria-hidden="true" className="size-6" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">
            Create a Community Event
          </h1>
          <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            Bring people together and turn your ideas into meaningful community action. Create an
            event and inspire others to make a difference.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <CreateEventForm />

        <aside aria-labelledby="event-tips-title" className="lg:sticky lg:top-24">
          <Card>
            <CardHeader>
              <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HeartHandshakeIcon aria-hidden="true" className="size-5" />
              </span>
              <CardTitle id="event-tips-title" className="text-base">
                Make Your Event Meaningful
              </CardTitle>
              <CardDescription className="leading-relaxed">
                Every small initiative can make a meaningful difference. Provide accurate
                information so volunteers know how they can participate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                {PARTICIPATION_TIPS.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
