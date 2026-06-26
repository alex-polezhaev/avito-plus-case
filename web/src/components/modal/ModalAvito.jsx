import React, { useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Image,
  FormControl,
  VStack,
  Link,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { setAvitoSettings } from '../../api/servicesBackend';
import { editAccountData } from '../../api/accountsBackend';
import { useDispatch, useSelector } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';

const ModalAvito = ({ avito, accID }) => {
  const [conLoading, setConLoading] = useState();
  const [disConLoading, setDisConLoading] = useState();
  const [isError, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();

  const disconnectAvito = (accID) => {
    setDisConLoading(true);
    editAccountData(token, accID, { avito: {} }).then(() => {
      dispatch(getAccs(token));
      setDisConLoading(false);
      toast({
        title: 'Avito account disconnected',
        status: 'warning',
        isClosable: true,
        colorScheme: 'orange',
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      clientId: '',
      clientSecret: '',
    },
    onSubmit: async (values) => {
      setConLoading(true);
      const { clientId, clientSecret } = values;
      setAvitoSettings(token, accID, { avito: { clientId, clientSecret } })
        .then(() => {
          onClose();
          dispatch(getAccs(token));
          setConLoading(false);
          toast({
            title: 'Avito account connected successfully',
            description: `Now listings will be uploaded from the table automatically`,
            status: 'info',
            duration: 9000,
            isClosable: true,
            colorScheme: 'purple',
          });
        })
        .catch(() => {
          setConLoading(false);
          setError(true);
        });
    },
  });

  const handleError = () => {
    if (isError) {
      return (
        <Alert colorScheme='orange' w={'full'}>
          <AlertIcon />
          <AlertDescription>
            An error occurred! Please double-check the fields.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  if (!avito?.id) {
    return (
      <>
        <Button
          fontSize={14}
          onClick={onOpen}
          colorScheme='gray'
          variant={'solid'}
          rightIcon={<Image boxSize='18px' src='/media/avito.webp' />}
          isLoading={conLoading}
        >
          Connect Avito
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={formik.handleSubmit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Connecting to Avito</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Link href='https://www.avito.ru/professionals/api' isExternal>
                  <Button variant={'outline'} colorScheme='purple'>
                    Get data
                  </Button>
                </Link>
                <Button ml={4} variant={'outline'} colorScheme='orange'>
                  Instructions
                </Button>

                <VStack mt={5} spacing={4} align='flex-start'>
                  <FormControl>
                    <FormLabel htmlFor='email'>Client ID</FormLabel>
                    <Input
                      name='clientId'
                      variant='filled'
                      placeholder='Enter Client ID'
                      onChange={formik.handleChange}
                      value={formik.values.clientId}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='password'>Client Secret </FormLabel>
                    <Input
                      name='clientSecret'
                      variant='filled'
                      placeholder='Enter Client Secret'
                      onChange={formik.handleChange}
                      value={formik.values.clientSecret}
                    />
                  </FormControl>
                  {handleError()}
                  <Button
                    type='submit'
                    colorScheme='purple'
                    width='100%'
                    my={5}
                    isLoading={conLoading}
                  >
                    Connect
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </form>
        </Modal>
      </>
    );
  } else {
    return (
      <Button
        onClick={() => disconnectAvito(accID)}
        colorScheme='gray'
        variant={'outline'}
        rightIcon={<Image boxSize='18px' src='/media/avito.webp' />}
        isLoading={disConLoading}
        fontSize={14}
      >
        Disconnect Avito
      </Button>
    );
  }
};

export default ModalAvito;
