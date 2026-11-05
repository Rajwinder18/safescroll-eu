export type RuntimeMode = 'development' | 'production';

export interface AppConfig {
  mode: RuntimeMode;
  useMockServices: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  isSupabaseConfigured: boolean;
  demoBanner: boolean;
}

function readEnv(key: string): string {
  try {
    // Vite / Expo public env
    const meta = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
    return meta?.[key] || '';
  } catch {
    return '';
  }
}

export function getAppConfig(): AppConfig {
  const supabaseUrl =
    readEnv('VITE_SUPABASE_URL') || readEnv('EXPO_PUBLIC_SUPABASE_URL') || '';
  const supabaseAnonKey =
    readEnv('VITE_SUPABASE_ANON_KEY') || readEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY') || '';
  const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
  const forceMock = readEnv('VITE_USE_MOCK') === 'true' || readEnv('EXPO_PUBLIC_USE_MOCK') === 'true';
  const mode: RuntimeMode =
    readEnv('MODE') === 'production' || readEnv('PROD') === 'true'
      ? 'production'
      : 'development';

  return {
    mode,
    useMockServices: forceMock || !isSupabaseConfigured,
    supabaseUrl,
    supabaseAnonKey,
    isSupabaseConfigured,
    demoBanner: !isSupabaseConfigured || forceMock,
  };
}
