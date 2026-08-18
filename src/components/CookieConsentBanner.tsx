'use client'

import { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import { Icon } from '@iconify/react'

const CONSENT_KEY = 'eela_analytics_consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true)
      const frame = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(frame)
    }
  }, [])

  const dismiss = () => {
    setMounted(false)
    setTimeout(() => setVisible(false), 300)
  }

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    posthog.opt_in_capturing()
    dismiss()
  }

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    posthog.opt_out_capturing()
    dismiss()
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={`fixed bottom-4 left-4 right-4 z-[60] sm:left-6 sm:right-auto sm:max-w-md rounded-[20px] border border-border bg-warm-white p-5 transition-all duration-300 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blue-pale">
          <Icon icon="mdi:cookie-outline" width={18} className="text-blue" />
        </span>
        <div>
          <p className="text-[15px] font-[900] text-black leading-snug mb-1">A quick word on cookies</p>
          <p className="text-[13px] text-mid leading-relaxed">
            We count visits privately by default — no cookies needed. Accepting lets us remember you across visits.{' '}
            <a
              href="https://empowrcic.org/legal/cookie-policy?utm_source=empowr-eela&utm_medium=internal"
              target="_blank"
              rel="noopener"
              className="text-blue underline underline-offset-2 hover:text-blue-dark"
            >
              Cookie Policy
            </a>
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDecline}
          className="flex-1 px-4 py-2.5 text-[13px] font-[800] rounded-full border border-border text-mid hover:bg-cream transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 px-4 py-2.5 text-[13px] font-[800] rounded-full bg-blue text-warm-white hover:opacity-90 transition-opacity"
          style={{ boxShadow: 'var(--shadow-blue)' }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
