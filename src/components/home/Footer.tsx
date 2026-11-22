
import Link from "next/link";

import {
    HeartHandshake,
    ArrowRight,
    ArrowUpRight,
    Compass,
    CalendarPlus,
    CalendarCheck,
    Users,
    Sparkles,
    Heart,
    HandHeart,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="relative mt-16 overflow-hidden bg-[#10291D] text-white">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">

                {/* Top CTA Section */}
                {/* <div className="border-b border-white/10 py-12 sm:py-14">

                    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:flex-row lg:items-center">

                        <div className="max-w-xl">

                            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-green-400">
                                <Sparkles className="size-4" />
                                Be Part of Something Meaningful
                            </div>

                            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                                Ready to Make a Difference?
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-white/65">
                                Join our growing community and turn your
                                passion for helping others into meaningful
                                actions.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <Link
                                href="/upcoming-events"
                                className={`${buttonVariants()} gap-2`}
                            >
                                Explore Events
                                <ArrowRight className="size-4" />
                            </Link>

                            <Link
                                href="/create-event"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
                            >
                                Create Event
                                <CalendarPlus className="size-4" />
                            </Link>

                        </div>

                    </div>

                </div> */}

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">

                    {/* Brand Information */}
                    <div className="lg:col-span-1">

                        <Link
                            href="/"
                            className="mb-5 inline-flex items-center gap-3"
                        >
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <HeartHandshake className="size-7" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Together
                                </h2>

                                <p className="text-xs text-white/50">
                                    Connect. Care. Contribute.
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-white/65">
                            Together is a community-driven platform
                            that connects people through meaningful
                            events, volunteering opportunities, and
                            acts of kindness.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-400">
                            <Heart className="size-4 fill-current" />
                            Making communities stronger, together.
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="mb-5 text-base font-bold">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">

                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-green-400"
                                >
                                    <ArrowUpRight className="size-4" />
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/upcoming-events"
                                    className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-green-400"
                                >
                                    <Compass className="size-4" />
                                    Upcoming Events
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/create-event"
                                    className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-green-400"
                                >
                                    <CalendarPlus className="size-4" />
                                    Create Event
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/joined-events"
                                    className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-green-400"
                                >
                                    <CalendarCheck className="size-4" />
                                    Joined Events
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Community */}
                    <div>

                        <h3 className="mb-5 text-base font-bold">
                            Our Community
                        </h3>

                        <ul className="space-y-4">

                            <li className="flex items-center gap-2 text-sm text-white/65">
                                <HandHeart className="size-4 text-green-400" />
                                Volunteer & Help
                            </li>

                            <li className="flex items-center gap-2 text-sm text-white/65">
                                <Users className="size-4 text-green-400" />
                                Community Support
                            </li>

                            <li className="flex items-center gap-2 text-sm text-white/65">
                                <Heart className="size-4 text-green-400" />
                                Spread Kindness
                            </li>

                            <li className="flex items-center gap-2 text-sm text-white/65">
                                <Sparkles className="size-4 text-green-400" />
                                Create Positive Change
                            </li>

                        </ul>

                    </div>

                    {/* Call to Action */}
                    <div>

                        <h3 className="mb-5 text-base font-bold">
                            Get Involved
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-white/65">
                            Every small action matters. Find an event
                            that inspires you and become part of
                            something bigger.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl"
                        >
                            Join Our Community
                            <ArrowUpRight className="size-4" />
                        </Link>

                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 py-6">

                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

                        <p className="text-xs leading-6 text-white/50 sm:text-sm">
                            © 2026 Together. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-xs text-white/50 sm:text-sm">
                            Made with
                            <Heart className="size-4 fill-red-500 text-red-500" />
                            for a better community.
                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
