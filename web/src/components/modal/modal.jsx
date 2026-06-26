import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  AspectRatio,
} from '@chakra-ui/react';
export const VideoModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW='600px' width='100%'>
          <ModalCloseButton />
          <ModalBody
            pt='50px'
            sx={{
              '@media (max-width:992px)': {
                pt: '0',
              },
            }}
          >
            <Box pt={{ base: '0px', md: '50px', lg: '0px' }}>
              <AspectRatio
                h={{ base: '270px', md: '250px', lg: '332px' }}
                mt={{ base: '40px', md: '0px' }}
                mb={{ base: '0px', md: '40px' }}
                ml='auto'
              >
                <iframe
                  width='100%'
                  height='100%'
                  style={{ borderRadius: '20px' }}
                  src='https://www.youtube.com/embed/vhnFVeRGlCc?si=srdoZ6H0Ng8iXYOT'
                />
              </AspectRatio>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
