import React from 'react';
import { Flex, Box, Heading, Text, Image, Grid } from '@chakra-ui/react';
import assets from '../../assets';
import { Link } from 'react-router-dom';

export const Subscription = () => (
  <Box
    mb='144px'
    sx={{
      '@media (max-width:500px)': {
        mb: '80px',
      },
    }}
    className='subscription-section'
  >
    <Flex
      justifyContent='space-between'
      alignItems='center'
      sx={{
        '@media (max-width:900px)': {
          flexDirection: 'column',
          alignItems: 'start',
        },
      }}
      mb={{ base: '12px', sm: '40px', md: '44px', lg: '44px' }}
      gap='12px'
    >
      <Box maxWidth='477px'>
        <Heading
          fontWeight='700'
          color='#171923'
          lineHeight='120%'
          fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
        >
          Available tariffs
          <Box as='span' display='block' className='purple'>
            {' '}
            For business
          </Box>
        </Heading>
      </Box>
      <Box maxWidth='440px'>
        <Text
          fontSize={{ base: '15px', sm: '16px', md: '18px', lg: '18px' }}
          color='#2D3748'
          lineHeight='150%'
        >
          Choose the tariff that suits you best. The price
          depends on the number of listings.
        </Text>
      </Box>
    </Flex>

    {/* {============================================================================================================================================================================================================================================================ } */}

    <Box display='flex' flexDirection='column' gap='12px'>
      <Box
        bgColor='#fafafa'
        borderRadius={24}
        py={{ base: '16px', sm: 6, md: 6, lg: 6 }}
        px={{ base: '20px', sm: 8, md: 8, lg: 8 }}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          sx={{
            '@media (max-width:960px)': {
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              width: '100%',
              gap: '16px',
            },
          }}
        >
          <Flex
            width='386px'
            sx={{
              '@media (max-width:1300px)': {
                width: '285px',
              },
              '@media (max-width:960px)': {
                width: '100%',
              },
            }}
          >
            <Flex
              alignItems='center'
              gap='16px'
              sx={{
                '@media (max-width:960px)': {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              }}
            >
              <Image
                src={assets.lampIcon}
                alt='lamp icon'
                sx={{
                  '@media (max-width:480px)': {
                    order: '1',
                    width: '36px',
                    height: '36px',
                  },
                }}
              />
              <Heading
                fontSize={{ base: '20px', sm: '26px', md: '30px', lg: '30px' }}
                fontWeight='700'
                lineHeight='120%'
                color='#171923'
              >
                Start
              </Heading>
            </Flex>
          </Flex>

          <Box width='298px'>
            <Box>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#ED8936'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Limited publishing
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#ED8936'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  7 days free
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box
            width='248px'
            sx={{
              '@media (max-width:1300px)': {
                width: '195px',
              },
            }}
          >
            <Heading
              fontSize={{ base: '18px', sm: '25px', md: '28px', lg: '28px' }}
              fontWeight='600'
              lineHeight='120%'
              color='#171923'
            >
              Free
            </Heading>
          </Box>

          <Box
            sx={{
              '@media (max-width:480px)': {
                width: '100%',
              },
            }}
          >
            <Link
              to='/auth/register'
              className='outline-link-button'
              style={{ paddingLeft: '24px', paddingRight: '24px' }}
            >
              Get started
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box
        bgColor='#fafafa'
        borderRadius={24}
        py={{ base: '16px', sm: 6, md: 6, lg: 6 }}
        px={{ base: '20px', sm: 8, md: 8, lg: 8 }}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          sx={{
            '@media (max-width:960px)': {
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              width: '100%',
              gap: '16px',
            },
          }}
        >
          <Flex
            width='386px'
            sx={{
              '@media (max-width:1300px)': {
                width: '285px',
              },
              '@media (max-width:960px)': {
                width: '100%',
              },
            }}
          >
            <Flex
              alignItems='center'
              gap='16px'
              sx={{
                '@media (max-width:960px)': {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              }}
            >
              <Image
                src={assets.fireIcon}
                alt='raketa icon'
                sx={{
                  '@media (max-width:480px)': {
                    order: '1',
                    width: '36px',
                    height: '36px',
                  },
                }}
              />
              <Heading
                fontSize={{ base: '20px', sm: '26px', md: '30px', lg: '30px' }}
                fontWeight='700'
                lineHeight='120%'
                color='#171923'
              >
                1,000 listings
              </Heading>
            </Flex>
          </Flex>

          <Box width='298px'>
            <Box>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Process automation
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Publish up to 1000 listings
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Valid for 30 days
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box
            width='248px'
            sx={{
              '@media (max-width:1300px)': {
                width: '195px',
              },
            }}
          >
            <Heading
              fontSize={{ base: '18px', sm: '25px', md: '28px', lg: '28px' }}
              fontWeight='600'
              lineHeight='120%'
              color='#171923'
            >
              1490 ₽
            </Heading>
          </Box>

          <Box
            sx={{
              '@media (max-width:480px)': {
                width: '100%',
              },
            }}
          >
            <Link
              to='/auth/register'
              className='outline-link-button'
              style={{ paddingLeft: '24px', paddingRight: '24px' }}
            >
              Get started
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box
        bgColor='#fafafa'
        borderRadius={24}
        py={{ base: '16px', sm: 6, md: 6, lg: 6 }}
        px={{ base: '20px', sm: 8, md: 8, lg: 8 }}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          sx={{
            '@media (max-width:960px)': {
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              width: '100%',
              gap: '16px',
            },
          }}
        >
          <Flex
            width='386px'
            sx={{
              '@media (max-width:1300px)': {
                width: '285px',
              },
              '@media (max-width:960px)': {
                width: '100%',
              },
            }}
          >
            <Flex
              alignItems='center'
              gap='16px'
              sx={{
                '@media (max-width:960px)': {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              }}
            >
              <Image
                src={assets.fastIcon}
                alt='raketa icon'
                sx={{
                  '@media (max-width:480px)': {
                    order: '1',
                    width: '36px',
                    height: '36px',
                  },
                }}
              />
              <Heading
                fontSize={{ base: '20px', sm: '26px', md: '30px', lg: '30px' }}
                fontWeight='700'
                lineHeight='120%'
                color='#171923'
              >
                5,000 listings
              </Heading>
            </Flex>
          </Flex>

          <Box width='298px'>
            <Box>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Process automation
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Publish up to 5000 listings
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Valid for 30 days
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box
            width='248px'
            sx={{
              '@media (max-width:1300px)': {
                width: '195px',
              },
            }}
          >
            <Heading
              fontSize={{ base: '18px', sm: '25px', md: '28px', lg: '28px' }}
              fontWeight='600'
              lineHeight='120%'
              color='#171923'
            >
              2900 ₽
            </Heading>
          </Box>

          <Box
            sx={{
              '@media (max-width:480px)': {
                width: '100%',
              },
            }}
          >
            <Link
              to='/auth/register'
              className='outline-link-button'
              style={{ paddingLeft: '24px', paddingRight: '24px' }}
            >
              Get started
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box
        bgColor='#fafafa'
        borderRadius={24}
        py={{ base: '16px', sm: 6, md: 6, lg: 6 }}
        px={{ base: '20px', sm: 8, md: 8, lg: 8 }}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          sx={{
            '@media (max-width:960px)': {
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              width: '100%',
              gap: '16px',
            },
          }}
        >
          <Flex
            width='386px'
            sx={{
              '@media (max-width:1300px)': {
                width: '285px',
              },
              '@media (max-width:960px)': {
                width: '100%',
              },
            }}
          >
            <Flex
              alignItems='center'
              gap='16px'
              sx={{
                '@media (max-width:960px)': {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              }}
            >
              <Image
                src={assets.raketaIcon}
                alt='raketa icon'
                sx={{
                  '@media (max-width:480px)': {
                    order: '1',
                    width: '36px',
                    height: '36px',
                  },
                }}
              />
              <Heading
                fontSize={{ base: '20px', sm: '26px', md: '30px', lg: '30px' }}
                fontWeight='700'
                lineHeight='120%'
                color='#171923'
              >
                10,000 listings
              </Heading>
            </Flex>
          </Flex>

          <Box width='298px'>
            <Box>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Process automation
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Publish up to 10000 listings
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Valid for 30 days
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box
            width='248px'
            sx={{
              '@media (max-width:1300px)': {
                width: '195px',
              },
            }}
          >
            <Heading
              fontSize={{ base: '18px', sm: '25px', md: '28px', lg: '28px' }}
              fontWeight='600'
              lineHeight='120%'
              color='#171923'
            >
              3900 ₽
            </Heading>
          </Box>

          <Box
            sx={{
              '@media (max-width:480px)': {
                width: '100%',
              },
            }}
          >
            <Link
              to='/auth/register'
              className='outline-link-button'
              style={{ paddingLeft: '24px', paddingRight: '24px' }}
            >
              Get started
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box
        bgColor='#fafafa'
        borderRadius={24}
        py={{ base: '16px', sm: 6, md: 6, lg: 6 }}
        px={{ base: '20px', sm: 8, md: 8, lg: 8 }}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          sx={{
            '@media (max-width:960px)': {
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              width: '100%',
              gap: '16px',
            },
          }}
        >
          <Flex
            width='386px'
            sx={{
              '@media (max-width:1300px)': {
                width: '285px',
              },
              '@media (max-width:960px)': {
                width: '100%',
              },
            }}
          >
            <Flex
              alignItems='center'
              gap='16px'
              sx={{
                '@media (max-width:960px)': {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              }}
            >
              <Image
                src={assets.starsGroup}
                alt='raketa icon'
                sx={{
                  '@media (max-width:480px)': {
                    order: '1',
                    width: '36px',
                    height: '36px',
                  },
                }}
              />
              <Heading
                fontSize={{ base: '20px', sm: '26px', md: '30px', lg: '30px' }}
                fontWeight='700'
                lineHeight='120%'
                color='#171923'
              >
                Unlimited
              </Heading>
            </Flex>
          </Flex>

          <Box width='298px'>
            <Box>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Process automation
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Unlimited publishing
                </Text>
              </Flex>
            </Box>
            <Box mt='8px'>
              <Flex alignItems='center' gap='8px'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z'
                    fill='#4FD1C5'
                  />
                </svg>
                <Text
                  fontSize={{ base: '15px', md: '16px', lg: '16px' }}
                  lineHeight='140%'
                  whiteSpace='nowrap'
                  color='#2D3748'
                >
                  Valid for 30 days
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box
            width='248px'
            sx={{
              '@media (max-width:1300px)': {
                width: '195px',
              },
            }}
          >
            <Heading
              fontSize={{ base: '18px', sm: '25px', md: '28px', lg: '28px' }}
              fontWeight='600'
              lineHeight='120%'
              color='#171923'
            >
              5900 ₽
            </Heading>
          </Box>

          <Box
            sx={{
              '@media (max-width:480px)': {
                width: '100%',
              },
            }}
          >
            <Link
              to='/auth/register'
              className='outline-link-button'
              style={{ paddingLeft: '24px', paddingRight: '24px' }}
            >
              Get started
            </Link>
          </Box>
        </Flex>
      </Box>
    </Box>

    {/* {============================================================================================================================================================================================================================================================ } */}
    <Grid
      gap={{ base: '16px', sm: '30px', md: '30px', lg: '30px' }}
      templateColumns='repeat(2, 1fr)'
      sx={{
        '@media (max-width:1000px)': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      mt='80px'
    >
      <Box
        bgColor='purple.500'
        p='40px'
        borderRadius={32}
        bgImage={assets.subScripImg}
        bgSize='100% 100%'
        bgPosition='top right'
        bgRepeat='no-repeat'
        sx={{
          '@media (max-width:480px)': {
            p: '20px',
            borderRadius: '20px',
            bgPosition: '145px 0px',
          },
        }}
      >
        <Heading
          fontSize={{ base: '18px', sm: '25px', md: '28px', lg: '28px' }}
          fontWeight='700'
          color='#fff'
          lineHeight='120%'
        >
          Try it — free
        </Heading>
        <Text
          color='#fff'
          fontSize={{ se: '18px', sm: '25px', md: '28px', lg: '28' }}
          lineHeight='150%'
          mt={{ base: '12px', sm: '16px', md: '16px', lg: '16px' }}
          mb={{ base: '36px', sm: '28px', md: '28px', lg: '28px' }}
        >
          Create your first account and get 7 days of free access
          to the service.
        </Text>
        <Link
          to='/auth/register'
          className='link-button'
          style={{ backgroundColor: 'white', color: '#805AD5' }}
        >
          Start now
        </Link>
      </Box>
      <Flex
        bgColor='#FAFAFA'
        p='40px'
        borderRadius={32}
        bgImage={assets.subScripImg}
        bgPosition='top right'
        bgRepeat='no-repeat'
        position='relative'
        overflow='hidden'
        sx={{
          '@media (max-width:1000px)': {
            order: '-1',
          },
          '@media (max-width:480px)': {
            p: '20px',
            borderRadius: '20px',
          },
        }}
      >
        <Box>
          <Heading
            fontSize={{ base: '20px', sm: '24px', md: '24px', lg: '24px' }}
            fontWeight='700'
            color='#171923'
            lineHeight='120%'
          >
            Support
          </Heading>
          <Text
            fontSize={{ base: '15px', sm: '16px', md: '16px', lg: '16px' }}
            color='#2D3748'
            lineHeight='150%'
            mt={{ base: '12px', sm: '16px', md: '16px', lg: '16px' }}
            mb='28px'
          >
            We're here for you — write to us and we'll gladly answer all your questions.
          </Text>
          <Link
            to='https://t.me/avito_plus_help'
            className='outline-link-button'
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
          >
            Write on Telegram
          </Link>
        </Box>
        <Box
          sx={{
            '@media (max-width:500px)': {
              position: 'absolute',
              top: '-58px',
              right: '-75px',
            },
          }}
        >
          <Image
            src={assets.ballon}
            width={{ base: '155px', sm: '200px', md: '200px', lg: '200px' }}
            height={{ base: '155px', sm: '150px', md: '150px', lg: '150px' }}
          />
        </Box>
      </Flex>
    </Grid>
  </Box>
);
