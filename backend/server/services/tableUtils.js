/**
 * tableUtils.js
 * Pure helpers for working with Google Sheets data returned in "COLUMNS"
 * major-dimension form: an array of columns, where each column is an array whose
 * first cell is the header (the tag/column name) and the rest are row values.
 */

/**
 * largestCol
 * Returns the length of the longest column, i.e. the number of rows to iterate
 * over (columns can be ragged because trailing empty cells are trimmed by the
 * Sheets API).
 *
 * @param {Array<Array>} columns
 * @returns {number}
 */
export const largestCol = (columns) => {
  let result = 0;
  columns.forEach((col) => {
    if (col.length > result) {
      result = col.length;
    }
  });
  return result;
};

/**
 * tableColumnsToObject
 * Transposes an array of columns into an object keyed by each column's header,
 * giving O(1) access to a column by name (e.g. obj.Title, obj.Price).
 *
 * @param {Array<Array>} columns
 * @param {boolean} clone When true each column array is shallow-copied so the
 *   caller can mutate values without touching the source data.
 * @returns {Object<string, Array>}
 */
export const tableColumnsToObject = (columns, clone = false) => {
  const tableObject = {};
  columns.forEach((column) => {
    tableObject[column[0]] = clone ? [...column] : column;
  });
  return tableObject;
};
