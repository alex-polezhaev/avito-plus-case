import { getTableValuesFromStorage } from '../Google/getDataFromTable.js';
import { XMLTime } from '../Date/index.js';
import { getTags } from '../Mongoose/fieldsDB.js';
import { getLogger } from '../../config/logger.js';
import { largestCol } from '../tableUtils.js';

const logger = getLogger();

/**
 * makeObjectUsingTableData
 * The replaceAll order matters: the ampersand must be escaped first, otherwise
 * it would be re-escaped inside the entities produced by the other replacements.
 */
const makeObjectUsingTableData = (array) => {
  const fixed = array.map((column) => column.map((cell) => cell
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/'/g, '&apos;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/-/g, '&#45;')));

  const tableObject = {};
  fixed.forEach((column) => {
    tableObject[column[0]] = column;
  });
  return tableObject;
};

const BOOL = (tag) => Boolean(tag === ' ' || tag === '  ' ? '' : tag);

const changeDescription = (description) => description
  .replaceAll(/&lt;/g, '<')
  .replaceAll(/&gt;/g, '>')
  .replaceAll(/&amp;/g, '&');

const loadXML = (accID) => getTableValuesFromStorage(accID)
  .then(async (sheets) => {
    const tags = await getTags();

    const allAds = sheets.map((sheet) => {
      const { values } = sheet;
      // Build a group of ads
      const Ads = [];

      // Build the column lookup object
      const C = makeObjectUsingTableData(values);

      for (let i = 2; i < largestCol(values); i += 1) {
        // Build a single ad
        const Ad = [];

        // Prepare Images
        if (C.Images && BOOL(C.Images[i])) {
          const images = C.Images[i]
            .split('\n')
            .map((link) => `<Image url="${link}"></Image>`);

          Ad.push(`<Images>${images.join('')}</Images>`);
          // Mark the column as used
          C.Images[0] = false;
        }

        // Prepare DateBegin
        if (C.DateBegin && BOOL(C.DateBegin[i])) {
          Ad.push(`<DateBegin>${XMLTime(C.DateBegin[i])}</DateBegin>`);
          // Mark the column as used
          C.DateBegin[0] = false;
        }

        // Prepare DateEnd
        if (C.DateEnd && BOOL(C.DateEnd)) {
          Ad.push(`<DateEnd>${XMLTime(C.DateEnd[i])}</DateEnd>`);
          // Mark the column as used
          C.DateEnd[0] = false;
        }

        // Prepare Address
        if (C.Address && C.SubAdress && BOOL(C.Address[i]) && BOOL(C.SubAdress[i])) {
          Ad.push(`<Address>${C.Address[i]}, ${C.SubAdress[i]}</Address>`);
          // Mark the columns as used
          C.Address[0] = false;
          C.SubAdress[0] = false;
        }

        // Prepare Description
        if (C.Description && BOOL(C.Description[i])) {
          Ad.push(`<Description><![CDATA[ ${changeDescription(C.Description[i])} ]]></Description>`);
          // Mark the column as used
          C.Description[0] = false;
        }

        // Prepare ListingFee
        if (C.ListingFee && BOOL(C.ListingFee[i])) {
          const ListingFeeRelations = {
            Package: 'Package',
            Wallet: 'Single',
            'Package or wallet': 'PackageSingle',
          };
          Ad.push(`<ListingFee>${ListingFeeRelations[C.ListingFee[i]]}</ListingFee>`);
          // Mark the column as used
          C.ListingFee[0] = false;
        }

        // Look up the remaining tags
        tags.forEach((tag) => {
          // If the tag exists and its header flag is true - add it to the ad
          if (C[tag] && C[tag][i] && C[tag][0] && !C[tag][i].includes('|')) {
            Ad.push(`<${tag}>${C[tag][i]}</${tag}>`);
          }

          // Second path for <options>
          if (C[tag] && C[tag][i] && C[tag][0] && C[tag][i].includes('|')) {
            const optArray = C[tag][i].split('|');
            const optXML = optArray.map((opt) => `<Option>${opt}</Option>`);
            Ad.push(`<${tag}>${optXML.join('')}</${tag}>`);
          }
        });

        // Add the ad to the group
        Ads.push(`<Ad>${Ad.join('')}</Ad>`);
      }
      return Ads.join('');
    });
    return `<Ads formatVersion="3" target="Avito.ru">${allAds.join('')}</Ads>`;
  })
  .catch((error) => {
    logger.error(error);
    logger.error("Can't load xml");
    return '<Ads formatVersion="3" target="Avito.ru"></Ads>';
  });

export default loadXML;
