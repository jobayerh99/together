import { Skeleton } from "@/components/ui/skeleton"

/** Route-level loading state shown while the signed-in profile streams in. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 py-8 sm:px-6 sm:py-12">
      <Skeleton className="mb-6 h-5 w-32" />

      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <Skeleton className="size-12 rounded-xl" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-5 w-72 max-w-full" />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-16 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-4 w-56 max-w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>

          <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex gap-3">
                <Skeleton className="size-8 rounded-lg" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-40 max-w-full" />
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Skeleton className="mb-4 size-9 rounded-lg" />
          <Skeleton className="mb-3 h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}
