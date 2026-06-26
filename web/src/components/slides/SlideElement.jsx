import React from 'react';
import { Box, Text, Flex, Textarea } from '@chakra-ui/react';

export const SlideElement = (props) => {
  const { title, value } = props;
  let preparedValue = (
    <Text
      color='gray.900'
      fontSize={{ base: '14px', md: '16px' }}
      fontWeight={500}
      lineHeight='19px'
      minWidth='fit-content'
    >
      {value}
    </Text>
  );
  if (value && value.length > 50) {
    preparedValue = (
      <Textarea
        color='gray.900'
        fontSize={{ base: '14px', md: '16px' }}
        fontWeight={500}
        height='18px'
        readOnly
        defaultValue={value}
      />
    );
  }
  return (
    <Flex alignItems='end'>
      <Text
        color='gray.700'
        fontSize={{ base: '14px', md: '16px' }}
        lineHeight='19px'
        whiteSpace='nowrap'
      >
        {title}
      </Text>
      <Box border='1px dashed #e2e8f0' width='100%' />
      {preparedValue}
    </Flex>
  );
};
