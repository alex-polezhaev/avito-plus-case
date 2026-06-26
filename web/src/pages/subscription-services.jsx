import React from 'react';
import { Footer } from '../layout';
import { AccountHeader } from '../layout/account-header';
import { SubscriptionMain } from '../components/subscription-services/subscription-main';
import { Box } from '@chakra-ui/react';
export const SubscriptionServices = () => {
  return (
    <Box bgColor='#fafafa'>
      <AccountHeader />
      <Box className='main container'>
        <SubscriptionMain />
      </Box>
      <Footer />
    </Box>
  );
};
