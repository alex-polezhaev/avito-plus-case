import React, { useEffect, useState } from 'react';
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
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser as login } from '../api/usersBackend.js';
import { loginUser } from '../redux/slices/userSlice.js';
import { useFormik } from 'formik';

const validationSchema = yup.object().shape({
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

const LoginPage = () => {
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

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
    onSubmit: async (values) => {
      setLoading(true);
      await login(values)
        .then((data) => {
          dispatch(loginUser(data));
          navigate('/home');
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
        <Flex minH={'100vh'} justify={'center'} bg={'gray.50'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Glad to see you again! 💜
              </Text>
            </Stack>
            <Box minW={400} rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
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
                <Stack justify={'space-between'} direction={'row'}>
                  <Text>Forgot your password? </Text>
                  <NavLink to={'/auth/forgot-password'}>
                    <Text color={'purple.400'}>Reset</Text>
                  </NavLink>
                </Stack>
                {alerting && (
                  <Alert colorScheme='orange' w={'full'}>
                    <AlertIcon />
                    <AlertDescription>{alerting}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing={2} mt={3}>
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
                    Sign in
                  </Button>
                </Stack>
                <Stack justify={'center'} direction={'row'} pt={6}>
                  <Text>Don't have an account? </Text>
                  <NavLink to={'/auth/register'}>
                    <Text color={'purple.400'}>Sign up</Text>
                  </NavLink>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </FormControl>
    </form>
  );
};

export default LoginPage;
