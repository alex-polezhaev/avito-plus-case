import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Flex, Grid } from '@chakra-ui/react';
import { SlideImage } from './SlideImage';
import { SlideDesc } from './SlideDesc';
import { SlideElement } from './SlideElement';

export const Slide = () => {
  const { tableObject } = useSelector((state) => state.table);
  const { page } = useSelector((state) => state.slides);
  const index = page + 1;

  if (!tableObject['SheetID'])
    return 'An error occurred :( Unable to load data.';

  const mainTitle = tableObject['Title'][index];
  const price = tableObject['Price'][index];
  const description = tableObject['Description'][index];

  let images = null;
  if (
    tableObject['Images'] &&
    tableObject['Images'][index] &&
    tableObject['Images']?.length > 2
  ) {
    images = (
      <Grid
        templateColumns={{
          base: 'repeat(auto-fill, minmax(154px, 1fr))',
          sm: 'repeat(auto-fill, minmax(292px, 1fr))',
        }}
        gap={{ base: '12px', md: '16px', lg: '30px' }}
        my={8}
      >
        {(tableObject['Images'][index]?.trim() ?? '')
          .split('\n')
          .map((imageURL, i) => (
            <SlideImage key={i} imageURL={imageURL} />
          ))}
      </Grid>
    );
  }

  const stopList = [
    'Images',
    'Title',
    'Price',
    'Description',
    'AvitoStatus',
    'AvitoIdStat',
    'AvitoDateEnd',
    'Url',
    'Messages',
    'AutoloadFinishedAt',
    'UniqViews270',
    'UniqContacts270',
    'CV270',
    'UniqFavorites270',
    'UniqViews30',
    'UniqContacts30',
    'CV30',
    'UniqFavorites30',
    'UniqViews7',
    'UniqContacts7',
    'CV7',
    'UniqFavorites7',
    'UniqViews1',
    'UniqContacts1',
    'CV1',
    'UniqFavorites1',
    'SheetID',
  ];

  const keys = Object.keys(tableObject);
  const filteredKeys = keys.filter((key) => !stopList.includes(key));
  const elements = filteredKeys.map((key) => {
    const title = tableObject[key][1];
    const value = tableObject[key][index] ?? '';
    const el = <SlideElement key={key} title={title} value={value} />;
    return el;
  });

  const rest = (
    <Box
      bgColor='white'
      borderRadius='12px'
      mt={8}
      px={{ base: '16px', md: 8 }}
    >
      <SlideDesc title={mainTitle} price={price} description={description} />
      <Flex gap='30px' py={8} borderTop='1px solid #E2E8F0'>
        <Box flex={1}>
          <Text color='gray.500' lineHeight='19px' mb='12px'>
            Listing tags
          </Text>
          <Flex flexDir='column' gap='12px'>
            {elements}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <>
      {images}
      {rest}
    </>
  );
};
