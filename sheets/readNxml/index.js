import getValues from './getValues.js';
import createXMLfeed from './xml.js';

export default async (spreadsheetId) => {
  return getValues(spreadsheetId)
    .then((values) => {
      const xml = createXMLfeed(values);
      return xml;
    });
};
