import type {
  AgeEligibilityInput,
  AgeEligibilityResult,
  CountryPolicy,
  WellbeingInput,
  WellbeingResult,
} from '@safescroll/shared-types';

export const WELLBEING_DISCLAIMER =
  'This experimental wellbeing index is for personal reflection only. It is not a medical, clinical, or scientifically validated diagnosis.';

export const AGE_ELIGIBILITY_DISCLAIMER =
  'This is an illustrative threshold simulation for educational awareness. It is not a legal determination of eligibility under any law or platform policy.';

/** Parse YYYY-MM-DD as a local calendar date to avoid UTC off-by-one. */
export function parseLocalDate(isoDate: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function calculateAgeParts(birthDate: Date, today = new Date()) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, totalMonths: years * 12 + months };
}

export function calculateAgeEligibility(
  input: AgeEligibilityInput,
  countries: CountryPolicy[],
  today = new Date()
): AgeEligibilityResult {
  const birthDate = parseLocalDate(input.birthDate);
  const country =
    countries.find((c) => c.code === input.countryCode) || countries[0];

  if (!birthDate || birthDate > today) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      isEligible: false,
      thresholdYears: input.thresholdYears,
      monthsUntilEligible: 0,
      country,
      disclaimer: AGE_ELIGIBILITY_DISCLAIMER,
      error: 'Please enter a valid past birth date.',
    };
  }

  const { years, months, days, totalMonths } = calculateAgeParts(birthDate, today);
  const thresholdMonths = Number(input.thresholdYears) * 12;
  const isEligible = totalMonths >= thresholdMonths;
  const monthsUntilEligible = Math.max(0, thresholdMonths - totalMonths);

  return {
    years,
    months,
    days,
    totalMonths,
    isEligible,
    thresholdYears: Number(input.thresholdYears),
    monthsUntilEligible,
    country,
    disclaimer: AGE_ELIGIBILITY_DISCLAIMER,
  };
}

/**
 * Transparent experimental wellbeing index.
 * Preserves the original Safe Scroll scoring behaviour and adds an optional break bonus.
 */
export function calculateWellbeing(input: WellbeingInput): WellbeingResult {
  const social = Number(input.socialDaily) || 0;
  const total = Math.max(Number(input.totalDaily) || 0, social);
  const sleepHours = Number(input.sleep) || 0;
  const exerciseHours = Number(input.exercise) || 0;
  const breakMinutes = Number(input.breakMinutes) || 0;

  let score = 100;
  let socialPenalty = 0;
  let sleepPenalty = 0;
  let exerciseAdjustment = 0;
  let breakBonus = 0;

  if (social > 5) socialPenalty = 35;
  else if (social > 3.5) socialPenalty = 20;
  else if (social > 2) socialPenalty = 10;
  score -= socialPenalty;

  if (sleepHours < 7) sleepPenalty = 25;
  else if (sleepHours < 8) sleepPenalty = 10;
  score -= sleepPenalty;

  if (exerciseHours >= 1) {
    exerciseAdjustment = 5;
    score += 5;
  } else {
    exerciseAdjustment = -10;
    score -= 10;
  }

  if (breakMinutes >= 30) {
    breakBonus = 3;
    score += 3;
  } else if (breakMinutes >= 15) {
    breakBonus = 1;
    score += 1;
  }

  score = Math.max(20, Math.min(98, score));

  let category: WellbeingResult['category'] = 'Healthy Routine';
  let suggestions = [
    'Keep your phone away from the study desk during homework.',
    'Maintain 8 to 9 hours of uninterrupted sleep every night.',
    'Spend at least 1 hour outside doing sports or walking each day.',
  ];

  if (score < 50) {
    category = 'High Screen Time';
    suggestions = [
      'Try setting an app timer of 2 hours total per day.',
      'Keep phones outside your bedroom at night to improve sleep.',
      'Replace 45 minutes of phone time with outdoor activities.',
      'Turn off social media notification banners to stop distractions.',
    ];
  } else if (score < 75) {
    category = 'Moderate Screen Time';
    suggestions = [
      'Cut 30 minutes from scrolling apps and add it to sleep or reading.',
      'Use the 20-20-20 rule during computer and phone sessions.',
      'Avoid screens for 30 minutes right before going to bed.',
    ];
  }

  const annualSocial = social * 365;

  return {
    socialDaily: social,
    totalDaily: total,
    sleep: sleepHours,
    exercise: exerciseHours,
    weeklySocial: Number((social * 7).toFixed(1)),
    monthlySocial: Number((social * 30.4).toFixed(0)),
    annualSocial: Number(annualSocial.toFixed(0)),
    annualDaysEquivalent: Number((annualSocial / 24).toFixed(0)),
    score,
    category,
    suggestions,
    breakdown: {
      socialPenalty,
      sleepPenalty,
      exerciseAdjustment,
      breakBonus,
    },
    disclaimer: WELLBEING_DISCLAIMER,
  };
}

/** Backward-compatible alias used by earlier tests. */
export function calculateWellbeingLegacy(input: {
  socialDaily: number;
  totalDaily: number;
  sleep: number;
  exercise: number;
}) {
  const result = calculateWellbeing(input);
  return {
    socialDaily: result.socialDaily,
    totalDaily: result.totalDaily,
    sleep: result.sleep,
    exercise: result.exercise,
    score: result.score,
  };
}
