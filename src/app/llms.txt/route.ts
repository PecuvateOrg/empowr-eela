import { SITE_PAGES, SITE_URL, type SitePage } from '@/lib/site-index'
import { formatPence, getOfferings, type Offering } from '@/lib/offerings'
import { checkOfferingPages, OFFERING_PAGES } from '@/lib/offering-pages'

// /llms.txt — the plain-text index AI tools read (llmstxt.org format).
// The page list is generated from every page in app/ (lib/site-index); only
// the intro below is written by hand. Facts in it come from the Empowr KB
// (entities/sessions) — change them there first, then here.
//
// "Session facts" comes from the KB offerings feed (lib/offerings), re-read
// daily. A feed failure throws: at build the build fails, at revalidation the
// last good file keeps being served. Must equal OFFERINGS_REVALIDATE (Next
// needs a literal here).
export const revalidate = 86400

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

const titleOf = (path: string) => SITE_PAGES.find((p) => p.path === path)?.title ?? path

const STATUS_NOTE: Record<Offering['status'], string> = {
  Live: '',
  'Dates TBA': ' Dates to be announced.',
  'Off-platform': ' Not booked online.',
}

function prices(o: Offering) {
  const parts: string[] = []
  if (o.onlinePence !== null) parts.push(o.onlinePence === 0 ? 'Free' : `${formatPence(o.onlinePence)} online`)
  if (o.earlyBirdPence !== null) parts.push(`${formatPence(o.earlyBirdPence)} early bird`)
  if (o.doorPence !== null && o.dropIn) parts.push(`${formatPence(o.doorPence)} on the door`)
  if (o.subscriptionMonthlyPence !== null) parts.push(`${formatPence(o.subscriptionMonthlyPence)}/month subscription`)
  return parts.join(', ')
}

function factLine(o: Offering) {
  const paths = OFFERING_PAGES[o.offering] ?? []
  // No EELA page yet: name it from its slug, unlinked (Members is never a destination).
  const head = paths.length
    ? paths.map((p) => `[${titleOf(p)}](${SITE_URL + p})`).join(', ')
    : o.offering.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())
  const when = o.day === 'Varies' && o.time === 'Varies' ? 'Day and time vary' : `${o.day} ${o.time}`
  // KB cells can point at prose elsewhere on the KB page ("Blocks — see below").
  const dates = o.dates.replace(/\s*—\s*see below\.?$/i, '')
  const slot = o.slot ? ` (${o.slot})` : ''
  const price = prices(o)
  return `- ${head}${slot}: ${when}, ${o.venue}. Ages ${o.ages}.${price ? ` ${price}.` : ''} Runs: ${dates}.${STATUS_NOTE[o.status]}`
}

export async function GET() {
  const offerings = await getOfferings()
  checkOfferingPages(offerings)

  const placed = new Set<string>()
  const blocks = SECTIONS.map(({ title, match }) => {
    const pages = SITE_PAGES.filter((p) => match(p.path))
    pages.forEach((p) => placed.add(p.path))
    return `## ${title}\n\n${pages.map(line).join('\n')}`
  })
  // Anything no section claims still gets listed, so a new page is never dropped.
  const rest = SITE_PAGES.filter((p) => !placed.has(p.path))
  blocks.push(`## About and membership\n\n${rest.map(line).join('\n')}`)

  const facts = `## Session facts\n\nFrom Empowr's knowledge base, refreshed daily. Prices in GBP.\n\n${offerings.map(factLine).join('\n')}`

  return new Response(`${INTRO}\n\n${facts}\n\n${blocks.join('\n\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
