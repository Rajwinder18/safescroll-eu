export function calculateWellbeing({ socialDaily, totalDaily, sleep, exercise }) {
  const social = Number(socialDaily) || 0;
  const total = Math.max(Number(totalDaily) || 0, social);
  const sleepHours = Number(sleep) || 0;
  const exerciseHours = Number(exercise) || 0;

  let score = 100;
  if (social > 5) score -= 35;
  else if (social > 3.5) score -= 20;
  else if (social > 2) score -= 10;

  if (sleepHours < 7) score -= 25;
  else if (sleepHours < 8) score -= 10;

  score += exerciseHours >= 1 ? 5 : -10;

  return {
    socialDaily: social,
    totalDaily: total,
    sleep: sleepHours,
    exercise: exerciseHours,
    score: Math.max(20, Math.min(98, score))
  };
}
