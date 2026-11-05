import { api } from '@safescroll/api-client';
import type { AuthSession, UserProfile } from '@safescroll/shared-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextValue {
  session: AuthSession | null;
  user: UserProfile | null;
  loading: boolean;
  demoMode: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<string | null>;
  signUp: (input: {
    email: string;
    password: string;
    displayName: string;
    countryCode: string;
  }) => Promise<string | null>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<string | null>;
  enterDemo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const result = await api.auth.getSession();
      if (!active) return;
      setSession(result.data);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string, rememberMe = true) => {
    const result = await api.auth.signIn(email, password, rememberMe);
    if (result.error || !result.data) return result.error || 'Sign in failed';
    setSession(result.data);
    return null;
  }, []);

  const signUp = useCallback(
    async (input: {
      email: string;
      password: string;
      displayName: string;
      countryCode: string;
    }) => {
      const result = await api.auth.signUp(input);
      if (result.error || !result.data) return result.error || 'Sign up failed';
      setSession(result.data);
      return null;
    },
    []
  );

  const signOut = useCallback(async () => {
    await api.auth.signOut();
    setSession(null);
  }, []);

  const updateProfile = useCallback(async (patch: Partial<UserProfile>) => {
    const result = await api.auth.updateProfile(patch);
    if (result.error || !result.data) return result.error || 'Update failed';
    setSession((prev) => (prev ? { ...prev, user: result.data! } : prev));
    return null;
  }, []);

  const enterDemo = useCallback(async () => {
    await signIn('demo@safescroll.com', 'SafeScroll123', true);
  }, [signIn]);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      demoMode: Boolean(session?.user.demo || session?.provider === 'mock'),
      signIn,
      signUp,
      signOut,
      updateProfile,
      enterDemo,
    }),
    [session, loading, signIn, signUp, signOut, updateProfile, enterDemo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
