import React from 'react';
import { Image, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { ModalChangeSlide } from '../modal/ModalChangeSlide';
import assets from '../../assets';

export const SlideButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => {
    onOpen();
  };

  return (
    <>
      <Flex
        gap={6}
        width={{ base: '100%', sm: 'auto' }}
        justifyContent={{ base: 'space-between', sm: 'start' }}
      >
        <Button
          width={{ base: '100%', sm: 'auto' }}
          colorScheme='purple'
          px={8}
          flex='flex'
          gap={2}
        >
          <Image src={assets.filterIcon} />
          Filter
        </Button>
        <Button
          width={{ base: '100%', sm: 'auto' }}
          colorScheme='purple'
          px={8}
          variant='outline'
          flex='flex'
          gap={2}
          onClick={handleOpenModal}
        >
          <Image src={assets.changeIcon} />
          Edit
        </Button>
      </Flex>
      <ModalChangeSlide onClose={onClose} isOpen={isOpen} />
    </>
  );
};
