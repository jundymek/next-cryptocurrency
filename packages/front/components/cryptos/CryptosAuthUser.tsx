import React from 'react';
import LoadingSpinner from '../shared/loadingSpinner/LoadingSpinner';
import CryptoInAsset from './crypto/CryptoInAsset';
import CryptoNotInAsset from './crypto/CryptoNotInAsset';
import { CryptoData } from './Cryptos';
import { useGetAssets } from './utils/useGetAssets';

interface CryptoInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosAuthUser = React.memo<CryptoInAssetUserProps>(({ visibleCryptos }) => {
  const { assets, isLoading } = useGetAssets();

  const getAsset = (currency: string) => {
    return assets.filter((item) => item.currencyName === currency)[0];
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full flex flex-col sm:flex-row">
      <div className="w-full sm:w-3/5 text-white z-10">
        In portfolio:
        <ul className="list-none mt-4 p-2 w-full flex flex-wrap justify-center">
          {visibleCryptos?.map((item: CryptoData) => (
            <CryptoInAsset key={item.name} crypto={item} asset={getAsset(item.firstCurrency)} />
          ))}
        </ul>
      </div>
      <div className="sm:w-1/3">
        Not in portfolio:
        <ul className="list-none mt-4 p-2 w-full transform">
          {visibleCryptos
            ?.filter(
              (item: CryptoData) =>
                !assets.some((asset) => asset.currencyName === item.firstCurrency),
            )
            .map((item: CryptoData) => (
              <CryptoNotInAsset key={item.name} crypto={item} />
            ))}
        </ul>
      </div>
    </div>
  );
});

export default CryptosAuthUser;
