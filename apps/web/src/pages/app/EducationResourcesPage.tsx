import { Link } from 'react-router-dom';

const links = [
  { to: '/app/learn/policies', title: 'EU policy hub', body: 'Timeline, status labels, and country notes.' },
  { to: '/app/learn/quiz', title: 'Safety quiz', body: 'Ten interactive questions with explanations.' },
  { to: '/app/learn/research', title: 'Research library', body: 'Official and research source links.' },
  { to: '/app/learn/health', title: 'Health impact matrix', body: 'Educational exposure categories.' },
];

export default function EducationResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6" data-tour="page-root">
      <header>
        <p className="ss-kicker">Educational resources</p>
        <h1 className="mt-2 text-3xl font-bold">Learning paths for classrooms & homes</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="ss-card transition hover:shadow-glow">
            <h2 className="font-semibold">{l.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{l.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
