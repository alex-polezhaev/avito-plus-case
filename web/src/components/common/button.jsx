import { Button } from '@chakra-ui/react';

export const OutlineButton = ({ text }) => (
  <Button
    colorScheme='purple'
    variant='outline'
    sx={{
      '@media (max-width: 480px)': {
        fontSize: '14px',
        px: '12px',
      },
    }}
    _hover={{
      backgroundColor: 'purple.500',
      color: 'white',
      border: '1px solid #805AD5',
    }}
  >
    {text}
  </Button>
);

export const RegularButton = ({ text }) => (
  <Button
    colorScheme='purple'
    sx={{
      '@media (max-width: 480px)': {
        fontSize: '14px',
        px: '12px',
      },
    }}
  >
    {text}
  </Button>
);
