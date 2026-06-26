import React, { useLayoutEffect } from 'react';
import { AvitoPlus } from '../components/home/avito-plus';
import { AvitoServices } from '../components/home/avito-services';
import { ShortReview } from '../components/home/short-review';
import { Subscription } from '../components/home/subscription';
import { Welcome } from '../components/home/welcome';
import { Footer, Header } from '../layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Home = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  useLayoutEffect(() => {
    if (token) {
      return navigate('/accounts');
    }
  }, [token]);

  return (
    <>
      <Header />
      <div className='container'>
        <Welcome />
        <ShortReview />
        <AvitoServices />
      </div>
      <AvitoPlus />
      <div className='container'>
        <Subscription />
      </div>
      <Footer />
    </>
  );
};
