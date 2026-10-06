'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'
import { CONSENT_DECIDED_EVENT, CONSENT_KEY } from '@/components/CookieConsentBanner'

const WIDGET_URL = 'https://crm.pecuvate.com/widget'

// Larger screens: the panel opens on its own shortly after the page settles,
// so it reads as a proactive greeting rather than a cold empty bubble.
const AUTO_OPEN_DELAY_MS = 1500

// Phones (narrower than 640px, Tailwind's sm): the open panel covers most of
// the screen, so it stays closed and a small "ask me anything" greeting
// appears beside the button instead, with one wiggle (owner, 2026-10-06).
// Once per visit: dismissing or opening the chat hides it for the session.
const PHONE_QUERY = '(max-width: 639px)'
const TEASER_DELAY_MS = 3000
const TEASER_SEEN_KEY = 'eela_chat_teaser_seen'

interface Props {
  orgSlug: string
}

function seenThisVisit() {
  try {
    return sessionStorage.getItem(TEASER_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function consentDecided() {
  try {
    return localStorage.getItem(CONSENT_KEY) !== null
  } catch {
    return true // storage blocked: the banner can't record a choice either
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(TEASER_SEEN_KEY, '1')
  } catch {
    /* storage blocked: the greeting may show again next page, no harm */
  }
}

export default function ChatBubble({ orgSlug }: Props) {
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)

  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY).matches
    if (!phone) {
      const timer = setTimeout(() => {
        setOpen(true)
        posthog.capture('chat_open', { source: 'auto' })
      }, AUTO_OPEN_DELAY_MS)
      return () => clearTimeout(timer)
    }
    if (seenThisVisit()) return
    // On a first visit the cookie banner covers the bottom of a phone screen,
    // greeting and button included — so wait until it has been answered.
    let timer: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      timer = setTimeout(() => {
        setTeaser(true)
        markSeen()
        posthog.capture('chat_teaser_shown')
      }, TEASER_DELAY_MS)
    }
    if (consentDecided()) start()
    else window.addEventListener(CONSENT_DECIDED_EVENT, start, { once: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener(CONSENT_DECIDED_EVENT, start)
    }
  }, [])

  function openChat(source: 'button' | 'teaser') {
    setTeaser(false)
    markSeen()
    setOpen(o => {
      if (!o) posthog.capture('chat_open', { source })
      return !o
    })
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
          src={`${WIDGET_URL}?org=${orgSlug}`}
          className="w-full h-full border-0"
          title="Chat with Empowr"
        />
      </div>

      {teaser && !open && (
        <div className="chat-teaser fixed bottom-[5.25rem] right-4 z-50 max-w-[240px] flex items-start gap-1 rounded-2xl rounded-br-sm bg-white border border-border shadow-lg pl-4 pr-1 py-3">
          <button type="button" onClick={() => openChat('teaser')} className="text-left text-sm leading-snug text-black">
            <span className="font-[800]">👋 Hi! Ask me anything</span>
            <br />
            <span className="text-mid">Dates, prices, which class suits you</span>
          </button>
          <button
            type="button"
            onClick={() => setTeaser(false)}
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
          teaser && !open ? 'chat-wiggle' : ''
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
