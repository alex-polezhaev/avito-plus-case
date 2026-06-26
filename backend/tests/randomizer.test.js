import { describe, it, expect } from 'vitest';
import randomizer from '../server/services/Randomizer/randomizer.js';

// Columns are in "COLUMNS" form: [header, titleRow, ...rowValues].
const baseColumns = () => [
  ['Title', 'Title', '', 'Keep me'],
  ['TitleRandom', 'TitleRandom', 'New title', ''],
  ['Description', 'Description', '', ''],
  ['DescriptionRandom', 'DescriptionRandom', 'New description', ''],
  ['Price', 'Price', '', ''],
  ['PriceRandom', 'PriceRandom', '500', ''],
  ['Status', 'Status', 'active', 'expired'],
];

const byName = (cols, name) => cols.find((c) => c[0] === name);

describe('randomizer', () => {
  it('fills empty Title/Description/Price cells from their *Random templates', () => {
    const result = randomizer(baseColumns());
    expect(byName(result, 'Title')).toEqual(['Title', 'Title', 'New title', 'Keep me']);
    expect(byName(result, 'Description')).toEqual(['Description', 'Description', 'New description', '']);
    expect(byName(result, 'Price')).toEqual(['Price', 'Price', '500', '']);
  });

  it('never overwrites a cell that already has a value', () => {
    const result = randomizer(baseColumns());
    // Title row index 3 was "Keep me" and must survive.
    expect(byName(result, 'Title')[3]).toBe('Keep me');
  });

  it('leaves non-randomizer columns untouched', () => {
    const result = randomizer(baseColumns());
    expect(byName(result, 'Status')).toEqual(['Status', 'Status', 'active', 'expired']);
  });

  it('preserves the header rows (indexes 0 and 1)', () => {
    const result = randomizer(baseColumns());
    const title = byName(result, 'Title');
    expect(title[0]).toBe('Title');
    expect(title[1]).toBe('Title');
  });
});
