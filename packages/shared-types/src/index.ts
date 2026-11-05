/** Shared domain types for Safe Scroll web + mobile. */

export type UserRole = 'member' | 'admin' | 'parent' | 'educator';

export type LegalStatus =
  | 'in_force'
  | 'adopted_not_applicable'
  | 'proposed'
  | 'guidance'
  | 'pilot';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
  meta?: {
    source: 'mock' | 'supabase' | 'local';
    demo?: boolean;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarInitials: string;
  countryCode: string;
  createdAt: string;
  demo?: boolean;
}

export interface AuthSession {
  user: UserProfile;
  accessToken: string | null;
  expiresAt: string | null;
  provider: 'mock' | 'supabase';
}

export interface CountryPolicy {
  code: string;
  name: string;
  defaultGdprAge: number;
  under15Status: string;
  legalStatus?: LegalStatus;
  sourceUrl?: string;
  lastReviewed?: string;
}

export interface PolicyTimelineItem {
  id: string;
  year: string;
  month: string;
  type: string;
  typeLabel: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  impact: string;
  legalStatus: LegalStatus;
  officialReference?: string;
  lastReviewed?: string;
}

export interface PolicyRecord {
  id: string;
  countryCode: string;
  title: string;
  status: 'active' | 'proposed' | 'initiative' | LegalStatus;
  summary: string;
  sourceUrl: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  answers: Record<number, number>;
  score: number;
  percent: number;
  completedAt: string;
}

export interface ReferenceItem {
  org: string;
  title: string;
  type: string;
  date: string;
  badge: string;
  summary: string;
  url: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface PreventionChecklist {
  category: 'parents' | 'children' | 'schools' | 'platforms';
  title: string;
  items: ChecklistItem[];
}

export interface WellbeingInput {
  socialDaily: number;
  totalDaily: number;
  sleep: number;
  exercise: number;
  breakMinutes?: number;
}

export interface WellbeingScoreBreakdown {
  socialPenalty: number;
  sleepPenalty: number;
  exerciseAdjustment: number;
  breakBonus: number;
}

export interface WellbeingResult {
  socialDaily: number;
  totalDaily: number;
  sleep: number;
  exercise: number;
  weeklySocial: number;
  monthlySocial: number;
  annualSocial: number;
  annualDaysEquivalent: number;
  score: number;
  category: 'Healthy Routine' | 'Moderate Screen Time' | 'High Screen Time';
  suggestions: string[];
  breakdown: WellbeingScoreBreakdown;
  disclaimer: string;
}

export interface AgeEligibilityInput {
  birthDate: string;
  thresholdYears: number;
  countryCode: string;
}

export interface AgeEligibilityResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  isEligible: boolean;
  thresholdYears: number;
  monthsUntilEligible: number;
  country: CountryPolicy;
  disclaimer: string;
  error?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category:
    | 'morning_detox'
    | 'focus'
    | 'mindful_breaks'
    | 'sleep'
    | 'offline'
    | 'social_reduction';
  cadence: 'daily' | 'weekly';
  targetCount: number;
  points: number;
}

export interface ChallengeProgress {
  challengeId: string;
  completedCount: number;
  completed: boolean;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}

export interface MindfulSessionEvent {
  id: string;
  type: 'breathing' | 'reflection' | 'interruption_demo';
  durationSeconds: number;
  reflectionAnswers?: Record<string, string>;
  action: 'continue' | 'return' | 'breathe' | 'reflect';
  createdAt: string;
  demo: true;
}

export interface ScreenTimeDay {
  date: string;
  socialMinutes: number;
  totalMinutes: number;
  sleepHours: number;
  exerciseMinutes: number;
  wellbeingScore: number;
  demo: true;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: 'parent' | 'child' | 'teen';
  ageBand: string;
  wellbeingScore: number;
}

export interface FamilyOverview {
  id: string;
  name: string;
  members: FamilyMember[];
  sharedGoals: string[];
  consentGranted: boolean;
  demo: true;
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: { title: string; url?: string }[];
  createdAt: string;
}

export interface NotificationPreferences {
  dailyReminder: boolean;
  challengeUpdates: boolean;
  weeklySummary: boolean;
  mindfulNudges: boolean;
}

export interface UserPreferences {
  theme: ThemeMode;
  language: string;
  notifications: NotificationPreferences;
  wellbeingGoals: {
    maxSocialHours: number;
    minSleepHours: number;
    minExerciseMinutes: number;
  };
  privacy: {
    shareAnonymousAnalytics: boolean;
    familyVisibility: boolean;
  };
}

export interface HealthImpactItem {
  id: string;
  category: 'physical' | 'mental' | 'cognitive';
  title: string;
  summary: string;
  detail: string;
  citation?: string;
  intensityAtHours: (hours: number) => 'low' | 'moderate' | 'high';
}

export interface AdminAuditLog {
  id: string;
  action: string;
  actor: string;
  target: string;
  createdAt: string;
}

export interface NativeIntegrationStatus {
  platform: 'android' | 'ios' | 'web';
  feature: string;
  ready: boolean;
  active: boolean;
  notes: string;
}
