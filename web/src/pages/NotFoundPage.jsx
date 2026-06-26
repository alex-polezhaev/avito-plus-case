import React from 'react';
import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Footer, Header } from '../layout';
import assets from '../assets';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <Box bgColor='#fafafa'>
    <Header />
    <Box
      mb='80px'
      className='container main'
      textAlign='center'
      mt={{ base: '80px', sm: '90px', md: '148px', lg: '136px' }}
    >
      <Image
        src={assets.noteFoundImg}
        mx='auto'
        sx={{
          '@media (max-width: 480px)': {
            ml: '-11px',
          },
        }}
      />
      <Heading
        color='#171923'
        fontSize={{ base: '32', sm: '35px', md: '48px', lg: '48px' }}
        fontWeight='700'
        lineHeight='120%'
        mb='18px'
      >
        Page not found
      </Heading>
      <Text
        color='#4A5568'
        mb={{ base: '40px', sm: '45px', md: '45px', lg: '45px' }}
        fontSize={{ base: '15px', sm: '18px', md: '18px', lg: '18px' }}
        maxWidth={{ base: '100%', md: '615px', lg: '615px' }}
        mx='auto'
      >
        It looks like this page was moved or deleted — go back to the home
        page
      </Text>
      <Link className='h-48' to='/'>
        <Button
          fontSize={{ base: '16px', sm: '18px', md: '18px', lg: '18px' }}
          lineHeight='28px'
          fontWeight='600'
          px='24px'
          colorScheme='purple'
          sx={{
            '@media (max-width: 480px)': {
              width: '100%',
              height: '48px',
            },
          }}
        >
          To the home page
        </Button>
      </Link>
    </Box>
    <Footer />
  </Box>
);
