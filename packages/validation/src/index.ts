import { z } from 'zod';

export const emailSchema = z.string().email('Enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Za-z]/, 'Include at least one letter')
  .regex(/[0-9]/, 'Include at least one number');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    displayName: z.string().min(2, 'Name must be at least 2 characters').max(80),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    countryCode: z.string().min(2).max(10),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'Please accept the terms to continue' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const profileSetupSchema = z.object({
  displayName: z.string().min(2).max(80),
  countryCode: z.string().min(2).max(10),
  roleIntent: z.enum(['member', 'parent', 'educator']),
});

export const wellbeingInputSchema = z.object({
  socialDaily: z.number().min(0).max(24),
  totalDaily: z.number().min(0).max(24),
  sleep: z.number().min(0).max(24),
  exercise: z.number().min(0).max(24),
  breakMinutes: z.number().min(0).max(180).optional(),
});

export const ageCheckSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  thresholdYears: z.number().min(10).max(21),
  countryCode: z.string().min(2),
});

export const policyRecordSchema = z.object({
  id: z.string().uuid().optional(),
  countryCode: z.string().min(2),
  title: z.string().min(3).max(200),
  status: z.enum([
    'active',
    'proposed',
    'initiative',
    'in_force',
    'adopted_not_applicable',
    'guidance',
    'pilot',
  ]),
  summary: z.string().min(10).max(2000),
  sourceUrl: z.string().url('Provide a valid source URL'),
});

export const challengeProgressSchema = z.object({
  challengeId: z.string(),
  completedCount: z.number().min(0),
});

export const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string().min(2).max(8),
  notifications: z.object({
    dailyReminder: z.boolean(),
    challengeUpdates: z.boolean(),
    weeklySummary: z.boolean(),
    mindfulNudges: z.boolean(),
  }),
  wellbeingGoals: z.object({
    maxSocialHours: z.number().min(0).max(24),
    minSleepHours: z.number().min(0).max(24),
    minExerciseMinutes: z.number().min(0).max(300),
  }),
  privacy: z.object({
    shareAnonymousAnalytics: z.boolean(),
    familyVisibility: z.boolean(),
  }),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ProfileSetupInput = z.infer<typeof profileSetupSchema>;
export type PreferencesInput = z.infer<typeof preferencesSchema>;
