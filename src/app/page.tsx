import FeatureSection from "@/components/home/FeatureSection";
import GallerySection from "@/components/home/GallerySection";
import { HeroCarousel } from "@/components/home/HeroCarousel"
import NewsletterSection from "@/components/home/NewsletterSection";
import RecentUpcomingEvent from "@/components/home/RecentUpcomingEvent";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeatureSection />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20">
            <div className="mb-8 h-8 w-64 animate-pulse rounded bg-muted" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="aspect-[4/5] animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </div>
        }
      >
        <RecentUpcomingEvent />
      </Suspense>
      <GallerySection />
      <NewsletterSection />
    </div>
  );
}
