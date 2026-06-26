import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Select, Flex } from '@chakra-ui/react';
import { changeSelectedAcc } from '../../redux/slices/slidesSlice';
import { fetchSpecs } from '../../redux/slices/specsSlice.js';
import { removeSpecs } from '../../redux/slices/specsSlice.js';
import { SpecsSelection } from './SpecsSelection';
import { fetchTableData, removeTable } from '../../redux/slices/tableSlice.js';
import { clearSlide } from '../../redux/slices/slidesSlice.js';

export const AccountSelection = (props) => {
  const dispatch = useDispatch();
  const { selectedAcc } = useSelector((state) => state.slides);
  const { token } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);

  const accSelectHandler = async (event) => {
    const { id, value } = event.target.selectedOptions[0];
    const { accid: accID, spreadsheetid: spreadsheetId } =
      event.target.selectedOptions[0].dataset;

    dispatch(removeTable());
    dispatch(clearSlide());
    dispatch(removeSpecs());
    dispatch(changeSelectedAcc(value));
    if (id === 'stub') return;
    dispatch(fetchTableData({ token, spreadsheetId }));
    dispatch(fetchSpecs({ token, accID }));
  };

  return (
    <Flex
      gap={{ base: '20px', sm: 6 }}
      width={{ base: '100%', lg: 'auto' }}
      flexDir={{ base: 'column', sm: 'row' }}
    >
      <Box width={{ base: '100%', lg: 'auto' }}>
        <Text mb={2}>Account</Text>
        <Select
          bg='white'
          border='1px'
          borderColor='gray.200'
          width='320px'
          focusBorderColor='gray.200'
          className='not-shadow'
          onChange={accSelectHandler}
          value={selectedAcc}
        >
          <option key={0} id='stub' value='stub'>
            Select an account
          </option>
          {accounts.map((account) => (
            <option
              key={account._id}
              data-accid={account._id}
              data-spreadsheetid={account.table_id}
              value={account.title}
            >
              {account.title}
            </option>
          ))}
        </Select>
      </Box>
      <SpecsSelection changePaginationPage={props.changePaginationPage} />
    </Flex>
  );
};
