import { Image, Box, Button } from '@chakra-ui/react';
import React from 'react';
import '../../assets/styles/styles.css';
import { ReactSortable } from 'react-sortablejs';
import assets from '../../assets';

export const DragImages = ({ imagesArray, formik }) => {
  const [list, setList] = React.useState(imagesArray);

  const dragHandler = (event) => {
    const imgUrls = [];
    event.target.childNodes.forEach((child) => {
      const imgUrl = child.dataset.imgurl;
      imgUrls.push(imgUrl);
    });
    const { values } = formik;
    formik.setValues({ ...values, Images: imgUrls.join('\n') });
  };

  const clickHandler = (event) => {
    const { imgindex: imgIndex } = event.target.dataset;
    const newImagesArray = list.filter((el, i) => i !== +imgIndex);
    setList(newImagesArray);
    const { values } = formik;
    formik.setValues({ ...values, Images: newImagesArray.join('\n') });
  };

  return (
    <div className='App'>
      <ReactSortable
        list={list}
        setList={setList}
        animation='200'
        easing='ease-out'
        direction='horizontal'
        onChange={dragHandler}
      >
        {list.map((url, i) => (
          <div className='draggableItem' data-imgurl={url} key={i}>
            <Box borderRadius='8px' pos='relative'>
              <Image
                width={{ base: '80px', sm: '87px' }}
                height={{ base: '80px', sm: '87px' }}
                _hover={{ border: '2px solid #e6def7' }}
                borderRadius='8px'
                src={url}
                mt={1}
                mr={2}
              />
              <Image
                src={assets.jostik}
                pos='absolute'
                top='4px'
                right='12px'
              />
              <Button
                onClick={clickHandler}
                pos='absolute'
                top='64px'
                width={{ base: '80px', sm: '87px' }}
                height={{ base: '16px', sm: '23px' }}
                background='red.500'
                _hover={{ background: 'red.400' }}
                fontWeight={400}
                data-imgindex={i}
                color='white'
                fontSize={12}
              >
                Delete
              </Button>
            </Box>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};
