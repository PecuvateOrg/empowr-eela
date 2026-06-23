'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLink = (href: string, label: string) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={`text-[13px] sm:text-sm font-800 transition-colors px-3 py-2 rounded-full ${
          active
            ? 'text-blue bg-blue-pale'
            : 'text-mid hover:text-blue hover:bg-blue-pale'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-[1100px] mx-auto px-5 py-3 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Empowr CIC"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {navLink('/kids-space', 'Kids Space')}
          {navLink('/adults', 'Adults')}
          {/* About link — hidden until team reviews; accessible at /about */}
        </div>
      </nav>
    </header>
  )
}
