import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Locksmith: Ripple Run - Strategic Puzzle Game',
  description: 'Master the art of unlocking in Locksmith: Ripple Run. A challenging puzzle game where each key creates ripple effects. 50+ levels, compete on global leaderboards, and unlock your strategic thinking!',
  keywords: ['puzzle game', 'strategy game', 'locksmith game', 'ripple effect', 'brain teaser', 'logic puzzle', 'online game', 'free game'],
  authors: [{ name: 'Pascal Mariany', url: 'https://www.pascalmariany.eu' }],
  creator: 'Pascal Mariany',
  publisher: 'Pascal Mariany',
  metadataBase: new URL('https://www.locksmithripplerun.eu'),
  alternates: {
    canonical: 'https://www.locksmithripplerun.eu',
  },
  openGraph: {
    title: 'Locksmith: Ripple Run - Strategic Puzzle Game',
    description: 'Master the art of unlocking in Locksmith: Ripple Run. A challenging puzzle game where each key creates ripple effects. 50+ levels, compete on global leaderboards!',
    url: 'https://www.locksmithripplerun.eu',
    siteName: 'Locksmith: Ripple Run',
    images: [
      {
        url: '/1751397607898.jpeg',
        width: 1200,
        height: 630,
        alt: 'Locksmith: Ripple Run - Puzzle Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locksmith: Ripple Run - Strategic Puzzle Game',
    description: 'Master the art of unlocking. A challenging puzzle game where each key creates ripple effects. 50+ levels!',
    images: ['/1751397607898.jpeg'],
    creator: '@pascalmariany',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.locksmithripplerun.eu" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Game',
              name: 'Locksmith: Ripple Run',
              description: 'Master the art of unlocking in Locksmith: Ripple Run. A challenging puzzle game where each key creates ripple effects. 50+ levels, compete on global leaderboards!',
              url: 'https://www.locksmithripplerun.eu',
              image: 'https://www.locksmithripplerun.eu/1751397607898.jpeg',
              author: {
                '@type': 'Person',
                name: 'Pascal Mariany',
                url: 'https://www.pascalmariany.eu',
              },
              publisher: {
                '@type': 'Person',
                name: 'Pascal Mariany',
                url: 'https://www.pascalmariany.eu',
              },
              genre: ['Puzzle', 'Strategy', 'Logic'],
              gamePlatform: 'Web Browser',
              playMode: 'SinglePlayer',
              applicationCategory: 'Game',
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
