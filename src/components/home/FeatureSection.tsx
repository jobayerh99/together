
import {
    Compass,
    CalendarPlus,
    HandHeart,
    LayoutDashboard,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import Link from "next/link";

const features = [
    {
        icon: Compass,
        title: "Discover Community Events",
        description:
            "Explore local community events, discover new opportunities, and find initiatives that match your interests.",
        link: "/upcoming-events",
        linkText: "Explore Events",
    },
    {
        icon: CalendarPlus,
        title: "Create Your Own Events",
        description:
            "Turn your ideas into meaningful initiatives. Create events and bring people together for a positive cause.",
        link: "/create-event",
        linkText: "Create Event",
    },
    {
        icon: HandHeart,
        title: "Join Meaningful Initiatives",
        description:
            "Be part of something bigger. Join volunteering activities, support communities, and make a difference.",
        link: "/upcoming-events",
        linkText: "Join an Event",
    },
    {
        icon: LayoutDashboard,
        title: "Manage Your Activities",
        description:
            "Keep your joined events organized, revisit event details, and stay connected with your community activities.",
        link: "/joined-event",
        linkText: "View My Events",
    },
];

const FeatureSection = () => {
    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-32 top-20 size-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="pointer-events-none absolute -right-32 bottom-10 size-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                        <Sparkles className="size-4" />
                        Why Choose Together
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Everything You Need to{" "}
                        <span className="text-primary">
                            Make a Difference
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Together makes it easier to discover opportunities,
                        organize community events, and connect with people
                        who share your passion for positive change.
                    </p>

                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <Card
                                key={feature.title}
                                className="group relative overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                            >

                                <CardContent className="flex h-full flex-col p-6">

                                    {/* Icon */}
                                    <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">

                                        <Icon className="size-7" />

                                    </div>

                                    {/* Feature Number */}
                                    <span className="mb-3 text-xs font-bold tracking-widest text-primary/70">
                                        FEATURE 0{index + 1}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                                        {feature.description}
                                    </p>

                                    {/* Link */}
                                    <Link
                                        href={feature.link}
                                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                                    >
                                        {feature.linkText}

                                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>

                                </CardContent>

                            </Card>
                        );
                    })}

                </div>

                {/* Bottom Message */}
                <div className="mt-12 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-8 text-center sm:mt-16 sm:px-10">

                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        Small Actions. Big Impact.
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                        Every event is an opportunity to connect, help,
                        and create a better tomorrow. Start your journey
                        with Together today.
                    </p>

                    <Link
                        href="/upcoming-events"
                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-lg"
                    >
                        Explore Community Events
                        <ArrowUpRight className="size-4" />
                    </Link>

                </div>

            </div>
        </section>
    );
};

export default FeatureSection;
