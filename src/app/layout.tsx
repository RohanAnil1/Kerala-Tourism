import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Kerala Tourism — God\'s Own Country | Official Travel Guide',
  description: 'Explore Kerala — India\'s most beautiful state. Discover backwaters, hill stations, beaches, Ayurveda, wildlife, and cultural experiences. Plan your dream Kerala trip today.',
  keywords: 'Kerala tourism, Kerala travel, backwaters, Munnar, Alleppey, houseboat, Ayurveda, God\'s Own Country, India travel',
  authors: [{ name: 'Kerala Tourism' }],
  openGraph: {
    title: 'Kerala Tourism — God\'s Own Country',
    description: 'Discover the magic of Kerala. Plan your dream trip to India\'s most beautiful state.',
    url: 'https://keralatourism.vercel.app',
    siteName: 'Kerala Tourism',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602158123411-e64e5d76e7c5?w=1200',
        width: 1200,
        height: 630,
        alt: 'Kerala Backwaters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Tourism — God\'s Own Country',
    description: 'Discover the magic of Kerala. Plan your dream trip.',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0A6847" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
