import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { resetPassword } from '../api/usersBackend';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  password: yup
    .string()
    .trim()
    .required('Required field')
    .min(8, 'Minimum 8 characters'),
  confirmPassword: yup
    .string()
    .trim()
    .required('Required field')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ChangePassPage = () => {
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { password, confirmPassword } = values;
      const { searchParams } = new URL(document.location.href);
      const token = searchParams.get('token');
      const userID = searchParams.get('userID');
      setLoading(true);
      resetPassword({
        userID,
        password,
        confirmPassword,
        token,
      })
        .then(() => {
          setLoading(false);
          navigate('/auth/login');
          toast({
            title: 'Your password has been changed successfully',
            description: `Sign in with your new password`,
            status: 'info',
            duration: 9000,
            isClosable: true,
            colorScheme: 'purple',
          });
        })
        .catch((err) => {
          setLoading(false);
          err.message === 'Network Error'
            ? setAlerting('Service unavailable, please try again in 5 minutes')
            : setAlerting(err.response.data.message);
        });
    },
  });

  const inputPasswordBorderColor =
    formik.errors.password && formik.touched.password
      ? 'red.500'
      : 'purple.300';
  const inputConfirmPasswordBorderColor =
    formik.errors.confirmPassword && formik.touched.confirmPassword
      ? 'red.500'
      : 'purple.300';

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <Flex minH={'100vh'} justify={'center'} bg={'gray.50'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'xl'}>Enter a new password</Heading>
            </Stack>
            <Box
              minW={'35vh'}
              rounded={'lg'}
              bg={'white'}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl
                  id='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={formik.errors.password && formik.touched.password}
                >
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input
                    type='password'
                    focusBorderColor={inputPasswordBorderColor}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <Text mt={1} color='red.500'>
                      {formik.errors.password}
                    </Text>
                  ) : null}
                </FormControl>
                <Stack spacing={2}>
                  <FormControl
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                    }
                  >
                    <FormLabel htmlFor='confirmPassword'>
                      Confirm password
                    </FormLabel>
                    <Input
                      type='password'
                      focusBorderColor={inputConfirmPasswordBorderColor}
                    />
                    {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword ? (
                      <Text mt={1} color='red.500'>
                        {formik.errors.confirmPassword}
                      </Text>
                    ) : null}
                  </FormControl>
                  {alerting && (
                    <Alert colorScheme='orange' w={'full'}>
                      <AlertIcon />
                      <AlertDescription>{alerting}</AlertDescription>
                    </Alert>
                  )}
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                  ></Stack>
                  <Button
                    mt={3}
                    bg={'purple.400'}
                    color={'white'}
                    _hover={{
                      bg: 'purple.500',
                    }}
                    isLoading={loading}
                    type='submit'
                    isDisabled={
                      (formik.errors.password && formik.touched.password) ||
                      (formik.errors.confirmPassword &&
                        formik.touched.confirmPassword)
                    }
                  >
                    Change password
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </FormControl>
    </form>
  );
};

export default ChangePassPage;
