import React from 'react';
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
  Text,
  Input,
  Select,
  FormControl,
  Spinner,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { useFormik } from 'formik';
import { createNewAccount } from '../../api/accountsBackend';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { getAccs } from '../../redux/slices/accountsSlice.js';
import { fetchFieldsData } from '../../redux/slices/fieldsSlice.js';

const ModalNewAcc = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const { fields, loading } = useSelector((state) => state.fields);
  const [accLoading, setLoading] = useState();
  const dispatch = useDispatch();

  const handleOpen = () => {
    onOpen();
    dispatch(fetchFieldsData(token));
  };

  const validate = (values) => {
    const errors = {};

    if (values.category === 'Select from the list') {
      errors.category = true;
    }
    if (!values.title || values.title.length > 25) {
      errors.title = 'Enter a name up to 25 characters';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      category: 'Select from the list',
    },
    validate,
    onSubmit: (values) => {
      const { title, category } = values;
      setLoading(true);
      createNewAccount(token, title, category)
        .then(() => onClose())
        .then(() => setLoading(false))
        .then(() => dispatch(getAccs(token)))
        .then(() =>
          toast({
            title: 'You created a new account',
            description: `New account "${title}" added`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            colorScheme: 'purple',
          }),
        );
    },
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        size={'md'}
        variant='outline'
        colorScheme='gray'
        rightIcon={<AiOutlinePlusSquare />}
      >
        Add account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create an account</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text my={4}>Account name</Text>
                <Input
                  p={5}
                  placeholder='Enter an account name...'
                  name='title'
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  isInvalid={formik.errors.title}
                ></Input>
                <Text my={4}>Main category</Text>
                {loading || <Spinner colorScheme='purple' />}
                {!loading || (
                  <>
                    <Select
                      mb={5}
                      name='category'
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      isInvalid={formik.errors.category}
                    >
                      <option key={0}>Select from the list</option>
                      {fields.map((categoryName) => (
                        <option key={categoryName}>{categoryName}</option>
                      ))}
                    </Select>
                    {formik.touched.title && formik.errors.title ? (
                      <Alert my={3} colorScheme='orange'>
                        <AlertIcon />
                        <AlertDescription>
                          {formik.errors.title}
                        </AlertDescription>
                      </Alert>
                    ) : null}
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
                        You can add additional categories later
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
                  isLoading={accLoading}
                >
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </FormControl>
        </form>
      </Modal>
    </>
  );
};

export default ModalNewAcc;
