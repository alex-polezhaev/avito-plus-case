import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Flex,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { DragImages } from '../slides/DragImages';
import { createTask } from '../../api/tasksBackend.js';
import { updateTableObject } from '../../redux/slices/tableSlice.js';

const stopList = [
  'AvitoStatus',
  'AvitoIdStat',
  'AvitoDateEnd',
  'Url',
  'Messages',
  'AutoloadFinishedAt',
  'UniqViews270',
  'UniqContacts270',
  'CV270',
  'UniqFavorites270',
  'UniqViews30',
  'UniqContacts30',
  'CV30',
  'UniqFavorites30',
  'UniqViews7',
  'UniqContacts7',
  'CV7',
  'UniqFavorites7',
  'UniqViews1',
  'UniqContacts1',
  'CV1',
  'UniqFavorites1',
  'SheetID',
];

export const ModalChangeSlide = (props) => {
  const { onClose, isOpen } = props;
  const { tableObject } = useSelector((state) => state.table);
  const { page } = useSelector((state) => state.slides);
  const { currSpecData } = useSelector((state) => state.specs);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const index = page + 1;
  const images = (tableObject['Images'][index] ?? '').split('\n');
  const validImages = images.filter((image) => image);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { resetForm }) => {
      const body = {
        is_used: false,
        sheet_id: tableObject['SheetID'][1],
        acc_id: currSpecData.accID,
        spec_id: currSpecData.specID,
        ad_id: tableObject['Id'][index],
        service: 'slides',
        changes: values,
      };
      createTask(token, body)
        .then((data) => {
          const { changes } = data;
          const updates = Object.keys(changes).reduce((acc, key) => {
            const newValue = changes[key];
            acc[key] = [...tableObject[key]];
            acc[key][index] = newValue;
            return acc;
          }, {});
          const newTableObject = { ...tableObject, ...updates };
          dispatch(updateTableObject(newTableObject));
        })
        .catch((e) => {
          console.error(e);
          console.error("Can't create task");
        })
        .finally(() => {
          resetForm();
          onClose();
        });
    },
  });

  const topTwoInputs = [];
  const firstPartOfInputs = [];
  const secondPartOfInputs = [];
  const keys = Object.keys(tableObject);
  const filteredKeys = keys.filter((key) => !stopList.includes(key));
  const keysHalfPoint = Math.floor(filteredKeys.length / 2);
  filteredKeys.forEach((key, i) => {
    if (key === 'Images') return;
    const title = tableObject[key][1];
    const value = tableObject[key][index];
    const input = (
      <FormControl key={key}>
        <FormLabel color='gray.900' mr={0}>
          {title}
        </FormLabel>
        <Textarea
          minH='auto'
          overflow='hidden'
          py='10px'
          height='40px'
          type='text'
          size='sm'
          placeholder={value}
          defaultValue={value}
          borderRadius='6px'
          name={key}
          onChange={formik.handleChange}
        />
      </FormControl>
    );

    if (i === keysHalfPoint || i === keysHalfPoint + 1) {
      topTwoInputs.push(input);
    } else if (i < keysHalfPoint) {
      firstPartOfInputs.push(input);
    } else {
      secondPartOfInputs.push(input);
    }
  }, []);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <ModalOverlay />
            <ModalContent
              maxW='844px'
              width='100%'
              height='830px'
              mx={{ base: '20px', md: '50px' }}
              py={0}
              px={{ base: '0', md: '5px' }}
            >
              <ModalHeader>Edit listing</ModalHeader>
              <ModalCloseButton />
              <ModalBody overflowY='auto' px='24px' py='16px'>
                {validImages && validImages.length > 0 ? (
                  <Flex gap='24px' flexDir={{ base: 'column', md: 'row' }}>
                    <Box flex={1}>
                      <DragImages formik={formik} imagesArray={images} />
                    </Box>
                    <Box flex={1}>{topTwoInputs}</Box>
                  </Flex>
                ) : null}

                <Flex gap='24px' flexDir={{ base: 'column', md: 'row' }}>
                  <Box flex={1} mt='20px'>
                    {firstPartOfInputs}
                  </Box>
                  <Box flex={1} mt='20px'>
                    {secondPartOfInputs}
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='gray' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='purple'>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </FormControl>
        </form>
      </Modal>
    </>
  );
};
