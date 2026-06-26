import React from 'react';
import { Badge, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { formatDateDMYNum } from '../../api/dateFormater.js';
import { getShortTariffTitleByPrice } from '../../api/tariffFuncs';
import ModalPaymentSettings from '../modal/ModalPaymentSettings';
import ModalExtendTariff from '../modal/ModalExtendTariff';

const Status = ({ expire_at }) => {
  if (new Date(expire_at) >= new Date()) {
    return (
      <Badge variant='solid' colorScheme='green'>
        Active until {formatDateDMYNum(expire_at)}
      </Badge>
    );
  } else if (new Date(expire_at) <= new Date()) {
    return (
      <Badge variant='solid' colorScheme='orange'>
        Stopped since {formatDateDMYNum(expire_at)}
      </Badge>
    );
  }
};
const SubscriptionAccTable = () => {
  const { accounts } = useSelector((state) => state.accounts);

  return accounts?.map((acc, i) => {
    if (!acc?.archived) {
      return (
        <Flex
          key={i}
          py='12px'
          borderTop='1px solid #E2E8F0'
          alignItems='center'
          sx={{
            '@media (max-width: 1000px)': {
              flexDirection: 'column',
              alignItems: 'start',
              bgColor: 'white',
              borderRadius: '12px',
              p: '20px',
              border: 'none',
            },
          }}
        >
          <Text
            width='350px'
            display='none'
            sx={{
              '@media (max-width: 1000px)': {
                display: 'block',
                width: 'fit-content',
              },
            }}
            fontSize='12px'
            color='gray.600'
            lineHeight='16px'
            fontWeight='700'
            mb='4px'
          >
            ACCOUNT
          </Text>
          <Text
            width='350px'
            sx={{
              '@media (max-width: 1300px)': {
                width: '250px',
              },
              '@media (max-width: 1000px)': {
                pl: 0,
                width: '100%',
                pb: '12px',
                borderBottom: '1px solid #E2E8F0',
              },
            }}
            fontSize={{ base: '14px', lg: '16px' }}
            color='gray.700'
            lineHeight='16px'
            fontWeight='500'
            pl='20px'
          >
            {acc.title}
          </Text>
          <Text
            width='350px'
            display='none'
            sx={{
              '@media (max-width: 1000px)': {
                display: 'block',
                width: 'fit-content',
              },
            }}
            fontSize='12px'
            color='gray.600'
            lineHeight='16px'
            fontWeight='700'
            mt='12px'
            mb='4px'
          >
            TARIFF
          </Text>
          <Flex
            gap='10px'
            alignItems='center'
            fontSize={{ base: '14px', lg: '16px' }}
            color='gray.700'
            lineHeight='16px'
            flexWrap='wrap'
            fontWeight='500'
            pl='20px'
            width='350px'
            sx={{
              '@media (max-width: 1300px)': {
                width: '250px',
              },
              '@media (max-width: 1000px)': {
                width: '100%',
                pl: '0',
                borderBottom: '1px solid #E2E8F0',
                pb: '12px',
              },
              '@media (max-width: 480px)': {
                justifyContent: 'space-between',
              },
            }}
          >
            {getShortTariffTitleByPrice(acc.month_price)}
            <Status expire_at={acc?.expire_at} />
          </Flex>
          <Text
            width='350px'
            display='none'
            sx={{
              '@media (max-width: 1000px)': {
                display: 'block',
                width: 'fit-content',
              },
            }}
            fontSize='12px'
            color='gray.600'
            lineHeight='16px'
            fontWeight='700'
            mt='12px'
            mb='4px'
          >
            COST
          </Text>
          <Text
            width='270px'
            fontSize={{ base: '14px', lg: '16px' }}
            color='gray.700'
            lineHeight='16px'
            fontWeight='500'
            pl='20px'
            sx={{
              '@media (max-width: 1000px)': {
                width: '100%',
                pl: '0',
                pb: '20px',
              },
            }}
          >
            {acc.month_price} rub / mo.
          </Text>
          <Flex
            gap='10px'
            sx={{
              '@media (max-width: 1000px)': {
                flexDirection: 'column',
                width: '100%',
              },
            }}
          >
            <ModalExtendTariff acc={acc} />
            <ModalPaymentSettings acc={acc} />
          </Flex>
        </Flex>
      );
    }
  });
};

export default SubscriptionAccTable;
