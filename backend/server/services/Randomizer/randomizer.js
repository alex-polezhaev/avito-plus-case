import randomizeString from './randomizeString.js';

/**
 * randomizer
 * Fills the Title / Description / Price columns from their *Random template
 * columns (when the target cell is empty), expanding each template via
 * randomizeString. Returns a new set of columns with the same shape.
 */
const randomizer = (values) => {
  const toPutAndToRandomizeColsAsArr = [
    ['Title', 'TitleRandom'],
    ['Description', 'DescriptionRandom'],
    ['Price', 'PriceRandom'],
  ].map(([colNameToPut, colNameToRandomize]) => {
    const twoColsArr = values.reduce((acc, value) => {
      const newAcc = [...acc];
      const [currentColName] = value;
      if (currentColName === colNameToPut) {
        newAcc[0] = value;
      } else if (currentColName === colNameToRandomize) {
        newAcc[1] = value;
      }
      return newAcc;
    }, new Array(2));
    return twoColsArr;
  });

  const preparedColsToPut = toPutAndToRandomizeColsAsArr.reduce((acc, colsArr) => {
    const [toPutValues, toRandomizeValues] = colsArr;
    const [colNameToPut] = toPutValues;
    const newToPutValues = toRandomizeValues.map((str, i) => {
      if (i === 0 || i === 1) return toPutValues[i];
      if (toPutValues[i]?.trim() !== ''
      && toPutValues[i] !== undefined) return toPutValues[i];
      return str === '' ? toPutValues[i] : randomizeString(str);
    });
    return {
      ...acc,
      [colNameToPut]: newToPutValues,
    };
  }, {});

  const newValues = values.map((value) => {
    const [currentColName] = value;
    if (preparedColsToPut[currentColName] !== undefined) {
      return preparedColsToPut[currentColName];
    }
    return value;
  });
  return newValues;
};

export default randomizer;
