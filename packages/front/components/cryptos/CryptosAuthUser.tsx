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
    <div className="w-full sm:w-6/12">
      <div className="max-w-md mx-auto">
        In portfolio:
        <ul className="list-none mt-4 p-2 w-full ">
          {visibleCryptos?.map((item: CryptoData) => (
            <CryptoInAsset key={item.name} crypto={item} asset={getAsset(item.firstCurrency)} />
          ))}
        </ul>
      </div>
      <div className="max-w-md mx-auto">
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
