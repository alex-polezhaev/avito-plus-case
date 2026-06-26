import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { getTariffAdsAmount } from '../../api/tariffFuncs';

const AccountAddons = ({ specsArray, acc }) => {
  const statOutput = {
    total_ads: 0,
    active_ads: 0,
    old_ads: 0,
    blocked_ads: 0,
    rejected_ads: 0,
    archived_ads: 0,
    deleted_ads: 0,
    waiting_ads: 0,

    views1: 0,
    messages1: 0,
    likes1: 0,

    views7: 0,
    messages7: 0,
    likes7: 0,

    views30: 0,
    messages30: 0,
    likes30: 0,
  };

  specsArray.forEach((spec) => {
    const { stat } = spec;
    statOutput.total_ads += stat.total_ads;
    statOutput.active_ads += stat.active_ads;
    statOutput.old_ads += stat.old_ads;
    statOutput.blocked_ads += stat.blocked_ads;
    statOutput.rejected_ads += stat.rejected_ads;
    statOutput.archived_ads += stat.archived_ads;
    statOutput.deleted_ads += stat.deleted_ads;
    statOutput.waiting_ads += stat.waiting_ads;

    statOutput.views1 += stat.views1;
    statOutput.messages1 += stat.messages1;
    statOutput.likes1 += stat.likes1;

    statOutput.views7 += stat.views7;
    statOutput.messages7 += stat.messages7;
    statOutput.likes7 += stat.likes7;

    statOutput.views30 += stat.views30;
    statOutput.messages30 += stat.messages30;
    statOutput.likes30 += stat.likes30;
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <hr />
      <Box mt='24px'>
        <Accordion allowMultiple>
          <AccordionItem border='none'>
            <Box as='span' display='inline-block'>
              <AccordionButton
                justifyContent='start'
                p='0'
                _hover={{
                  bgColor: 'transparent',
                }}
                gap='4px'
              >
                <Heading
                  flex='1'
                  textAlign='left'
                  fontSize='16px'
                  fontWeight='500'
                  lineHeight='120%'
                  color='#171923'
                >
                  Statistics
                </Heading>

                <AccordionIcon color='purple.500' width='16px' height='16px' />
              </AccordionButton>
            </Box>
            <AccordionPanel p='0' pt='12px'>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  lg: 'repeat(2, 1fr)',
                }}
                gap='12px'
              >
                <Box
                  border='1px solid #E2E8F0'
                  borderRadius='12px'
                  p={{ base: '20px', sm: '24px', md: '24px', lg: '24px' }}
                >
                  <Box
                    as='span'
                    fontSize='14px'
                    fontWeight={500}
                    lineHeight='16px'
                    color='gray.500'
                    display='inline-block'
                  >
                    Listings
                  </Box>
                  <Grid
                    templateColumns='repeat(2, 1fr)'
                    mt='12px'
                    sx={{
                      '@media (max-width:435px)': {
                        display: 'flex',
                        flexDirection: 'column',
                      },
                    }}
                  >
                    <Flex
                      justifyContent='space-between'
                      pr='17px'
                      flexWrap='wrap'
                      pb='12px'
                      sx={{
                        '@media (max-width:435px)': {
                          pr: '0',
                          border: 'none',
                        },
                      }}
                      borderRight='1px solid #E2E8F0'
                    >
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        Used
                      </Box>
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        <Text
                          bgColor='gray.200'
                          px='8px'
                          display='inline-block'
                          color='gray.800'
                          fontSize='12px'
                          fontWeight='500'
                          borderRadius='6px'
                        >
                          {`${statOutput.total_ads} of ${getTariffAdsAmount(
                            acc.month_price,
                          )}`}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex
                      justifyContent='space-between'
                      pl='17px'
                      pb='12px'
                      sx={{
                        '@media (max-width:435px)': {
                          pl: '0',
                          pt: '12px',
                          borderTop: '1px solid #e2e9f0',
                        },
                      }}
                    >
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        Active
                      </Box>
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        <Text
                          bgColor='blue.100'
                          borderRadius='6px'
                          display='inline-block'
                          px='8px'
                          color='#2A4365'
                          fontSize='12px'
                          fontWeight='500'
                        >
                          {statOutput.active_ads}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex
                      justifyContent='space-between'
                      borderRight='1px solid #E2E8F0'
                      pr='17px'
                      py='12px'
                      sx={{
                        '@media (max-width:435px)': {
                          pr: '0',
                          borderRight: '0',
                        },
                      }}
                      borderBottom='1px solid #E2E8F0'
                      borderTop='1px solid #E2E8F0'
                    >
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        Pending
                      </Box>
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        <Text
                          bgColor='teal.100'
                          px='8px'
                          display='inline-block'
                          color='teal.800'
                          fontSize='12px'
                          fontWeight='500'
                          borderRadius='6px'
                        >
                          {statOutput.waiting_ads}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex
                      justifyContent='space-between'
                      pl='17px'
                      py='12px'
                      sx={{
                        '@media (max-width:435px)': {
                          pl: '0',
                          borderTop: 'none',
                        },
                      }}
                      borderBottom='1px solid #E2E8F0'
                      borderTop='1px solid #E2E8F0'
                    >
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        Expired
                      </Box>
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        <Text
                          bgColor='orange.100'
                          borderRadius='6px'
                          display='inline-block'
                          px='8px'
                          color='orange.800'
                          fontSize='12px'
                          fontWeight='500'
                        >
                          {statOutput.old_ads}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex
                      justifyContent='space-between'
                      borderRight='1px solid #E2E8F0'
                      pr='17px'
                      pt='12px'
                      sx={{
                        '@media (max-width:435px)': {
                          pr: '0',
                          pb: '12px',
                          border: 'none',
                        },
                      }}
                    >
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        Errors
                      </Box>
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        <Text
                          bgColor='red.100'
                          px='8px'
                          display='inline-block'
                          color='red.800'
                          fontSize='12px'
                          fontWeight='500'
                          borderRadius='6px'
                        >
                          {statOutput.blocked_ads + statOutput.rejected_ads}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex
                      justifyContent='space-between'
                      pl='17px'
                      pt='12px'
                      sx={{
                        '@media (max-width:435px)': {
                          pl: '0',
                          borderTop: '1px solid #E2E8F0',
                        },
                      }}
                    >
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        Other
                      </Box>
                      <Box
                        fontSize='12px'
                        color='#2D3748'
                        fontWeight='700'
                        lineHeight='16px'
                      >
                        <Text
                          bgColor='purple.100'
                          borderRadius='6px'
                          display='inline-block'
                          px='8px'
                          color='purple.800'
                          fontSize='12px'
                          fontWeight='500'
                        >
                          {statOutput.archived_ads + statOutput.deleted_ads}
                        </Text>
                      </Box>
                    </Flex>
                  </Grid>
                </Box>

                <Box
                  border='1px solid #E2E8F0'
                  borderRadius='12px'
                  p={{ base: '20px', sm: '24px', md: '24px', lg: '24px' }}
                >
                  <Flex
                    justifyContent='space-between'
                    gap={{ base: '10px', md: '32px', lg: '10px' }}
                    sx={{
                      '@media (max-width:668px)': {
                        flexWrap: 'wrap',
                        gap: '20px',
                      },
                    }}
                  >
                    <Box flex='1 1 0'>
                      <Heading
                        fontSize='12px'
                        color='gray.700'
                        fontWeight={700}
                        lineHeight='16px'
                      >
                        Today
                      </Heading>
                      <Flex
                        flexDirection='column'
                        gap='8px'
                        mt={{
                          base: '12px',
                          sm: '16px',
                          md: '16px',
                          lg: '16px',
                        }}
                      >
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#BEE3F8'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M13.5248 6.82281C13.5056 6.77961 13.0424 5.75203 12.0127 4.72227C10.6405 3.35016 8.9075 2.625 7 2.625C5.0925 2.625 3.35945 3.35016 1.98734 4.72227C0.957573 5.75203 0.492182 6.78125 0.475229 6.82281C0.450354 6.87876 0.4375 6.93931 0.4375 7.00055C0.4375 7.06178 0.450354 7.12233 0.475229 7.17828C0.49437 7.22148 0.957573 8.24852 1.98734 9.27828C3.35945 10.6498 5.0925 11.375 7 11.375C8.9075 11.375 10.6405 10.6498 12.0127 9.27828C13.0424 8.24852 13.5056 7.22148 13.5248 7.17828C13.5496 7.12233 13.5625 7.06178 13.5625 7.00055C13.5625 6.93931 13.5496 6.87876 13.5248 6.82281ZM7 9.1875C6.56735 9.1875 6.14442 9.05921 5.78469 8.81884C5.42495 8.57847 5.14458 8.23683 4.97901 7.83712C4.81344 7.43741 4.77012 6.99757 4.85453 6.57324C4.93893 6.14891 5.14727 5.75913 5.4532 5.4532C5.75913 5.14728 6.1489 4.93894 6.57324 4.85453C6.99757 4.77013 7.4374 4.81345 7.83712 4.97901C8.23683 5.14458 8.57847 5.42496 8.81884 5.78469C9.0592 6.14442 9.1875 6.56735 9.1875 7C9.1875 7.58016 8.95703 8.13656 8.54679 8.5468C8.13656 8.95703 7.58016 9.1875 7 9.1875Z'
                                fill='#3182CE'
                              />
                            </svg>
                            <Text>Views:</Text>
                            <Text ml='auto'>{statOutput.views1}</Text>
                          </Flex>
                        </Box>
                        <Box
                          flex='1 1 0'
                          px='8px'
                          py='6px'
                          bgColor='#EDF2F7'
                          borderRadius='6px'
                          width='100%'
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M2.5 1C1.67266 1 1 1.67269 1 2.50006V9.25036C1 10.0777 1.67266 10.7504 2.5 10.7504H4.75V12.6255C4.75 12.7685 4.82969 12.8974 4.95625 12.9607C5.08281 13.024 5.23516 13.0099 5.35 12.9255L8.24922 10.7504H11.5C12.3273 10.7504 13 10.0777 13 9.25036V2.50006C13 1.67269 12.3273 1 11.5 1H2.5Z'
                                fill='#718096'
                              />
                            </svg>
                            <Text>Messages:</Text>
                            <Text ml='auto'>{statOutput.messages1}</Text>
                          </Flex>
                        </Box>
                        <Box
                          flex='1 1 0'
                          px='8px'
                          py='6px'
                          bgColor='#FEEBCB'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M12.824 6.25517L10.3576 8.40767L11.0965 11.6124C11.1356 11.7799 11.1244 11.9552 11.0644 12.1165C11.0044 12.2777 10.8982 12.4176 10.759 12.5188C10.6199 12.62 10.454 12.678 10.2822 12.6854C10.1103 12.6928 9.94005 12.6494 9.79271 12.5606L6.99763 10.8653L4.20857 12.5606C4.06122 12.6494 3.89097 12.6928 3.7191 12.6854C3.54723 12.678 3.38136 12.62 3.24224 12.5188C3.10311 12.4176 2.9969 12.2777 2.93689 12.1165C2.87688 11.9552 2.86572 11.7799 2.90482 11.6124L3.64255 8.41095L1.1756 6.25517C1.04512 6.14264 0.950768 5.99408 0.904379 5.82814C0.857989 5.6622 0.861626 5.48625 0.914833 5.32237C0.968039 5.15849 1.06845 5.01396 1.20347 4.90691C1.33848 4.79987 1.5021 4.73507 1.6738 4.72064L4.92552 4.439L6.19482 1.4115C6.2611 1.25264 6.37291 1.11694 6.51615 1.0215C6.6594 0.926052 6.82768 0.875122 6.99982 0.875122C7.17195 0.875122 7.34023 0.926052 7.48348 1.0215C7.62673 1.11694 7.73853 1.25264 7.80482 1.4115L9.07794 4.439L12.3286 4.72064C12.5003 4.73507 12.6639 4.79987 12.7989 4.90691C12.9339 5.01396 13.0343 5.15849 13.0875 5.32237C13.1407 5.48625 13.1444 5.6622 13.098 5.82814C13.0516 5.99408 12.9572 6.14264 12.8268 6.25517H12.824Z'
                                fill='#ED8936'
                              />
                            </svg>
                            <Text>Favorites:</Text>
                            <Text ml='auto'>{statOutput.likes1}</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                    <Box flex='1 1 0'>
                      <Heading
                        fontSize='12px'
                        color='gray.700'
                        fontWeight={700}
                        lineHeight='16px'
                      >
                        30 days
                      </Heading>
                      <Flex
                        flexDirection='column'
                        gap='8px'
                        mt={{
                          base: '12px',
                          sm: '16px',
                          md: '16px',
                          lg: '16px',
                        }}
                      >
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#BEE3F8'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M13.5248 6.82281C13.5056 6.77961 13.0424 5.75203 12.0127 4.72227C10.6405 3.35016 8.9075 2.625 7 2.625C5.0925 2.625 3.35945 3.35016 1.98734 4.72227C0.957573 5.75203 0.492182 6.78125 0.475229 6.82281C0.450354 6.87876 0.4375 6.93931 0.4375 7.00055C0.4375 7.06178 0.450354 7.12233 0.475229 7.17828C0.49437 7.22148 0.957573 8.24852 1.98734 9.27828C3.35945 10.6498 5.0925 11.375 7 11.375C8.9075 11.375 10.6405 10.6498 12.0127 9.27828C13.0424 8.24852 13.5056 7.22148 13.5248 7.17828C13.5496 7.12233 13.5625 7.06178 13.5625 7.00055C13.5625 6.93931 13.5496 6.87876 13.5248 6.82281ZM7 9.1875C6.56735 9.1875 6.14442 9.05921 5.78469 8.81884C5.42495 8.57847 5.14458 8.23683 4.97901 7.83712C4.81344 7.43741 4.77012 6.99757 4.85453 6.57324C4.93893 6.14891 5.14727 5.75913 5.4532 5.4532C5.75913 5.14728 6.1489 4.93894 6.57324 4.85453C6.99757 4.77013 7.4374 4.81345 7.83712 4.97901C8.23683 5.14458 8.57847 5.42496 8.81884 5.78469C9.0592 6.14442 9.1875 6.56735 9.1875 7C9.1875 7.58016 8.95703 8.13656 8.54679 8.5468C8.13656 8.95703 7.58016 9.1875 7 9.1875Z'
                                fill='#3182CE'
                              />
                            </svg>
                            <Text>Views:</Text>
                            <Text ml='auto'>{statOutput.views30}</Text>
                          </Flex>
                        </Box>
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#EDF2F7'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M2.5 1C1.67266 1 1 1.67269 1 2.50006V9.25036C1 10.0777 1.67266 10.7504 2.5 10.7504H4.75V12.6255C4.75 12.7685 4.82969 12.8974 4.95625 12.9607C5.08281 13.024 5.23516 13.0099 5.35 12.9255L8.24922 10.7504H11.5C12.3273 10.7504 13 10.0777 13 9.25036V2.50006C13 1.67269 12.3273 1 11.5 1H2.5Z'
                                fill='#718096'
                              />
                            </svg>
                            <Text>Messages:</Text>
                            <Text ml='auto'>{statOutput.messages30}</Text>
                          </Flex>
                        </Box>
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#FEEBCB'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M12.824 6.25517L10.3576 8.40767L11.0965 11.6124C11.1356 11.7799 11.1244 11.9552 11.0644 12.1165C11.0044 12.2777 10.8982 12.4176 10.759 12.5188C10.6199 12.62 10.454 12.678 10.2822 12.6854C10.1103 12.6928 9.94005 12.6494 9.79271 12.5606L6.99763 10.8653L4.20857 12.5606C4.06122 12.6494 3.89097 12.6928 3.7191 12.6854C3.54723 12.678 3.38136 12.62 3.24224 12.5188C3.10311 12.4176 2.9969 12.2777 2.93689 12.1165C2.87688 11.9552 2.86572 11.7799 2.90482 11.6124L3.64255 8.41095L1.1756 6.25517C1.04512 6.14264 0.950768 5.99408 0.904379 5.82814C0.857989 5.6622 0.861626 5.48625 0.914833 5.32237C0.968039 5.15849 1.06845 5.01396 1.20347 4.90691C1.33848 4.79987 1.5021 4.73507 1.6738 4.72064L4.92552 4.439L6.19482 1.4115C6.2611 1.25264 6.37291 1.11694 6.51615 1.0215C6.6594 0.926052 6.82768 0.875122 6.99982 0.875122C7.17195 0.875122 7.34023 0.926052 7.48348 1.0215C7.62673 1.11694 7.73853 1.25264 7.80482 1.4115L9.07794 4.439L12.3286 4.72064C12.5003 4.73507 12.6639 4.79987 12.7989 4.90691C12.9339 5.01396 13.0343 5.15849 13.0875 5.32237C13.1407 5.48625 13.1444 5.6622 13.098 5.82814C13.0516 5.99408 12.9572 6.14264 12.8268 6.25517H12.824Z'
                                fill='#ED8936'
                              />
                            </svg>
                            <Text>Favorites:</Text>
                            <Text ml='auto'>{statOutput.likes30}</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                    <Box flex='1 1 0'>
                      <Heading
                        fontSize='12px'
                        color='gray.700'
                        fontWeight={700}
                        lineHeight='16px'
                      >
                        7 days
                      </Heading>
                      <Flex
                        flexDirection='column'
                        gap='8px'
                        mt={{
                          base: '12px',
                          sm: '16px',
                          md: '16px',
                          lg: '16px',
                        }}
                      >
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#BEE3F8'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M13.5248 6.82281C13.5056 6.77961 13.0424 5.75203 12.0127 4.72227C10.6405 3.35016 8.9075 2.625 7 2.625C5.0925 2.625 3.35945 3.35016 1.98734 4.72227C0.957573 5.75203 0.492182 6.78125 0.475229 6.82281C0.450354 6.87876 0.4375 6.93931 0.4375 7.00055C0.4375 7.06178 0.450354 7.12233 0.475229 7.17828C0.49437 7.22148 0.957573 8.24852 1.98734 9.27828C3.35945 10.6498 5.0925 11.375 7 11.375C8.9075 11.375 10.6405 10.6498 12.0127 9.27828C13.0424 8.24852 13.5056 7.22148 13.5248 7.17828C13.5496 7.12233 13.5625 7.06178 13.5625 7.00055C13.5625 6.93931 13.5496 6.87876 13.5248 6.82281ZM7 9.1875C6.56735 9.1875 6.14442 9.05921 5.78469 8.81884C5.42495 8.57847 5.14458 8.23683 4.97901 7.83712C4.81344 7.43741 4.77012 6.99757 4.85453 6.57324C4.93893 6.14891 5.14727 5.75913 5.4532 5.4532C5.75913 5.14728 6.1489 4.93894 6.57324 4.85453C6.99757 4.77013 7.4374 4.81345 7.83712 4.97901C8.23683 5.14458 8.57847 5.42496 8.81884 5.78469C9.0592 6.14442 9.1875 6.56735 9.1875 7C9.1875 7.58016 8.95703 8.13656 8.54679 8.5468C8.13656 8.95703 7.58016 9.1875 7 9.1875Z'
                                fill='#3182CE'
                              />
                            </svg>
                            <Text>Views:</Text>
                            <Text ml='auto'>{statOutput.views7}</Text>
                          </Flex>
                        </Box>
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#EDF2F7'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M2.5 1C1.67266 1 1 1.67269 1 2.50006V9.25036C1 10.0777 1.67266 10.7504 2.5 10.7504H4.75V12.6255C4.75 12.7685 4.82969 12.8974 4.95625 12.9607C5.08281 13.024 5.23516 13.0099 5.35 12.9255L8.24922 10.7504H11.5C12.3273 10.7504 13 10.0777 13 9.25036V2.50006C13 1.67269 12.3273 1 11.5 1H2.5Z'
                                fill='#718096'
                              />
                            </svg>
                            <Text>Messages:</Text>
                            <Text ml='auto'>{statOutput.messages7}</Text>
                          </Flex>
                        </Box>
                        <Box
                          px='8px'
                          py='6px'
                          bgColor='#FEEBCB'
                          borderRadius='6px'
                          width={{ base: '100%', lg: '163px' }}
                          sx={{
                            '@media (max-width: 650px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Flex
                            alignItems='center'
                            fontSize='12px'
                            color='#2A4365'
                            fontWeight={500}
                            lineHeight='16px'
                            gap='6px'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                            >
                              <path
                                d='M12.824 6.25517L10.3576 8.40767L11.0965 11.6124C11.1356 11.7799 11.1244 11.9552 11.0644 12.1165C11.0044 12.2777 10.8982 12.4176 10.759 12.5188C10.6199 12.62 10.454 12.678 10.2822 12.6854C10.1103 12.6928 9.94005 12.6494 9.79271 12.5606L6.99763 10.8653L4.20857 12.5606C4.06122 12.6494 3.89097 12.6928 3.7191 12.6854C3.54723 12.678 3.38136 12.62 3.24224 12.5188C3.10311 12.4176 2.9969 12.2777 2.93689 12.1165C2.87688 11.9552 2.86572 11.7799 2.90482 11.6124L3.64255 8.41095L1.1756 6.25517C1.04512 6.14264 0.950768 5.99408 0.904379 5.82814C0.857989 5.6622 0.861626 5.48625 0.914833 5.32237C0.968039 5.15849 1.06845 5.01396 1.20347 4.90691C1.33848 4.79987 1.5021 4.73507 1.6738 4.72064L4.92552 4.439L6.19482 1.4115C6.2611 1.25264 6.37291 1.11694 6.51615 1.0215C6.6594 0.926052 6.82768 0.875122 6.99982 0.875122C7.17195 0.875122 7.34023 0.926052 7.48348 1.0215C7.62673 1.11694 7.73853 1.25264 7.80482 1.4115L9.07794 4.439L12.3286 4.72064C12.5003 4.73507 12.6639 4.79987 12.7989 4.90691C12.9339 5.01396 13.0343 5.15849 13.0875 5.32237C13.1407 5.48625 13.1444 5.6622 13.098 5.82814C13.0516 5.99408 12.9572 6.14264 12.8268 6.25517H12.824Z'
                                fill='#ED8936'
                              />
                            </svg>
                            <Text>Favorites:</Text>
                            <Text ml='auto'>{statOutput.likes7}</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default AccountAddons;
