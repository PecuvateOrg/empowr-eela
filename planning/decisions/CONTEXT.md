# Decisions — ADR Log

Architectural Decision Records for Empowr Sessions.

One file per decision: `YYYY-MM-DD-decision-title.md`

## Index

| Date | Decision | Status |
|---|---|---|
| 2026-05-31 | Next.js chosen over Astro for session platform | Accepted |

---

## 2026-05-31 — Next.js chosen over Astro

**Context:** Empowr Sessions starts with 3 static pages but is planned to grow into a dynamic platform with a members section and booking system.

**Decision:** Use Next.js (App Router) rather than Astro.

**Reason:** Astro is the workspace default for content-only sites. Empowr Sessions has confirmed dynamic scope in Phase 2. Starting with Next.js avoids a framework migration when members and booking features are built.

**Status:** Accepted
