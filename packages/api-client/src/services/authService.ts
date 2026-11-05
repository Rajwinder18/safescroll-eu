import type { ApiResult, AuthSession, UserProfile, UserRole } from '@safescroll/shared-types';
import { getAppConfig } from '../config';
import { DEMO_PASSWORD, DEMO_USER } from '../mockData';
import { STORAGE_KEYS, storage } from '../storage';

interface LocalUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
  countryCode: string;
  createdAt: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('') || 'SS';
}

function toProfile(user: LocalUser, demo = false): UserProfile {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    avatarInitials: initials(user.displayName),
    countryCode: user.countryCode,
    createdAt: user.createdAt,
    demo,
  };
}

function ok<T>(data: T, demo = true): ApiResult<T> {
  return { data, error: null, meta: { source: 'mock', demo } };
}

function fail<T>(error: string): ApiResult<T> {
  return { data: null, error, meta: { source: 'mock', demo: true } };
}

async function supabaseSignIn(email: string, password: string): Promise<ApiResult<AuthSession>> {
  // Lazy import pattern kept simple; real client is constructed by web/mobile adapters.
  return fail(
    'Supabase Auth is configured but the platform adapter must call createSupabaseAuthService. Falling back is handled by the factory.'
  );
}

export const mockAuthService = {
  async getSession(): Promise<ApiResult<AuthSession | null>> {
    const session = storage.get<AuthSession | null>(STORAGE_KEYS.session, null);
    return ok(session, Boolean(session?.user.demo));
  },

  async signIn(email: string, password: string, rememberMe = true): Promise<ApiResult<AuthSession>> {
    const normalized = email.trim().toLowerCase();
    if (normalized === DEMO_USER.email && password === DEMO_PASSWORD) {
      const session: AuthSession = {
        user: { ...DEMO_USER },
        accessToken: 'mock-demo-token',
        expiresAt: null,
        provider: 'mock',
      };
      if (rememberMe) storage.set(STORAGE_KEYS.session, session);
      return ok(session, true);
    }

    const users = storage.get<LocalUser[]>(STORAGE_KEYS.users, []);
    const found = users.find((u) => u.email === normalized && u.password === password);
    if (!found) return fail('Invalid email or password. Use demo@safescroll.com / SafeScroll123 in demo mode.');

    const session: AuthSession = {
      user: toProfile(found, true),
      accessToken: `mock-token-${found.id}`,
      expiresAt: null,
      provider: 'mock',
    };
    if (rememberMe) storage.set(STORAGE_KEYS.session, session);
    return ok(session, true);
  },

  async signUp(input: {
    email: string;
    password: string;
    displayName: string;
    countryCode: string;
  }): Promise<ApiResult<AuthSession>> {
    const normalized = input.email.trim().toLowerCase();
    const users = storage.get<LocalUser[]>(STORAGE_KEYS.users, []);
    if (users.some((u) => u.email === normalized) || normalized === DEMO_USER.email) {
      return fail('An account with this email already exists in demo storage.');
    }

    const user: LocalUser = {
      id: `local-${Date.now()}`,
      email: normalized,
      password: input.password,
      displayName: input.displayName.trim(),
      role: 'member',
      countryCode: input.countryCode,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    storage.set(STORAGE_KEYS.users, users);

    const session: AuthSession = {
      user: toProfile(user, true),
      accessToken: `mock-token-${user.id}`,
      expiresAt: null,
      provider: 'mock',
    };
    storage.set(STORAGE_KEYS.session, session);
    return ok(session, true);
  },

  async signOut(): Promise<ApiResult<true>> {
    storage.remove(STORAGE_KEYS.session);
    return ok(true, true);
  },

  async requestPasswordReset(email: string): Promise<ApiResult<{ message: string }>> {
    return ok({
      message: `Demo mode: password reset link would be emailed to ${email}. No email was sent.`,
    });
  },

  async resetPassword(_token: string, _password: string): Promise<ApiResult<{ message: string }>> {
    return ok({
      message: 'Demo mode: password updated locally in demonstration only. Connect Supabase for real resets.',
    });
  },

  async updateProfile(patch: Partial<UserProfile>): Promise<ApiResult<UserProfile>> {
    const session = storage.get<AuthSession | null>(STORAGE_KEYS.session, null);
    if (!session) return fail('Not signed in');
    const user = { ...session.user, ...patch, demo: true };
    const next = { ...session, user };
    storage.set(STORAGE_KEYS.session, next);
    return ok(user, true);
  },
};

export type AuthService = typeof mockAuthService;

export function createAuthService(): AuthService {
  const config = getAppConfig();
  if (!config.useMockServices) {
    // Production wiring is provided by platform-specific supabaseAuthService.
    // Until credentials are validated by the host app, keep mock behaviour safe.
    void supabaseSignIn;
  }
  return mockAuthService;
}
