import React, { useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Select,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPossibleFields } from '../../redux/slices/fieldsSlice';
import { addSpecAndSheet } from '../../api/specsBackend.js';
import { getAccs } from '../../redux/slices/accountsSlice.js';

const ModalNewSpec = ({ accID }) => {
  const [specLoading, setSpecLoading] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const { fields, loading } = useSelector((state) => state.fields);
  const dispatch = useDispatch();
  const toast = useToast();

  const validate = (values) => {
    const errors = {};
    if (values.category === 'Select from the list') {
      errors.category = true;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      category: 'Select from the list',
    },
    validate,
    onSubmit: (values) => {
      setSpecLoading(true);
      addSpecAndSheet(accID, values.category, token)
        .then(() => onClose())
        .then(() => setSpecLoading(false))
        .then(() => dispatch(getAccs(token)))
        .then(() =>
          toast({
            title: 'You added a new category',
            description: `Category "${values.category}" added to the account`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            colorScheme: 'purple',
          }),
        );
    },
  });

  const handleOpen = () => {
    onOpen();
    dispatch(fetchPossibleFields({ token, accID }));
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        size={'xs'}
        fontSize={'14'}
        variant='solid'
        colorScheme='purple'
      >
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {loading || <Spinner colorScheme='purple' />}
                {!loading || (
                  <>
                    <Select
                      mb={5}
                      name='category'
                      onChange={formik.handleChange}
                      value={formik.values.category}
                    >
                      <option key={0}>Select from the list</option>
                      {fields.map((categoryName) => (
                        <option key={categoryName}>{categoryName}</option>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category ? (
                      <Alert my={3} colorScheme='orange'>
                        <AlertIcon />
                        <AlertDescription>
                          Select a category from the available ones
                        </AlertDescription>
                      </Alert>
                    ) : null}
                    <Alert colorScheme='purple'>
                      <AlertIcon />
                      <AlertDescription>
                        After adding, an extra sheet will appear in the table
                        with the selected category
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant='ghost' onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button
                  colorScheme='purple'
                  type='submit'
                  isLoading={specLoading}
                >
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </FormControl>
        </form>
      </Modal>
    </>
  );
};

export default ModalNewSpec;
