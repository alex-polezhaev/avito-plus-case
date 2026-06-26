import React, { useState } from 'react';
import { Text, Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { formatDateDMYHM } from '../../api/dateFormater';

const SubscriptionTransactionsTable = () => {
  const [elAmount] = useState(5);
  const { user } = useSelector((state) => state.user);
  const transactions = user?.transactions;
  elAmount;

  return transactions?.slice(0, elAmount).map((trans, index) => (
    <Grid
      key={index}
      borderTop='1px solid #E2E8F0'
      flexDirection='column'
      gridTemplateColumns='repeat( auto-fit, minmax(250px, 1fr))'
      sx={{
        '@media (max-width: 568px)': {
          gridTemplateColumns: 'repeat(2, minmax(145px, 1fr))',
        },
        '@media (max-width:815px)': {
          bgColor: 'white',
          borderRadius: '12px',
          p: '20px',
        },
      }}
    >
      <Text
        fontSize='12px'
        color='gray.600'
        lineHeight='16px'
        fontWeight='700'
        pl='20px'
        py='16px'
        display='none'
        sx={{
          '@media (max-width: 815px)': {
            display: 'block',
            pl: '0',
          },
        }}
      >
        NAME
      </Text>
      <Text
        fontSize='14px'
        py='16px'
        color='gray.700'
        lineHeight='16px'
        fontWeight='400'
        pl='20px'
        sx={{
          '@media (max-width: 815px)': {
            textAlign: 'right',
            fontWeight: '500',
            pl: '0',
          },
        }}
      >
        {trans.title}
      </Text>

      <Text
        fontSize='12px'
        color='gray.600'
        lineHeight='16px'
        fontWeight='700'
        borderBottom='1px solid #E2E8F0'
        pl='20px'
        py='16px'
        display='none'
        sx={{
          '@media (max-width: 815px)': {
            display: 'block',
            pl: '0',
          },
        }}
      >
        TRANSACTION
      </Text>
      <Text
        fontSize='14px'
        py='16px'
        color='gray.700'
        lineHeight='16px'
        fontWeight='400'
        pl='20px'
        sx={{
          '@media (max-width: 815px)': {
            textAlign: 'right',
            fontWeight: '500',
          },
        }}
      >
        {trans.transaction} rub
      </Text>

      <Text
        fontSize='12px'
        color='gray.600'
        lineHeight='16px'
        fontWeight='700'
        borderBottom='1px solid #E2E8F0'
        pl='20px'
        py='16px'
        display='none'
        sx={{
          '@media (max-width: 815px)': {
            display: 'block',
            border: 'none',
            pl: '0',
          },
        }}
      >
        DATE
      </Text>
      <Text
        fontSize='14px'
        py='16px'
        color='gray.700'
        lineHeight='16px'
        fontWeight='400'
        pl='20px'
        sx={{
          '@media (max-width: 815px)': {
            textAlign: 'right',
            fontWeight: '500',
            border: 'none',
          },
        }}
      >
        {formatDateDMYHM(trans.date)}
      </Text>
    </Grid>
  ));
};

export default SubscriptionTransactionsTable;
