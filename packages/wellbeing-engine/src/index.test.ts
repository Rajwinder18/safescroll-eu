import { describe, expect, it } from 'vitest';
import {
  calculateAgeEligibility,
  calculateWellbeing,
  parseLocalDate,
} from './index';

const countries = [
  {
    code: 'FR',
    name: 'France',
    defaultGdprAge: 15,
    under15Status: 'Parental consent under 15.',
  },
];

describe('calculateWellbeing', () => {
  it('matches default demo score of 75', () => {
    const result = calculateWellbeing({
      socialDaily: 4,
      totalDaily: 6.5,
      sleep: 7.5,
      exercise: 1.5,
    });
    expect(result.score).toBe(75);
    expect(result.category).toBe('Healthy Routine');
  });

  it('clamps score between 20 and 98', () => {
    const low = calculateWellbeing({
      socialDaily: 10,
      totalDaily: 12,
      sleep: 4,
      exercise: 0,
    });
    expect(low.score).toBeGreaterThanOrEqual(20);
    const high = calculateWellbeing({
      socialDaily: 0.5,
      totalDaily: 1,
      sleep: 9,
      exercise: 2,
      breakMinutes: 40,
    });
    expect(high.score).toBeLessThanOrEqual(98);
  });
});

describe('age eligibility', () => {
  it('parses local dates without UTC shift', () => {
    const date = parseLocalDate('2013-05-18');
    expect(date?.getFullYear()).toBe(2013);
    expect(date?.getMonth()).toBe(4);
    expect(date?.getDate()).toBe(18);
  });

  it('marks under-threshold ages as ineligible', () => {
    const result = calculateAgeEligibility(
      { birthDate: '2015-01-01', thresholdYears: 15, countryCode: 'FR' },
      countries,
      new Date(2026, 10, 5)
    );
    expect(result.error).toBeUndefined();
    expect(result.isEligible).toBe(false);
    expect(result.years).toBe(11);
  });
});
