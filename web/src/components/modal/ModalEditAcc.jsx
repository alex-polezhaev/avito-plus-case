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
  Input,
  useToast,
  AlertDescription,
  AlertIcon,
  Alert,
  Tooltip,
  MenuItem,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';
import { useFormik } from 'formik';
import { editAccountTitle } from '../../api/accountsBackend';

const ModalEditAcc = ({ acc }) => {
  const toast = useToast();
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};

    if (!values.title || values.title.length > 20) {
      errors.title = 'Enter a name up to 20 characters';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: acc?.title,
    },
    validate,
    onSubmit: (values) => {
      if (values.title !== acc?.title) {
        setLoading(true);
        editAccountTitle(token, acc._id, values.title)
          .then(() => {
            dispatch(getAccs(token));
            onClose();
            setLoading(false);
            toast({
              title: 'Account name successfully changed ',
              description: `New name "${values.title}"`,
              status: 'success',
              duration: 4000,
              isClosable: true,
              colorScheme: 'purple',
            });
          })
          .catch((err) => {
            setLoading(false);
            err.message === 'Network Error'
              ? setAlerting(
                  'Service unavailable, please try again in 5 minutes',
                )
              : setAlerting(err.response.data.message);
          });
      } else {
        onClose();
      }
    },
  });

  return (
    <>
      <Tooltip
        hasArrow
        label={
          'Rename your account; the name will change automatically in the Google Sheet and Yandex Disk'
        }
        bg='purple.400'
      >
        <MenuItem onClick={onOpen}>Rename</MenuItem>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter a new name</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                p={5}
                name='title'
                onChange={formik.handleChange}
                value={formik.values.title}
                isInvalid={formik.errors.title}
              />
              {alerting && (
                <Alert my={3} colorScheme='orange' w={'full'}>
                  <AlertIcon />
                  <AlertDescription>{alerting}</AlertDescription>
                </Alert>
              )}
              {formik.touched.title && formik.errors.title ? (
                <Alert my={3} colorScheme='orange'>
                  <AlertIcon />
                  <AlertDescription>{formik.errors.title}</AlertDescription>
                </Alert>
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
        </form>
      </Modal>
    </>
  );
};

export default ModalEditAcc;
