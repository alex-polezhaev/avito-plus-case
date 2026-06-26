import fs from 'fs/promises';
import { DateTime, IANAZone } from 'luxon';
import { api } from '../api/index.js';

export const generateXML = async (accID, sheets) => {
  try {
    // Generates XML only in the last minutes of the hour
    // if (new Date().getMinutes() < 50) {
    //   return null;
    // }

    /**
     * makeObjectUsingTableData
     * The order of replaceAll matters,
     * because the ampersand gets replaced inside other tags if it is not replaced first
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
    const tags = await api('mongo')
      .get('/tags_from_fields')
      .then(({ data }) => data);

    const XMLTime = (strDate, zone = 'Moscow (UTC+3)') => {
      const timezones = {
        'Kaliningrad (UTC+2)': 'Europe/Kaliningrad',
        'Moscow (UTC+3)': 'Europe/Moscow',
        'Samara (UTC+4)': 'Europe/Samara',
        'Yekaterinburg (UTC+5)': 'Asia/Yekaterinburg',
        'Omsk (UTC+6)': 'Asia/Omsk',
        'Krasnoyarsk (UTC+7)': 'Asia/Krasnoyarsk',
        'Irkutsk (UTC+8)': 'Asia/Irkutsk',
        'Yakutsk (UTC+9)': 'Asia/Yakutsk',
        'Vladivostok (UTC+10)': 'Asia/Vladivostok',
        'Magadan (UTC+11)': 'Asia/Magadan',
        'Kamchatka (UTC+12)': 'Asia/Kamchatka',
      };

      if (!strDate || typeof strDate !== 'string') return '';

      try {
        const ianaZone = zone
          ? timezones[zone.replaceAll('&#45;', '-')]
          : timezones['Moscow (UTC+3)'];
        if (!IANAZone.isValidZone(ianaZone)) throw new Error(`Invalid IANA zone - ${ianaZone}`);

        let formatedDate;
        let date;

        formatedDate = DateTime.fromFormat(strDate, 'd.M.yyyy', {
          zone: ianaZone,
        });
        date = new DateTime(formatedDate);
        if (date.isValid) return date.set({ hour: 10 }).toISO();

        formatedDate = DateTime.fromFormat(strDate, 'd.M.yyyy h:m:s', {
          zone: ianaZone,
        });
        date = new DateTime(formatedDate);
        if (date.isValid) return date.toISO();

        formatedDate = DateTime.fromFormat(strDate, 'd.M.yyyy h:m', {
          zone: ianaZone,
        });
        date = new DateTime(formatedDate);
        if (date.isValid) return date.toISO();

        throw new Error(`Can't create valid date. strDate - ${strDate}`);
      } catch (error) {
        console.error(error);
        console.error("Can't create valid date for XML");
        return '';
      }
    };

    const allAds = sheets.map((sheet) => {
      const { values } = sheet;
      // Create the ads group
      const Ads = [];

      // Create the object
      const C = makeObjectUsingTableData(values);

      if (!C?.Id) {
        return null;
      }

      for (let i = 2; i < C?.Id?.length; i += 1) {
        // Create the ad
        const Ad = [];

        // Prepare Images
        if (C.Images && BOOL(C.Images[i])) {
          const images = C.Images[i]
            .split('\n')
            .map((link) => `<Image url="${link}"></Image>`);

          Ad.push(`<Images>${images.join('')}</Images>`);
          // Marker that the column has been used
          C.Images[0] = false;
        }

        // Prepare DateBegin
        if (C.DateBegin && BOOL(C.DateBegin)) {
          Ad.push(
            `<DateBegin>${XMLTime(C.DateBegin[i], C.TimeZone[i])}</DateBegin>`,
          );
          // Marker that the column has been used
          C.DateBegin[0] = false;
        }

        // Prepare DateEnd
        if (C.DateEnd && BOOL(C.DateEnd)) {
          Ad.push(`<DateEnd>${XMLTime(C.DateEnd[i], C.TimeZone[i])}</DateEnd>`);
          // Marker that the column has been used
          C.DateEnd[0] = false;
        }

        // Prepare Address
        if (
          C.Address
          && C.SubAdress
          && BOOL(C.Address[i])
          && BOOL(C.SubAdress[i])
        ) {
          Ad.push(`<Address>${C.Address[i]}, ${C.SubAdress[i]}</Address>`);
          // Marker that the column has been used
          C.Address[0] = false;
          C.SubAdress[0] = false;
        }

        // Prepare Description
        if (C.Description && BOOL(C.Description[i])) {
          Ad.push(
            `<Description><![CDATA[ ${changeDescription(
              C.Description[i],
            )} ]]></Description>`,
          );
          // Marker that the column has been used
          C.Description[0] = false;
        }

        // Prepare ListingFee
        if (C.ListingFee && BOOL(C.ListingFee[i])) {
          const ListingFeeRelations = {
            'Package': 'Package',
            'Single': 'Single',
            'PackageSingle': 'PackageSingle',
          };
          Ad.push(
            `<ListingFee>${ListingFeeRelations[C.ListingFee[i]]}</ListingFee>`,
          );
          // Marker that the column has been used
          C.ListingFee[0] = false;
        }

        // Look for the remaining tags
        tags.forEach((tag) => {
          // If such a tag exists and the first flag is true - add it to the ad
          if (C[tag] && C[tag][i] && C[tag][0] && !C[tag][i].includes('|')) {
            Ad.push(`<${tag}>${C[tag][i]}</${tag}>`);
          }

          // Alternative path for <options>
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

    const file = `/app/xml-data/${accID}.xml`;
    const xml = `<Ads formatVersion="3" target="Avito.ru">${allAds.join(
      '',
    )}</Ads>`;
    return fs.writeFile(file, xml);
  } catch (error) {
    console.error(error);
    console.error("Cant't load xml");
  }
};
