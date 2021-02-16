import React from 'react';
import Hero from '../hero/Hero';
import CryptoNotInAsset from './crypto/cryptoNotInAsset/CryptoNotInAsset';
import { CryptoData } from './Cryptos';

interface CryptoNotInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosNotAuthUser = React.memo<CryptoNotInAssetUserProps>(({ visibleCryptos }) => {
  return (
    <>
      <Hero />
      <ul className="list-none sm:mt-20 p-2 w-full sm:w-1/2 transform z-10 pb-20">
        {visibleCryptos?.map((item: CryptoData) => (
          <CryptoNotInAsset key={item.name} crypto={item} />
        ))}
      </ul>
    </>
  );
});

export default CryptosNotAuthUser;
