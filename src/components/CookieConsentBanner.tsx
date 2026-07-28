'use client'

import { useState, useEffect } from 'react'
import posthog from 'posthog-js'

const CONSENT_KEY = 'eela_analytics_consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    posthog.opt_in_capturing()
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    posthog.opt_out_capturing()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-warm-white border-t border-border shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-mid leading-relaxed">
          We use cookies to improve your experience and remember your preferences.{' '}
          <a
            href="https://empowrcic.org/legal/cookie-policy"
            target="_blank"
            rel="noopener"
            className="text-blue underline underline-offset-2 hover:text-blue-dark"
          >
            Cookie Policy
          </a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-lg border border-border text-mid hover:bg-cream transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-lg bg-blue text-white hover:bg-blue-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
