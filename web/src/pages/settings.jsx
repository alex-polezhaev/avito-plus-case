import React from 'react';
import { Box } from '@chakra-ui/react';
import { AccountHeader } from '../layout/account-header';
import { Footer } from '../layout';
import { UserSettings } from '../components/user-settings/user-settings';

export const Settings = () => {
  return (
    <Box bgColor='#fafafa'>
      <AccountHeader />
      <Box className='container main'>
        <UserSettings />
      </Box>
      <Footer />
    </Box>
  );
};
