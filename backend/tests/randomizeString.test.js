import { describe, it, expect } from 'vitest';
import randomizeString from '../server/services/Randomizer/randomizeString.js';

describe('randomizeString', () => {
  it('returns plain text unchanged when there are no markers', () => {
    expect(randomizeString('Hello world')).toBe('Hello world');
  });

  it('picks the only option from a {single} random group', () => {
    expect(randomizeString('Buy {now}')).toBe('Buy now');
  });

  it('always resolves a random group with identical options deterministically', () => {
    expect(randomizeString('{a|a|a}')).toBe('a');
  });

  it('keeps every item when shuffling a [comma] group (order may vary)', () => {
    const out = randomizeString('[red, green, blue]');
    expect(out.split(',').map((s) => s.trim()).sort()).toEqual(['blue', 'green', 'red']);
  });

  it('joins a <pipe> group without a separator', () => {
    expect(randomizeString('<a>')).toBe('a');
    expect(randomizeString('<x|x>')).toBe('xx');
  });

  it('substitutes a %tag% reference from the column lookup', () => {
    const C = { City: ['City', 'City', 'Moscow'] };
    expect(randomizeString('Sold in %City%', C, 2)).toBe('Sold in Moscow');
  });

  it('reports a missing %tag% reference', () => {
    expect(randomizeString('%Unknown%')).toBe('✖️ Tag Unknown not found ✖️');
  });
});
