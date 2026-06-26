import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import assets from '../../assets';
import { Link } from 'react-router-dom';

const boxPropery = {
  backgroundColor: '#FAFAFA',
  borderRadius: 32,
  className: 'home-intro__section',
};

export const Welcome = () => (
  <Box
    style={boxPropery}
    px='40px'
    pt='64px'
    position='relative'
    mb='312px'
    mt={5}
    sx={{
      '@media (max-width: 480px)': {
        px: '20px',
        pt: '28px',
        borderRadius: '20px !important',
      },
    }}
  >
    <Box pb='196px'>
      <Box
        fontSize={{ base: '22px', md: '60px', lg: '72px' }}
        fontWeight='700'
        lineHeight='110%'
      >
        <Flex alignItems='center' justifyContent='center'>
          Promote
          <Image
            mx={4}
            src={assets.avitoLogo}
            alt='avito logo'
            style={{ display: 'inline-block' }}
            sx={{
              '@media (max-width:768px)': {
                width: '88px',
              },
            }}
          />
          —
        </Flex>
        <Text textAlign='center' lineHeight='150%'>
          Manage your listings
        </Text>
      </Box>
      <Text
        fontSize='lg'
        width={616}
        mx='auto'
        py={31}
        textAlign='center'
        sx={{
          '@media screen and (max-width: 750px)': {
            width: '100%',
            textAlign: 'center',
            fontSize: '15px',
            py: '20px',
          },
        }}
      >
        Use Google Sheets to manage your Avito accounts. Add,
        clone and edit listings in a couple of clicks.
      </Text>
      <Flex justifyContent='center' className='media-mb'>
        <Link to='auth/register' className='link-button media-full h-48'>
          <Image
            src={assets.lightning}
            alt='liglightning icon'
            display={'inline-block'}
          />
          Start now
        </Link>
      </Flex>
    </Box>
    <Flex
      justifyContent='space-between'
      gap='40px'
      position='absolute'
      width='100%'
      left='0'
      bottom='-175px'
      px='96px'
      className='welcome-card'
      sx={{
        '@media screen and (max-width: 1300px)': {
          bottom: '-240px',
          px: '25px',
        },
        '@media screen and (max-width: 768px)': {
          maxWidth: '100%',
          flexDirection: 'column',
          px: '0',
          bottom: '-400px',
        },
        '@media screen and (max-width: 650px)': {
          bottom: '-445px',
        },
      }}
    >
      <Box
        className='avito-plus__card'
        backgroundColor='white'
        borderRadius={{ base: 20, sm: 32, md: 32, lg: 32 }}
        p={{ base: '20px', md: '32px', lg: '40px' }}
        maxWidth='668px'
        sx={{
          '@media screen and (max-width: 868px)': {
            maxWidth: '60%',
          },
          '@media screen and (max-width: 768px)': {
            maxWidth: '100%',
          },
        }}
        width='100%'
        boxShadow='-40px 40px 80px 0px rgba(145, 158, 171, 0.16), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)'
      >
        <Text
          sx={{
            '@media screen and (max-width: 1300px)': {
              fontSize: '32px',
            },
            '@media screen and (max-width: 868px)': {
              fontSize: '22px',
            },
            '@media screen and (max-width: 480px)': {
              fontSize: '20px',
              textAlign: 'center',
            },
          }}
          fontSize={{ md: '32px', xl: '4xl' }}
          fontWeight='700'
          lineHeight='120%'
        >
          Get more leads <br />— using{' '}
          <span className='purple'>Avito Plus</span>{' '}
        </Text>
        <Flex
          gap={3}
          mt={6}
          sx={{
            '@media screen and (max-width: 868px)': {
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            },
          }}
        >
          <Box
            className='avito-plus__statistics'
            fontSize={'sm'}
            backgroundColor={'#FAFAFA'}
            p={3}
            borderRadius={12}
            maxWidth={{ base: '134px', md: '107px', lg: '137px' }}
            width='100%'
            color='#2D3748'
          >
            <Text fontWeight={500}>Views</Text>
            <Text fontSize='2xl' fontWeight={600} py={1}>
              👀 783
            </Text>
            <Flex gap={1}>
              <Image src={assets.upGreenIcon} alt='up green icon' />
              <Text opacity={0.8}>87.09%</Text>
            </Flex>
          </Box>
          <Box
            className='avito-plus__statistics'
            fontSize={'sm'}
            backgroundColor={'#FAFAFA'}
            p={3}
            borderRadius={12}
            maxWidth={{ base: '134px', md: '107px', lg: '137px' }}
            width='100%'
            color='#2D3748'
          >
            <Text fontWeight={500}>Conversion</Text>
            <Text
              whiteSpace='nowrap'
              fontSize={{ lg: '2xl', md: '24px', base: '18px' }}
              fontWeight={600}
              py={1}
            >
              🔥 23%
            </Text>
            <Flex gap={1}>
              <Image src={assets.upGreenIcon} alt='up green icon' />
              <Text opacity={0.8}>65.31%</Text>
            </Flex>
          </Box>
          <Box
            className='avito-plus__statistics'
            fontSize={'sm'}
            backgroundColor={'#FAFAFA'}
            p={3}
            borderRadius={12}
            maxWidth={{ base: '134px', md: '107px', lg: '137px' }}
            width='100%'
            color='#2D3748'
          >
            <Text fontWeight={500}>Messages</Text>
            <Text fontSize='2xl' fontWeight={600} py={1}>
              💬 34
            </Text>
            <Flex gap={1}>
              <Image src={assets.upGreenIcon} alt='up green icon' />
              <Text opacity={0.8}>79.48%</Text>
            </Flex>
          </Box>
          <Box
            className='avito-plus__statistics'
            fontSize={'sm'}
            backgroundColor={'#FAFAFA'}
            p={3}
            borderRadius={12}
            maxWidth={{ base: '134px', md: '107px', lg: '137px' }}
            width='100%'
            color='#2D3748'
          >
            <Text fontWeight={500}>Favorites</Text>
            <Text fontSize='2xl' fontWeight={600} py={1}>
              💜 45
            </Text>
            <Flex gap={1}>
              <Image src={assets.upGreenIcon} alt='up green icon' />
              <Text opacity={0.8}>55.44%</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box
        maxW='380px'
        width='100%'
        bgImage={assets.plusBg}
        bgColor='#6548aa'
        p={{ base: '20px', md: '32px', lg: '40px' }}
        color='white'
        textAlign='center'
        borderRadius={32}
        sx={{
          '@media screen and (max-width: 768px)': {
            maxWidth: '100%',
          },
        }}
      >
        <Box
          bgColor='white'
          borderRadius={12}
          py={5}
          px={8}
          sx={{
            '@media (max-width: 480px)': {
              py: '12px',
            },
          }}
        >
          <Image
            mx='auto'
            src={assets.googleSheets}
            alt='google sheets full logo'
            sx={{
              '@media (max-width: 480px)': {
                width: '150px',
              },
            }}
          />
        </Box>
        <Text
          fontSize='28px'
          fontWeight={600}
          mt={6}
          sx={{
            '@media (max-width: 480px)': {
              fontSize: '20px',
            },
          }}
        >
          10,000+ listings
        </Text>
        <Text
          lineHeight='150%'
          sx={{
            '@media (max-width: 480px)': {
              fontSize: '14px',
            },
          }}
        >
          With Google Sheets you can post and easily manage
          thousands of listings
        </Text>
      </Box>
    </Flex>
  </Box>
);
