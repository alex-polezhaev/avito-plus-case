/**
 * generateCombsForDefiniteM
 * Generates all M-length arrangements (placements) of the given elements without
 * repetition, each joined into a single pipe-delimited string.
 *
 * @param {string[]} elements
 * @param {number} m Arrangement length
 * @returns {string[]}
 */
export const generateCombsForDefiniteM = (elements, m) => {
  const n = elements.length;
  const isUsedArr = new Array(n);
  const interimResult = new Array(m);
  const result = [];

  const placementIter = (pos) => {
    if (pos === m) {
      const currComb = interimResult.join('|');
      result.push(currComb);
      return;
    }
    for (let i = 0; i < n; i += 1) {
      if (!isUsedArr[i]) {
        isUsedArr[i] = true;
        interimResult[pos] = elements[i];
        placementIter(pos + 1);
        isUsedArr[i] = false;
      }
    }
  };
  placementIter(0);
  return result;
};

/**
 * generatePlacementsWithoutReps
 * Generates every possible arrangement (for lengths 1..N) of the given elements
 * without repetition. Used to pre-compute spintax option lists for the sheets.
 *
 * @param {string[]} elements
 * @returns {string[]}
 */
export const generatePlacementsWithoutReps = (elements) => {
  const result = [];
  for (let m = 1; m <= elements.length; m += 1) {
    const combs = generateCombsForDefiniteM(elements, m);
    result.push(...combs);
  }
  return result;
};

export default generatePlacementsWithoutReps;

// Example usage (run directly: `node scripts/placements.js`).
if (process.argv[1] && process.argv[1].endsWith('placements.js')) {
  const elements = ['Waterproof', 'Self-winding', 'Chronograph', 'Calendar', 'Stopwatch'];
  // eslint-disable-next-line no-console
  console.log(generatePlacementsWithoutReps(elements));
}
