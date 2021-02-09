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
      <ul className="list-none mt-20 p-2 w-full sm:w-1/2 transform z-10 pb-20">
        {visibleCryptos?.map((item: CryptoData) => (
          <CryptoNotInAsset key={item.name} crypto={item} />
        ))}
      </ul>
      <Hero />
    </>
  );
});

export default CryptosNotAuthUser;
