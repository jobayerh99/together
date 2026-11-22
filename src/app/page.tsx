import FeatureSection from "@/components/home/FeatureSection";
import GallerySection from "@/components/home/GallerySection";
import { HeroCarousel } from "@/components/home/HeroCarousel"
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeatureSection />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
}
