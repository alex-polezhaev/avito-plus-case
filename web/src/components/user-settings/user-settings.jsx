import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Box, Heading, Text, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ModalChangeName from '../modal/ModalChangeName';
import { fetchUserData } from '../../redux/slices/userSlice';
import ModalAcceptLogout from '../modal/ModalAcceptLogout';
import ModalChangePass from '../modal/ModalChangePass';
import ModalTelegram from '../modal/ModalTelegram';

export const UserSettings = () => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserData(token));
    }
  }, []);

  return (
    <Box mb={{ base: '80px', md: '0', lg: '0' }}>
      <Flex
        justifyContent='space-between'
        p={{
          base: '36px 0 28px 0',
          sm: '35px 0 28px 0',
          md: '44px 0 32px 0',
          lg: '44px 0 32px 0',
        }}
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'start', lg: 'center' }}
        gap={{ base: '12px', lg: '0' }}
      >
        <Heading
          fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
          fontWeight='700'
          color='#171923'
          lineHeight='120%'
        >
          User settings
        </Heading>
        <ModalAcceptLogout />
      </Flex>

      <Flex
        borderRadius='12px'
        p={{ base: '0 0', md: '20px 32px', lg: '20px 32px' }}
        gap={{ base: '12px', sm: '20px', md: '20px', lg: '20px' }}
        mb={{ base: '28px', sm: '24px', md: '24px', lg: '24px' }}
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        alignItems={{ base: 'start', md: 'end', lg: 'end' }}
        bgColor={{ base: 'transparent', md: 'white', lg: 'white' }}
      >
        <Box
          p={{ base: '20px', md: '0', lg: '20px 32px' }}
          borderRadius={{ base: '12px', md: '0', lg: '0' }}
          width={{ base: '100%', md: 'auto', lg: 'auto' }}
          bgColor='white'
          flex='1 1 0'
          sx={{
            '@media (max-width:1300px)': {
              px: '0',
            },
            '@media (max-width:768px)': {
              px: '20px',
            },
          }}
        >
          <Text lineHeight='120%' color='#171923' mb='8px'>
            Name
          </Text>
          <Box
            position='relative'
            sx={{
              '@media (max-width:1300px)': {
                maxWidth: '326px',
              },
              '@media (max-width:768px)': {
                maxWidth: '100%',
              },
            }}
          >
            <Input
              placeholder={user?.firstname}
              width='100%'
              _focusVisible={{
                boxShadow: 'none',
                borderColor: 'gray.200',
                outline: 'none',
              }}
              _placeholder={{
                color: '#2D3748',
              }}
              isReadOnly
            />
            <ModalChangeName />
          </Box>
        </Box>

        <Box
          p={{ base: '20px', md: '0', lg: '20px 32px' }}
          borderRadius={{ base: '12px', md: '0', lg: '0' }}
          width={{ base: '100%', md: 'auto', lg: 'auto' }}
          bgColor='white'
          flex='1 1 0'
          sx={{
            '@media (max-width:1300px)': {
              px: '0',
            },
            '@media (max-width:768px)': {
              px: '20px',
            },
          }}
        >
          <Text lineHeight='120%' color='#171923' mb='8px'>
            Email
          </Text>
          <Box
            position='relative'
            sx={{
              '@media (max-width:1300px)': {
                maxWidth: '326px',
              },
              '@media (max-width:768px)': {
                maxWidth: '100%',
              },
            }}
          >
            <Input
              placeholder={user?.email}
              width='100%'
              color='#2D3748'
              borderColor='gray.100'
              bgColor='gray.100'
              border='none'
              _focusVisible={{
                boxShadow: 'none',
                borderColor: 'gray.200',
                outline: 'none',
              }}
              _placeholder={{
                color: '#2D3748',
              }}
              isReadOnly
            />
          </Box>
        </Box>
        <Box
          p={{ base: '20px', md: '0', lg: '20px 32px' }}
          borderRadius={{ base: '12px', md: '0', lg: '0' }}
          width={{ base: '100%', md: 'auto', lg: 'auto' }}
          bgColor={'white'}
          sx={{
            '@media (max-width:1300px)': {
              px: '0',
            },
            '@media (max-width:768px)': {
              px: '20px',
            },
          }}
        >
          <ModalChangePass />
        </Box>
      </Flex>

      <Box
        bgColor='white'
        borderRadius='12px'
        p={{ base: '16px 20px', md: '20px 32px', lg: '20px 32px' }}
      >
        <Heading
          fontSize='20px'
          color='#171923'
          fontWeight='700'
          lineHeight='120%'
          mb='20px'
          sx={{
            '@media (max-width: 400px)': {
              display: 'none',
            },
          }}
        >
          Telegram connection settings
        </Heading>
        <Flex
          alignItems={{
            base: 'center',
            sm: 'start',
            md: 'center',
            lg: 'center',
          }}
          flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
          gap={{ base: '16px', md: '24px', lg: '24px' }}
        >
          <Link to='#!'>
            <ModalTelegram />
          </Link>
          <Box
            sx={{
              '@media (max-width: 768px)': {
                order: '-1',
              },
            }}
          >
            <Text
              fontSize='14px'
              color='gray.500'
              lineHeight='20px'
              display='block'
            >
              Get up-to-date information about your accounts in Telegram
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
