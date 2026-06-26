import React from 'react';
import {
  Wrap,
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  AlertIcon,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';

const AccountAlerts = ({ expire_at, archived, avito, yandex_token }) => {
  let alerts = [];

  if (!yandex_token?.token && !archived) {
    alerts.push(
      <Alert
        width='100%'
        bgColor='#FAF5FF'
        borderRadius='12px'
        alignItems='start'
        key={0}
      >
        <AlertIcon color='purple.500' />
        <Box>
          <Heading lineHeight='24px' fontSize='16px'>
            Connect Yandex Disk
          </Heading>
          <Text lineHeight='140%' color='#2D3748'>
            You can't upload images right now
          </Text>
        </Box>
      </Alert>,
    );
  }

  if (!avito?.id && !archived) {
    alerts.push(
      <Alert
        bgColor='#FAF5FF'
        borderRadius='12px'
        alignItems='start'
        my={2}
        key={1}
      >
        <AlertIcon color='purple.500' />
        <Box>
          <Heading lineHeight='24px' fontSize='16px'>
            Connect Avito
          </Heading>
          <Text lineHeight='140%' color='#2D3748'>
            You can't publish listings right now
          </Text>
        </Box>
      </Alert>,
    );
  }
  if (new Date(expire_at) <= new Date() && !archived) {
    alerts.push(
      <Alert
        status='warning'
        borderRadius='12px'
        alignItems='start'
        sx={{
          '@media (max-width:830px)': {},
        }}
        key={2}
      >
        <AlertIcon />

        <Box>
          <AlertTitle>Subscription has ended</AlertTitle>
          <AlertDescription>
            Pay for a tariff or move the account to the archive
          </AlertDescription>
        </Box>
        <Box>
          <Link href={'subscription-services'}>
            <Button colorScheme='orange' ml={5}>
              Pay for the account
            </Button>
          </Link>
        </Box>
      </Alert>,
    );
  }
  return (
    <>
      <Wrap spacing={1}>{alerts}</Wrap>
    </>
  );
};

export default AccountAlerts;
