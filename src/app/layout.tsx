import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import PostHogProvider from '@/components/PostHogProvider';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import ChatBubble from '@/components/ChatBubble';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eela.empowrcic.org'),
  title: {
    default: 'EELA by Empowr',
    template: '%s | EELA',
  },
  description: 'EELA — the home for all Empowr CIC sessions. Browse programmes for kids, teens and adults.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'EELA by Empowr',
    description: 'EELA — the home for all Empowr CIC sessions. Browse programmes for kids, teens and adults.',
    url: 'https://eela.empowrcic.org',
    siteName: 'EELA by Empowr',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EELA by Empowr',
    description: 'EELA — the home for all Empowr CIC sessions. Browse programmes for kids, teens and adults.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Empowr CIC",
    "url": "https://empowrcic.org",
    "description": "Empowr CIC is a UK-based Community Interest Company focused on empowering individuals through education, employment, and community connection.",
    "sameAs": [
      "https://www.linkedin.com/company/empowr-cic",
      "https://www.instagram.com/empowr.cic",
      "https://www.facebook.com/empowr.cic",
      "https://www.youtube.com/@empowr.cic"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EELA by Empowr",
    "url": "https://eela.empowrcic.org",
    "description": "EELA is a session discovery and membership platform connecting people with learning and development opportunities run by Empowr CIC."
  }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[family-name:var(--font-nunito)] antialiased">
        <PostHogProvider>
          {children}
          <CookieConsentBanner />
          <ChatBubble orgSlug="empowr-cic" />
        </PostHogProvider>
      </body>
    </html>
  );
}
