import type { MetadataRoute } from 'next'
import { SITE_PAGES, SITE_URL } from '@/lib/site-index'

// Generated from every page in app/ (lib/site-index) — a new page is listed
// automatically. Only priorities are set by hand.
//
// Kids Space and Adults are the two audience entry points and carry the
// discovery traffic, so they sit just below the home page.
const PRIORITY: Record<string, number> = {
  '/': 1,
  '/kids-space': 0.9,
  '/adults': 0.9,
  '/about': 0.6,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.map(({ path }) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency: path === '/about' ? 'yearly' : 'monthly',
    // Section landing pages (one segment deep) outrank programme detail pages.
    priority: PRIORITY[path] ?? (path.split('/').length === 2 ? 0.8 : 0.7),
  }))
}
