import { describe, it, expect } from 'vitest';
import mintId, { ID_ALPHABET, ID_LENGTH } from '../server/services/Randomizer/mintId.js';

describe('mintId', () => {
  it('mints an id of the configured length', () => {
    expect(mintId()).toHaveLength(ID_LENGTH);
    expect(ID_LENGTH).toBe(6);
  });

  it('only uses characters from the configured alphabet', () => {
    for (let i = 0; i < 200; i += 1) {
      const id = mintId();
      [...id].forEach((ch) => expect(ID_ALPHABET).toContain(ch));
    }
  });

  it('produces unique ids across many calls', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i += 1) ids.add(mintId());
    // Collisions over a 36^6 space across 1000 draws are astronomically unlikely.
    expect(ids.size).toBe(1000);
  });
});
