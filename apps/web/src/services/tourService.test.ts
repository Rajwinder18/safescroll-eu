import { beforeEach, describe, expect, it } from 'vitest';

// Simple mock for environment where window/localStorage is node-based
const store: Record<string, string> = {};
const mockStorage = {
  getItem: (key: string) => (key in store ? store[key] : null),
  setItem: (key: string, value: string) => {
    store[key] = String(value);
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
  },
  length: 0,
  key: () => null,
};

if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: mockStorage,
    writable: true,
  });
}

import {
  loadTourState,
  markTourCompleted,
  markTourSkipped,
  shouldAutoOfferFeatureTour,
  shouldShowWelcome,
  TOURS,
  tourIdForPath,
} from './tourService';

describe('tourService', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it('provides comprehensive tours for all major features', () => {
    const featureIds = [
      'dashboard',
      'wellbeing',
      'screen-time',
      'mindful',
      'challenges',
      'progress',
      'age',
      'health',
      'policies',
      'safety',
      'quiz',
      'research',
      'assistant',
      'family',
      'settings',
      'analytics',
    ] as const;

    featureIds.forEach((id) => {
      const tour = TOURS[id];
      expect(tour).toBeDefined();
      expect(tour.title).toBeTruthy();
      expect(tour.steps.length).toBeGreaterThanOrEqual(2);
      tour.steps.forEach((step) => {
        expect(step.id).toBeTruthy();
        expect(step.selector).toBeTruthy();
        expect(step.title).toBeTruthy();
        expect(step.body).toBeTruthy();
      });
    });
  });

  it('maps route pathnames correctly to tour IDs', () => {
    expect(tourIdForPath('/app')).toBe('dashboard');
    expect(tourIdForPath('/app/wellbeing')).toBe('wellbeing');
    expect(tourIdForPath('/app/screen-time')).toBe('screen-time');
    expect(tourIdForPath('/app/mindful')).toBe('mindful');
    expect(tourIdForPath('/app/challenges')).toBe('challenges');
    expect(tourIdForPath('/app/learn/age')).toBe('age');
    expect(tourIdForPath('/app/learn/health')).toBe('health');
    expect(tourIdForPath('/app/learn/policies')).toBe('policies');
    expect(tourIdForPath('/app/learn/quiz')).toBe('quiz');
    expect(tourIdForPath('/unknown')).toBeNull();
  });

  it('manages tour persistence in localStorage', () => {
    expect(shouldShowWelcome()).toBe(true);

    markTourCompleted('wellbeing');
    const state = loadTourState();
    expect(state.completed['wellbeing']).toBe(true);
    expect(shouldAutoOfferFeatureTour('wellbeing')).toBe(false);

    markTourSkipped('mindful');
    expect(shouldAutoOfferFeatureTour('mindful')).toBe(false);
  });
});
