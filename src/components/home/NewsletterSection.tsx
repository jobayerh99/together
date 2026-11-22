
import {
    ArrowRight,
    Mail,
    Sparkles,
    ShieldCheck,
    HeartHandshake,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
    return (
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">

            <div className="mx-auto max-w-[1280px]">

                <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-12 shadow-xl shadow-primary/10 sm:px-10 sm:py-16 lg:px-16">

                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-24 -top-32 -z-10 size-80 rounded-full border border-primary-foreground/10" />

                    <div className="pointer-events-none absolute -right-12 -top-20 -z-10 size-56 rounded-full border border-primary-foreground/10" />

                    <div className="pointer-events-none absolute -bottom-32 -left-24 -z-10 size-80 rounded-full bg-primary-foreground/5 blur-3xl" />

                    <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_460px] lg:gap-16">

                        {/* Left Content */}
                        <div className="text-primary-foreground">

                            {/* Badge */}
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">

                                <Sparkles className="size-4" />

                                Stay Connected With Together

                            </div>

                            {/* Heading */}
                            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                Good Things Happen When We Stay{" "}
                                <span className="text-primary-foreground/75">
                                    Together.
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="mt-5 max-w-xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
                                Get the latest updates about upcoming
                                community events, volunteering opportunities,
                                and inspiring stories. Stay informed and
                                discover new ways to make a difference.
                            </p>

                            {/* Supporting Text */}
                            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-medium text-primary-foreground/90">

                                <div className="flex items-center gap-2">
                                    <HeartHandshake className="size-5" />
                                    <span>Make an Impact</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-5" />
                                    <span>Stay Informed</span>
                                </div>

                            </div>

                        </div>

                        {/* Newsletter Form UI */}
                        <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-2xl sm:p-8">

                            {/* Icon */}
                            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Mail className="size-6" />
                            </div>

                            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                                Join Our Newsletter
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Subscribe to receive community updates
                                and exciting opportunities.
                            </p>

                            {/* Email Input */}
                            <div className="mt-6 space-y-3">

                                <label
                                    htmlFor="newsletter-email"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Email Address
                                </label>

                                <Input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="h-12 rounded-lg bg-background"
                                />

                                {/* Subscribe Button */}
                                <Button
                                    type="button"
                                    className="h-12 w-full gap-2 rounded-lg text-base font-semibold shadow-md shadow-primary/15 transition-all hover:shadow-lg"
                                >
                                    Subscribe Now
                                    <ArrowRight className="size-4" />
                                </Button>

                            </div>

                            {/* Privacy Message */}
                            <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                                <ShieldCheck className="size-4 shrink-0 text-primary" />

                                <span>
                                    No spam. Just meaningful updates.
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default NewsletterSection;
