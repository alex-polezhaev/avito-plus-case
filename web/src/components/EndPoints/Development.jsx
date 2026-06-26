import React from 'react';
import { Box, Heading, Text, Button, Image, Center } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Development = () => {
  return (
    <>
      <Box textAlign='center' py={10} px={6}>
        <Heading
          display='inline-block'
          as='h2'
          size='2xl'
          bgGradient='linear(to-r, purple.400, purple.600)'
          backgroundClip='text'
        >
          DEVELOPMENT
        </Heading>
        <Text fontSize='18px' mt={3} mb={2}>
          Page under development
        </Text>
        <Text color={'gray.500'} mb={6}>
          We are currently building this page
        </Text>
        <NavLink to='/accounts'>
          <Button
            colorScheme='purple'
            bgGradient='linear(to-r, purple.400, purple.500, purple.600)'
            color='white'
            variant='solid'
          >
            Accounts
          </Button>
        </NavLink>
        <Center>
          <Box boxSize={'xl'}>
            <Image src='/media/beta.jpg'></Image>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Development;
