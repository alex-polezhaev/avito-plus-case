import React from 'react';
import { Box, Text, Image, Center } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import ModalNewAcc from '../modal/ModalNewAcc.jsx';

const ZeroAccounts = () => {
  return (
    <>
      <Box textAlign='center' py={10} px={6}>
        <Text fontSize='25px' mt={3} mb={2}>
          It looks like you don't have any accounts yet
        </Text>
        <Text color={'gray.500'} mb={6}>
          Create your first account
        </Text>
        <NavLink to='/accounts'>
          <ModalNewAcc />
        </NavLink>
        <Center>
          <Box mt={5} boxSize={'xl'}>
            <Image src='/media/new_acc.png'></Image>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default ZeroAccounts;
