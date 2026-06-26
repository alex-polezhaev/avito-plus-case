import React from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  // InputGroup,
  // Input,
  // InputRightElement,
  // IconButton,
  Image,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  // Link,
  // useClipboard,
  // useToast,
} from '@chakra-ui/react';
// import { BsTelegram } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import { BiCopy } from 'react-icons/bi';
import assets from '../../assets';

const ModalTelegram = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { user } = useSelector((state) => state.user);
  // const { onCopy } = useClipboard(user?.telegram?.user_token);
  // const toast = useToast();

  return (
    <>
      <Button
        onClick={onOpen}
        borderColor='blue.500'
        color='blue.500'
        variant='outline'
        fontSize={{ base: '14px', md: '16px', lg: '16px' }}
        mx='auto'
      >
        Connect Telegram bot
        <Image src={assets.telegramIcon} ml='13px' />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'center'} mt={7}>
              <Image loading='eager' src='/media/bot.png' w={'70%'} />
            </Flex>
            <Heading size={'md'} mt={10}>
              Connecting to Telegram
            </Heading>
            <Alert colorScheme='purple' my={5}>
              <AlertIcon />
              <AlertDescription>The Telegram bot is under development</AlertDescription>
              {/* <AlertDescription>
                To connect, send the Telegram bot a message with the code. You
                can connect several Telegram accounts at the same time
              </AlertDescription> */}
            </Alert>
            {/* <Link href='https://t.me/avito_plus_bot' isExternal>
              <Button
                colorScheme={'purple'}
                variant={'outline'}
                rightIcon={<BsTelegram size={20} />}
              >
                Launch the Avito Plus bot
              </Button>
            </Link> */}
            {/* <InputGroup
              w={'60%'}
              my={5}
              onClick={() => {
                onCopy();
                toast({
                  colorScheme: 'purple',
                  title: `Code copied to clipboard`,
                  status: 'info',
                  isClosable: true,
                });
              }}
            >
              <Input
                cursor={'pointer'}
                borderRadius={7}
                isReadOnly
                value={user?.telegram?.user_token}
              />
              <InputRightElement>
                <IconButton icon={<BiCopy size={18} />} />
              </InputRightElement>
            </InputGroup> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' onClick={onClose} w={'full'}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTelegram;
