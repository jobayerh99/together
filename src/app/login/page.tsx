
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    // Form submission
    const handleLogin = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signIn.email({
            ...user,
        });

        if (data) {
            redirect("/");
        }

        if (error) {
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);
    }

    return (
        <div className={cn("mx-auto flex w-full max-w-xl flex-col gap-6")}>
            <Card className="overflow-hidden rounded-2xl border-border bg-card shadow-xl shadow-primary/5">

                {/* Card Header */}
                <CardHeader className="space-y-3 border-b border-border bg-primary/[0.04] px-6 py-8 text-center sm:px-10">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="size-7"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 12h2l1.5-2.5L14 15l1.5-3H17"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Welcome
                    </CardTitle>

                    <CardDescription className="text-sm leading-6 text-muted-foreground">
                        Login for better community
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-6 py-8 sm:px-10">
                    <form onSubmit={handleLogin}>
                        <FieldGroup className="gap-5">

                            {/* Email */}
                            <Field className="gap-2">
                                <FieldLabel htmlFor="email" className="font-semibold">
                                    Email
                                </FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                    className="h-11 rounded-lg bg-background transition-all focus-visible:ring-primary"
                                />
                            </Field>

                            {/* Password */}
                            <Field className="gap-2">
                                <div className="flex items-center justify-between gap-2">
                                    <FieldLabel htmlFor="password" className="font-semibold">
                                        Password
                                    </FieldLabel>

                                    <a
                                        href="#"
                                        className="text-xs font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    required
                                    className="h-11 rounded-lg bg-background transition-all focus-visible:ring-primary"
                                />
                            </Field>

                            {/* Register Button */}
                            <Field className="gap-4 pt-2">
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-lg bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-lg"
                                >
                                    Log In
                                </Button>

                                <FieldDescription className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href="/register"
                                        className="font-semibold text-primary underline-offset-4 hover:underline"
                                    >
                                        Register
                                    </Link>
                                </FieldDescription>
                            </Field>

                            {/* Separator */}
                            <FieldSeparator className="my-1 text-xs text-muted-foreground [&_[data-slot=field-separator-content]]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            {/* Google Login */}
                            <Field>
                                <Button
                                onClick={handleGoogleSignIn}
                                    variant="outline"
                                    type="button"
                                    className="h-11 w-full rounded-lg border-border bg-background font-semibold transition-all hover:border-primary/40 hover:bg-primary/[0.04]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="size-5"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>

                                    Login with Google
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            {/* Terms */}
            <FieldDescription className="px-4 text-center text-xs leading-6 text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <a
                    href="#"
                    className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </a>{" "}
                and{" "}
                <a
                    href="#"
                    className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </a>.
            </FieldDescription>
        </div>
    );
}
