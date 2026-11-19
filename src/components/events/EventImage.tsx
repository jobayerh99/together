"use client"

import { useState } from "react"
import { ImageOffIcon } from "lucide-react"

import { isHttpUrl } from "@/lib/url"

/**
 * 16:9 event thumbnail with a graceful fallback for missing or broken URLs.
 *
 * Uses a plain `<img>` because thumbnail URLs are arbitrary backend data that
 * cannot be allow-listed in `next/image` remotePatterns ahead of time.
 */
export function EventImage({ src, alt }: { src: string; alt: string }) {
  const value = src.trim()
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const canLoad = isHttpUrl(value) && failedSrc !== value

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted/40">
      {canLoad ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary backend URLs cannot be allow-listed for next/image
        <img
          src={value}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(value)}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
        />
      ) : (
        <div
          className="flex h-full items-center justify-center text-muted-foreground/70"
          aria-hidden="true"
        >
          <ImageOffIcon className="size-7" />
        </div>
      )}
    </div>
  )
}
