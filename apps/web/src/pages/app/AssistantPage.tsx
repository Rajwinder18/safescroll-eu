import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import type { AiChatMessage } from '@safescroll/shared-types';
import { Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const suggestions = [
  'Explain GDPR Article 8 in plain language',
  'What does the DSA say about protecting minors?',
  'Suggest a gentle digital detox challenge',
  'How can I improve sleep with fewer late-night scrolls?',
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.ai.getHistory().then((r) => setMessages(r.data || []));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');
    setLoading(true);
    const res = await api.ai.send(trimmed);
    setMessages(res.data || []);
    setLoading(false);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">AI wellbeing assistant</p>
          <h1 className="mt-2 text-3xl font-bold">Ask Safe Scroll</h1>
          <p className="mt-2 text-sm text-slate-500">
            Mock assistant for development. Does not diagnose medical or mental health conditions.
            Policy answers include source references when available. AI keys stay server-side later.
          </p>
        </div>
        <TourHelpButton />
      </header>

      <div className="flex flex-wrap gap-2" data-tour="assistant-suggestions">
        {suggestions.map((s) => (
          <button key={s} type="button" className="ss-btn-secondary !text-xs" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="ss-card flex h-[28rem] flex-col" data-tour="assistant-chat">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-400">Ask about wellbeing habits, EU policies, or challenges.</p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.role === 'user'
                    ? 'ml-auto bg-brand-electric text-white'
                    : 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                {m.sources?.length ? (
                  <ul className="mt-2 space-y-1 text-xs opacity-90">
                    {m.sources.map((s) => (
                      <li key={s.title}>
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noreferrer" className="underline">
                            {s.title}
                          </a>
                        ) : (
                          s.title
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))
          )}
          {loading ? (
            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm dark:bg-white/10">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <form
          className="mt-3 flex gap-2 border-t border-slate-100 pt-3 dark:border-white/10"
          data-tour="assistant-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            className="ss-input"
            value={input}
            placeholder="Ask a question…"
            onChange={(e) => setInput(e.target.value)}
            aria-label="Message"
          />
          <button type="submit" className="ss-btn-primary" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <button
        type="button"
        className="ss-btn-secondary self-start"
        onClick={async () => {
          await api.ai.clear();
          setMessages([]);
        }}
      >
        Clear conversation
      </button>
    </div>
  );
}
