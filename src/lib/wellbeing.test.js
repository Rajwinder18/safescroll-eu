import { describe, expect, it } from 'vitest';
import { calculateWellbeing } from './wellbeing';

describe('calculateWellbeing', () => {
  it('keeps total screen time at least as high as social time', () => {
    const result = calculateWellbeing({ socialDaily: 5, totalDaily: 2, sleep: 8, exercise: 1 });
    expect(result.totalDaily).toBe(5);
  });

  it('reduces the score for high social use and short sleep', () => {
    const result = calculateWellbeing({ socialDaily: 6, totalDaily: 7, sleep: 6, exercise: 0 });
    expect(result.score).toBe(30);
  });

  it('clamps the score to the supported range', () => {
    const result = calculateWellbeing({ socialDaily: 0, totalDaily: 0, sleep: 10, exercise: 2 });
    expect(result.score).toBe(98);
  });
});
