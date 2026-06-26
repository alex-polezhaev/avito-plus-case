import React from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  Box,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/slices/userSlice';
import { editUserData } from '../../api/usersBackend.js';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as yup from 'yup';

const ModalChangeName = () => {
  const toast = useToast();
  const [loading, setLoading] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    firstname: yup.string().trim().max(12, 'Maximum 12 characters'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname,
    },
    validationSchema,
    onSubmit: (values) => {
      const { firstname } = values;
      editUserData(token, { firstname })
        .then(() => setLoading(true))
        .then(() => dispatch(fetchUserData(token)))
        .then(() => onClose())
        .then(() => setLoading(false))
        .then(() =>
          toast({
            title: 'Successfully changed',
            description: `Username changed to ${firstname}`,
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
        onClick={onOpen}
        position='absolute'
        right='0'
        top='0'
        variant='outline'
        borderColor='purple.500'
        color='purple.500'
        borderTopLeftRadius='0'
        fontWeight='600'
        lineHeight='24px'
        borderBottomLeftRadius='0'
        _hover={{
          bgColor: 'purple.500',
          color: 'white',
        }}
        zIndex='10'
        sx={{
          '@media (max-width: 400px)': {
            position: 'initial',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            width: '100%',
            mt: '8px',
          },
        }}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Box mt={5}>
                  <Text mb={2}>Username</Text>
                  <Input
                    name='firstname'
                    placeholder={'Enter a new username'}
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    isInvalid={
                      formik.errors.firstname && formik.touched.firstname
                    }
                  />
                </Box>
                {formik.errors.firstname && formik.touched.firstname ? (
                  <Text mt={1} color='red.500'>
                    {formik.errors.firstname}
                  </Text>
                ) : null}
              </ModalBody>

              <ModalFooter>
                <Button variant='ghost' onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='purple' isLoading={loading}>
                  Edit
                </Button>
              </ModalFooter>
            </ModalContent>
          </FormControl>
        </form>
      </Modal>
    </>
  );
};

export default ModalChangeName;
