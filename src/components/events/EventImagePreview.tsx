"use client"

import { useState } from "react"
import { ImageOffIcon, ImageIcon } from "lucide-react"

import { isHttpUrl } from "@/lib/url"

function Placeholder({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-sm text-muted-foreground">
      <span className="text-muted-foreground/80" aria-hidden="true">
        {icon}
      </span>
      <p className="max-w-[42ch] leading-relaxed">{children}</p>
    </div>
  )
}

/**
 * 16:9 live preview of the thumbnail URL entered in the Create Event form.
 *
 * Uses a plain `<img>` because the URL is arbitrary user input, which cannot be
 * allow-listed in `next/image` remotePatterns ahead of time.
 */
export function EventImagePreview({ url }: { url: string }) {
  const value = url.trim()
  const canLoad = value.length > 0 && isHttpUrl(value)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const failed = canLoad && failedSrc === value

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted/40">
      {!canLoad ? (
        <Placeholder icon={<ImageIcon className="size-6" />}>
          Paste a thumbnail URL above to preview your event image (16:9).
        </Placeholder>
      ) : failed ? (
        <Placeholder icon={<ImageOffIcon className="size-6" />}>
          We could not load this image. Check that the URL links to a valid image file.
        </Placeholder>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided URLs cannot be allow-listed for next/image
        <img
          src={value}
          alt="Event thumbnail preview"
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(value)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}
