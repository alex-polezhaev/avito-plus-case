import React from 'react';
import { Heading, Box, Flex, Text, Image } from '@chakra-ui/react';
import assets from '../../assets';
import { Link } from 'react-router-dom';

export const AvitoServices = () => (
  <Box mb={{ base: '80px', md: '100px', lg: '144px' }}>
    <Heading
      fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
      fontWeight='700'
      lineHeight='120%'
      mb={{ base: '20px', sm: '40px', md: '44px', lg: '44px' }}
    >
      <span className='purple'>What can</span> our service do?
    </Heading>
    <Flex
      gap='30px'
      sx={{
        '@media (max-width:768px)': {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        maxWidth={{ md: '50%', lg: '407px' }}
        width='100%'
        bgColor='#FAFAFA'
        px={8}
        pt={8}
        sx={{
          '@media (max-width:480px)': {
            p: '20px 20px 0 20px',
            borderRadius: '20px',
          },
        }}
        borderRadius={32}
        height={{ base: 'auto', md: '546px', lg: '600px' }}
        position='relative'
        overflow='hidden'
      >
        <Heading
          color='#171923'
          fontSize={{ base: '18px', md: '24px', lg: '24px' }}
          fontWeight='700'
          lineHeight='120%'
        >
          Turn 100 pcs  -{'>'} <span className='purple'>1000 pcs</span>
        </Heading>
        <Text
          my='16px'
          color='#2D3748'
          lineHeight='150%'
          fontSize={{ base: '15px', sm: '16px', lg: '16px' }}
        >
          Use the built-in randomizer to create
          unique copies of your listings
        </Text>
        <Link className='outline-link-button' to='/video-instructions'>
          Randomizer
        </Link>
        <Box
          position='absolute'
          sx={{
            '@media (max-width:768px)': {
              position: 'initial',
            },
          }}
          bottom={0}
          height={{ base: '53%', lg: 'auto' }}
        >
          <Image
            src={assets.airpordsGroup}
            alt='airports group'
            display={{ base: 'none', lg: 'block' }}
          />
          <Image
            src={assets.airpodsGroupTwo}
            display={{ base: 'block', lg: 'none' }}
          />
        </Box>
      </Box>
      <Box
        width={{ md: '50%', lg: '100%' }}
        bgColor='#FAFAFA'
        px={8}
        sx={{
          '@media (max-width:480px)': {
            p: '20px 20px 0 20px',
            borderRadius: '20px',
          },
        }}
        pt={8}
        borderRadius={32}
        height={{ base: 'auto', md: '546px', lg: '600px' }}
        position='relative'
        zIndex={1}
      >
        <Heading
          color='#171923'
          fontSize={{ base: '18px', md: '24px', lg: '24px' }}
          fontWeight='700'
          lineHeight='120%'
          maxWidth='540px'
        >
          More listings — <span className='purple'>more leads! </span>
          Post listings like a PRO
        </Heading>
        <Text
          my='16px'
          color='#2D3748'
          lineHeight='150%'
          width={'540px'}
          sx={{
            '@media (max-width:1200px)': {
              width: '100%',
            },
          }}
        >
          Use different publication times, different metro stations and addresses,
          track statistics and enable ads — all without leaving
          the table.
        </Text>
        <Link className='outline-link-button' to='/video-instructions'>
          Avito Plus knowledge base
        </Link>
        <Box
          bottom='0'
          right={{ base: '0', lg: '78px' }}
          width={{ base: '100%', lg: 'auto' }}
          zIndex={-1}
          position='absolute'
          sx={{
            '@media (max-width:768px)': {
              position: 'initial',
            },
            '@media (max-width:480px)': {
              height: '177px',
            },
          }}
        >
          <Image
            src={assets.statistics}
            alt='airports group'
            height='100%'
            mt='16px'
          />
        </Box>
      </Box>
    </Flex>
    <Flex
      gap='30px'
      mt='30px'
      sx={{
        '@media (max-width:768px)': {
          flexDirection: 'column',
        },
        '@media (max-width:480px)': {
          gap: '16px',
        },
      }}
    >
      <Box
        width='100%'
        bgColor='#FAFAFA'
        px={8}
        pt={8}
        borderRadius={32}
        height='522px'
        position='relative'
        overflow='hidden'
        sx={{
          '@media (max-width:480px)': {
            height: '468px',
            p: '20px 20px 0 20px',
            borderRadius: '20px',
          },
        }}
      >
        <Heading
          color='#171923'
          fontSize={{ base: '18px', md: '24px', lg: '24px' }}
          fontWeight='700'
          lineHeight='120%'
        >
          Convenient photo workflow -{'>'}{' '}
          <span className='purple'>Yandex Disk</span>
        </Heading>
        <Text
          my='16px'
          color='#2D3748'
          lineHeight='150%'
          width='540px'
          sx={{
            '@media (max-width:1300px)': {
              width: '100%',
            },
            '@media (max-width:480px)': {
              fontSize: ' 15px',
            },
          }}
        >
          Upload photos into folders, paste the folder names into the table,
          and the photos will upload to Avito automatically.
        </Text>
        <Link to='/video-instructions' className='outline-link-button'>
          Yandex Disk
        </Link>
        <Box
          position='absolute'
          bottom='0'
          left={0}
          sx={{
            '@media (max-width: 1000px)': {
              width: '735px',
            },
            '@media (max-width: 480px)': {
              width: '584px',
            },
          }}
        >
          <Image
            src={assets.allFolders}
            alt='airports group'
            style={{ borderBottomLeftRadius: '32px' }}
          />
        </Box>
      </Box>
      <Box
        maxWidth={{ md: '100%', lg: '407px' }}
        width='100%'
        bgColor='#FAFAFA'
        px={8}
        pt={8}
        borderRadius={32}
        height='522px'
        position='relative'
        overflow='hidden'
        sx={{
          '@media (max-width:480px)': {
            height: '363px',
            p: '20px 20px 0 20px',
            borderRadius: '20px',
          },
        }}
      >
        <Heading
          color='#171923'
          fontSize={{ base: '18px', md: '24px', lg: '24px' }}
          fontWeight='700'
          lineHeight='120%'
        >
          Automation
        </Heading>
        <Text
          mt={{ base: '12px', sm: '16px', md: '16px', lg: '16px' }}
          mb='16px'
          color='#2D3748'
          lineHeight='150%'
          sx={{
            '@media (max-width:480px)': {
              fontSize: ' 15px',
            },
          }}
        >
          Save time — use the built-in randomizer,
        </Text>
        <Link to='/video-instructions' className='outline-link-button'>
          Automation
        </Link>
        <Box
          position='absolute'
          bottom={0}
          right='0'
          sx={{
            '@media (max-width:480px)': {
              width: '215px',
              height: '210px',
            },
          }}
        >
          <Image src={assets.settingsIcon} alt='airports group' />
        </Box>
      </Box>
    </Flex>
  </Box>
);
