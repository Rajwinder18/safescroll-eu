import type { ScreenTimeDay, UserProfile } from '@safescroll/shared-types';

export const DEMO_USER: UserProfile = {
  id: 'demo-user-1',
  email: 'demo@safescroll.com',
  displayName: 'Alex Rivera',
  role: 'member',
  avatarInitials: 'AR',
  countryCode: 'FR',
  createdAt: new Date().toISOString(),
  demo: true,
};

export const DEMO_PASSWORD = 'SafeScroll123';

/** Realistic demonstration screen-time series — clearly marked as demo. */
export function buildDemoScreenTimeSeries(days = 14): ScreenTimeDay[] {
  const out: ScreenTimeDay[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const socialMinutes = 140 + ((i * 17) % 90);
    const totalMinutes = socialMinutes + 90 + ((i * 11) % 70);
    const sleepHours = 6.5 + ((i % 5) * 0.3);
    const exerciseMinutes = 20 + ((i * 7) % 50);
    const wellbeingScore = Math.max(
      40,
      Math.min(92, 88 - Math.round(socialMinutes / 12) + Math.round(exerciseMinutes / 10))
    );
    out.push({
      date: d.toISOString().slice(0, 10),
      socialMinutes,
      totalMinutes,
      sleepHours: Number(sleepHours.toFixed(1)),
      exerciseMinutes,
      wellbeingScore,
      demo: true,
    });
  }
  return out;
}
