import React from 'react';
import Crypto from './crypto/Crypto';
import useFetchCryptoData from './utils/useFetchCryptoData';

const Cryptos = () => {
  const { error, cryptos } = useFetchCryptoData();
  console.log(error, cryptos);

  const listOfCurrences = [
    { symbol: 'BTC', name: 'Bitcoin', isVisible: true },
    { symbol: 'LTC', name: 'Litecoin', isVisible: true },
    { symbol: 'XRP', name: 'Ripple', isVisible: true },
    { symbol: 'ETH', name: 'Ethereum', isVisible: true },
  ];

  const toShow = cryptos?.filter(
    (item) =>
      listOfCurrences.find((el) => el.symbol === item.firstCurrency && el.isVisible) &&
      item.secondCurrency === 'PLN',
  );

  console.log(toShow);
  return (
    <ul className="list-none mt-4 p-2">
      {toShow?.map((item) => (
        <Crypto key={item.name} crypto={item} />
      ))}
    </ul>
  );
};

export default Cryptos;
