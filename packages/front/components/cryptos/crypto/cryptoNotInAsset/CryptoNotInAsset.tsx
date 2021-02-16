import React from 'react';
import { CryptoData } from '../../Cryptos';
import Arrow from '../utils/arrow/Arrow';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';

interface CryptoProps {
  crypto: CryptoData;
  animate?: string;
}

const CryptoNotInAsset = React.memo<CryptoProps>(({ crypto, animate }) => {
  const { firstCurrency, name, price, pair } = crypto;
  return (
    <li className="flex items-center">
      <div
        className={`flex items-center shadow-xl py-4 w-full max-w-md mx-auto text-gray-900 bg-blue-300 m-2 p-2 rounded-md ${animate}`}
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
          <p className="font-mono text-sm md:text-xl">
            {price} <span className="text-xs">PLN</span>
          </p>
          <Arrow pair={pair} currentPrice={price} />
        </div>
      </div>
    </li>
  );
});

export default CryptoNotInAsset;
