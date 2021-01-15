import React, { useEffect, useState } from 'react';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';
import Arrow from './arrow/Arrow';
import { CryptoData } from '../Cryptos';
interface CryptoProps {
  crypto: CryptoData;
}

const Crypto = React.memo<CryptoProps>(({ crypto }) => {
  const [animate, setAnimate] = useState('');
  const { firstCurrency, name, price, pair } = crypto;

  useEffect(() => {
    setAnimate('animate-pulse');
    setTimeout(() => {
      setAnimate('');
    }, 1000);
  }, [price]);

  return (
    <li
      className={`flex items-center py-4 w-full max-w-md mx-auto bg-blue-100 m-2 p-2 rounded-md ${animate}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div className="mr-2">
            <Icon i={firstCurrency.toLowerCase()} size={32} />
          </div>
          <div>
            <p className="font-mono">{name}</p>
            <p className="font-bold text-xs">{firstCurrency}</p>
          </div>
        </div>
        <p className="text-sm md:text-xl">
          {price} <span className="text-xs">PLN</span>
        </p>
        <Arrow pair={pair} currentPrice={price} />
      </div>
    </li>
  );
});

export default Crypto;
