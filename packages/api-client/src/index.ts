export { getAppConfig } from './config';
export type { AppConfig, RuntimeMode } from './config';
export { STORAGE_KEYS, storage } from './storage';
export { DEMO_PASSWORD, DEMO_USER, buildDemoScreenTimeSeries } from './mockData';
export { createAuthService, mockAuthService } from './services/authService';
export type { AuthService } from './services/authService';
export {
  adminService,
  aiService,
  analyticsService,
  challengeService,
  checklistService,
  familyService,
  mindfulService,
  policyService,
  preferencesService,
  quizService,
  wellbeingService,
} from './services/catalogServices';

import { createAuthService } from './services/authService';
import {
  adminService,
  aiService,
  analyticsService,
  challengeService,
  checklistService,
  familyService,
  mindfulService,
  policyService,
  preferencesService,
  quizService,
  wellbeingService,
} from './services/catalogServices';

/** Unified service surface — swap mock → Supabase without rebuilding UI. */
export const api = {
  auth: createAuthService(),
  profile: {
    update: createAuthService().updateProfile,
  },
  policy: policyService,
  quiz: quizService,
  checklist: checklistService,
  wellbeing: wellbeingService,
  analytics: analyticsService,
  challenges: challengeService,
  mindful: mindfulService,
  preferences: preferencesService,
  family: familyService,
  ai: aiService,
  admin: adminService,
};

export type SafeScrollApi = typeof api;
