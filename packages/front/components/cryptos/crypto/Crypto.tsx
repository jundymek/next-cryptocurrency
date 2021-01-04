import React from 'react';
import { CryptoData } from '../utils/useFetchCryptoData';

interface CryptoProps {
  crypto: CryptoData;
}

const Crypto = React.memo<CryptoProps>(({ crypto }) => {
  return (
    <li className="flex items-center py-4 w-full max-w-md mx-auto bg-blue-100 m-2 p-2 rounded-md">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div>
            <p className="font-mono">{crypto.name}</p>
            <p className="font-bold text-xs">{crypto.firstCurrency}</p>
          </div>
        </div>
        <span className="text-xs md:text-xl">{crypto.price} PLN</span>
      </div>
    </li>
  );
});

export default Crypto;
