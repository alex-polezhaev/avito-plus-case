import React, { useState, Fragment } from 'react';
import { Box, Text, Heading, Flex, Button } from '@chakra-ui/react';

export const SlideDesc = (props) => {
  const { title, price, description } = props;

  const [show, setShow] = useState(false);
  const showMoreText = () => {
    setShow(!show);
  };

  let validDescription = null;
  if (!description) {
    validDescription = 'No description';
  } else if (description.length <= 180) {
    validDescription = (
      <Box
        color='gray.900'
        lineHeight='19px'
        maxWidth={{ base: '100%', md: '375px' }}
      >
        {description}
      </Box>
    );
  } else {
    const firstPartOfDescription = description.slice(0, 180);
    const preparedDescription = description.split('\n').map((descPart, i) => {
      let textEl = (
        <Text key={i} display={`${show ? 'initial' : 'none'}`}>
          <br />
          {descPart}
        </Text>
      );
      if (i === 0)
        textEl = (
          <Text key={i} display={`${show ? 'initial' : 'none'}`}>
            {descPart}
          </Text>
        );
      return textEl;
    });
    validDescription = (
      <>
        <Box
          color='gray.900'
          lineHeight='19px'
          maxWidth={{ base: '100%', md: '375px' }}
        >
          <Text display={`${!show ? 'initial' : 'none'}`}>
            {firstPartOfDescription}
          </Text>
          <Text display={`${!show ? 'initial' : 'none'}`} as='span'>
            ...
          </Text>
          {preparedDescription}
        </Box>
        <Button
          flex='flex'
          colorScheme='none'
          height='auto'
          color='purple.500'
          align='center'
          gap='6px'
          cursor='pointer'
          p='0'
          mt='6px'
          onClick={showMoreText}
        >
          {!show ? 'Expand' : 'Collapse'}
          <svg
            width='8'
            height='4'
            viewBox='0 0 8 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            transform={show ? 'rotate(180)' : 'rotate(0)'}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.234229 0.834563C0.384251 0.684586 0.587698 0.600333 0.799829 0.600333C1.01196 0.600333 1.21541 0.684586 1.36543 0.834563L3.99983 3.46896L6.63423 0.834563C6.70803 0.758155 6.7963 0.697209 6.89391 0.655282C6.99151 0.613354 7.09649 0.591285 7.20271 0.590362C7.30893 0.589439 7.41428 0.60968 7.51259 0.649905C7.61091 0.69013 7.70023 0.749532 7.77534 0.824646C7.85046 0.899761 7.90986 0.989082 7.95009 1.0874C7.99031 1.18572 8.01055 1.29106 8.00963 1.39728C8.00871 1.50351 7.98664 1.60848 7.94471 1.70609C7.90278 1.80369 7.84184 1.89197 7.76543 1.96576L4.56543 5.16576C4.41541 5.31574 4.21196 5.39999 3.99983 5.39999C3.7877 5.39999 3.58425 5.31574 3.43423 5.16576L0.234229 1.96576C0.0842524 1.81574 0 1.61229 0 1.40016C0 1.18803 0.0842524 0.984585 0.234229 0.834563Z'
              fill='#805AD5'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.234229 0.834563C0.384251 0.684586 0.587698 0.600333 0.799829 0.600333C1.01196 0.600333 1.21541 0.684586 1.36543 0.834563L3.99983 3.46896L6.63423 0.834563C6.70803 0.758155 6.7963 0.697209 6.89391 0.655282C6.99151 0.613354 7.09649 0.591285 7.20271 0.590362C7.30893 0.589439 7.41428 0.60968 7.51259 0.649905C7.61091 0.69013 7.70023 0.749532 7.77534 0.824646C7.85046 0.899761 7.90986 0.989082 7.95009 1.0874C7.99031 1.18572 8.01055 1.29106 8.00963 1.39728C8.00871 1.50351 7.98664 1.60848 7.94471 1.70609C7.90278 1.80369 7.84184 1.89197 7.76543 1.96576L4.56543 5.16576C4.41541 5.31574 4.21196 5.39999 3.99983 5.39999C3.7877 5.39999 3.58425 5.31574 3.43423 5.16576L0.234229 1.96576C0.0842524 1.81574 0 1.61229 0 1.40016C0 1.18803 0.0842524 0.984585 0.234229 0.834563Z'
              fill='black'
              fillOpacity='0.2'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.234229 0.834563C0.384251 0.684586 0.587698 0.600333 0.799829 0.600333C1.01196 0.600333 1.21541 0.684586 1.36543 0.834563L3.99983 3.46896L6.63423 0.834563C6.70803 0.758155 6.7963 0.697209 6.89391 0.655282C6.99151 0.613354 7.09649 0.591285 7.20271 0.590362C7.30893 0.589439 7.41428 0.60968 7.51259 0.649905C7.61091 0.69013 7.70023 0.749532 7.77534 0.824646C7.85046 0.899761 7.90986 0.989082 7.95009 1.0874C7.99031 1.18572 8.01055 1.29106 8.00963 1.39728C8.00871 1.50351 7.98664 1.60848 7.94471 1.70609C7.90278 1.80369 7.84184 1.89197 7.76543 1.96576L4.56543 5.16576C4.41541 5.31574 4.21196 5.39999 3.99983 5.39999C3.7877 5.39999 3.58425 5.31574 3.43423 5.16576L0.234229 1.96576C0.0842524 1.81574 0 1.61229 0 1.40016C0 1.18803 0.0842524 0.984585 0.234229 0.834563Z'
              stroke='#805AD5'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.234229 0.834563C0.384251 0.684586 0.587698 0.600333 0.799829 0.600333C1.01196 0.600333 1.21541 0.684586 1.36543 0.834563L3.99983 3.46896L6.63423 0.834563C6.70803 0.758155 6.7963 0.697209 6.89391 0.655282C6.99151 0.613354 7.09649 0.591285 7.20271 0.590362C7.30893 0.589439 7.41428 0.60968 7.51259 0.649905C7.61091 0.69013 7.70023 0.749532 7.77534 0.824646C7.85046 0.899761 7.90986 0.989082 7.95009 1.0874C7.99031 1.18572 8.01055 1.29106 8.00963 1.39728C8.00871 1.50351 7.98664 1.60848 7.94471 1.70609C7.90278 1.80369 7.84184 1.89197 7.76543 1.96576L4.56543 5.16576C4.41541 5.31574 4.21196 5.39999 3.99983 5.39999C3.7877 5.39999 3.58425 5.31574 3.43423 5.16576L0.234229 1.96576C0.0842524 1.81574 0 1.61229 0 1.40016C0 1.18803 0.0842524 0.984585 0.234229 0.834563Z'
              stroke='black'
              strokeOpacity='0.2'
            />
          </svg>
        </Button>
      </>
    );
  }

  return (
    <Flex
      gap={{ base: '12px', md: '24px', lg: '30px' }}
      alignItems='start'
      py={8}
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Box flex={1}>
        <Text color='gray.500' lineHeight='19px'>
          Title
        </Text>
        <Heading
          color='gray.900'
          fontSize='24px'
          lineHeight='28px'
          mt='6px'
          mb={6}
        >
          {title?.trim() || 'Title not specified'}
        </Heading>
        <Text color='gray.500' lineHeight='19px' mt={6}>
          Price
        </Text>
        <Heading color='gray.900' fontSize='24px' lineHeight='28px' mt='6px'>
          {price ? `${price} ₽` : 'Price not specified'}
        </Heading>
      </Box>
      <Box flex={1}>
        <Text color='gray.500' lineHeight='19px' mb='6px'>
          Description
        </Text>
        {validDescription}
      </Box>
    </Flex>
  );
};
