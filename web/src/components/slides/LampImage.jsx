import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import assets from '../../assets';

export const LampImage = () => {
  return (
    <Box
      position='relative'
      mt={{ base: '50px', lg: '98px' }}
      mb={{ base: '80px', md: '112px', lg: '342px' }}
      textAlign='center'
    >
      <Image
        src={assets.lineArrow}
        position='absolute'
        top={{ base: '0', sm: '70px', md: '86px', lg: '33px' }}
        left={{
          base: '20px !important',
          sm: '10% !important',
          md: '20% !important',
          lg: '24% !important',
        }}
        sx={{
          '@media (max-width:480px)': {
            transform: 'rotate(60deg)',
            left: '20px !important',
          },
          '@media (max-width:1300px)': {
            left: '15% !important',
          },
          '@media (max-width:992px)': {
            left: '10% !important',
          },
        }}
        width={{ base: '140px', sm: 'auto', md: '200px', lg: '237px' }}
        height={{ base: '140px', md: '200px', lg: '252px' }}
        className='lamp__arrow-img'
      />
      <Image
        src={assets.lamp2}
        alt='lamp icon'
        width={{ base: '100%', sm: '600px', md: '500px', lg: '678px' }}
        height={{
          sm: '500px',
          md: '500px',
          lg: '600px',
        }}
        mx='auto'
        objectFit='contain'
        className='lamp-img'
      />
    </Box>
  );
};
