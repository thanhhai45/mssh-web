import type { NextConfig } from 'next'

import { site } from './src/lib/site'

// A static site: `next build` writes plain HTML to out/, which any host serves,
// GitHub Pages included. The base path comes from the site URL, so the two
// cannot disagree: https://user.github.io/mssh-web means /mssh-web, a domain
// of its own means none.
const basePath = new URL(site.url).pathname.replace(/\/$/, '')

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    // There is no server to resize images on. The screenshots are already
    // WebP at the size they are shown.
    unoptimized: true,
  },
}

export default nextConfig
