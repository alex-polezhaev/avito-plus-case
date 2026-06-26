import React from 'react';
import { Footer, Header } from '../layout';
import { Heading, Text, Box } from '@chakra-ui/react';

export const Privacy = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Heading
          textAlign={'center'}
          mt='50px'
          fontSize={{ base: '20px', md: '30px', lg: '30px' }}
          my={10}
        >
          PRIVACY POLICY
        </Heading>

        <Box my='12px'>
          <Text mb={3}>
            This is a placeholder Privacy Policy for the Avito Plus web
            application. In production this page contained the full privacy
            policy. It has been replaced here with generic placeholder text so
            this portfolio repository contains no personal or contact details.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            1. Data we collect
          </Heading>
          <Text mb={3}>
            We collect the account data you provide (such as your name and
            email), the marketplace account credentials you connect, and usage
            data needed to operate the service.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            2. How we use data
          </Heading>
          <Text mb={3}>
            Collected data is used solely to provide and improve the service —
            authenticating users, managing listings, processing payments, and
            providing support.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            3. Data sharing
          </Heading>
          <Text mb={3}>
            We do not sell your personal data. Data may be shared with
            third-party services (such as the marketplace API and Google Sheets)
            only as required to deliver the functionality you request.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            4. Your rights
          </Heading>
          <Text mb={3}>
            You may request access to, correction of, or deletion of your
            personal data at any time by contacting support.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            5. Contact
          </Heading>
          <Text mb={3}>
            For privacy-related questions, please contact support through the
            application.
          </Text>
        </Box>
      </div>
      <Box h={20}></Box>
      <Footer />
    </>
  );
};
