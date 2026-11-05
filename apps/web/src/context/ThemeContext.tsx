import { api } from '@safescroll/api-client';
import type { ThemeMode, UserPreferences } from '@safescroll/shared-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface ThemeContextValue {
  preferences: UserPreferences | null;
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => Promise<void>;
  savePreferences: (prefs: UserPreferences) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: ThemeMode): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    (async () => {
      const result = await api.preferences.get();
      if (result.data) {
        setPreferences(result.data);
        setResolvedTheme(resolveTheme(result.data.theme));
      }
    })();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [resolvedTheme]);

  useEffect(() => {
    if (!preferences || preferences.theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setResolvedTheme(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preferences]);

  const setTheme = useCallback(
    async (theme: ThemeMode) => {
      const base =
        preferences ||
        (await api.preferences.get()).data!;
      const next = { ...base, theme };
      await api.preferences.save(next);
      setPreferences(next);
      setResolvedTheme(resolveTheme(theme));
    },
    [preferences]
  );

  const savePreferences = useCallback(async (prefs: UserPreferences) => {
    await api.preferences.save(prefs);
    setPreferences(prefs);
    setResolvedTheme(resolveTheme(prefs.theme));
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      theme: preferences?.theme || 'system',
      resolvedTheme,
      setTheme,
      savePreferences,
    }),
    [preferences, resolvedTheme, setTheme, savePreferences]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
