import React from 'react';
import { Flex, Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import assets from '../../assets';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export const VideoInstructions = () => {
  return (
    <Box pb={{ base: '80px', sm: '144px', md: '144px', lg: '144px' }}>
      <Heading
        fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
        fontWeight='700'
        color='#171923'
        lineHeight='120%'
        p='44px 0 32px 0'
      >
        Video tutorials
      </Heading>
      <Flex alignItems='center' gap='40px'>
        <Box bgColor='#fff' borderRadius='32px' p='24px' width='100%'>
          <Flex
            gap={{ base: '28px', sm: '40px', md: '40px', lg: '40px' }}
            flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
            alignItems={{ base: 'center', lg: 'auto' }}
          >
            <Image
              src={assets.purpleBallon}
              width={{ base: '75px', sm: '151px', md: '151px', lg: '151px' }}
              height={{ base: '75px', sm: '150px', md: '150px', lg: '150px' }}
            />
            <Box flex='1 1 0'>
              <Heading
                fontSize={{ base: '20px', md: '24px', lg: '24px' }}
                fontWeight={700}
                lineHeight='120%'
                color='#171923'
              >
                Support
              </Heading>
              <Text
                fontSize={{ base: '15px', sm: '18px', md: '18px', lg: '18px' }}
                lineHeight='150%'
                color='#2D3748'
                m={{
                  base: '12px 0 20px 0',
                  sm: '16px 0 28px 0',
                  md: '16px 0 28px 0',
                  lg: '16px 0 28px 0',
                }}
              >
                We're here for you — write to us and we'll gladly answer all your
                questions.
              </Text>
              <Link to='https://t.me/avito_plus_help'>
                <Button
                  colorScheme='purple'
                  variant='outline'
                  fontSize='18px'
                  lineHeight='28px'
                  width={{ base: '100%', md: 'auto', lg: 'auto' }}
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                  height={{ base: '48px', sm: 'auto', md: 'auto', lg: 'auto' }}
                >
                  Ask support
                </Button>
              </Link>
            </Box>
            <Box p='9px' borderRadius='9px' width='fit-content'>
              <Image src={assets.avitoQrCode} width={{ base: '130px' }} />
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Flex
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        mt='40px'
        gap='20px'
      >
        <Box maxWidth={{ base: '100%', md: '299px', lg: '407px' }} width='100%'>
          <Box
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            mb={{ base: '20px', sm: '0', md: '0', lg: '0' }}
          >
            <Text fontWeight={500} lineHeight='120%' color='#171923'>
              Contents
            </Text>
            <Flex gap='8px' flexDirection='column' mt='12px'>
              <AnchorLink href='#why-need-to-use-avito-plus'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  Why do you need Avito Plus?
                </Box>
              </AnchorLink>

              <AnchorLink href='#how-to-post-ads'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  How to post listings through the service?
                </Box>
              </AnchorLink>

              <AnchorLink href='#date-start-date-end'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  Publication date and end date
                </Box>
              </AnchorLink>

              <AnchorLink href='#how-to-use-random'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  How to use the randomizer?
                </Box>
              </AnchorLink>

              <AnchorLink href='#address-metro'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  How to work with addresses and metro?
                </Box>
              </AnchorLink>

              <AnchorLink href='#categories'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  Different categories in one account
                </Box>
              </AnchorLink>

              <AnchorLink href='#yandex-drive'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  Working with photos via Yandex Disk
                </Box>
              </AnchorLink>

              <AnchorLink href='#satistics'>
                <Box
                  p='8px 16px'
                  bgColor='#fafafa'
                  borderRadius='8px'
                  transition='all 0.1s linear'
                  fontSize='14px'
                  fontWeight='500'
                  cursor='pointer'
                  _hover={{
                    bgColor: 'purple.500',
                    color: 'white',
                  }}
                >
                  Listing statuses and working with statistics
                </Box>
              </AnchorLink>
            </Flex>
          </Box>
        </Box>
        <Flex width='100%' flexDirection='column' gap='20px'>
          <Box
            id='why-need-to-use-avito-plus'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              Why do you need Avito Plus?
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/vhnFVeRGlCc?si=srdoZ6H0Ng8iXYOT'
              />
            </Box>
          </Box>

          <Box
            id='how-to-post-ads'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              How to post listings through the service?
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/321fLflsH_I?si=NBwmNWuDl95-8yTb'
              />
            </Box>
          </Box>

          <Box
            id='date-start-date-end'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              Publication date and end date
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/mSuoWyU9sjg?si=FNY_Pao-PDbfWJiB'
              />
            </Box>
          </Box>

          <Box
            id='how-to-use-random'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              How to use the randomizer?
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/0FzhhSCpgNI?si=H8JcLID0YXIHvZ0i'
              />
            </Box>
          </Box>

          <Box
            id='address-metro'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              How to work with addresses and metro?
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/iJ3Llewim0w?si=m5qgz0qBMRGDA8Lw'
              />
            </Box>
          </Box>

          <Box
            id='categories'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              Different categories in one account
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/cLYZAlgUvXY?si=PD7HngZFHP9OPFxJ'
              />
            </Box>
          </Box>

          <Box
            id='yandex-drive'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              Working with photos via Yandex Disk
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/EAnuLoJi4PI?si=-9XKYI0jhFbxchso'
              />
            </Box>
          </Box>

          <Box
            id='satistics'
            bgColor='#fff'
            borderRadius='12px'
            p={{ base: '16px', sm: '20px', md: '24px', lg: '24px' }}
            width='100%'
          >
            <Heading
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
              fontSize='20px'
              mb={5}
            >
              Listing statuses and working with statistics
            </Heading>
            <Box
              height={{ base: '180px', sm: '250px', md: '319px', lg: '319px' }}
            >
              <iframe
                width='100%'
                height='100%'
                style={{ borderRadius: '20px' }}
                src='https://www.youtube.com/embed/k8RmNhYUXSI?si=2C-QIboJv08eBAQa'
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
