/**
 * randomizeString
 * Expands a spreadsheet "spintax" template into one randomized string.
 *
 * Supported markers:
 *   [a, b, c]  -> shuffle the comma-separated items (re-joined with commas)
 *   {a|b|c}    -> pick one of the pipe-separated options at random
 *   %tag%      -> substitute the value of column `tag` at row `i` (needs C, i)
 *   <a|b|c>    -> shuffle the pipe-separated items and join without a separator
 *
 * @param {string} string Template string
 * @param {Object} [C]    Column lookup used to resolve %tag% references
 * @param {number} [i]    Current row index used with C
 * @returns {string}
 */
const randomizeString = (string, C, i) => {
  const regexpShuffle = /\[.*?\]/gi;
  const regexpRandom = /\{.*?\}/gi;
  const regexpReplace = /%(.*?)%/gi;
  const regexpShuffleNoComma = /<.*?>/gi;

  const shuffleResult = string.replaceAll(regexpShuffle, (el) => {
    const newEl = el.replace(/\s+/g, ' ').replace('[', '').replace(']', '');
    const array = newEl
      .split(',')
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return array;
  });

  const randomResult = shuffleResult.replaceAll(regexpRandom, (el) => {
    const newEl = el.replace(/\s+/g, ' ').replace('{', '').replace('}', '');
    const array = newEl.split('|');
    return array[Math.floor(Math.random() * array.length)];
  });

  const replaceTag = randomResult.replaceAll(regexpReplace, (el) => {
    const tag = el.replace(/\s+/g, ' ').replaceAll('%', '');
    if (!C || !C[tag] || !C[tag][i]) { return `✖️ Tag ${tag} not found ✖️`; }
    const newEl = C[tag][i];
    return newEl;
  });

  const shuffleNoComma = replaceTag
    .replaceAll(regexpShuffleNoComma, (el) => {
      const newEl = el.replace(/\s+/g, ' ').replace('<', '').replace('>', '');
      const array = newEl
        .split('|')
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      return array.join('');
    });

  return shuffleNoComma;
};

export default randomizeString;
