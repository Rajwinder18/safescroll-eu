import { preventionChecklists } from '@safescroll/policy-content';
import { Link } from 'react-router-dom';

export default function ParentResourcesPage() {
  const parents = preventionChecklists.find((c) => c.category === 'parents');

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-tour="page-root">
      <header>
        <p className="ss-kicker">Parent resources</p>
        <h1 className="mt-2 text-3xl font-bold">Guidance for caregivers</h1>
        <p className="mt-2 text-sm text-slate-500">
          Open conversations and clear agreements work better than covert surveillance.
        </p>
      </header>
      <section className="ss-card">
        <h2 className="font-semibold">{parents?.title}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {parents?.items.map((i) => (
            <li key={i.id}>{i.text}</li>
          ))}
        </ul>
        <Link to="/app/learn/safety" className="ss-btn-primary mt-5 inline-flex">
          Open full checklists
        </Link>
      </section>
    </div>
  );
}
