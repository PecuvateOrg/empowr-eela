export default function Footer() {
  return (
    <footer className="bg-black text-warm-white">
      <div className="max-w-[880px] mx-auto px-5 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          <div>
            <p className="font-[900] text-white text-[1rem] mb-2 tracking-tight">
              Empowr CIC
            </p>
            <p className="text-[12px] text-muted leading-[1.7]">
              Community Interest Company promoting lifelong wellbeing through roller skating
              and experiential learning.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-[800] uppercase tracking-[0.2em] text-white mb-4">
              Contact
            </p>
            <a
              href="mailto:general@empowrcic.org"
              className="text-[13px] text-muted hover:text-white transition-colors no-underline block"
            >
              general@empowrcic.org
            </a>
          </div>

          <div>
            <p className="text-[11px] font-[800] uppercase tracking-[0.2em] text-white mb-4">
              Legal
            </p>
            <a
              href="https://waiver.empowrcic.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-muted hover:text-white transition-colors no-underline block"
            >
              Waiver Form
            </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-[12px] text-muted space-y-1">
          <p>
            Empowr CIC. Registered in England and Wales. Company number: 13660924.
          </p>
          <p>Crown House, 27 Old Gloucester Street, London, WC1N 3AX.</p>
          <p className="mt-3">
            © {new Date().getFullYear()} Empowr CIC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
