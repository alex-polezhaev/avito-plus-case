import _ from 'lodash';
import { getLimitedItems, getLimitedFileIDs } from '../limitedRequests.js';
import avitoAuth from './authAvito.js';

const avitoApiDomen = 'https://api.avito.ru';

/**
 * getAvitoIds
 * Extracts the Avito ids from the sheet data
 */

const getAvitoIds = (values) => {
  let avitoIds = null;
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    const [collName] = value;
    if (collName === 'AvitoIdStat') {
      avitoIds = value.filter((id, index) => index > 1 && _.isNumber(id));
      break;
    }
  }
  if (!avitoIds) throw new Error("Can't get avito ids from the sheet's data");
  return avitoIds;
};

/**
 * getItems
 * Fetches the items that carry the statistics
 */

const getItems = async (token, itemIds, userID, days) => {
  const dateFrom = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
  const dateTo = new Date(Date.now());
  const callback = (ids) => fetch(`${avitoApiDomen}/stats/v1/accounts/${userID}/items`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateFrom,
      dateTo,
      ids,
      fields: ['uniqViews', 'uniqContacts', 'uniqFavorites'],
    }),
  })
    .then((response) => response.json())
    .then(({ result: { items } }) => items)
    .catch(() => ([]));
  const items = await getLimitedItems(itemIds, callback, 200);
  return items;
};

/**
 * getItems
 * Reduces the per-item statistics
 */

const getStats = (items) => items.reduce((acc1, { itemId, stats }) => {
  const uniq = stats.reduce((acc2, stat) => {
    const { uniqContacts, uniqFavorites, uniqViews } = stat;
    return {
      uniqContacts: acc2.uniqContacts + uniqContacts,
      uniqFavorites: acc2.uniqFavorites + uniqFavorites,
      uniqViews: acc2.uniqViews + uniqViews,
    };
  }, {
    uniqContacts: 0,
    uniqFavorites: 0,
    uniqViews: 0,
  });

  const conversion = Math.round(uniq.uniqContacts === 0
    ? 0
    : (100 / (uniq.uniqViews / uniq.uniqContacts)));

  return {
    ...acc1,
    [itemId]: {
      ...uniq,
      conversion,
    },
  };
}, {});

/**
 * getFileIds
 * Resolves ad file ids and maps them to Avito ids
 */

const getFileIds = async (token, avitoIds) => {
  const callback = (ids) => fetch(
    `${avitoApiDomen}/autoload/v2/items/ad_ids?query=${ids.join('|')}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((response) => response.json())
    .then(({ items }) => items
      .reduce((acc, { ad_id: adID, avito_id: avitoID }) => ({
        ...acc,
        [adID]: avitoID,
      }), {}))
    .catch(() => ({}));
  const result = await getLimitedFileIDs(avitoIds, callback, 200);
  return result;
};

/**
 * createValidCols
 * Formats the resulting data for further processing
 */

const createValidCols = async (stats, fileNavitoIds, days, values) => {
  const neccessaryColNames = [
    'Id',
    `UniqContacts${days === 269 ? 270 : days}`,
    `UniqFavorites${days === 269 ? 270 : days}`,
    `UniqViews${days === 269 ? 270 : days}`,
    `CV${days === 269 ? 270 : days}`,
  ];
  const neccessaryCols = {};
  values.forEach((value) => {
    const [currentColName] = value;
    if (neccessaryColNames.includes(currentColName)) {
      neccessaryCols[currentColName] = value;
    }
  });

  const {
    Id: ids,
    [`UniqContacts${days === 269 ? 270 : days}`]: contacts,
    [`UniqFavorites${days === 269 ? 270 : days}`]: favs,
    [`UniqViews${days === 269 ? 270 : days}`]: views,
    [`CV${days === 269 ? 270 : days}`]: conversions,
  } = neccessaryCols;
  const newContacts = [contacts[0], contacts[1]];
  const newFavs = [favs[0], favs[1]];
  const newViews = [views[0], views[1]];
  const newConversions = [conversions[0], conversions[1]];
  ids.forEach((id, index) => {
    if (index <= 1) return;
    const avitoID = fileNavitoIds[id];
    const defaultVal = !id ? '' : 0;
    let currStats = avitoID ? stats[avitoID] : {
      uniqContacts: defaultVal,
      uniqFavorites: defaultVal,
      uniqViews: defaultVal,
      conversion: defaultVal,
    };
    if (!currStats) {
      currStats = {
        uniqContacts: 0,
        uniqFavorites: 0,
        uniqViews: 0,
        conversion: 0,
      };
    }
    const {
      uniqContacts,
      uniqFavorites,
      uniqViews,
      conversion,
    } = currStats;
    newContacts.push(uniqContacts);
    newFavs.push(uniqFavorites);
    newViews.push(uniqViews);
    newConversions.push(conversion);
  });

  return {
    [newContacts[0]]: newContacts,
    [newFavs[0]]: newFavs,
    [newViews[0]]: newViews,
    [newConversions[0]]: newConversions,
  };
};

/**
 * loadAvitoStats
 * Main entry point for fetching Avito autoload statistics
 */

const loadAvitoStats = async (values, data) => {
  try {
    const {
      avitoUserID,
      clientID,
      clientSecret,
    } = data;

    const token = await avitoAuth(clientID, clientSecret);
    const avitoIds = getAvitoIds(values);

    const colsPromises = [269, 30, 7, 1].map(async (days) => {
      const items = await getItems(token, avitoIds, avitoUserID, days);
      const stats = getStats(items);
      const fileAndAvitoIds = await getFileIds(token, avitoIds);

      const validCols = createValidCols(stats, fileAndAvitoIds, days, values);
      return validCols;
    });
    return Promise.all(colsPromises)
      .then((cols) => {
        const allCols = cols.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        const newValues = values.map((value) => {
          const [currentColName] = value;
          if (allCols[currentColName] !== undefined) {
            return allCols[currentColName];
          }
          return value;
        });
        return newValues;
      })
      .catch((error) => {
        console.error(error);
        console.error("Cant't create new values in loadAvitoStats");
        return values;
      });
  } catch (error) {
    console.error(error);
    console.error('Error in loadAvitoStats');
    return values;
  }
};

export default loadAvitoStats;
