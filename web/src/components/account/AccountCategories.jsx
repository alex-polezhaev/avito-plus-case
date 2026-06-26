import React from 'react';
import {
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  Spinner,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import ModalNewSpec from '../modal/ModalNewSpec';
import ModalDelCategory from '../modal/ModalDelCategory';

const createTagLabel = (fullCategory = '', category = '') => {
  const nameParts = fullCategory.split('/');
  let tagLabel = fullCategory;
  if (nameParts.length < 2) {
    tagLabel = category;
  } else {
    tagLabel = nameParts.slice(nameParts.length - 2).join('/');
  }

  if (tagLabel.length > 20) {
    tagLabel = `${tagLabel.slice(0, 21)}...`;
  }
  return tagLabel;
};

const AccountCategories = ({ specsArray, accID }) => {
  let specs = [];
  specs = specsArray?.map((el, index) => {
    const tagLabel = createTagLabel(el.fullName, el.category);
    return (
      <div key={index}>
        <WrapItem>
          <Tag variant='outline' colorScheme='purple'>
            <Tooltip
              hasArrow
              label={el.fullName ? el.fullName : el.category}
              bg='purple.400'
            >
              <Box mr='2px' hidden={!tagLabel?.endsWith('...')}>
                <RxQuestionMarkCircled />
              </Box>
            </Tooltip>
            <TagLabel>{tagLabel ? tagLabel : el.category}</TagLabel>
            {specsArray.length > 1 && <ModalDelCategory specID={el._id} />}
          </Tag>
        </WrapItem>
      </div>
    );
  });

  return (
    <>
      <Wrap>
        {specs && (
          <>
            {specs}
            <WrapItem>
              <ModalNewSpec accID={accID} />
            </WrapItem>
          </>
        )}
        {!specs && <Spinner color='purple' />}
      </Wrap>
    </>
  );
};

export default AccountCategories;
