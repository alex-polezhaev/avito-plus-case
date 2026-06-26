import {
  Heading,
  Box,
  Text,
  Flex,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import assets from '../../assets';
import { OutlineButton } from '../common';
import { Link } from 'react-router-dom';

export const AvitoPlus = () => (
  <Box
    color='#171923'
    bgColor='#FAFAFA'
    py={{ base: '20px', sm: '100px', md: '100px', lg: '144px' }}
    mb='144px'
    sx={{
      '@media (max-width:500px)': {
        mb: '80px',
      },
    }}
  >
    <div className='container'>
      <Heading
        fontWeight='700'
        lineHeight='120%'
        textAlign='center'
        fontSize={{ base: '22px', sm: '35px', md: '40px', lg: '48px' }}
        mb={{ base: '20px', sm: '40px', md: '44px', lg: '44px' }}
      >
        How does it work — <span className='purple'>Avito Plus?</span>
      </Heading>

      <Grid
        templateColumns='repeat(3, 1fr)'
        gap={8}
        sx={{
          '@media (max-width:1000px)': {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
          },
        }}
      >
        <GridItem
          sx={{
            '@media (max-width:1000px)': {
              width: '48%',
            },
            '@media (max-width:790px)': {
              width: '100%',
            },
          }}
        >
          <Box
            borderRadius={32}
            bgColor='#fff'
            p={8}
            sx={{
              '@media (max-width:480px)': {
                p: '16px',
              },
              '@media (max-width:480px)': {
                height: '330px',
                borderRadius: '20px',
                p: '16px',
              },
            }}
            height='467px'
            position='relative'
            overflow='hidden'
          >
            <Heading
              fontSize={{ base: '20px', md: '24px', lg: '24px' }}
              color='#171923'
            >
              Edit the Google Sheet
            </Heading>
            <Text
              fontSize={{ base: '15px', md: '18px', lg: '18px' }}
              color='#2D3748'
              lineHeight='150%'
              mt={{ base: '12px', md: 4, lg: 4 }}
            >
              One row in the table <br />
              equals one listing
            </Text>
            <Box
              position='absolute'
              bottom={0}
              right={0}
              sx={{
                '@media (max-width:480px)': {
                  height: '266px',
                  width: '300px',
                  bottom: '-58px',
                },
              }}
            >
              <Image
                src={assets.fullGoogleSheet}
                // sx={{
                // 	"@media (max-width:480px)": {
                // 		display: 'none'
                // 	}
                // }}
              />
              {/* <Image src={assets.mediaGoogleSheet} display='none'
								sx={{
									"@media (max-width:480px)": {
										display: 'block'
									}
								}}
							/> */}
            </Box>
          </Box>
        </GridItem>
        <GridItem
          bgImage={`url(${assets.avitoPlusBg})`}
          bgColor='#6549aa'
          bgRepeat='no-repeat'
          bgSize='100% 100%'
          borderRadius={32}
          display='flex'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          px='40px'
          boxShadow='-20px 20px 62.8px -15px rgba(128, 90, 213, 0.40)'
          sx={{
            '@media (max-width:1000px)': {
              width: '100%',
              order: '1',
              height: '180px',
              bgSize: '100% 280%',
            },
            '@media (max-width:480px)': {
              bgImage: `url(${assets.avitoPlusBg})`,
              bgSize: '109% 150%',
              bgPosition: '0px -33px',
            },
          }}
        >
          <Text
            fontSize='28px'
            fontWeight='800'
            lineHeight='120%'
            color='white'
            sx={{
              '@media (max-width:480px)': {
                fontSize: '24px',
              },
            }}
          >
            Publishing to Avito <br />
            every 60 minutes
          </Text>
        </GridItem>
        <GridItem
          borderRadius={32}
          bgColor='#fff'
          p={8}
          height='467px'
          position='relative'
          sx={{
            '@media (max-width:1000px)': {
              width: '48%',
            },
            '@media (max-width:790px)': {
              width: '100%',
            },
            '@media (max-width:480px)': {
              height: '320px',
              borderRadius: '20px',
              p: '16px',
            },
          }}
        >
          <Heading
            fontSize={{ base: '20px', md: '24px', lg: '24px' }}
            color='#171923'
          >
            Avito publishes the listings
          </Heading>
          <Text
            fontSize={{ base: '15px', md: '18px', lg: '18px' }}
            color='#2D3748'
            lineHeight='150%'
            mt={{ base: '12px', md: 4, lg: 4 }}
            mb='16px'
          >
            If a listing has an error — we'll show it in the table next to the
            listing
          </Text>
          <Box
            position='absolute'
            bottom='50px'
            left='50%'
            transform='translateX(-50%)'
            sx={{
              '@media (max-width:480px)': {
                bottom: '38px',
              },
            }}
          >
            <Image src={assets.avitoReklama} />
          </Box>
        </GridItem>
      </Grid>
      <Box
        mt='30px'
        bgColor='white'
        borderRadius={32}
        pt={8}
        pr={8}
        pl={8}
        pb='72px'
        position='relative'
        overflow='hidden'
        zIndex='1'
        sx={{
          '@media (max-width:800px)': {
            pb: '40px',
          },
          '@media (max-width:480px)': {
            p: '20px',
            borderRadius: '20px',
          },
        }}
      >
        <Flex
          justifyContent='space-between'
          sx={{
            '@media (max-width:800px)': {
              flexWrap: 'wrap',
            },
          }}
        >
          <Box
            maxWidth='580px'
            width='100%'
            sx={{
              '@media (max-width:1000px)': {
                maxWidth: '405px',
              },
              '@media (max-width:800px)': {
                mb: '41px',
                maxWidth: '100%',
              },
            }}
          >
            <Heading
              fontSize={{ base: '20px', sm: '24px', md: '24px', lg: '24px' }}
              fontWeight={700}
              lineHeight='120%'
              color='#171923'
            >
              Avito statistics
            </Heading>
            <Text
              pt={{ base: '12px', sm: 4, md: 4, lg: 4 }}
              pb={{ base: '22px', sm: 7, md: 7, lg: 7 }}
              fontSize={{ base: '15px', sm: '18px', md: '18px', lg: '18px' }}
            >
              Track statistics for your listings and Avito accounts.
              Analyze and make decisions based on views, conversions,
              likes and messages.
            </Text>
            <Link
              to='/video-instructions'
              className='outline-link-button outline'
            >
              Yandex Disk
            </Link>
          </Box>
          <Box>
            <Flex
              sx={{
                '@media (max-width:1300px)': {
                  gap: '20px',
                },
              }}
            >
              <Box
                className='avito-plus__statistics'
                fontSize={'sm'}
                backgroundColor={'#fff'}
                p={3}
                borderRadius={12}
                width='200px'
                boxShadow='-20px 20px 62.8px -15px #ccc'
                color='#2D3748'
                position='absolute'
                top='22px'
                right='330px'
                sx={{
                  '@media (max-width:1300px)': {
                    right: '20px',
                    position: 'initial',
                    height: '104px',
                    mt: '-15px',
                  },
                  '@media (max-width:480px)': {
                    padding: '10px',
                    width: '154px',
                    height: '80px',
                  },
                }}
              >
                <Text
                  fontWeight={500}
                  sx={{
                    '@media (max-width:480px)': {
                      fontSize: '10px',
                    },
                  }}
                >
                  Views (7 days)
                </Text>
                <Text
                  fontSize={{ base: '18px', md: '2xl', lg: '2xl' }}
                  fontWeight={600}
                  py={{ base: 0, md: 1, lg: 1 }}
                >
                  👀 783
                </Text>
                <Flex gap={1}>
                  <Image src={assets.upGreenIcon} alt='up green icon' />
                  <Text opacity={0.8}>87.09%</Text>
                </Flex>
              </Box>
              <Box
                className='avito-plus__statistics'
                fontSize={'sm'}
                backgroundColor={'#fff'}
                p={3}
                borderRadius={12}
                width='200px'
                color='#2D3748'
                boxShadow='-20px 20px 62.8px -15px #ccc'
                position='absolute'
                top='40px'
                right='105px'
                sx={{
                  '@media (max-width:1300px)': {
                    right: '20px',
                    position: 'initial',
                    height: '104px',
                  },
                  '@media (max-width:480px)': {
                    padding: '10px',
                    width: '154px',
                    height: '80px',
                  },
                }}
              >
                <Text
                  fontWeight={500}
                  sx={{
                    '@media (max-width:480px)': {
                      fontSize: '10px',
                    },
                  }}
                >
                  Messages today
                </Text>
                <Text
                  fontSize={{ base: '18px', md: '2xl', lg: '2xl' }}
                  fontWeight={600}
                  py={{ base: 0, md: 1, lg: 1 }}
                >
                  💬 12
                </Text>
                <Flex gap={1}>
                  <Image src={assets.upGreenIcon} alt='up green icon' />
                  <Text opacity={0.8}>79.48%</Text>
                </Flex>
              </Box>
            </Flex>
            <Flex
              sx={{
                '@media (max-width:1300px)': {
                  gap: '20px',
                },
              }}
            >
              <Box
                className='avito-plus__statistics'
                fontSize={'sm'}
                backgroundColor={'#fff'}
                p={3}
                borderRadius={12}
                width='200px'
                color='#2D3748'
                boxShadow='-20px 20px 62.8px -15px #ccc'
                position='absolute'
                top='150px'
                right='318px'
                sx={{
                  '@media (max-width:1300px)': {
                    right: '20px',
                    position: 'initial',
                    height: '104px',
                    mt: '10px',
                    ml: '15px',
                  },
                  '@media (max-width:480px)': {
                    padding: '10px',
                    width: '154px',
                    height: '80px',
                    mt: '0',
                  },
                }}
              >
                <Text
                  fontWeight={500}
                  sx={{
                    '@media (max-width:480px)': {
                      fontSize: '10px',
                    },
                  }}
                >
                  Conversion (30 days)
                </Text>
                <Text
                  fontSize={{ base: '18px', md: '2xl', lg: '2xl' }}
                  fontWeight={600}
                  py={{ base: 0, md: 1, lg: 1 }}
                >
                  🔥 23%
                </Text>
                <Flex gap={1}>
                  <Image src={assets.upGreenIcon} alt='up green icon' />
                  <Text opacity={0.8}>65.31%</Text>
                </Flex>
              </Box>
              <Box
                className='avito-plus__statistics'
                fontSize={'sm'}
                backgroundColor={'#fff'}
                p={3}
                borderRadius={12}
                width='200px'
                color='#2D3748'
                boxShadow='-20px 20px 62.8px -15px #ccc'
                position='absolute'
                top='167px'
                right='95px'
                sx={{
                  '@media (max-width:1300px)': {
                    right: '20px',
                    position: 'initial',
                    height: '104px',
                    mt: '15px',
                  },
                  '@media (max-width:480px)': {
                    padding: '10px',
                    width: '154px',
                    height: '80px',
                  },
                }}
              >
                <Text
                  fontWeight={500}
                  sx={{
                    '@media (max-width:480px)': {
                      fontSize: '10px',
                    },
                  }}
                >
                  Favorites (7 days)
                </Text>
                <Text
                  fontSize={{ base: '18px', md: '2xl', lg: '2xl' }}
                  fontWeight={600}
                  py={{ base: 0, md: 1, lg: 1 }}
                >
                  💜 45
                </Text>
                <Flex gap={1}>
                  <Image src={assets.upGreenIcon} alt='up green icon' />
                  <Text opacity={0.8}>55.44%</Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Box
          position='absolute'
          right='0'
          height='100%'
          bottom='0'
          width='43%'
          zIndex='-1'
          sx={{
            '@media (max-width:800px)': {
              width: '75%',
            },
            '@media (max-width:700px)': {
              width: '75%',
              height: '57%',
            },
          }}
        >
          <Image
            src={assets.groupRadius}
            style={{ width: '100%', height: '100%' }}
            sx={{
              '@media (max-width:700px)': {
                display: 'none',
              },
            }}
          />
          <Image
            src={assets.mediaRadiusBg}
            style={{ width: '100%', height: '100%' }}
            display='none'
            sx={{
              '@media (max-width:700px)': {
                display: 'block',
              },
            }}
          />
        </Box>
      </Box>
    </div>
  </Box>
);
