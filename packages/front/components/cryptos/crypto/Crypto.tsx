import React from 'react';
import { CryptoData } from '../utils/useFetchCryptoData';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';
import Arrow from './arrow/Arrow';
interface CryptoProps {
  crypto: CryptoData;
}

const Crypto = React.memo<CryptoProps>(({ crypto }) => {
  const { firstCurrency, name, price, pair } = crypto;
  console.log(pair);
  return (
    <li className="flex items-center py-4 w-full max-w-md mx-auto bg-blue-100 m-2 p-2 rounded-md">
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
        <span className="text-xs md:text-xl">{price} PLN</span>
        <Arrow pair={pair} currentPrice={price} />
      </div>
    </li>
  );
});

export default Crypto;
