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
  useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { forgotPassword } from '../../api/usersBackend';

const ModalChangePass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.user);
  const { email } = user ?? {};
  const toast = useToast();

  const handleSubmit = () =>
    forgotPassword({ email }).then(() => {
      onClose();
      toast({
        title: 'A recovery link has been sent to your email',
        description: `Reset your password via the link in your email ${email}`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        colorScheme: 'purple',
      });
    });

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme='purple'
        fontWeight='600'
        width={{ base: '100%', md: 'auto', lg: 'auto' }}
        lineHeight='24px'
      >
        Change password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              We will send an email to your inbox with a link to change your password
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme='purple' onClick={handleSubmit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalChangePass;
