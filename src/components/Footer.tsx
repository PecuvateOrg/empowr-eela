export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[880px] mx-auto px-5 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          <div>
            <p className="text-sm font-[900] text-black mb-2">Empowr CIC</p>
            <p className="text-[12px] text-muted leading-[1.7]">
              Community Interest Company promoting lifelong wellbeing through roller skating
              and experiential learning.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted mb-3">
              Contact
            </p>
            <a
              href="mailto:general@empowrcic.org"
              className="text-[12px] text-blue no-underline hover:underline block"
            >
              general@empowrcic.org
            </a>
          </div>

          <div>
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted mb-3">
              Legal
            </p>
            <a
              href="https://waiver.empowrcic.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-blue no-underline hover:underline block"
            >
              Waiver Form
            </a>
          </div>

        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted">
            © {new Date().getFullYear()} Empowr CIC. All rights reserved.
          </p>
          <p className="text-[11px] text-muted">
            Registered Community Interest Company · England &amp; Wales
          </p>
        </div>
      </div>
    </footer>
  );
}
