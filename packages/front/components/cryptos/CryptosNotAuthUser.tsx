import React from 'react';
import CryptoNotInAsset from './crypto/CryptoNotInAsset';
import { CryptoData } from './Cryptos';

interface CryptoNotInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosNotAuthUser = React.memo<CryptoNotInAssetUserProps>(({ visibleCryptos }) => {
  return (
    <>
      <div className="group self-start float-left transform sm:skew-y-6 text-center sm:text-left w-3/5">
        <div className="flex flex-col ">
          <h2 className="font-bold text-gray-700 text-5xl tracking-wide">
            The world's most popular Bitcoin & cryptocurrency portfolio tracker. Now with trading.
          </h2>
          <p className="mt-4 text-gray-500 text-2xl">
            Track your portfolio, get Blockfolio Signal updates from top teams, and buy and sell
            crypto with zero fees.
          </p>
        </div>
        {/* <p className="text-lg ml-12 transform duration-200 group-hover:translate-x-10">Simple</p>
        <p className="text-xl text-right mr-20 transform duration-300 group-hover:translate-x-10">
          For any currences
        </p>
        <p className="text-lg ml-12 transform duration-1000 group-hover:-translate-x-10">
          Auto refresh
        </p>
        <p className="text-xl text-right mr-24 transform duration-500 group-hover:translate-x-4">
          Monitor your wallet value
        </p> */}
      </div>
      <ul className="list-none mt-4 p-2 w-full sm:w-1/2 transform sm:skew-y-6 z-10 relative">
        {visibleCryptos?.map((item: CryptoData) => (
          <CryptoNotInAsset key={item.name} crypto={item} />
        ))}
      </ul>
    </>
  );
});

export default CryptosNotAuthUser;
