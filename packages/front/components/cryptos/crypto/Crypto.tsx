import React, { useEffect, useState } from 'react';
import { CryptoData } from '../Cryptos';
import CryptoNotInAsset from './cryptoNotInAsset/CryptoNotInAsset';
import CryptoInAsset from './cryptoInAsset/CryptoInAsset';
interface CryptoProps {
  crypto: CryptoData;
}

const Crypto = React.memo<CryptoProps>(({ crypto }) => {
  const [animate, setAnimate] = useState('');

  const { price } = crypto;

  const isAuthenticated = localStorage.getItem('token') !== null;
  const token = localStorage.getItem('token');
  console.log(isAuthenticated);

  useEffect(() => {
    setAnimate('animate-pulse');
    setTimeout(() => {
      setAnimate('');
    }, 1000);
    return () => {
      clearTimeout;
    };
  }, [price, isAuthenticated]);

  if (!token) {
    return <CryptoNotInAsset crypto={crypto} animate={animate} />;
  }
  return <CryptoInAsset crypto={crypto} animate={animate} />;
});

export default Crypto;
