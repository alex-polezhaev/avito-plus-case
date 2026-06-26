import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import assets from '../assets';
import { Flex, ButtonGroup, Box, Image, Button } from '@chakra-ui/react';
import { OutlineButton, RegularButton } from '../components/common';
import routes from '../router';

export const Header = () => {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '*';
  const shouldShowButton = routes.some(
    (route) => location.pathname == route.path,
  );

  return (
    <Box bgColor='white'>
      <Box py={5} className='container'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Link to='/'>
            <Image
              src={assets.avitoPlusLogo}
              alt='header logo'
              sx={{
                '@media (max-width:480px)': {
                  width: '109px',
                },
              }}
            />
          </Link>
          <ButtonGroup gap={1}>
            {!isNotFoundPage && shouldShowButton ? (
              <>
                <Link to={'/auth/login'}>
                  <OutlineButton text='Sign in' />
                </Link>

                <Link to={'/auth/register'}>
                  <RegularButton text='Sign up' />
                </Link>
              </>
            ) : (
              <Link to='/'>
                <Button
                  fontSize='18px'
                  lineHeight='28px'
                  fontWeight='600'
                  px='24px'
                  colorScheme='purple'
                  sx={{
                    '@media (max-width: 480px)': {
                      fontSize: '14px',
                      px: '12px',
                    },
                  }}
                >
                  To the home page
                </Button>
              </Link>
            )}
          </ButtonGroup>
        </Flex>
      </Box>
    </Box>
  );
};
