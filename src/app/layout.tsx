import type { Metadata } from "next";
import { displayFont, bodyFont } from "./fonts";
import "./globals.css";
import "./field-guide.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kerala — At Its Own Pace | Independent Travel Guide",
  description:
    "Kerala, at its own pace. Discover landscapes, everyday culture, food, and curated journeys in an independent editorial travel guide.",
  keywords:
    "Kerala tourism, Kerala travel, backwaters, Munnar, Alleppey, houseboat, Ayurveda, God's Own Country, India travel",
  authors: [{ name: "Kerala Tourism" }],
  openGraph: {
    title: "Kerala — At Its Own Pace",
    description:
      "An independent editorial portrait of Kerala: landscapes, culture, food, and curated journeys.",
    url: "https://kerala-tourism-five.vercel.app",
    siteName: "Kerala Tourism",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kerala-tourism-five.vercel.app/media/8493719d0a611e.jpg",
        width: 1200,
        height: 630,
        alt: "Kerala Backwaters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kerala — At Its Own Pace",
    description: "Discover landscapes, culture, food, and curated journeys.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#173C32" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-body antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main
              id="main-content"
              className="min-h-screen"
              tabIndex={-1}
              lang="en"
              dir="ltr"
            >
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
