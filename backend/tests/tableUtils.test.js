import { describe, it, expect } from 'vitest';
import { largestCol, tableColumnsToObject } from '../server/services/tableUtils.js';

describe('largestCol', () => {
  it('returns the length of the longest (ragged) column', () => {
    expect(largestCol([['a', 1], ['b', 1, 2, 3], ['c']])).toBe(4);
  });

  it('returns 0 for no columns', () => {
    expect(largestCol([])).toBe(0);
  });
});

describe('tableColumnsToObject', () => {
  const columns = () => [
    ['Title', 'Title', 'Hello'],
    ['Price', 'Price', '100'],
  ];

  it('transposes columns into a header-keyed lookup', () => {
    const obj = tableColumnsToObject(columns());
    expect(obj.Title).toEqual(['Title', 'Title', 'Hello']);
    expect(obj.Price).toEqual(['Price', 'Price', '100']);
  });

  it('shares references when clone is false', () => {
    const cols = columns();
    const obj = tableColumnsToObject(cols, false);
    expect(obj.Title).toBe(cols[0]);
  });

  it('copies columns when clone is true so the source is not mutated', () => {
    const cols = columns();
    const obj = tableColumnsToObject(cols, true);
    obj.Title[2] = 'Mutated';
    expect(cols[0][2]).toBe('Hello');
  });
});
