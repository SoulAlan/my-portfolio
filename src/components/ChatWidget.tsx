'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries';
import type { Locale } from '@/content/site';

interface ChatWidgetProps {
  locale: Locale;
  t: Dictionary['chat'];
  email: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ locale, t, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [failed, setFailed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || isStreaming) return;

    const history: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setFailed(false);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', content: answer }]);
      }
    } catch {
      setMessages(history.slice(0, -1));
      setInput(text);
      setFailed(true);
    } finally {
      setIsStreaming(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="floating-ui fixed bottom-6 right-6 z-50 flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
      >
        <Sparkles size={18} aria-hidden />
        {t.open}
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 flex flex-col max-h-[80vh] rounded-2xl overflow-hidden border border-orange-500/30 bg-gray-900 text-white shadow-2xl"
      onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
    >
      <header className="flex items-start justify-between gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div>
          <h2 className="font-semibold flex items-center gap-2">
            <MessageCircle size={18} aria-hidden />
            {t.title}
          </h2>
          <p className="text-xs text-white/85">{t.subtitle}</p>
        </div>
        <button type="button" onClick={() => setIsOpen(false)} aria-label={t.close} className="p-1 rounded hover:bg-white/20">
          <X size={18} aria-hidden />
        </button>
      </header>

      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-sm" aria-live="polite">
        <p className="p-3 rounded-lg bg-gray-800 text-gray-200">{t.greeting}</p>

        {messages.length === 0 && (
          <div className="flex flex-col gap-2">
            {t.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="text-left px-3 py-2 rounded-lg border border-orange-500/30 text-orange-300 hover:bg-orange-500/10"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <p
            key={i}
            className={`p-3 rounded-lg whitespace-pre-wrap ${m.role === 'user' ? 'ml-8 bg-orange-500/20 text-orange-50' : 'mr-4 bg-gray-800 text-gray-200'}`}
          >
            {m.content || <span className="inline-block animate-pulse">…</span>}
          </p>
        ))}

        {failed && (
          <p className="p-3 rounded-lg bg-red-500/10 text-red-300">
            {t.error} <a className="underline" href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2 p-3 border-t border-gray-800"
      >
        <label htmlFor="chat-input" className="sr-only">{t.placeholder}</label>
        <input
          ref={inputRef}
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder={t.placeholder}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label={t.send}
          className="px-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
        >
          <Send size={18} aria-hidden />
        </button>
      </form>
      <p className="px-4 pb-3 text-[11px] text-gray-500">{t.disclaimer}</p>
    </div>
  );
};

export default ChatWidget;
