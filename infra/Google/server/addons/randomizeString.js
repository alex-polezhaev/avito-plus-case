/**
 * randomizeString
 * Function that randomizes a string
 */

const randomizeString = (string, C, i) => {
  const regexpShuffle = /\[.*?\]/gi;
  const regexpRandom = /\{.*?\}/gi;
  const regexpReplace = /%(.*?)%/gi;
  const regexpShuffleNoComma = /<.*?>/gi;
  const regexpBetweenPrice = /~#.*?#~/gi;

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

  const replaceBetween = replaceTag.replaceAll(regexpBetweenPrice, (el) => {
    const tag = el.replace(/\s+/g, ' ').replace('~#', '').replace('#~', '');
    const [min, max] = tag.split('-');
    const newEl = Math.floor(Math.random() * (+max - +min + 1) + +min);
    return newEl;
  });

  const shuffleNoComma = replaceBetween
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
