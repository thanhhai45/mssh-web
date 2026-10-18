import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { faqs } from '@/lib/faqs'
import { site } from '@/lib/site'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  // The origin only. Next adds the base path to file-based images itself, so
  // a metadataBase that carried the path too would name it twice. Page URLs
  // below are absolute for the same reason.
  metadataBase: new URL(new URL(site.url).origin),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.author, url: site.repo }],
  creator: site.author,
  category: 'Developer tools',
  alternates: { canonical: site.url + '/' },
  openGraph: {
    type: 'website',
    url: site.url + '/',
    siteName: site.name,
    title: site.shortTitle,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.shortTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#080b12',
  colorScheme: 'dark',
}

// What search engines read instead of the page: the app itself, and the
// questions answered at the bottom of it.
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    description: site.description,
    url: site.url + '/',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux',
    softwareVersion: site.version,
    downloadUrl: site.download,
    installUrl: site.releases,
    screenshot: `${site.url}/opengraph-image.png`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: site.author, url: site.repo },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here: every value is a string this
          // file controls, and "<" is escaped so no tag can close the script.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  )
}
