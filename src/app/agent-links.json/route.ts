import { SITE_PAGES, SITE_URL } from '@/lib/site-index'
import { getOfferings } from '@/lib/offerings'
import { OFFERING_PAGES } from '@/lib/offering-pages'
import { getLiveSessions } from '@/lib/live-sessions'

// /agent-links.json — every link the PecuvateCRM chat widget may put in an
// answer on this site, so it can send people straight to the right page
// instead of describing where to go. The CRM treats this as an allowlist: a
// link in a reply that isn't here is removed before the customer sees it.
//
// Built from the same sources as /llms.txt — the generated page index, the KB
// offerings feed and Members live state — so nothing is listed by hand. Any
// feed failure throws: at revalidation the last good file keeps being served.
export const revalidate = 3600

const url = (path: string) => (path === '/' ? SITE_URL : SITE_URL + path)
const titleOf = (path: string) => SITE_PAGES.find((p) => p.path === path)?.title ?? path

export async function GET() {
  const [offerings, live] = await Promise.all([getOfferings(), getLiveSessions()])

  // One entry per offering; the KB repeats an offering once per slot.
  const seen = new Set<string>()
  const sessions = offerings.flatMap((o) => {
    if (seen.has(o.offering)) return []
    seen.add(o.offering)
    const members = live.find((l) => l.slug === o.offering)
    const pages = OFFERING_PAGES[o.offering] ?? []
    return [
      {
        offering: o.offering,
        title: members?.title ?? (pages[0] ? titleOf(pages[0]) : o.offering),
        type: o.type,
        ages: o.ages,
        status: o.status,
        // "See the session" first (owner 2026-10-06), then "Book a date".
        see: pages.map((p) => ({ title: titleOf(p), url: url(p) })),
        book: members ? members.session_url : null,
      },
    ]
  })

  const body = {
    site: SITE_URL,
    sessions,
    pages: SITE_PAGES.map((p) => ({ title: p.title, url: url(p.path), ...(p.description ? { description: p.description } : {}) })),
  }
  return Response.json(body)
}
