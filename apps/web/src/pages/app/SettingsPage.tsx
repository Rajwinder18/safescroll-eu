import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import type { UserPreferences } from '@safescroll/shared-types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function SettingsPage() {
  const { section } = useParams();
  const { user, updateProfile, signOut } = useAuth();
  const { preferences, savePreferences, setTheme, theme } = useTheme();
  const [name, setName] = useState(user?.displayName || '');
  const [prefs, setPrefs] = useState<UserPreferences | null>(preferences);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    setPrefs(preferences);
  }, [preferences]);

  useEffect(() => {
    setName(user?.displayName || '');
  }, [user]);

  if (!user || !prefs) return null;

  const active = section || 'profile';

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Settings</p>
          <h1 className="mt-2 text-3xl font-bold">Account & preferences</h1>
        </div>
        <TourHelpButton />
      </header>

      <div className="flex flex-wrap gap-2" data-tour="settings-tabs">
        {[
          ['profile', 'Profile'],
          ['preferences', 'Preferences'],
          ['privacy', 'Privacy'],
          ['notifications', 'Notifications'],
          ['account', 'Account'],
        ].map(([id, label]) => (
          <Link
            key={id}
            to={`/app/settings/${id}`}
            className={active === id ? 'ss-btn-primary' : 'ss-btn-secondary'}
          >
            {label}
          </Link>
        ))}
      </div>

      {(active === 'profile' || !section) && (
        <section className="ss-card space-y-4" data-tour="profile-card">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-lavender to-brand-electric text-xl font-bold text-white">
              {user.avatarInitials}
            </div>
            <div>
              <div className="font-semibold">{user.displayName}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
            </div>
          </div>
          <div>
            <label htmlFor="displayName" className="ss-label">Display name</label>
            <input id="displayName" className="ss-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button
            type="button"
            className="ss-btn-primary"
            onClick={async () => {
              await updateProfile({ displayName: name });
              setSaved('Profile updated locally (demo).');
            }}
          >
            Save profile
          </button>
        </section>
      )}

      {active === 'preferences' && (
        <section className="ss-card space-y-4" data-tour="preferences-theme">
          <div>
            <div className="ss-label">Theme</div>
            <div className="flex flex-wrap gap-2">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={theme === t ? 'ss-btn-primary' : 'ss-btn-secondary'}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="ss-label">Max social hours goal</span>
            <input
              type="number"
              className="ss-input"
              min={0}
              max={24}
              value={prefs.wellbeingGoals.maxSocialHours}
              onChange={(e) =>
                setPrefs({
                  ...prefs,
                  wellbeingGoals: {
                    ...prefs.wellbeingGoals,
                    maxSocialHours: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <label className="block">
            <span className="ss-label">Min sleep hours goal</span>
            <input
              type="number"
              className="ss-input"
              min={0}
              max={24}
              value={prefs.wellbeingGoals.minSleepHours}
              onChange={(e) =>
                setPrefs({
                  ...prefs,
                  wellbeingGoals: {
                    ...prefs.wellbeingGoals,
                    minSleepHours: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <button
            type="button"
            className="ss-btn-primary"
            onClick={async () => {
              await savePreferences(prefs);
              setSaved('Preferences saved locally.');
            }}
          >
            Save preferences
          </button>
        </section>
      )}

      {active === 'privacy' && (
        <section className="ss-card space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="accent-brand-electric"
              checked={prefs.privacy.shareAnonymousAnalytics}
              onChange={(e) =>
                setPrefs({
                  ...prefs,
                  privacy: { ...prefs.privacy, shareAnonymousAnalytics: e.target.checked },
                })
              }
            />
            Share anonymous product analytics (demo preference)
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="accent-brand-electric"
              checked={prefs.privacy.familyVisibility}
              onChange={(e) =>
                setPrefs({
                  ...prefs,
                  privacy: { ...prefs.privacy, familyVisibility: e.target.checked },
                })
              }
            />
            Allow family visibility when consent is granted
          </label>
          <button
            type="button"
            className="ss-btn-primary"
            onClick={async () => {
              await savePreferences(prefs);
              setSaved('Privacy preferences saved.');
            }}
          >
            Save privacy
          </button>
          <button
            type="button"
            className="ss-btn-secondary"
            onClick={() => {
              const blob = new Blob([JSON.stringify({ user, prefs }, null, 2)], {
                type: 'application/json',
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'safescroll-data-export.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export my demo data
          </button>
        </section>
      )}

      {active === 'notifications' && (
        <section className="ss-card space-y-3">
          {(
            [
              ['dailyReminder', 'Daily reminder'],
              ['challengeUpdates', 'Challenge updates'],
              ['weeklySummary', 'Weekly summary'],
              ['mindfulNudges', 'Mindful nudges'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="accent-brand-electric"
                checked={prefs.notifications[key]}
                onChange={(e) =>
                  setPrefs({
                    ...prefs,
                    notifications: { ...prefs.notifications, [key]: e.target.checked },
                  })
                }
              />
              {label}
            </label>
          ))}
          <button
            type="button"
            className="ss-btn-primary"
            onClick={async () => {
              await savePreferences(prefs);
              setSaved('Notification preferences saved.');
            }}
          >
            Save notifications
          </button>
        </section>
      )}

      {active === 'account' && (
        <section className="ss-card space-y-4">
          <p className="text-sm text-slate-500">
            Account deletion in demo mode clears the local session only. Connect Supabase for real
            account lifecycle.
          </p>
          <button type="button" className="ss-btn-secondary" onClick={() => signOut()}>
            Log out
          </button>
          <button
            type="button"
            className="ss-btn border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
            onClick={async () => {
              if (window.confirm('Clear local demo session and preferences export reminder?')) {
                await signOut();
              }
            }}
          >
            Delete demo account session
          </button>
        </section>
      )}

      {saved ? <p className="text-sm text-emerald-600">{saved}</p> : null}
    </div>
  );
}
