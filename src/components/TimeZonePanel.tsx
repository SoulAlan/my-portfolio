'use client';

import React, { useEffect, useState } from 'react';
import { Clock, X } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries';
import { site, type Locale } from '@/content/site';

interface TimeZonePanelProps {
  locale: Locale;
  t: Dictionary['time'];
  isDarkMode: boolean;
}

// One panel for every screen size: always visible on desktop, behind a
// toggle on mobile. Times render only after mount to avoid hydration
// mismatches between server and browser clocks.
const TimeZonePanel: React.FC<TimeZonePanelProps> = ({ locale, t, isDarkMode }) => {
  const [now, setNow] = useState<Date | null>(null);
  const [visitorZone, setVisitorZone] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setVisitorZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const format = (timeZone?: string) =>
    now?.toLocaleTimeString(locale === 'es' ? 'es-GT' : 'en-US', { timeZone, hour: '2-digit', minute: '2-digit' }) ?? '--:--';

  const sameZone = visitorZone === site.timezone;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.title}
        aria-expanded={isOpen}
        className={`floating-ui lg:hidden fixed top-6 left-4 z-40 p-3 rounded-full shadow-lg transition-transform hover:scale-110 ${isOpen ? 'invisible' : ''} ${isDarkMode ? 'bg-gray-800 text-orange-400' : 'bg-white text-orange-500'}`}
      >
        <Clock size={20} />
      </button>

      <aside
        aria-label={t.title}
        className={`floating-ui ${isOpen ? 'block' : 'hidden'} lg:block fixed top-6 left-4 lg:left-6 z-40 p-4 rounded-lg max-w-xs backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90 shadow-lg'}`}
      >
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="font-semibold text-sm text-orange-500">{t.title}</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={t.close}
            className={`lg:hidden p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <dl className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-orange-400" aria-hidden />
            <div>
              <dt className="text-xs text-gray-400">{t.mine}</dt>
              <dd>{format(site.timezone)}</dd>
            </div>
          </div>
          {sameZone ? (
            <p className="text-xs text-green-400">{t.same}</p>
          ) : (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-400" aria-hidden />
              <div>
                <dt className="text-xs text-gray-400">{t.yours}</dt>
                <dd>{format()}</dd>
              </div>
            </div>
          )}
        </dl>
      </aside>
    </>
  );
};

export default TimeZonePanel;
