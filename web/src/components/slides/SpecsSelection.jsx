import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Select, Spinner } from '@chakra-ui/react';
import {
  showSlide,
  hideSlide,
  changeSelectedSpec,
  changePage,
} from '../../redux/slices/slidesSlice';
import { createTableObject } from '../../redux/slices/tableSlice.js';
import { updateCurrSpecData } from '../../redux/slices/specsSlice.js';

export const SpecsSelection = (props) => {
  const { changePaginationPage } = props;
  const { selectedSpec } = useSelector((state) => state.slides);
  const { isTableDataLoaded, isTableDataLoading } = useSelector(
    (state) => state.table,
  );
  const { specs, isSpecsLoading } = useSelector((state) => state.specs);
  const dispatch = useDispatch();

  const specSelectHandler = (event) => {
    const { id, value } = event.target.selectedOptions[0];
    const {
      sheetid: sheetID,
      accid: accID,
      specid: specID,
    } = event.target.selectedOptions[0].dataset;

    dispatch(changeSelectedSpec(value));
    if (id === 'stub') {
      dispatch(hideSlide());
      return;
    }
    dispatch(showSlide());
    dispatch(createTableObject({ sheetID }));
    dispatch(updateCurrSpecData({ accID, specID }));
    dispatch(changePage(1));
    changePaginationPage(1);
  };

  const createSpecsSelect = () => (
    <Box width={{ base: '100%', lg: 'auto' }}>
      <Text mb={2}>Category</Text>
      <Select
        bg='white'
        border='1px'
        borderColor='gray.200'
        width={{ base: '100%', lg: '320px' }}
        focusBorderColor='gray.200'
        className='not-shadow'
        onChange={specSelectHandler}
        value={selectedSpec}
      >
        <option key={0} id='stub' value='stub'>
          Select a category
        </option>
        {specs.map((spec) => (
          <option
            key={spec._id}
            data-sheetid={spec.sheet_id}
            data-accid={spec.acc_id}
            data-specid={spec._id}
            value={spec.category}
          >
            {spec.category}
          </option>
        ))}
      </Select>
    </Box>
  );

  if (isTableDataLoading || isSpecsLoading) {
    return (
      <Box width={{ base: '100%', lg: 'auto' }}>
        <Spinner marginLeft={110} marginTop={10} />
      </Box>
    );
  }
  return isTableDataLoaded ? createSpecsSelect() : null;
};
