import React from 'react';
import { Image, GridItem, Spinner } from '@chakra-ui/react';

export const SlideImage = (props) => {
  const { imageURL } = props;
  return (
    <GridItem height={{ base: '145px', sm: '290px', md: '292px', lg: '297px' }}>
      <Image
        src={imageURL}
        alt='Image'
        objectFit='cover'
        borderRadius='12px'
        width='100%'
        height='100%'
        fallback={<Spinner />}
      />
    </GridItem>
  );
};
