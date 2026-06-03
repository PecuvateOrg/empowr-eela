import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
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
          <Link
            href="/kids-space"
            className="text-[13px] sm:text-sm font-800 text-mid hover:text-blue transition-colors px-3 py-2 rounded-full hover:bg-blue-pale"
          >
            Kids Space
          </Link>
          <Link
            href="/adults"
            className="text-[13px] sm:text-sm font-800 text-mid hover:text-blue transition-colors px-3 py-2 rounded-full hover:bg-blue-pale"
          >
            Adults
          </Link>
          {/* About link — hidden until team reviews; accessible at /about */}
        </div>
      </nav>
    </header>
  );
}
