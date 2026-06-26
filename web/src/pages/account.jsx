import React from 'react';
import { YourAccounts } from '../components/account/your-accounts';
import ModalNewAcc from '../components/modal/ModalNewAcc.jsx';
import { Footer } from '../layout';
import { AccountHeader } from '../layout/account-header';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { switchArchived } from '../redux/slices/userSlice.js';
import ZeroAccounts from '../components/EndPoints/ZeroAccounts.jsx';

export const Account = () => {
  const { token, archived } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  if (!accounts[0]?.title && token) {
    return (
      <>
        <Box className='main container' mb={79}>
          <AccountHeader />
          <ZeroAccounts />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <Box>
      <AccountHeader />

      <Box className='main' bgColor='#fafafa'>
        <div className='container'>
          <Box>
            <Flex
              justifyContent='space-between'
              alignItems='center'
              pt='40px'
              mb='32px'
              flexWrap='wrap'
              gap='24px'
            >
              <Heading
                fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
                fontWeight='700'
                color='#171923'
                lineHeight='120%'
              >
                Your accounts
              </Heading>
              <Flex gap='25px'>
                <Flex>
                  <ModalNewAcc />
                </Flex>

                <FormControl display='flex' alignItems='center'>
                  <FormLabel
                    sx={{
                      '@media (max-width: 480px)': {
                        fontSize: '14px',
                      },
                    }}
                    color='#171923'
                    htmlFor='email-alerts'
                    mb='0'
                  >
                    Archived
                  </FormLabel>
                  <Switch
                    size='md'
                    colorScheme={'purple'}
                    isChecked={archived}
                    onChange={() => dispatch(switchArchived())}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </Box>

          <YourAccounts />
        </div>
      </Box>
      <Footer />
    </Box>
  );
};
