import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import {
  CalendarDaysIcon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react"

import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { getInitials } from "@/lib/utils"

/**
 * Protected route: the Better Auth session is read from the real cookie at
 * request time, so a signed-in user stays signed in across a hard refresh and
 * only anonymous visitors are sent to Login (with the return path preserved).
 * `instant = false` opts the route out of Cache Components' static-shell
 * validation so it can block on the request (same pattern as /create-event).
 */
export const instant = false

export const metadata: Metadata = {
  title: "My Profile | Together",
  description:
    "View the account details your community sees: name, email, photo, and the date you joined Together.",
}

const DETAILS = [
  { key: "name", label: "Name", icon: UserIcon },
  { key: "email", label: "Email", icon: MailIcon },
  { key: "joined", label: "Member since", icon: CalendarDaysIcon },
  { key: "status", label: "Account", icon: ShieldCheckIcon },
] as const

function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/login?redirect=/profile")
  }

  const { user } = session
  const values: Record<(typeof DETAILS)[number]["key"], string> = {
    name: user.name,
    email: user.email,
    joined: formatDate(user.createdAt),
    status: user.emailVerified ? "Email verified" : "Signed in with email",
  }

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
            <BreadcrumbPage>My Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <UserIcon aria-hidden="true" className="size-6" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">
            My Profile
          </h1>
          <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            The details your community sees when you create an event or join a
            volunteer drive.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar size="lg" className="size-16 text-lg">
                {user.image ? (
                  <AvatarImage src={user.image} alt={`Profile photo of ${user.name}`} />
                ) : null}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <CardTitle className="truncate text-xl sm:text-2xl">
                  {user.name}
                </CardTitle>
                <CardDescription className="truncate">{user.email}</CardDescription>
              </div>
            </div>
            <EditProfileDialog
              name={user.name}
              email={user.email}
              image={user.image}
            />
          </CardHeader>

          <CardContent>
            <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {DETAILS.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {label}
                    </dt>
                    <dd className="truncate text-sm font-medium text-foreground">
                      {values[key]}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <aside aria-labelledby="profile-note-title" className="lg:sticky lg:top-24">
          <Card>
            <CardHeader>
              <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheckIcon aria-hidden="true" className="size-5" />
              </span>
              <CardTitle id="profile-note-title" className="text-base">
                Your Identity Is Verified
              </CardTitle>
              <CardDescription className="leading-relaxed">
                This page is read straight from your signed-in session, so the
                details shown here always match the account you are logged in
                as.
              </CardDescription>
            </CardHeader>
          </Card>
        </aside>
      </div>
    </div>
  )
}
