import { api } from '@safescroll/api-client';
import type { AdminAuditLog, PolicyRecord } from '@safescroll/shared-types';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'overview' | 'policies' | 'users' | 'audit'>('overview');
  const [overview, setOverview] = useState<{
    users: number;
    policies: number;
    quizAttempts: number;
    mindfulSessions: number;
  } | null>(null);
  const [policies, setPolicies] = useState<PolicyRecord[]>([]);
  const [users, setUsers] = useState<
    { id: string; email: string; displayName: string; role: string; countryCode: string }[]
  >([]);
  const [audit, setAudit] = useState<AdminAuditLog[]>([]);
  const [draft, setDraft] = useState({
    countryCode: 'FR',
    title: '',
    status: 'proposed' as PolicyRecord['status'],
    summary: '',
    sourceUrl: 'https://example.com/source-placeholder',
  });
  const [error, setError] = useState('');

  const reload = async () => {
    const [o, p, u, a] = await Promise.all([
      api.admin.overview(),
      api.policy.listAdminPolicies(),
      api.admin.listUsers(),
      api.admin.auditLogs(),
    ]);
    setOverview(o.data);
    setPolicies(p.data || []);
    setUsers(u.data || []);
    setAudit(a.data || []);
  };

  useEffect(() => {
    reload();
  }, []);

  // UI gate only — real privileges require backend RLS after Supabase is connected.
  if (user?.role !== 'admin') {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <header>
        <p className="ss-kicker">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-200">
          Demo CRUD with local mock data. Not production authority.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(['overview', 'policies', 'users', 'audit'] as const).map((t) => (
          <button key={t} type="button" className={tab === t ? 'ss-btn-primary' : 'ss-btn-secondary'} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && overview ? (
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Users (demo)" value={overview.users} />
          <Stat label="Policies" value={overview.policies} />
          <Stat label="Quiz attempts" value={overview.quizAttempts} />
          <Stat label="Mindful sessions" value={overview.mindfulSessions} />
        </div>
      ) : null}

      {tab === 'policies' ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="ss-card space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setError('');
              if (draft.title.trim().length < 3 || draft.summary.trim().length < 10) {
                setError('Title and summary are required.');
                return;
              }
              await api.policy.saveAdminPolicy({
                id: `policy-${Date.now()}`,
                ...draft,
                updatedAt: new Date().toISOString(),
              });
              setDraft({
                countryCode: 'FR',
                title: '',
                status: 'proposed',
                summary: '',
                sourceUrl: 'https://example.com/source-placeholder',
              });
              await reload();
            }}
          >
            <h2 className="font-semibold">Create / update policy</h2>
            <input className="ss-input" placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            <textarea className="ss-input min-h-[100px]" placeholder="Summary" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
            <input className="ss-input" placeholder="Source URL" value={draft.sourceUrl} onChange={(e) => setDraft({ ...draft, sourceUrl: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <input className="ss-input" value={draft.countryCode} onChange={(e) => setDraft({ ...draft, countryCode: e.target.value })} />
              <select className="ss-input" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as PolicyRecord['status'] })}>
                <option value="in_force">In force</option>
                <option value="proposed">Proposed</option>
                <option value="guidance">Guidance</option>
                <option value="pilot">Pilot</option>
                <option value="active">Active</option>
                <option value="initiative">Initiative</option>
              </select>
            </div>
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            <button type="submit" className="ss-btn-primary">Save policy</button>
          </form>

          <div className="space-y-3">
            {policies.map((p) => (
              <article key={p.id} className="ss-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {p.countryCode} · {p.status}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{p.summary}</p>
                  </div>
                  <button
                    type="button"
                    className="ss-btn-secondary !py-1.5"
                    onClick={async () => {
                      await api.policy.deleteAdminPolicy(p.id);
                      await reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {tab === 'users' ? (
        <div className="ss-card overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2">Country</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 dark:border-white/5">
                  <td className="py-2 pr-4">{u.displayName}</td>
                  <td className="py-2 pr-4">{u.email}</td>
                  <td className="py-2 pr-4">{u.role}</td>
                  <td className="py-2">{u.countryCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {tab === 'audit' ? (
        <div className="ss-card space-y-2">
          {audit.length === 0 ? (
            <p className="text-sm text-slate-500">No audit events yet. Save or delete a policy to create one.</p>
          ) : (
            audit.map((a) => (
              <div key={a.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-white/5">
                <span className="font-medium">{a.action}</span> · {a.target} · {a.actor} ·{' '}
                {new Date(a.createdAt).toLocaleString()}
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="ss-card">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
