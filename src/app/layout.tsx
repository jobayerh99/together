import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";
import { Suspense } from "react";
import Footer from "@/components/home/Footer";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Together",
  description:
    "Together — discover local social service events, join your community, and make a difference.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interSans.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Suspense
            fallback={
              <div className="h-16" aria-hidden="true" />
            }
          >
            <Navbar />
          </Suspense>
          <main className="min-w-0 flex-1">
            
            {children}

          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
