import type { MetadataRoute } from 'next'

const BASE = 'https://eela.empowrcic.org'

// Kids Space and Adults are the two audience entry points and carry the
// discovery traffic, so they sit just below the home page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/kids-space`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/adults`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/roller-quad-camps`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/members`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
