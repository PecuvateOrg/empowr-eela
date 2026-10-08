'use client';

// Homepage search box. It looks and works like a search, but the question
// goes to the chat widget (ChatBubble's ASK_EVENT), which answers with
// direct links to the right page or date (owner, 2026-10-07). Analytics
// record that a search happened, never what was typed — visitors write
// children's names and ages; the text lives only in the CRM conversation.
//
// It says up front that the answer comes in the chat (chat icon, "Ask"
// button, the line under the box) — the Stripe docs "Ask AI" pattern — so the
// panel opening isn't a surprise to someone expecting a results page.
import { useState } from 'react';
import posthog from 'posthog-js';
import { Icon } from '@iconify/react';
import { ASK_EVENT } from '@/components/ChatBubble';

const EXAMPLES = [
  "Kids' sessions this weekend",
  'Beginner lessons for adults',
  'Birthday parties',
  'Holiday camps',
];

export default function SiteSearch() {
  const [text, setText] = useState('');

  function ask(question: string, example: boolean) {
    const q = question.trim();
    if (!q) return;
    posthog.capture('site_search', { source: 'home', example });
    window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: { text: q } }));
    setText('');
  }

  return (
    <div className="max-w-[560px] mx-auto mb-8">
      <p className="text-sm font-[800] text-black mb-3">Ask us anything — we&apos;ll take you there</p>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          ask(text, false);
        }}
        className="flex items-center gap-2 rounded-full border border-border bg-card pl-5 pr-1.5 py-1.5 focus-within:border-blue"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <Icon icon="mdi:chat-processing-outline" width={20} className="text-muted shrink-0" aria-hidden />
        <label htmlFor="site-search" className="sr-only">Ask us a question — the answer opens in the chat</label>
        <input
          id="site-search"
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Saturday lessons for my 8-year-old"
          maxLength={500}
          className="flex-1 min-w-0 bg-transparent text-sm text-black placeholder:text-muted outline-none py-2"
        />
        <button
          type="submit"
          className="shrink-0 bg-blue text-warm-white text-sm font-[800] px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
        >
          Ask
        </button>
      </form>
      <p className="flex items-center justify-center gap-1.5 mt-2 text-xs text-muted">
        <Icon icon="mdi:message-reply-text-outline" width={14} aria-hidden />
        We&apos;ll answer in the chat, with links straight to the right page
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {EXAMPLES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q, true)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-[700] text-mid transition-colors hover:border-blue hover:text-blue"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
