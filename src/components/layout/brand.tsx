import Image from "next/image"
import { cn } from "cn"

/**
 * Icon-only crop of public/images/logo.png (transparent PNG, 677x369).
 * The file contains an icon above a "Together" wordmark; this crops to the
 * icon (measured bounds x=272-404, y=90-207, with ~10px padding) so the
 * brand name can be rendered as real text beside it.
 *
 * Crop window: x=262..414 (w=152), y=80..217 (h=137) of the source image.
 * Width/left are % of the container width, top is % of container height —
 * the math holds at any rendered size.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative block h-9 w-10 overflow-hidden", className)}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={677}
        height={369}
        priority
        className="absolute left-[-172.4%] top-[-58.4%] h-auto w-[445.4%] max-w-none"
      />
    </span>
  )
}

export function BrandName({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-lg font-bold tracking-tight text-primary sm:text-xl",
        className,
      )}
    >
      Together
    </span>
  )
}
