import React from 'react';
import Hero from '../hero/Hero';
import LoadingSpinner from '../shared/loadingSpinner/LoadingSpinner';
import CryptoNotInAsset from './crypto/cryptoNotInAsset/CryptoNotInAsset';
import { CryptoData } from './Cryptos';

interface CryptoNotInAssetUserProps {
  visibleCryptos?: CryptoData[];
  isLoading: boolean;
}

const CryptosNotAuthUser = React.memo<CryptoNotInAssetUserProps>(
  ({ visibleCryptos, isLoading }) => {
    return (
      <div className="flex flex-col lg:flex-row md:mx-8">
        <Hero />
        {isLoading ? (
          <div className="flex w-1/2 justify-center bg-black">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="list-none p-2 w-full lg:float-right self-start lg:w-1/2 transform z-10 sm:pb-10">
            {visibleCryptos?.map((item: CryptoData) => (
              <CryptoNotInAsset key={item.name} crypto={item} />
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default CryptosNotAuthUser;
