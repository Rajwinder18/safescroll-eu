import {
  challenges as challengeCatalog,
  countries,
  healthImpactItems,
  policyTimeline,
  preventionChecklists,
  quizQuestions,
  references,
} from '@safescroll/policy-content';
import type {
  Achievement,
  AiChatMessage,
  ApiResult,
  ChallengeProgress,
  FamilyOverview,
  MindfulSessionEvent,
  PolicyRecord,
  QuizAttempt,
  ScreenTimeDay,
  UserPreferences,
  AdminAuditLog,
} from '@safescroll/shared-types';
import { calculateWellbeing } from '@safescroll/wellbeing-engine';
import { buildDemoScreenTimeSeries } from '../mockData';
import { STORAGE_KEYS, storage } from '../storage';

function ok<T>(data: T): ApiResult<T> {
  return { data, error: null, meta: { source: 'mock', demo: true } };
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  notifications: {
    dailyReminder: true,
    challengeUpdates: true,
    weeklySummary: true,
    mindfulNudges: true,
  },
  wellbeingGoals: {
    maxSocialHours: 2,
    minSleepHours: 8,
    minExerciseMinutes: 45,
  },
  privacy: {
    shareAnonymousAnalytics: false,
    familyVisibility: false,
  },
};

export const policyService = {
  async listCountries() {
    return ok(countries);
  },
  async listTimeline() {
    return ok(policyTimeline);
  },
  async listReferences() {
    return ok(references);
  },
  async search(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return ok([]);
    const hits = [
      ...policyTimeline
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        )
        .map((p) => ({ title: p.title, section: 'policy' as const, snippet: p.description })),
      ...references
        .filter(
          (r) => r.title.toLowerCase().includes(q) || r.org.toLowerCase().includes(q)
        )
        .map((r) => ({ title: r.title, section: 'resources' as const, snippet: r.summary })),
    ];
    return ok(hits);
  },
  async listAdminPolicies() {
    const local = storage.get<PolicyRecord[]>(STORAGE_KEYS.adminPolicies, []);
    if (local.length) return ok(local);
    const seed: PolicyRecord[] = policyTimeline.slice(0, 4).map((p, i) => ({
      id: `seed-policy-${i}`,
      countryCode: i === 2 ? 'FR' : 'EU_OTHER',
      title: p.title,
      status: p.legalStatus,
      summary: p.description,
      sourceUrl: p.officialReference || 'https://example.com/source-placeholder',
      updatedAt: p.lastReviewed || new Date().toISOString(),
    }));
    storage.set(STORAGE_KEYS.adminPolicies, seed);
    return ok(seed);
  },
  async saveAdminPolicy(policy: PolicyRecord) {
    const list = (await this.listAdminPolicies()).data || [];
    const idx = list.findIndex((p) => p.id === policy.id);
    const next = [...list];
    const saved = {
      ...policy,
      id: policy.id || `policy-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    if (idx >= 0) next[idx] = saved;
    else next.unshift(saved);
    storage.set(STORAGE_KEYS.adminPolicies, next);
    appendAudit('policy.save', saved.id, saved.title);
    return ok(saved);
  },
  async deleteAdminPolicy(id: string) {
    const list = (await this.listAdminPolicies()).data || [];
    storage.set(
      STORAGE_KEYS.adminPolicies,
      list.filter((p) => p.id !== id)
    );
    appendAudit('policy.delete', id, id);
    return ok(true);
  },
};

export const quizService = {
  async getQuestions() {
    return ok(quizQuestions);
  },
  async saveAttempt(answers: Record<number, number>) {
    let correct = 0;
    quizQuestions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct += 1;
    });
    const attempt: QuizAttempt = {
      id: `quiz-${Date.now()}`,
      answers,
      score: correct,
      percent: Math.round((correct / quizQuestions.length) * 100),
      completedAt: new Date().toISOString(),
    };
    const history = storage.get<QuizAttempt[]>(STORAGE_KEYS.quiz, []);
    history.unshift(attempt);
    storage.set(STORAGE_KEYS.quiz, history.slice(0, 20));
    return ok(attempt);
  },
  async listAttempts() {
    return ok(storage.get<QuizAttempt[]>(STORAGE_KEYS.quiz, []));
  },
};

export const checklistService = {
  async getChecklists() {
    return ok(preventionChecklists);
  },
  async getProgress() {
    return ok(
      storage.get<Record<string, boolean>>(STORAGE_KEYS.checklist, {
        p1: true,
        c1: true,
        s1: false,
        t1: true,
      })
    );
  },
  async setProgress(progress: Record<string, boolean>) {
    storage.set(STORAGE_KEYS.checklist, progress);
    return ok(progress);
  },
};

export const wellbeingService = {
  async analyze(input: {
    socialDaily: number;
    totalDaily: number;
    sleep: number;
    exercise: number;
    breakMinutes?: number;
  }) {
    const result = calculateWellbeing(input);
    const history = storage.get<
      { at: string; score: number; socialDaily: number; demo: true }[]
    >(STORAGE_KEYS.wellbeingHistory, []);
    history.unshift({
      at: new Date().toISOString(),
      score: result.score,
      socialDaily: result.socialDaily,
      demo: true,
    });
    storage.set(STORAGE_KEYS.wellbeingHistory, history.slice(0, 60));
    return ok(result);
  },
  async history() {
    return ok(storage.get(STORAGE_KEYS.wellbeingHistory, []));
  },
  async getHealthMatrix() {
    return ok(healthImpactItems);
  },
};

export const analyticsService = {
  async getScreenTimeSeries(days = 14): Promise<ApiResult<ScreenTimeDay[]>> {
    return ok(buildDemoScreenTimeSeries(days));
  },
};

export const challengeService = {
  async listChallenges() {
    return ok(challengeCatalog);
  },
  async getProgress() {
    return ok(
      storage.get<Record<string, ChallengeProgress>>(STORAGE_KEYS.challenges, {})
    );
  },
  async increment(challengeId: string) {
    const catalog = challengeCatalog.find((c) => c.id === challengeId);
    if (!catalog) return { data: null, error: 'Challenge not found', meta: { source: 'mock' as const, demo: true } };
    const all = storage.get<Record<string, ChallengeProgress>>(STORAGE_KEYS.challenges, {});
    const current = all[challengeId] || {
      challengeId,
      completedCount: 0,
      completed: false,
      updatedAt: new Date().toISOString(),
    };
    const completedCount = Math.min(catalog.targetCount, current.completedCount + 1);
    all[challengeId] = {
      challengeId,
      completedCount,
      completed: completedCount >= catalog.targetCount,
      updatedAt: new Date().toISOString(),
    };
    storage.set(STORAGE_KEYS.challenges, all);
    return ok(all[challengeId]);
  },
  async listAchievements(): Promise<ApiResult<Achievement[]>> {
    const progress = storage.get<Record<string, ChallengeProgress>>(
      STORAGE_KEYS.challenges,
      {}
    );
    const completed = Object.values(progress).filter((p) => p.completed).length;
    const mindful = storage.get<MindfulSessionEvent[]>(STORAGE_KEYS.mindful, []);
    const achievements: Achievement[] = [
      {
        id: 'first-breath',
        title: 'First breath',
        description: 'Complete a mindful breathing session.',
        icon: 'Wind',
        unlockedAt: mindful.length ? mindful[0].createdAt : null,
      },
      {
        id: 'streak-starter',
        title: 'Challenge starter',
        description: 'Complete your first daily challenge.',
        icon: 'Flame',
        unlockedAt: completed >= 1 ? new Date().toISOString() : null,
      },
      {
        id: 'habit-builder',
        title: 'Habit builder',
        description: 'Complete three challenges.',
        icon: 'Trophy',
        unlockedAt: completed >= 3 ? new Date().toISOString() : null,
      },
    ];
    return ok(achievements);
  },
};

export const mindfulService = {
  async listEvents() {
    return ok(storage.get<MindfulSessionEvent[]>(STORAGE_KEYS.mindful, []));
  },
  async record(event: Omit<MindfulSessionEvent, 'id' | 'createdAt' | 'demo'>) {
    const full: MindfulSessionEvent = {
      ...event,
      id: `mindful-${Date.now()}`,
      createdAt: new Date().toISOString(),
      demo: true,
    };
    const list = storage.get<MindfulSessionEvent[]>(STORAGE_KEYS.mindful, []);
    list.unshift(full);
    storage.set(STORAGE_KEYS.mindful, list.slice(0, 100));
    return ok(full);
  },
  /**
   * Always returns a Promise so callers can safely use async/await or .then().
   * Web fallback: statuses are readiness metadata only — none are active in the browser.
   */
  async getNativeIntegrationStatuses(): Promise<
    ApiResult<
      {
        platform: 'android' | 'ios' | 'web';
        feature: string;
        ready: boolean;
        active: boolean;
        notes: string;
        availableOnMobile?: boolean;
      }[]
    >
  > {
    return ok([
      {
        platform: 'android' as const,
        feature: 'UsageStatsManager',
        ready: true,
        active: false,
        availableOnMobile: true,
        notes: 'Available on mobile after usage-access permission. Not active in the web demo.',
      },
      {
        platform: 'android' as const,
        feature: 'App interruption accessibility / overlay',
        ready: true,
        active: false,
        availableOnMobile: true,
        notes: 'Requires store policy review and explicit consent. Not active on web.',
      },
      {
        platform: 'ios' as const,
        feature: 'FamilyControls / DeviceActivity / ManagedSettings',
        ready: true,
        active: false,
        availableOnMobile: true,
        notes: 'Requires Apple entitlements. Prepared for mobile; not active until authorized.',
      },
      {
        platform: 'web' as const,
        feature: 'Native app launch interception',
        ready: false,
        active: false,
        availableOnMobile: true,
        notes:
          'Browsers cannot intercept arbitrary native app launches. Use the mobile app for device integrations.',
      },
    ]);
  },
};

export const preferencesService = {
  async get() {
    return ok(storage.get<UserPreferences>(STORAGE_KEYS.preferences, defaultPreferences));
  },
  async save(prefs: UserPreferences) {
    storage.set(STORAGE_KEYS.preferences, prefs);
    return ok(prefs);
  },
};

export const familyService = {
  async getOverview(): Promise<ApiResult<FamilyOverview>> {
    const existing = storage.get<FamilyOverview | null>(STORAGE_KEYS.family, null);
    if (existing) return ok(existing);
    const demo: FamilyOverview = {
      id: 'family-demo',
      name: 'Rivera Family',
      consentGranted: false,
      demo: true,
      sharedGoals: [
        'Phone-free dinners',
        'Shared weekly outdoor activity',
        'Bedroom charging stations',
      ],
      members: [
        { id: 'm1', name: 'Alex', role: 'parent', ageBand: 'Adult', wellbeingScore: 78 },
        { id: 'm2', name: 'Sam', role: 'teen', ageBand: '14–16', wellbeingScore: 64 },
        { id: 'm3', name: 'Jordan', role: 'child', ageBand: '10–12', wellbeingScore: 71 },
      ],
    };
    storage.set(STORAGE_KEYS.family, demo);
    return ok(demo);
  },
  async setConsent(consentGranted: boolean) {
    const overview = (await this.getOverview()).data!;
    const next = { ...overview, consentGranted };
    storage.set(STORAGE_KEYS.family, next);
    return ok(next);
  },
};

export const aiService = {
  async getHistory() {
    return ok(storage.get<AiChatMessage[]>(STORAGE_KEYS.aiChat, []));
  },
  async send(message: string): Promise<ApiResult<AiChatMessage[]>> {
    const history = storage.get<AiChatMessage[]>(STORAGE_KEYS.aiChat, []);
    const userMsg: AiChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: message,
      createdAt: new Date().toISOString(),
    };
    const reply = craftMockReply(message);
    const assistantMsg: AiChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: reply.content,
      sources: reply.sources,
      createdAt: new Date().toISOString(),
    };
    const next = [...history, userMsg, assistantMsg];
    storage.set(STORAGE_KEYS.aiChat, next.slice(-40));
    return ok(next.slice(-40));
  },
  async clear() {
    storage.set(STORAGE_KEYS.aiChat, []);
    return ok(true);
  },
};

export const adminService = {
  async overview() {
    return ok({
      users: 1284,
      policies: ((await policyService.listAdminPolicies()).data || []).length,
      quizAttempts: storage.get(STORAGE_KEYS.quiz, []).length,
      mindfulSessions: storage.get(STORAGE_KEYS.mindful, []).length,
      demo: true as const,
    });
  },
  async listUsers() {
    return ok([
      {
        id: 'demo-user-1',
        email: 'demo@safescroll.com',
        displayName: 'Alex Rivera',
        role: 'member' as const,
        countryCode: 'FR',
      },
      {
        id: 'demo-admin',
        email: 'admin@safescroll.com',
        displayName: 'Demo Admin',
        role: 'admin' as const,
        countryCode: 'EU_OTHER',
      },
    ]);
  },
  async auditLogs() {
    return ok(storage.get<AdminAuditLog[]>(STORAGE_KEYS.audit, []));
  },
};

function appendAudit(action: string, target: string, actor = 'demo-admin') {
  const logs = storage.get<AdminAuditLog[]>(STORAGE_KEYS.audit, []);
  logs.unshift({
    id: `audit-${Date.now()}`,
    action,
    actor,
    target,
    createdAt: new Date().toISOString(),
  });
  storage.set(STORAGE_KEYS.audit, logs.slice(0, 100));
}

function craftMockReply(message: string): {
  content: string;
  sources?: { title: string; url?: string }[];
} {
  const lower = message.toLowerCase();
  if (lower.includes('gdpr') || lower.includes('article 8')) {
    return {
      content:
        'GDPR Article 8 addresses children\'s consent for information society services. Member states may set the digital consent age between 13 and 16. This is educational information, not legal advice.',
      sources: [
        {
          title: 'GDPR (EU) 2016/679',
          url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
        },
      ],
    };
  }
  if (lower.includes('dsa') || lower.includes('digital services')) {
    return {
      content:
        'The Digital Services Act requires platforms to protect minors (including Articles 28 and 34 themes around privacy/safety and risk assessments). Targeted ads based on profiling minors are restricted. Verify the official EUR-Lex text for operative wording.',
      sources: [
        {
          title: 'Digital Services Act overview',
          url: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package',
        },
      ],
    };
  }
  if (lower.includes('sleep') || lower.includes('screen')) {
    return {
      content:
        'A practical starting point: keep social apps under a personal limit, protect 8+ hours for sleep opportunity, and take short movement breaks. Safe Scroll scores are reflective experiments — not medical diagnoses.',
    };
  }
  if (lower.includes('challenge') || lower.includes('detox')) {
    return {
      content:
        'Try a supportive challenge: charge your phone outside the bedroom tonight, or take three mindful breathing pauses tomorrow. Progress over perfection — no shame-based streaks.',
    };
  }
  return {
    content:
      'I can help explain digital wellbeing concepts, EU youth-protection policies (with sources), and suggest achievable habits. I cannot diagnose medical or mental health conditions. Ask about GDPR, the DSA, sleep routines, or daily challenges.',
  };
}
