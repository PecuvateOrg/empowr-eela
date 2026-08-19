"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Same backend as EnquiryModal.tsx — see that file's header comment for the
// full explanation of the cross-origin setup and the www-vs-apex gotcha.
const CONTACT_ENDPOINT = "https://www.empowrcic.org/.netlify/functions/contact";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue/30 transition-colors";

const narrowInputClass = inputClass.replace("w-full", "w-[180px]");

const INCLUSION_OPTIONS = [
  "Skate DJ",
  "Skate Marshals",
  "Skate Coaches",
  "Speaker & personalised playlist",
  "Event security",
  "Roller skate hire",
  "Protective gear hire",
];

function formatDateForMessage(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CustomEventEnquiryModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [minDate, setMinDate] = useState("");
  const [inclusions, setInclusions] = useState<string[]>([]);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

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
    setInclusions([]);
  }

  function toggleInclusion(option: string) {
    setInclusions((prev) =>
      prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const preferredDate = (form.elements.namedItem("preferredDate") as HTMLInputElement).value;
    const attendeeCount = (form.elements.namedItem("attendeeCount") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const budget = (form.elements.namedItem("budget") as HTMLInputElement).value.trim();
    const extraQuestions = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const message = [
      `Preferred date: ${formatDateForMessage(preferredDate)}`,
      `Attendee count: ${attendeeCount}`,
      `Location: ${location}`,
      `Budget: ${budget || "Not specified"}`,
      `Desired inclusions: ${inclusions.length ? inclusions.join(", ") : "None specified"}`,
      extraQuestions ? `\nExtra questions:\n${extraQuestions}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: "Private Booking Enquiry — Custom Event",
      message,
      // Honeypot — real users leave this blank; bots fill it in.
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      source: "eela-custom-event",
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
        className="inline-block bg-white text-blue text-sm font-[800] px-8 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
      >
        Enquire for a quote &rsaquo;
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Custom event enquiry form"
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
                <h2 className="text-lg font-[900] text-black mb-1">Enquire for a quote</h2>

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
                  <label htmlFor="preferredDate" className="block text-sm font-semibold text-black mb-1.5">
                    Preferred date
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    min={minDate}
                    className={narrowInputClass}
                  />
                </div>

                <div>
                  <label htmlFor="attendeeCount" className="block text-sm font-semibold text-black mb-1.5">
                    Attendee count
                  </label>
                  <input
                    id="attendeeCount"
                    name="attendeeCount"
                    type="number"
                    required
                    min={1}
                    className={narrowInputClass}
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-black mb-1.5">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. The Ladywell Centre, or your own venue"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-black mb-1.5">
                    Budget <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input id="budget" name="budget" type="text" className={inputClass} />
                </div>

                <div>
                  <p className="block text-sm font-semibold text-black mb-1.5">
                    Desired inclusions <span className="font-normal text-muted">(optional)</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INCLUSION_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-mid rounded-xl border border-border px-3 py-2 cursor-pointer hover:bg-blue-pale/40 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={inclusions.includes(option)}
                          onChange={() => toggleInclusion(option)}
                          className="accent-blue"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-1.5">
                    Extra questions <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
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
