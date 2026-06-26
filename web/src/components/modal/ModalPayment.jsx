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
  Text,
  NumberInput,
  NumberInputField,
  FormControl,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { paymentInit } from '../../api/servicesBackend';

const ModalPayment = ({ button, size, variant, colorScheme }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState();
  const { token, user } = useSelector((state) => state.user);

  const validate = (values) => {
    const errors = {};

    if (values.amount > 50000 || values.amount < 0) {
      errors.amount = 'Enter an amount from 1000 to 50000 rubles';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: 1500,
    },
    validate,
    onSubmit: (values) => {
      const { amount } = values;
      setLoading(true);
      paymentInit({ amount, userID: user.id }, token).catch((error) => {
        console.error(error);
      });
    },
  });

  return (
    <>
      <Button
        onClick={onOpen}
        size={size}
        variant={variant}
        colorScheme={colorScheme}
      >
        {button}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Top up balance</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Enter an amount</Text>
                <NumberInput
                  name='amount'
                  onChange={(val) => {
                    formik.setFieldValue('amount', val);
                  }}
                  mt={3}
                  defaultValue={formik.values.amount}
                  step={100}
                  isInvalid={formik.errors.amount}
                >
                  <NumberInputField />
                </NumberInput>
                {formik.touched.amount && formik.errors.amount ? (
                  <Alert my={3} colorScheme='orange'>
                    <AlertIcon />
                    <AlertDescription>{formik.errors.amount}</AlertDescription>
                  </Alert>
                ) : null}
              </ModalBody>

              <ModalFooter mt={3}>
                <Button variant='ghost' onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='purple' isLoading={loading}>
                  Proceed to payment
                </Button>
              </ModalFooter>
            </ModalContent>
          </FormControl>
        </form>
      </Modal>
    </>
  );
};

export default ModalPayment;
