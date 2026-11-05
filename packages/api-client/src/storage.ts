const memory = new Map<string, string>();

function canUseLocalStorage() {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = canUseLocalStorage() ? localStorage.getItem(key) : memory.get(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T) {
    const raw = JSON.stringify(value);
    if (canUseLocalStorage()) localStorage.setItem(key, raw);
    else memory.set(key, raw);
  },
  remove(key: string) {
    if (canUseLocalStorage()) localStorage.removeItem(key);
    else memory.delete(key);
  },
};

export const STORAGE_KEYS = {
  session: 'safescroll_session_v2',
  users: 'safescroll_registered_users_v2',
  checklist: 'safescroll_checklist',
  preferences: 'safescroll_preferences_v2',
  challenges: 'safescroll_challenges_v2',
  mindful: 'safescroll_mindful_v2',
  quiz: 'safescroll_quiz_v2',
  wellbeingHistory: 'safescroll_wellbeing_history_v2',
  aiChat: 'safescroll_ai_chat_v2',
  adminPolicies: 'safescroll_admin_policies_v2',
  audit: 'safescroll_audit_v2',
  family: 'safescroll_family_v2',
} as const;
