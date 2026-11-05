import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import type { PreventionChecklist } from '@safescroll/shared-types';
import { useEffect, useState } from 'react';

export default function DigitalSafetyPage() {
  const [lists, setLists] = useState<PreventionChecklist[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const [l, p] = await Promise.all([
        api.checklist.getChecklists(),
        api.checklist.getProgress(),
      ]);
      setLists(l.data || []);
      setChecked(p.data || {});
    })();
  }, []);

  const toggle = async (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    await api.checklist.setProgress(next);
  };

  const markAll = async (list: PreventionChecklist) => {
    const next = { ...checked };
    list.items.forEach((item) => {
      next[item.id] = true;
    });
    setChecked(next);
    await api.checklist.setProgress(next);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Digital safety</p>
          <h1 className="mt-2 text-3xl font-bold">Action checklists</h1>
          <p className="mt-2 text-sm text-slate-500">
            Practical steps for parents, teens, schools, and platforms. Progress saves locally in demo mode.
          </p>
        </div>
        <TourHelpButton />
      </header>

      <div className="space-y-4" data-tour="safety-checklists">
        {lists.map((list) => (
          <section key={list.category} className="ss-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{list.title}</h2>
              <button type="button" className="ss-btn-secondary !py-1.5" onClick={() => markAll(list)}>
                Mark all done
              </button>
            </div>
            <ul className="mt-4 space-y-3" data-tour="safety-items">
              {list.items.map((item) => (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-brand-electric"
                      checked={Boolean(checked[item.id])}
                      onChange={() => toggle(item.id)}
                    />
                    <span className={checked[item.id] ? 'text-slate-400 line-through' : ''}>
                      {item.text}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
