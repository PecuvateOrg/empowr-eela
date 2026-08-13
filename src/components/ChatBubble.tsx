'use client'

import { useEffect, useState } from 'react'

const WIDGET_URL = 'https://crm.pecuvate.com/widget'

// Opens on its own shortly after the page settles, so it reads as a proactive
// greeting rather than a cold empty bubble waiting to be clicked. The delay
// lets the page render first so the panel doesn't compete with page load.
const AUTO_OPEN_DELAY_MS = 1500

interface Props {
  orgSlug: string
}

export default function ChatBubble({ orgSlug }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

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

      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-[#1a1a2e] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
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
