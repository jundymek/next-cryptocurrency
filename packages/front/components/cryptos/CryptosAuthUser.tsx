import React from 'react';
import LoadingSpinner from '../shared/loadingSpinner/LoadingSpinner';
import CryptoAuth from './crypto/CryptoAuth';
import CryptoNotAuth from './crypto/CryptoNotAuth';
import { CryptoData } from './Cryptos';
import { useGetAssets } from './utils/useGetAssets';

interface CryptoAuthUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosAuthUser = React.memo<CryptoAuthUserProps>(({ visibleCryptos }) => {
  const assets = useGetAssets();

  console.log(assets);

  const getAsset = (currency: string) => {
    return assets.filter((item) => item.currencyName === currency)[0];
  };

  if (!assets) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full sm:w-6/12">
      <div className="max-w-md mx-auto">
        In portfolio:
        <ul className="list-none mt-4 p-2 w-full">
          {visibleCryptos?.map((item: CryptoData) => (
            <CryptoAuth key={item.name} crypto={item} asset={getAsset(item.firstCurrency)} />
          ))}
        </ul>
      </div>
      <div className="max-w-md mx-auto">
        Not in portfolio:
        <ul className="list-none mt-4 p-2 w-full">
          {visibleCryptos
            ?.filter(
              (item: CryptoData) =>
                !assets.some((asset) => asset.currencyName === item.firstCurrency),
            )
            .map((item: CryptoData) => (
              <CryptoNotAuth key={item.name} crypto={item} />
            ))}
        </ul>
      </div>
    </div>
  );
});

export default CryptosAuthUser;
