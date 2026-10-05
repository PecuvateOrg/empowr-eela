import { SITE_PAGES, SITE_URL, type SitePage } from '@/lib/site-index'

// /llms.txt — the plain-text index AI tools read (llmstxt.org format).
// The page list is generated from every page in app/ (lib/site-index); only
// the intro below is written by hand. Facts in it come from the Empowr KB
// (entities/sessions) — change them there first, then here.
export const dynamic = 'force-static'

const INTRO = `# EELA by Empowr

> EELA is Empowr CIC's roller skating programme site: weekly classes, courses, camps, open skate sessions, events and private bookings in two streams — Kidz Space (ages 5–15) and Adults & Teens (15+).

Each programme page below describes the session and links to its booking page. Bookings are made on members.empowrcic.org and need a free Empowr Member account. Empowr CIC (https://empowrcic.org) is a UK Community Interest Company.`

const SECTIONS: { title: string; match: (p: string) => boolean }[] = [
  { title: 'Kids Space', match: (p) => p.startsWith('/kids-space') || p === '/roller-quad-camps' },
  { title: 'Adults & Teens', match: (p) => p.startsWith('/adults') },
  { title: 'Private bookings', match: (p) => p.startsWith('/private-bookings') },
]

const line = ({ path, title, description }: SitePage) =>
  `- [${title}](${path === '/' ? SITE_URL : SITE_URL + path})${description ? `: ${description}` : ''}`

export function GET() {
  const placed = new Set<string>()
  const blocks = SECTIONS.map(({ title, match }) => {
    const pages = SITE_PAGES.filter((p) => match(p.path))
    pages.forEach((p) => placed.add(p.path))
    return `## ${title}\n\n${pages.map(line).join('\n')}`
  })
  // Anything no section claims still gets listed, so a new page is never dropped.
  const rest = SITE_PAGES.filter((p) => !placed.has(p.path))
  blocks.push(`## About and membership\n\n${rest.map(line).join('\n')}`)

  return new Response(`${INTRO}\n\n${blocks.join('\n\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
