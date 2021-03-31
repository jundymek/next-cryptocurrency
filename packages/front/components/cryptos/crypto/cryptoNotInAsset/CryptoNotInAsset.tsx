import React from 'react';
import { CryptoData } from '../../Cryptos';
import Arrow from '../utils/arrow/Arrow';
import { loadImage } from '../../../../helpers/loadImage';

interface CryptoProps {
  crypto?: CryptoData;
  animate?: string;
}

const CryptoNotInAsset = React.memo<CryptoProps>(({ crypto, animate }) => {
  if (!crypto) {
    return null;
  }
  const { firstCurrency, name, price, pair } = crypto;
  return (
    <li
      className={`flex rounded-md items-center shadow-xl py-4 max-w-md mx-auto sm:ml-auto text-gray-200 bg-gray-800 m-2 p-2 ${animate}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              src={loadImage(`./${firstCurrency.toLowerCase()}.svg`).default}
              alt={`${firstCurrency} icon`}
              width={32}
              height={32}
            />
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
    </li>
  );
});

export default CryptoNotInAsset;
