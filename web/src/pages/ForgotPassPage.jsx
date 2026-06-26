import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  FormLabel,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { forgotPassword } from '../api/usersBackend';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Required field')
    .email('Invalid email'),
});

const ForgotPassPage = () => {
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email } = values;
      setLoading(true);
      forgotPassword({ email })
        .then(({ message }) => {
          setAlerting(message);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          err.message === 'Network Error'
            ? setAlerting('Service unavailable, please try again in 5 minutes')
            : setAlerting(err.response.data.message);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <Flex
          minH={'100vh'}
          align={'flex-start'}
          justify={'center'}
          bg={'gray.50'}
        >
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={'white'}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Forgot your password?
            </Heading>
            <Text fontSize={{ base: 'sm', sm: 'md' }} color={'gray.600'}>
              Enter your email — we'll send a recovery link to your
              email
            </Text>
            <FormControl mt={2}>
              <FormLabel>E-mail</FormLabel>
              <Input
                type={'email'}
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='Enter your email'
                focusBorderColor={'purple.400'}
                isInvalid={formik.errors.email && formik.touched.email}
              />
              {formik.errors.email && formik.touched.email && (
                <Text mt={2} color='red'>
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>
            {alerting && (
              <Alert colorScheme='orange'>
                <AlertIcon />
                <AlertDescription>{alerting}</AlertDescription>
              </Alert>
            )}
            <Stack spacing={3} mt={3}>
              <Button
                type={'submit'}
                isLoading={loading}
                colorScheme='purple'
                isDisabled={formik.errors.email && formik.touched.email && true}
              >
                Reset
              </Button>
              <NavLink to={'/auth/login'}>
                <Button
                  w={'full'}
                  colorScheme='gray'
                  variant={'outline'}
                  isDisabled={loading}
                >
                  Back
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </Flex>
      </FormControl>
    </form>
  );
};

export default ForgotPassPage;
