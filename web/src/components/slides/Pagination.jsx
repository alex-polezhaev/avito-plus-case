import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Image, Flex, Button, Input } from '@chakra-ui/react';
import assets from '../../assets';
import { changePage } from '../../redux/slices/slidesSlice.js';

export const Pagination = (props) => {
  const { inputPage, changeInputPage } = props;
  const { page } = useSelector((state) => state.slides);
  const { numOfAds } = useSelector((state) => state.table);
  const [opacityL, changeOpacityL] = useState(page === 1 ? 0.4 : 1);
  const [opacityR, changeOpacityR] = useState(page === numOfAds ? 0.4 : 1);
  const dispatch = useDispatch();

  const validate = (page) => {
    if (!(page >= 1 && page <= numOfAds)) {
      return false;
    }
    return true;
  };

  const changeOpacity = (newPage) => {
    if (newPage === 1) changeOpacityL(0.4);
    else changeOpacityL(1);

    if (newPage === numOfAds) changeOpacityR(0.4);
    else changeOpacityR(1);
  };

  useEffect(() => {
    changeOpacity(page);
  });

  const clickHandler = (event) => {
    const { id } = event.target;
    let newPage = page;
    if (id === 'left' && page > 1) newPage = page - 1;
    else if (id === 'right' && page < numOfAds) newPage = page + 1;
    changeOpacity(newPage);
    changeInputPage(newPage);
    dispatch(changePage(newPage));
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    changeInputPage(value);
    const newPage = Number(value);
    if (validate(newPage)) {
      dispatch(changePage(newPage));
      changeOpacity(newPage);
    }
  };

  return (
    <Box>
      <Flex align='center' gap={5} mt={8}>
        <Text lineHeight='19px' color='gray.500'>
          Total {numOfAds}
        </Text>
        <Flex gap='6px'>
          <Button
            variant='outline'
            borderRadius='8px'
            borderColor='#919EAB52'
            rotate='180deg'
            _hover={{ borderColor: 'purple.500', bgColor: '#f0edf7' }}
            id='left'
            onClick={clickHandler}
          >
            <Image
              transform='rotate(180deg)'
              src={assets.nextIcon}
              id='left'
              onClick={clickHandler}
              opacity={opacityL}
            />
          </Button>
          <Input
            variant='outline'
            color='#212B36'
            borderColor='#919EAB52'
            borderRadius='8px'
            _hover={{ borderColor: 'purple.500', bgColor: '#f0edf7' }}
            width='100px'
            name='page'
            value={inputPage}
            onChange={changeHandler}
            style={{ fontWeight: 600, textAlign: 'center' }}
          />
          <Button
            variant='outline'
            color='#212B36'
            borderRadius='8px'
            colorScheme='gray'
            _hover={{ borderColor: 'purple.500', bgColor: '#f0edf7' }}
            id='right'
            onClick={clickHandler}
            opacity={opacityR}
          >
            <Image src={assets.nextIcon} id='right' onClick={clickHandler} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
