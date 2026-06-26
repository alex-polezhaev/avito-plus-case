import React from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  useToast,
  Box,
  Text,
  Flex,
  Switch,
  Tooltip,
  Link,
} from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { editAccountData } from '../../api/accountsBackend';
import { useDispatch, useSelector } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';
import { SettingsIcon } from '@chakra-ui/icons';

const ModalAutomatic = ({ acc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();

  const switchRenewBlocked = () => {
    const newAutomatic = { ...acc.automatic };
    newAutomatic.renew_blocked = !acc.automatic.renew_blocked;
    editAccountData(token, acc._id, { automatic: newAutomatic }).then(() => {
      dispatch(getAccs(token));
      toast({
        title: 'Auto-republish rule successfully updated',
        colorScheme: 'purple',
      });
    });
  };
  const switchRenewOld = () => {
    const newAutomatic = { ...acc.automatic };
    newAutomatic.renew_old = !acc.automatic.renew_old;
    editAccountData(token, acc._id, { automatic: newAutomatic }).then(() => {
      dispatch(getAccs(token));
      toast({
        title: 'Auto-republish rule successfully updated',
        colorScheme: 'purple',
      });
    });
  };
  const switchRenewOldStrict = () => {
    const newAutomatic = { ...acc.automatic };
    newAutomatic.renew_old_strict = !acc.automatic.renew_old_strict;
    editAccountData(token, acc._id, { automatic: newAutomatic }).then(() => {
      dispatch(getAccs(token));
      toast({
        title: 'Auto-republish rule successfully updated',
        colorScheme: 'purple',
      });
    });
  };
  return (
    <>
      <Link
        sx={{
          '@media (max-width: 830px)': {
            width: '100%',
          },
        }}
        href='#!'
      >
        <Button
          onClick={onOpen}
          color='purple.500'
          colorScheme='purple'
          variant='outline'
          _hover={{
            bgColor: 'purple.500',
            color: 'white',
          }}
          sx={{
            '@media (max-width: 830px)': {
              width: '100%',
            },
          }}
        >
          <Text mr='8px' fontSize='14px' lineHeight='20px'>
            Automation
          </Text>
          <SettingsIcon />
        </Button>
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='500px'>
          <ModalHeader>Process automation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align='flex-start'>
              <Box w={'100%'} minH={100} borderRadius={10} borderWidth={1}>
                <Flex align={'center'} justifyContent={'space-between'}>
                  <Text w={'70%'} p={5} fontWeight={'semibold'}>
                    Auto-republish blocked listings
                  </Text>
                  <Switch
                    size='md'
                    colorScheme={'purple'}
                    onChange={switchRenewBlocked}
                    isChecked={acc.automatic.renew_blocked}
                  />
                  <Box w={'15%'} cursor={'pointer'}>
                    <Tooltip
                      label={
                        'If a listing has the "Blocked" status, it will be republished automatically. The listing will receive the current publication date, an end date 30 days from the publication date, a new unique ID, and a randomized description. The rule will not run if the description randomizer is empty. If the title randomizer is filled in, the title will be randomized.'
                      }
                      bg='purple.400'
                    >
                      <Box>
                        <AiOutlineQuestionCircle mr={5} size={25} />
                      </Box>
                    </Tooltip>
                  </Box>
                </Flex>
              </Box>

              <Box w={'100%'} minH={100} borderRadius={10} borderWidth={1}>
                <Flex align={'center'} justifyContent={'space-between'}>
                  <Text w={'70%'} p={5} fontWeight={'semibold'}>
                    Auto-republish expired listings
                  </Text>
                  <Switch
                    size='md'
                    colorScheme={'purple'}
                    onChange={switchRenewOld}
                    isChecked={acc.automatic.renew_old}
                  />
                  <Box w={'15%'} cursor={'pointer'}>
                    <Tooltip
                      label={
                        'If a listing has the "Expired" status, it will be republished automatically. The listing will receive the current publication date, an end date 30 days from the publication date, and a new unique ID.'
                      }
                      bg='purple.400'
                    >
                      <Box>
                        <AiOutlineQuestionCircle mr={5} size={25} />
                      </Box>
                    </Tooltip>
                  </Box>
                </Flex>
              </Box>

              <Box w={'100%'} minH={100} borderRadius={10} borderWidth={1}>
                <Flex align={'center'} justifyContent={'space-between'}>
                  <Text w={'70%'} p={5} fontWeight={'semibold'}>
                    Auto-republish expired listings with date check
                    of completion on Avito
                  </Text>
                  <Switch
                    size='md'
                    colorScheme={'purple'}
                    onChange={switchRenewOldStrict}
                    isChecked={acc.automatic.renew_old_strict}
                  />
                  <Box w={'15%'} cursor={'pointer'}>
                    <Tooltip
                      label={
                        'If a listing has the "Expired" status and its exact end date has passed, it will be republished automatically. The listing will receive the current publication date, an end date 30 days from the publication date, and a new unique ID.'
                      }
                      bg='purple.400'
                    >
                      <Box>
                        <AiOutlineQuestionCircle mr={5} size={25} />
                      </Box>
                    </Tooltip>
                  </Box>
                </Flex>
              </Box>

              <Button
                type='submit'
                colorScheme='purple'
                width='100%'
                my={5}
                onClick={onClose}
              >
                Close
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAutomatic;
