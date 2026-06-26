import { VideoInstructions } from '../components/video-instructions/video-instructions';
import { Footer } from '../layout';
import { AccountHeader } from '../layout/account-header';
import { Box } from '@chakra-ui/react';

export const Instructions = () => {
  return (
    <Box bgColor='#fafafa'>
      <AccountHeader />
      <Box className='container main'>
        <VideoInstructions />
      </Box>
      <Footer />
    </Box>
  );
};
