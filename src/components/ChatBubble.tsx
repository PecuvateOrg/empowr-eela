'use client'

import { useState } from 'react'

const WIDGET_URL = 'https://crm.pecuvate.com/widget'

interface Props {
  orgSlug: string
}

export default function ChatBubble({ orgSlug }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[360px] h-[560px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <iframe
            src={`${WIDGET_URL}?org=${orgSlug}`}
            className="w-full h-full border-0"
            title="Chat with Empowr"
          />
        </div>
      )}

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
