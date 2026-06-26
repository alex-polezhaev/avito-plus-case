import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, ButtonGroup, Flex, Button, Menu, Image } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { LuScanFace } from 'react-icons/lu';
import assets from '../assets';
import { fetchUserData } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getAccs } from '../redux/slices/accountsSlice';

export const AccountHeader = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(fetchUserData(token));
    dispatch(getAccs(token));
    if (!token && window.location.pathname !== '/video-instructions') {
      return navigate('/');
    }
  }, [dispatch, token]);

  const toggle = () => setIsOpen(!isOpen);
  const body = document.querySelector('body');
  isOpen
    ? body.classList.toggle('no-scroll')
    : body.classList.remove('no-scroll');

  return (
    <Box bgColor='white'>
      <Box py={5} className='container'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Box
            sx={{
              '@media (max-width: 480px)': {
                width: '109px',
                height: '20px',
              },
            }}
          >
            <Link to='/'>
              <img src={assets.avitoPlusLogo} alt='header logo' />
            </Link>
          </Box>
          <ButtonGroup
            sx={{
              '@media (max-width: 992px)': {
                position: 'absolute',
                flexDirection: 'column',
                width: '100%',
                bgColor: '#fff',
                top: `${!isOpen ? '-100%' : '76px'}`,
                transition: 'all 0.3s linear',
                p: '40px 0 0 20px',
                left: '0',
                gap: '12px',
                zIndex: '999',
                height: '100%',
              },
            }}
            gap='12px'
          >
            {token && (
              <Link
                style={{ marginLeft: '0' }}
                to='/accounts
           '
              >
                <Button
                  _hover={{
                    bgColor: 'purple.500',
                    borderColor: 'purple.500',
                    color: 'white',
                  }}
                  colorScheme='gray'
                  variant='outline'
                  bgColor={pathname === '/accounts' ? 'purple.500' : ''}
                  color={pathname === '/accounts' ? 'white' : ''}
                >
                  Accounts
                </Button>
              </Link>
            )}
            {token && (
              <Link style={{ marginLeft: '0' }} to='/subscription-services'>
                <Button
                  _hover={{
                    bgColor: 'purple.500',
                    borderColor: 'purple.500',
                    color: 'white',
                  }}
                  colorScheme='gray'
                  variant='outline'
                  bgColor={
                    pathname === '/subscription-services' ? 'purple.500' : ''
                  }
                  color={pathname === '/subscription-services' ? 'white' : ''}
                >
                  Subscription
                </Button>
              </Link>
            )}

            {token && (
              <Link style={{ marginLeft: '0' }} to='/video-instructions'>
                <Button
                  _hover={{
                    bgColor: 'purple.500',
                    borderColor: 'purple.500',
                    color: 'white',
                  }}
                  colorScheme='gray'
                  variant='outline'
                  bgColor={
                    pathname === '/video-instructions' ? 'purple.500' : ''
                  }
                  color={pathname === '/video-instructions' ? 'white' : ''}
                >
                  Video tutorials
                </Button>
              </Link>
            )}

            {token && (
              <Link style={{ marginLeft: '0' }} to='/slides'>
                <Button
                  _hover={{
                    bgColor: 'purple.500',
                    borderColor: 'purple.500',
                    color: 'white',
                  }}
                  colorScheme='gray'
                  variant='outline'
                  bgColor={pathname === '/slides' ? 'purple.500' : ''}
                  color={pathname === '/slides' ? 'white' : ''}
                >
                  Slides
                </Button>
              </Link>
            )}
            <Link
              to={'/settings'}
              width='fit-content'
              display={{ base: 'flex', lg: 'none' }}
              style={{ margin: '0 0 24px 0' }}
              alignitems='center'
              order='-1'
            >
              <Menu>
                <Button
                  display={{ base: 'flex', lg: 'none' }}
                  leftIcon={<LuScanFace />}
                  colorScheme='purple'
                  variant={'outline'}
                >
                  {token ? user?.firstname : 'Sign in / Sign up'}
                </Button>
              </Menu>
            </Link>
          </ButtonGroup>
          <ButtonGroup alignItems='center' gap={{ base: '12px', lg: '1' }}>
            {token && (
              <Box
                bgColor='#EDF2F7'
                px='16px'
                py='8px'
                lineHeight='24px'
                fontSize='16px'
                fontWeight='600'
                borderRadius={6}
                sx={{
                  '@media (max-width: 480px)': {
                    fontSize: '12px',
                    p: '5px 8px',
                  },
                }}
              >
                {user?.balance} ₽
              </Box>
            )}

            <Menu>
              <Link to='/settings'>
                <Button
                  order={{ md: '-1', lg: '0' }}
                  as={Button}
                  display={{ base: 'none', lg: 'flex' }}
                  alignItems='center'
                  leftIcon={<LuScanFace />}
                  bgColor='transparent'
                  color='purple.500'
                  colorScheme='purple'
                  variant={'outline'}
                >
                  {token ? user?.firstname : 'Sign in / Sign up'}
                </Button>
              </Link>
            </Menu>
            <Box
              onClick={toggle}
              display={{ base: 'block', lg: 'none' }}
              width='36px'
              height='36px'
            >
              {!isOpen ? (
                <Image src={assets.menueIcon} width='30px' height='35px' />
              ) : (
                <Image src={assets.closeIcon} width='30px' height='35px' />
              )}
            </Box>
          </ButtonGroup>
        </Flex>
      </Box>
    </Box>
  );
};
