import { describe, it, expect } from 'vitest';
import generatePlacementsWithoutReps, {
  generateCombsForDefiniteM,
} from '../scripts/placements.js';

describe('generateCombsForDefiniteM', () => {
  it('lists single-element arrangements', () => {
    expect(generateCombsForDefiniteM(['a', 'b', 'c'], 1).sort()).toEqual(['a', 'b', 'c']);
  });

  it('lists ordered pairs without repetition', () => {
    expect(generateCombsForDefiniteM(['a', 'b'], 2).sort()).toEqual(['a|b', 'b|a']);
  });
});

describe('generatePlacementsWithoutReps', () => {
  it('returns every arrangement of length 1..N', () => {
    const result = generatePlacementsWithoutReps(['a', 'b']);
    expect(result.sort()).toEqual(['a', 'a|b', 'b', 'b|a']);
  });

  it('produces the expected count for three elements (3 + 6 + 6 = 15)', () => {
    expect(generatePlacementsWithoutReps(['a', 'b', 'c'])).toHaveLength(15);
  });
});
