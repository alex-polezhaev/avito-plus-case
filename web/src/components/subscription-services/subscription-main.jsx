import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Grid,
  useToast,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import SubscriptionAccTable from '../SubscriptionTables/SubscrAccTable';
import ModalPayment from '../modal/ModalPayment';
import ModalTelegram from '../modal/ModalTelegram';
import { fetchUserData } from '../../redux/slices/userSlice';
import { getAccs } from '../../redux/slices/accountsSlice';
import SubscriptionTransactionsTable from '../SubscriptionTables/SubscrTransTable';

export const SubscriptionMain = () => {
  const [, setElAmount] = useState(5);
  const { user, token } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const transactions = user?.transactions;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserData(token));
      dispatch(getAccs(token));
    }
    if (searchParams.get('positiveToast')) {
      toast({
        title: 'You have topped up your balance successfully',
        description: `Balance topped up by ${searchParams.get('positiveToast')} rub.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        colorScheme: 'purple',
      });
    }
    if (searchParams.get('negativeToast')) {
      toast({
        title: 'Failed to top up balance',
        description: `Error topping up balance by ${searchParams.get('negativeToast')} rub.`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        colorScheme: 'orange',
      });
    }
  }, [dispatch, token, user?.id, searchParams, toast]);

  return (
    <Box pt='44px'>
      <Heading
        fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
        fontWeight='700'
        color='#171923'
        lineHeight='120%'
      >
        Service subscription
      </Heading>
      <Flex
        m='32px 0 24px 0'
        gap='30px'
        sx={{
          '@media (max-width: 950px)': {
            gap: '20px',
            flexDirection: 'column',
          },
        }}
      >
        <Flex
          bgColor='white'
          borderRadius='12px'
          alignItems='center'
          px='32px'
          py='20px'
          justifyContent='space-between'
          maxWidth='451px'
          width='100%'
          sx={{
            '@media (max-width: 1300px)': {
              maxWidth: '32%',
            },
            '@media (max-width: 950px)': {
              maxWidth: '100%',
            },
            '@media (max-width: 550px)': {
              px: '20px',
              py: '16px',
            },
          }}
        >
          <Box>
            <Text
              fontSize={{ base: '12px', sm: '16px', md: '16px', lg: '16px' }}
              fontWeight={500}
              color='gray.700'
              lineHeight='20px'
              display='block'
            >
              Your balance
            </Text>
            <Heading
              fontSize={{ base: '18px', sm: '24px', md: '24px', lg: '24px' }}
              fontWeight={600}
              color='gray.700'
              lineHeight='32px'
            >
              {user?.balance} rub.
            </Heading>
          </Box>
          <ModalPayment
            button={'Top up'}
            colorScheme='purple'
            variant={'solid'}
          />
        </Flex>
        <Flex
          bgColor='white'
          borderRadius='12px'
          alignItems='center'
          px='32px'
          py='20px'
          justifyContent='space-between'
          width='100%'
          gap='22px'
          sx={{
            '@media (max-width: 550px)': {
              flexDirection: 'column',
              alignItems: 'start',
              px: '20px',
              py: '16px',
            },
          }}
        >
          <Box
            sx={{
              '@media (max-width:480px)': {
                width: '100%',
              },
            }}
          >
            <Link to='#!'>
              <ModalTelegram />
            </Link>
          </Box>
          <Box
            sx={{
              '@media (max-width: 550px)': {
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
      </Flex>

      <Box
        bgColor='white'
        borderRadius='12px'
        p='12px'
        sx={{
          '@media (max-width:1000px)': {
            bgColor: 'transparent',
            p: '0',
            borderRadius: '0',
          },
        }}
      >
        <Flex flexDirection='column'>
          <Flex
            py='12px'
            sx={{
              '@media (max-width:1000px)': {
                display: 'none',
              },
            }}
          >
            <Text
              width='350px'
              sx={{
                '@media (max-width: 1300px)': {
                  width: '220px',
                },
              }}
              fontSize='12px'
              color='gray.600'
              lineHeight='16px'
              fontWeight='700'
              pl='20px'
            >
              ACCOUNT
            </Text>
            <Text
              fontSize='12px'
              color='gray.600'
              lineHeight='16px'
              fontWeight='700'
              pl='20px'
              width='350px'
              sx={{
                '@media (max-width: 1300px)': {
                  width: '220px',
                },
              }}
            >
              TARIFF
            </Text>
            <Text
              width='270px'
              fontSize='12px'
              color='gray.600'
              lineHeight='16px'
              fontWeight='700'
              pl='20px'
            >
              COST
            </Text>
          </Flex>

          <Flex
            flexDirection='column'
            sx={{
              '@media (max-width:1000px)': {
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              },
            }}
          >
            <SubscriptionAccTable />
          </Flex>
        </Flex>
      </Box>

      <Flex
        mt={{ base: '80px', sm: '56px', md: '56px', lg: '56px' }}
        mb={{ base: '20px', sm: '23px', md: '23px', lg: '23px' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Heading
          fontSize={{ base: '22px', sm: '24px', md: '24px', lg: '24px' }}
          fontWeight={700}
          lineHeight='120%'
          color='gray.900'
        >
          Payment history
        </Heading>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          gap='10px'
          sx={{
            '@media (max-width:711px)': {
              display: 'none',
            },
          }}
        >
          <Text
            fontSize='14px'
            fontWeight={400}
            lineHeight='20px'
            color='gray.500'
          >
            Show per page:
          </Text>
          <Tabs variant='solid-rounded' colorScheme='purple' size={'sm'}>
            <TabList>
              <Tab onClick={() => setElAmount(5)}>5</Tab>
              <Tab onClick={() => setElAmount(20)}>20</Tab>
              <Tab onClick={() => setElAmount(50)}>50</Tab>
              <Tab onClick={() => setElAmount(transactions?.length)}>All</Tab>
            </TabList>
          </Tabs>
        </Flex>
      </Flex>

      <Box
        mb={{ base: '80px', md: '100px', lg: '108px' }}
        bgColor='white'
        borderRadius='12px'
        p='12px'
        sx={{
          '@media (max-width: 815px)': {
            bgColor: 'transparent',
            p: '0',
            borderRadius: '0',
          },
        }}
      >
        <Flex
          flexDirection='column'
          sx={{
            '@media (max-width: 815px)': {
              gap: '12px',
            },
          }}
        >
          <Grid
            py='12px'
            gridTemplateColumns='repeat( auto-fit, minmax(250px, 1fr) )'
            sx={{
              '@media (max-width: 815px)': {
                display: 'none',
              },
            }}
          >
            <Text
              fontSize='12px'
              color='gray.600'
              lineHeight='16px'
              fontWeight='700'
              pl='20px'
            >
              NAME
            </Text>
            <Text
              fontSize='12px'
              color='gray.600'
              lineHeight='16px'
              fontWeight='700'
              pl='20px'
            >
              TRANSACTION
            </Text>
            <Text
              fontSize='12px'
              color='gray.600'
              lineHeight='16px'
              fontWeight='700'
              pl='20px'
            >
              DATE
            </Text>
          </Grid>

          <SubscriptionTransactionsTable />
        </Flex>
      </Box>
    </Box>
  );
};
