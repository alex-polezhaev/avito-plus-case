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
  Tooltip,
  MenuItem,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';
import { useState } from 'react';
import { backend } from '../../api/index.js';

const ModalArchiv = ({ acc, callbackClose }) => {
  const [loading, setLoading] = useState();
  const { token } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleArchive = () => {
    setLoading(true);
    backend(token)
      .patch(`/accounts/${acc?._id}`, { archived: true })
      .then(() => {
        dispatch(getAccs(token));
        setLoading(false);
        onClose();
        callbackClose();
      });
  };
  const handleUnArchive = () => {
    setLoading(true);
    backend(token)
      .patch(`/accounts/${acc?._id}`, { archived: false })
      .then(() => {
        dispatch(getAccs(token));
        setLoading(false);
        onClose();
        callbackClose();
      });
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={
          !acc.archived
            ? 'If you have stopped using the account, move it to the archive. Yandex Disk and Avito will disconnect automatically. The paid tariff will not be lost, you can restore the account later.'
            : 'Restore the account from the archive.'
        }
        bg='purple.400'
      >
        <MenuItem onClick={onOpen}>
          {!acc?.archived && <Text>Move to archive</Text>}
          {acc?.archived && <Text>Remove from archive</Text>}
        </MenuItem>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {acc?.archived && (
              <Text>Are you sure you want to restore the account from the archive?</Text>
            )}
            {!acc?.archived && (
              <Text>Are you sure you want to move the account to the archive?</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose} mr={3}>
              Cancel
            </Button>
            {acc?.archived && (
              <Button
                isLoading={loading}
                onClick={handleUnArchive}
                colorScheme='gray'
              >
                Confirm
              </Button>
            )}
            {!acc?.archived && (
              <Button
                isLoading={loading}
                onClick={handleArchive}
                colorScheme='gray'
              >
                Confirm
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalArchiv;
