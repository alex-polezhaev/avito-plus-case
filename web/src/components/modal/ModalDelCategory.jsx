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
  TagCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';
import { useState } from 'react';
import { delSpecAndSheet } from '../../api/specsBackend';

const ModalDelCategory = ({ specID }) => {
  const [loading, setLoading] = useState();
  const { token } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelCategory = () => {
    setLoading(true);
    delSpecAndSheet(specID, token)
      .then(() => {
        dispatch(getAccs(token));
        onClose();
        toast({
          colorScheme: 'orange',
          title: `Category removed from the table`,
          status: 'warning',
          isClosable: true,
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <TagCloseButton onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete the category?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              onClick={handleDelCategory}
              colorScheme='gray'
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDelCategory;
