import React from 'react';
import useFetchCryptoData from './utils/useFetchCryptoData';

const Cryptos = () => {
  const { error, cryptos } = useFetchCryptoData();
  console.log(error, cryptos);
  return <div>dupa</div>;
};

export default Cryptos;
