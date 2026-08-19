"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Submits into the exact same backend as Main Site's own contact form
// (empowrcic.org/contact) — same Netlify Function, same CRM routing,
// same spam protection, same confirmation email. Requires a matching
// CORS allow-list entry for this origin on that function (Main Site's
// src/netlify/functions/contact.ts).
//
// Uses the `www` host directly, not the apex `empowrcic.org` — the apex
// 308-redirects to `www`, and browsers treat a redirected CORS preflight
// (OPTIONS) as a hard failure rather than following it, even though the
// final destination has the right headers. Hitting `www` skips that hop.
const CONTACT_ENDPOINT = "https://www.empowrcic.org/.netlify/functions/contact";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue/30 transition-colors";

type EnquiryModalProps = {
  /** Sent to the backend as the enquiry's fixed subject line. */
  subject: string;
  /** Prefilled into the message textarea — the visitor edits it before sending. */
  defaultMessage?: string;
  /** Attribution tag so the team can see which page an enquiry came from. */
  source: string;
  /** Text on the button that opens the modal. */
  triggerLabel?: string;
  triggerClassName?: string;
};

export default function EnquiryModal({
  subject,
  defaultMessage = "",
  source,
  triggerLabel = "Enquire to book",
  triggerClassName,
}: EnquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeAndReset() {
    setOpen(false);
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // Honeypot — real users leave this blank; bots fill it in.
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      source,
    };

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Non-OK response");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerClassName ??
          "inline-block bg-white text-blue text-sm font-[800] px-8 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
        }
      >
        {triggerLabel} &rsaquo;
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Enquiry form"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={closeAndReset}
            className="absolute inset-0 bg-black/50"
          />

          <div
            className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-card p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <button
              type="button"
              onClick={closeAndReset}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted hover:text-black transition-colors"
            >
              <Icon icon="mdi:close" width={22} />
            </button>

            {status === "success" ? (
              <div className="pt-4">
                <p className="text-xl font-[900] text-black mb-2">Message sent</p>
                <p className="text-sm text-mid leading-[1.7]">
                  Thanks for getting in touch. We&apos;ll get back to you within 2 working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <h2 className="text-lg font-[900] text-black mb-1">{triggerLabel}</h2>

                {/* Honeypot — hidden from users, catches bots. Do not remove. */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                >
                  <label htmlFor="company">Company (leave this blank)</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black mb-1.5">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-1.5">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    defaultValue={defaultMessage}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red">
                    Something went wrong — please try again or email us directly at{" "}
                    <a href="mailto:enquiries@empowrcic.org" className="underline">
                      enquiries@empowrcic.org
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-blue text-white font-[800] text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
