"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, type FocusEvent } from "react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { heroSlides } from "@/components/home/hero-slides"

const AUTOPLAY_INTERVAL_MS = 5000
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Brand-green gradient overlays painted over every slide.
 * Desktop washes from the left so the copy stays readable; mobile gets a
 * stronger, mostly vertical wash because the text spans more of the screen.
 */
const OVERLAY_DESKTOP =
  "bg-[linear-gradient(90deg,rgba(16,26,22,0.92)_0%,rgba(22,101,52,0.68)_48%,rgba(16,26,22,0.12)_100%)]"
const OVERLAY_MOBILE =
  "bg-[linear-gradient(180deg,rgba(16,26,22,0.94)_0%,rgba(16,26,22,0.86)_55%,rgba(22,101,52,0.9)_100%)]"

const ARROW_CLASSES =
  "static size-10 border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white focus-visible:border-white focus-visible:ring-white dark:border-white/30 dark:bg-black/40 dark:hover:bg-black/50 dark:focus-visible:ring-white"

/**
 * Homepage hero banner carousel.
 *
 * - Reuses the shadcn Carousel (Embla) with infinite looping.
 * - Autoplays every 5s and pauses on hover, keyboard focus, or a hidden tab.
 * - Autoplay is skipped entirely when the user prefers reduced motion.
 * - Slide copy fades in while the photograph slides horizontally.
 */
export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isPaused = isHovered || isFocused

  // Track the current slide so copy, dots, and inert states stay in sync.
  useEffect(() => {
    if (!api) return

    const handleSelect = (emblaApi: CarouselApi) => {
      if (!emblaApi) return
      setActiveIndex(emblaApi.selectedScrollSnap())
    }

    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api])

  // Autoplay: one slide every 5s, reset whenever the slide changes (manual
  // navigation included). Paused while hovered/focused, skipped while the tab
  // is hidden or the user prefers reduced motion.
  useEffect(() => {
    if (!api || isPaused) return

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    let timerId = 0

    const stop = () => {
      window.clearInterval(timerId)
      timerId = 0
    }

    const start = () => {
      stop()
      timerId = window.setInterval(() => {
        if (mediaQuery.matches || document.hidden) return
        api.scrollNext()
      }, AUTOPLAY_INTERVAL_MS)
    }

    const handleSelect = () => start()

    start()
    api.on("select", handleSelect)

    return () => {
      stop()
      api.off("select", handleSelect)
    }
  }, [api, isPaused])

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false)
    }
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      aria-label="Community service highlights"
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
    >
      <h1 className="sr-only">Small Acts. Big Changes.</h1>

      <CarouselContent className="ml-0">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <CarouselItem
              key={slide.id}
              aria-label={`Slide ${index + 1} of ${heroSlides.length}: ${slide.heading}`}
              inert={!isActive}
              className="relative h-[560px] overflow-hidden pl-0 md:h-[520px] lg:h-[600px]"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              <div
                aria-hidden
                className={cn("absolute inset-0 md:hidden", OVERLAY_MOBILE)}
              />
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 hidden md:block",
                  OVERLAY_DESKTOP
                )}
              />

              <div className="relative z-10 flex h-full items-center pb-16 sm:pb-10">
                <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
                  <div
                    className={cn(
                      "max-w-2xl transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    )}
                  >
                    <p className="text-sm font-medium tracking-wide text-[#DCFCE7] sm:text-base">
                      {slide.motto}
                    </p>
                    <h2 className="mt-3 text-[34px] leading-[1.12] font-bold tracking-tight text-white sm:text-[38px] md:text-[44px] lg:text-[52px] xl:text-[56px]">
                      {slide.heading}
                    </h2>
                    <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/85 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <Link
                        href="/upcoming-events"
                        className={cn(
                          buttonVariants({
                            className: "h-12 w-full px-6 text-base sm:w-auto",
                          })
                        )}
                      >
                        Explore Events
                      </Link>
                      <Link
                        href="/register"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            className:
                              "h-12 w-full border-white/70 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white dark:border-white/70 dark:bg-transparent dark:hover:bg-white/10 sm:w-auto",
                          })
                        )}
                      >
                        Join Our Community
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      {/* Controls: indicator dots on the left, prev/next arrows on the right. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          <div
            role="group"
            aria-label="Choose a slide"
            className="pointer-events-auto flex items-center gap-2"
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Show slide ${index + 1} of ${heroSlides.length}: ${slide.heading}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  index === activeIndex
                    ? "w-6 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <CarouselPrevious className={ARROW_CLASSES} />
            <CarouselNext className={ARROW_CLASSES} />
          </div>
        </div>
      </div>
    </Carousel>
  )
}
