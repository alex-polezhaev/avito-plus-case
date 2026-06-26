import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { registerUser } from '../api/usersBackend.js';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const validationSchema = yup.object({
  firstname: yup
    .string()
    .trim()
    .required('Required field')
    .max(12, 'Maximum 12 characters'),
  email: yup
    .string()
    .trim()
    .required('Required field')
    .email('Invalid email'),
  password: yup
    .string()
    .trim()
    .required('Required field')
    .min(8, 'Minimum 8 characters'),
});

const RegisterPage = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();
  const { token } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      return navigate('/accounts');
    }
  }, [navigate, token]);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const { firstname, email, password } = values;
      registerUser({ firstname, email, password })
        .then((res) => {
          setAlerting(res.message);
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <Flex minH={'100vh'} justify={'center'} bg={'gray.50'}>
            <Stack spacing={8} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign up</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  Start using the service in 60 seconds ✌️
                </Text>
              </Stack>
              <Box
                w={'40vh'}
                rounded={'lg'}
                bg={'white'}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type={'text'}
                      name='firstname'
                      onChange={formik.handleChange}
                      value={formik.values.firstname}
                      placeholder='Enter your name'
                      focusBorderColor={'purple.400'}
                      isInvalid={
                        formik.errors.firstname && formik.touched.firstname
                      }
                    />
                    {formik.errors.firstname && formik.touched.firstname && (
                      <Text mt={2} color='red'>
                        {formik.errors.firstname}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
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
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='Enter your password'
                        focusBorderColor={'purple.400'}
                        isInvalid={
                          formik.errors.password && formik.touched.password
                        }
                      />
                      <InputRightElement>
                        <Button
                          size={'sm'}
                          variant={'ghost'}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {formik.errors.password && formik.touched.password && (
                      <Text mt={2} color='red'>
                        {formik.errors.password}
                      </Text>
                    )}
                  </FormControl>
                  {alerting && (
                    <Alert my={3} colorScheme='orange' w={'full'}>
                      <AlertIcon />
                      <AlertDescription>{alerting}</AlertDescription>
                    </Alert>
                  )}
                  <Stack pt={2}>
                    <Button
                      type={'submit'}
                      isLoading={loading}
                      size='lg'
                      colorScheme='purple'
                      isDisabled={
                        (formik.errors.firstname && formik.touched.firstname) ||
                        (formik.errors.email && formik.touched.email) ||
                        (formik.errors.password &&
                          formik.touched.password &&
                          true)
                      }
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack justify={'center'} direction={'row'} pt={6}>
                    <Text>Already have an account? </Text>
                    <NavLink to={'/auth/login'}>
                      <Text color={'purple.400'}>Sign in</Text>
                    </NavLink>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </FormControl>
      </form>
    </>
  );
};

export default RegisterPage;
