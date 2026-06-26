import React from 'react';
import { Footer, Header } from '../layout';
import { Heading, Text, Box } from '@chakra-ui/react';

export const Policy = () => {
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
          TERMS OF SERVICE
        </Heading>

        <Box my='12px'>
          <Text mb={3}>
            This is a placeholder Terms of Service document for the Avito Plus
            web application. In production this page contained the full public
            offer agreement. It has been replaced here with generic placeholder
            text so this portfolio repository contains no personal or financial
            details.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            1. Subject
          </Heading>
          <Text mb={3}>
            Avito Plus grants the user the right to use the service for managing
            and duplicating marketplace listings through Google Sheets, subject
            to these terms.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            2. Subscription and payment
          </Heading>
          <Text mb={3}>
            Access to the service is provided on a paid subscription basis
            according to the selected tariff. Tariffs and prices are shown in the
            application. A free trial period may be offered for new accounts.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            3. Obligations of the parties
          </Heading>
          <Text mb={3}>
            The user is responsible for the content of their listings and for
            complying with the rules of the marketplace and applicable law. The
            service is provided on an &quot;as is&quot; basis.
          </Text>

          <Heading as='h2' fontSize='22px' mt={8} mb={2}>
            4. Contact
          </Heading>
          <Text mb={3}>
            For any questions regarding these terms, please contact support
            through the application.
          </Text>
        </Box>
      </div>
      <Box h={20}></Box>
      <Footer />
    </>
  );
};
