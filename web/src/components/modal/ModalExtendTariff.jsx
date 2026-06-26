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
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import { BiSolidUpArrowSquare } from 'react-icons/bi';
import { formatDateDMYHM, plusDaysToExpireAt } from '../../api/dateFormater';
import { tariffRenew } from '../../api/servicesBackend';
import { useDispatch, useSelector } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';
import { fetchUserData } from '../../redux/slices/userSlice';

const ModalExtendTariff = ({ acc }) => {
  const toast = useToast();
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setLoading(true);
    tariffRenew({ accID: acc._id }, token)
      .then(() => {
        dispatch(getAccs(token));
        dispatch(fetchUserData(token));
        setLoading(false);
        onClose();
        toast({
          title: `The tariff for the account ${acc.title} has been successfully extended`,
          description: `The following was charged from your balance ${acc.month_price} rubles`,
          status: 'success',
          duration: 4000,
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
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={'sm'}
        variant='outline'
        colorScheme='green'
        rightIcon={<BiSolidUpArrowSquare size={18} />}
      >
        Extend
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manual account renewal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert my={3} colorScheme='purple' w={'full'}>
              <AlertIcon />
              <AlertDescription>{`Your account ${acc.title} will be extended until
              ${formatDateDMYHM(
                plusDaysToExpireAt(acc.expire_at, 30),
              )}`}</AlertDescription>
            </Alert>
            <Alert my={3} colorScheme='purple' w={'full'}>
              <AlertIcon />
              <AlertDescription>{`The following will be charged from your balance ${acc.month_price} rubles to extend the tariff`}</AlertDescription>
            </Alert>
            {alerting && (
              <Alert my={3} colorScheme='orange' w={'full'}>
                <AlertIcon />
                <AlertDescription>{alerting}</AlertDescription>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme='purple' onClick={onSubmit} isLoading={loading}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalExtendTariff;
