import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { AccountSelection } from '../components/slides/AccountSelection';
import { Slide } from '../components/slides/Slide';
import { AccountHeader } from '../layout/account-header';
import { Footer } from '../layout/footer';
import { LampImage } from '../components/slides/LampImage';
import { SlideButtons } from '../components/slides/SlideButtons';
import { Pagination } from '../components/slides/Pagination';

export const Slides = () => {
  const { isSlideRendered, page } = useSelector((state) => state.slides);
  const [paginationPage, changePaginationPage] = useState(page);

  return (
    <>
      <Box bg='#FAFAFA'>
        <AccountHeader />
        <Box className='container' color='gray.900'>
          <Heading
            as='h5'
            size={{ base: 'md', md: 'xl', lg: '2xl' }}
            lineHeight={{ base: '29px', lg: '57.6px' }}
            mt={{ base: '43px', md: 8, lg: 10 }}
            mb={{ base: '24px', md: 6, lg: 8 }}
          >
            Listings
          </Heading>

          <Flex
            alignItems='end'
            flexWrap='wrap'
            rowGap='24px'
            justifyContent='space-between'
          >
            <AccountSelection changePaginationPage={changePaginationPage} />
            {isSlideRendered ? <SlideButtons /> : null}
          </Flex>
          {isSlideRendered ? (
            <Pagination
              inputPage={paginationPage}
              changeInputPage={changePaginationPage}
            />
          ) : null}
          {isSlideRendered ? <Slide /> : <LampImage />}
        </Box>
        <Footer />
      </Box>
    </>
  );
};
