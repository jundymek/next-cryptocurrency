import React from 'react';
import Hero from '../hero/Hero';
import CryptoNotInAsset from './crypto/CryptoNotInAsset';
import { CryptoData } from './Cryptos';

interface CryptoNotInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosNotAuthUser = React.memo<CryptoNotInAssetUserProps>(({ visibleCryptos }) => {
  return (
    <>
      <Hero />
      <ul className="list-none mt-4 p-2 w-full sm:w-1/2 transform sm:skew-y-6 z-10 relative">
        {visibleCryptos?.map((item: CryptoData) => (
          <CryptoNotInAsset key={item.name} crypto={item} />
        ))}
      </ul>
    </>
  );
});

export default CryptosNotAuthUser;
