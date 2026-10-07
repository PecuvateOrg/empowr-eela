'use client'

import { useEffect, useRef, useState } from 'react'
import posthog from 'posthog-js'
import { CONSENT_DECIDED_EVENT, CONSENT_KEY } from '@/components/CookieConsentBanner'

const WIDGET_ORIGIN = 'https://crm.pecuvate.com'
const WIDGET_URL = `${WIDGET_ORIGIN}/widget`

// The search box (SiteSearch) dispatches this with { text }: the panel opens
// and the question goes to the widget as the visitor's message (owner,
// 2026-10-07). The widget says "ready" when loaded and "asked" when it took
// the question; with no "asked" in ASK_FALLBACK_MS the visitor goes to the
// session finder instead, so the box never does nothing.
export const ASK_EVENT = 'eela:ask'
const ASK_FALLBACK_MS = 4000

// Larger screens: the panel opens on its own shortly after the page settles,
// so it reads as a proactive greeting rather than a cold empty bubble.
const AUTO_OPEN_DELAY_MS = 1500

// Phones (narrower than 640px, Tailwind's sm): the open panel covers most of
// the screen, so it stays closed and a small greeting appears beside the
// button instead, with one wiggle (owner, 2026-10-06):
// - "hello": 3s after the cookie banner is answered, once per visit.
// - "nudge" ("Still looking?"): at most once more per visit, after 5+ minutes
//   on the site without opening the chat, when the visitor pauses (20s with no
//   scroll or tap) or comes back to the tab after a minute away.
// Never again once the chat has been opened or a greeting dismissed with ✕.
const PHONE_QUERY = '(max-width: 639px)'
const TEASER_DELAY_MS = 3000
const NUDGE_AFTER_MS = 5 * 60_000
const NUDGE_PAUSE_MS = 20_000
const AWAY_MS = 60_000
// A greeting leaves on its own after this; that is not a "no thanks".
const TEASER_VISIBLE_MS = 15_000
// Preview builds only (never on the live domain): ?nudgeTest shortens the
// waits to 30s on site / 5s pause so the nudge can be tried by hand.
const LIVE_HOST = 'eela.empowrcic.org'

// Per-visit state, shared across pages.
const KEY = {
  hello: 'eela_chat_teaser_seen',
  nudge: 'eela_chat_nudge_seen',
  stop: 'eela_chat_teaser_stop', // opened the chat or tapped ✕
  start: 'eela_visit_started',
}

type Kind = 'hello' | 'nudge'

const TEXT: Record<Kind, [string, string]> = {
  hello: ['👋 Hi! Ask me anything', 'Dates, prices, which class suits you'],
  nudge: ['🛼 Still looking?', 'I can find a session for you'],
}

interface Props {
  orgSlug: string
}

function get(key: string) {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function set(key: string, value = '1') {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    /* storage blocked: a greeting may repeat on the next page, no harm */
  }
}

function consentDecided() {
  try {
    return localStorage.getItem(CONSENT_KEY) !== null
  } catch {
    return true // storage blocked: the banner can't record a choice either
  }
}

export default function ChatBubble({ orgSlug }: Props) {
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState<Kind | null>(null)

  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY).matches
    if (!phone) {
      const timer = setTimeout(() => {
        setOpen(true)
        posthog.capture('chat_open', { source: 'auto' })
      }, AUTO_OPEN_DELAY_MS)
      return () => clearTimeout(timer)
    }
    if (get(KEY.stop)) return

    const test = location.hostname !== LIVE_HOST && new URLSearchParams(location.search).has('nudgeTest')
    const nudgeAfter = test ? 30_000 : NUDGE_AFTER_MS
    const pause = test ? 5_000 : NUDGE_PAUSE_MS
    if (!get(KEY.start)) set(KEY.start, String(Date.now()))
    const started = Number(get(KEY.start)) || Date.now()

    const show = (kind: Kind) => {
      if (get(KEY.stop) || get(KEY[kind])) return
      set(KEY[kind])
      setTeaser(kind)
      posthog.capture('chat_teaser_shown', { kind })
    }

    // Hello. On a first visit the cookie banner covers the bottom of a phone
    // screen, greeting and button included — so wait until it is answered.
    let helloTimer: ReturnType<typeof setTimeout> | undefined
    const startHello = () => {
      helloTimer = setTimeout(() => show('hello'), TEASER_DELAY_MS)
    }
    if (!get(KEY.hello)) {
      if (consentDecided()) startHello()
      else window.addEventListener(CONSENT_DECIDED_EVENT, startHello, { once: true })
    }

    // Nudge: a pause after long enough on the site, or a return to the tab.
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    let hiddenAt = 0
    const longEnough = () => Date.now() - started >= nudgeAfter
    const restartIdle = () => {
      clearTimeout(idleTimer)
      // Paused; if that's before the 5-minute mark, keep waiting until it.
      idleTimer = setTimeout(function check() {
        const wait = started + nudgeAfter - Date.now()
        if (wait > 0) idleTimer = setTimeout(check, wait)
        else if (document.visibilityState === 'visible') show('nudge')
      }, pause)
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') hiddenAt = Date.now()
      else if (hiddenAt && Date.now() - hiddenAt >= AWAY_MS && longEnough()) show('nudge')
    }
    const activity = ['scroll', 'touchstart', 'pointerdown', 'keydown'] as const
    if (!get(KEY.nudge)) {
      activity.forEach((e) => window.addEventListener(e, restartIdle, { passive: true }))
      document.addEventListener('visibilitychange', onVisibility)
      restartIdle()
    }

    return () => {
      clearTimeout(helloTimer)
      clearTimeout(idleTimer)
      window.removeEventListener(CONSENT_DECIDED_EVENT, startHello)
      activity.forEach((e) => window.removeEventListener(e, restartIdle))
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!teaser) return
    const t = setTimeout(() => setTeaser(null), TEASER_VISIBLE_MS)
    return () => clearTimeout(t)
  }, [teaser])

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetReady = useRef(false)
  const pendingAsk = useRef<string | null>(null)
  const fallback = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    // Target the widget's origin, never '*': the text can hold a child's name.
    function flush() {
      const text = pendingAsk.current
      if (text === null || !widgetReady.current) return
      pendingAsk.current = null
      iframeRef.current?.contentWindow?.postMessage({ type: 'pecuvate-widget:ask', text }, WIDGET_ORIGIN)
    }
    function onWidget(event: MessageEvent) {
      if (event.origin !== WIDGET_ORIGIN || event.source !== iframeRef.current?.contentWindow) return
      const type = (event.data as { type?: unknown } | null)?.type
      if (type === 'pecuvate-widget:ready') {
        widgetReady.current = true
        flush()
      } else if (type === 'pecuvate-widget:asked') {
        clearTimeout(fallback.current)
      }
    }
    function onAsk(event: Event) {
      const text = (event as CustomEvent<{ text: string }>).detail?.text?.trim()
      if (!text) return
      setTeaser(null)
      set(KEY.stop)
      setOpen(o => {
        if (!o) posthog.capture('chat_open', { source: 'search' })
        return true
      })
      pendingAsk.current = text
      clearTimeout(fallback.current)
      fallback.current = setTimeout(() => {
        posthog.capture('site_search_fallback')
        window.location.assign('/find-a-session')
      }, ASK_FALLBACK_MS)
      flush()
    }
    window.addEventListener('message', onWidget)
    window.addEventListener(ASK_EVENT, onAsk)
    return () => {
      window.removeEventListener('message', onWidget)
      window.removeEventListener(ASK_EVENT, onAsk)
      clearTimeout(fallback.current)
    }
  }, [])

  function openChat(source: 'button' | 'teaser') {
    if (source === 'teaser') posthog.capture('chat_teaser_tapped', { kind: teaser })
    setTeaser(null)
    set(KEY.stop)
    setOpen(o => {
      if (!o) posthog.capture('chat_open', { source })
      return !o
    })
  }

  function dismiss() {
    posthog.capture('chat_teaser_dismissed', { kind: teaser })
    setTeaser(null)
    set(KEY.stop)
  }

  return (
    <>
      <div
        className={`fixed bottom-20 right-4 z-50 w-[min(360px,calc(100vw-2rem))] h-[560px] max-h-[calc(100vh-7rem)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-200 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <iframe
          ref={iframeRef}
          src={`${WIDGET_URL}?org=${orgSlug}`}
          className="w-full h-full border-0"
          title="Chat with Empowr"
        />
      </div>

      {teaser !== null && !open && (
        <div className="chat-teaser fixed bottom-[5.25rem] right-4 z-50 max-w-[240px] flex items-start gap-1 rounded-2xl rounded-br-sm bg-white border border-border shadow-lg pl-4 pr-1 py-3">
          <button type="button" onClick={() => openChat('teaser')} className="text-left text-sm leading-snug text-black">
            <span className="font-[800]">{TEXT[teaser][0]}</span>
            <br />
            <span className="text-mid">{TEXT[teaser][1]}</span>
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="shrink-0 w-8 h-8 -mt-1 flex items-center justify-center rounded-full text-mid hover:text-black"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      )}

      <button
        onClick={() => openChat('button')}
        className={`fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-[#1a1a2e] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform ${
          teaser !== null && !open ? 'chat-wiggle' : ''
        }`}
        aria-label={open ? 'Close chat' : 'Chat with us'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </>
  )
}
