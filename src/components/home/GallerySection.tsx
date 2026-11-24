
import Image from "next/image";

import { ArrowUpRight, Camera, Heart } from "lucide-react";

import Link from "next/link";

const galleryImages = [
    {
        id: 1,
        title: "Community Cleaning",
        category: "Environmental Care",
        image: "/images/banner-carousel/cleaning.jpg",
    },
    {
        id: 2,
        title: "Education for Children",
        category: "Education Support",
        image: "/images/banner-carousel/education%20for%20childrean.jpg",
    },
    {
        id: 3,
        title: "Food for All",
        category: "Food Donation",
        image: "/images/banner-carousel/food%20for%20all.jpg",
    },
    {
        id: 4,
        title: "Gifts for Neighbours",
        category: "Community Support",
        image: "/images/banner-carousel/gift%20for%20neighbour.jpg",
    },
    {
        id: 5,
        title: "Free Health Camp",
        category: "Healthcare Support",
        image: "/images/banner-carousel/health%20camp.jpg",
    },
    {
        id: 6,
        title: "Winter Clothes Drive",
        category: "Winter Donation",
        image: "/images/banner-carousel/winter%20cloth.jpg",
    },
];

const GallerySection = () => {
    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">

            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                        <Camera className="size-4" />
                        Our Community in Action
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Moments That Make a{" "}
                        <span className="text-primary">
                            Difference
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Every picture tells a story of kindness,
                        compassion, and togetherness. Explore moments
                        from our community service activities.
                    </p>

                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {galleryImages.map((item) => (
                        <figure
                            key={item.id}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                        >

                            {/* Image Container */}
                            <div className="relative aspect-[5/4] overflow-hidden bg-muted">

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Image Icon */}
                                <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-primary">
                                    <Heart className="size-5" />
                                </div>

                                {/* Image Caption */}
                                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">

                                    <span className="mb-2 inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
                                        {item.category}
                                    </span>

                                    <div className="flex items-center justify-between gap-3">

                                        <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                                            {item.title}
                                        </h3>

                                        <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                                    </div>

                                </figcaption>

                            </div>

                        </figure>
                    ))}

                </div>

                {/* Bottom Message */}
                {/* <div className="mt-12 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-8 text-center sm:mt-16 sm:px-10">

                    <div className="mb-3 flex justify-center">
                        <Heart className="size-8 fill-primary/10 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        Every Act of Kindness Matters
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                        Be part of our growing community. Together,
                        we can turn small acts of kindness into
                        meaningful changes.
                    </p>

                    <Link
                        href="/upcoming-events"
                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-lg"
                    >
                        Explore Events
                        <ArrowUpRight className="size-4" />
                    </Link>

                </div> */}

            </div>
        </section>
    );
};

export default GallerySection;
