import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useClipboard,
  Input,
  Image,
  Menu,
  MenuButton,
  MenuList,
  useToast,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice.js';
import AccountStatus from './AccountStatus.jsx';
import AccountCategories from './AccountCategories.jsx';
import AccountAlerts from './AccountAlerts.jsx';
import ModalArchiv from '../modal/ModalArchiv.jsx';
import ModalEditAcc from '../modal/ModalEditAcc.jsx';
import ModalAvito from '../modal/ModalAvito.jsx';
import ModalAutomatic from '../modal/ModalAutomatic.jsx';
import AccountAddons from './AccountAddons.jsx';
import { editAccountData } from '../../api/accountsBackend.js';

export const YourAccounts = () => {
  let output = [];
  const [loading, setLoading] = useState();
  const { accounts } = useSelector((state) => state.accounts);
  const { token, archived } = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();

  const YandexConnectButton = ({ acc }) => (
    <Link
      isExternal
      href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${import.meta.env.VITE_YANDEX_CLIENT_ID}&state=${acc._id}`}
    >
      <Button
        colorScheme='gray'
        rightIcon={<Image boxSize='22px' src='/media/yandex.webp' />}
        fontSize={14}
      >
        Connect Disk
      </Button>
    </Link>
  );

  const YandexDisconnectButton = ({ acc }) => (
    <Button
      onClick={() => {
        setLoading(true);
        editAccountData(token, acc._id, { yandex_token: {} }).then(() => {
          dispatch(getAccs(token));
          setLoading(false);
          toast({
            colorScheme: 'orange',
            title: `Yandex Disk disconnected`,
            status: 'warning',
            isClosable: true,
          });
        });
      }}
      colorScheme='gray'
      variant={'outline'}
      rightIcon={<Image boxSize='22px' src='/media/yandex.webp' />}
      isLoading={loading}
      fontSize={14}
    >
      Disconnect Disk
    </Button>
  );

  useEffect(() => {
    if (token) {
      dispatch(getAccs(token));
    }
  }, [dispatch, token]);

  if (!archived) {
    accounts.forEach((acc) => {
      if (!acc?.archived) {
        output.push(acc);
      }
    });
  } else if (archived) {
    accounts.forEach((acc) => {
      output.push(acc);
    });
  }

  const { onCopy, setValue } = useClipboard();

  return output.map((acc, index) => (
    <Box pb={35} key={index}>
      <Box
        bgColor='white'
        borderRadius='12px'
        p={{ base: '20px', sm: '28px', md: '32px', lg: '32px' }}
        position='relative'
      >
        <Flex
          gap='40px'
          mb='24px'
          flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        >
          <Box
            width={{ md: '490px', lg: 'auto' }}
            sx={{
              '@media (max-width:830px)': {
                width: '100%',
              },
            }}
          >
            <Flex
              gap='16px'
              alignItems='center'
              sx={{
                '@media (max-width:480px)': {
                  flexDirection: 'column',
                  alignItems: 'start',
                  gap: '8px',
                },
              }}
            >
              <Heading
                fontSize='24px'
                fontWeight={600}
                lineHeight='120%'
                color='#171923'
                sx={{
                  '@media (max-width:480px)': {
                    order: '1',
                    fontSize: '22px',
                  },
                }}
              >
                {acc.title}
              </Heading>
              <AccountStatus
                expire_at={acc.expire_at}
                archived={acc.archived}
              />
            </Flex>
            <Flex
              mt='20px'
              gap='15px'
              sx={{
                '@media (max-width: 830px)': {
                  flexWrap: 'wrap',
                },
              }}
            >
              <Link
                sx={{
                  '@media (max-width: 830px)': {
                    width: '100%',
                  },
                }}
                href={acc.table_link}
                isExternal
              >
                <Button
                  colorScheme='green'
                  sx={{
                    '@media (max-width: 830px)': {
                      width: '100%',
                    },
                  }}
                  px='12px'
                  variant='outline'
                  _hover={{ bgColor: 'green.500', color: 'white' }}
                  color='green.500'
                  fontSize='14px'
                  fontWeight='600'
                >
                  <Text pr='8px'>Google Sheet</Text>
                  <ExternalLinkIcon />
                </Button>
              </Link>
              <Flex position='relative' width='100%'>
                <Input
                  cursor={'default'}
                  isReadOnly
                  placeholder={acc.table_link}
                  width='100%'
                  _focusVisible={{
                    borderColor: 'none',
                    boxShadow: 'none',
                  }}
                />
                <Button
                  onFocus={() => setValue(acc.table_link)}
                  onClick={() => {
                    onCopy();
                    toast({
                      colorScheme: 'purple',
                      title: `Link copied to clipboard`,
                      status: 'info',
                      isClosable: true,
                    });
                  }}
                  position='absolute'
                  right='0'
                  borderTopLeftRadius='0'
                  borderBottomLeftRadius='0'
                  zIndex='100'
                >
                  <CopyIcon />
                </Button>
              </Flex>
            </Flex>
            <Box mt='12px'>
              <Flex gap='14px' flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
                {!acc.yandex_token?.token ? (
                  <YandexConnectButton acc={acc} />
                ) : (
                  <YandexDisconnectButton acc={acc} />
                )}
                <ModalAvito avito={acc.avito} accID={acc._id} />
                <ModalAutomatic acc={acc} />
              </Flex>
            </Box>
          </Box>
          <Box
            display='none'
            sx={{
              '@media (max-width: 768px)': {
                display: 'block',
              },
            }}
          >
            <hr />
          </Box>
          <Box>
            <Heading fontSize='16px' color='#171923' fontWeight={500} mb='12px'>
              Categories in the sheet
            </Heading>
            <Box>
              <Menu>
                <MenuButton
                  position='absolute'
                  top={{ base: '16px', sm: '28px', md: '32px', lg: '32px' }}
                  right={{ base: '16px', sm: '28px', md: '32px', lg: '32px' }}
                  cursor='pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M12 7C11.4696 7 10.9609 6.78929 10.5858 6.41421C10.2107 6.03914 10 5.53043 10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C14 5.53043 13.7893 6.03914 13.4142 6.41421C13.0391 6.78929 12.5304 7 12 7ZM12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14ZM12 21C11.4696 21 10.9609 20.7893 10.5858 20.4142C10.2107 20.0391 10 19.5304 10 19C10 18.4696 10.2107 17.9609 10.5858 17.5858C10.9609 17.2107 11.4696 17 12 17C12.5304 17 13.0391 17.2107 13.4142 17.5858C13.7893 17.9609 14 18.4696 14 19C14 19.5304 13.7893 20.0391 13.4142 20.4142C13.0391 20.7893 12.5304 21 12 21Z'
                      fill='#718096'
                    />
                  </svg>
                </MenuButton>
                <MenuList
                  border='0'
                  boxShadow='15px 15px 40px -4px rgba(145, 158, 171, 0.17), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)'
                  width='161px'
                >
                  <ModalEditAcc acc={acc} />
                  <ModalArchiv
                    w={'full'}
                    acc={acc}
                    colorScheme={'orange'}
                    variant={'outline'}
                    // callbackClose={() => onClose()}
                  />
                </MenuList>
              </Menu>
            </Box>
            <AccountCategories accID={acc._id} specsArray={acc.specs} />
          </Box>
        </Flex>

        {!acc.archived && <AccountAddons specsArray={acc.specs} acc={acc} />}

        <Box mt='24px'>
          <AccountAlerts
            archived={acc.archived}
            expire_at={acc.expire_at}
            yandex_token={acc.yandex_token}
            avito={acc.avito}
            accID={acc._id}
          />
        </Box>
      </Box>
    </Box>
  ));
};
