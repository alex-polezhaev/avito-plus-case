import Field from '../../models/Field.js';

export const getFields = () => Field
  .find()
  .then((fields) => fields);

/**
 * getFieldById and getFieldByCategory are identical (historical reasons).
 * They could be consolidated into a single helper and the duplicate removed.
 */
export const getFieldById = (categoryName) => Field
  .find({ categoryName })
  .then((fields) => fields);

export const getFieldByCategory = (categoryName) => Field
  .find({ categoryName })
  .then((fields) => fields);

// /////////////////////////////////////////////////////////

export const getTags = async () => getFields()
  .then((fields) => {
    const uniqTags = fields.reduce((acc, field) => {
      const { tags } = field;
      tags.forEach(({ tag }) => acc.add(tag));
      return acc;
    }, new Set());
    return Array.from(uniqTags);
  });
