import React from 'react';
import { useAssetState } from '../../../context/assetContext';
import LoadingSpinner from '../../shared/loadingSpinner/LoadingSpinner';
import CryptoInAsset from '../crypto/cryptoInAsset/CryptoInAsset';
import CryptoNotInAsset from '../crypto/cryptoNotInAsset/CryptoNotInAsset';
import { CryptoData } from '../Cryptos';
import AddNewAssetForm from './addNewAssetForm/AddNewAssetForm';

interface CryptoInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosAuthUser = React.memo<CryptoInAssetUserProps>(({ visibleCryptos }) => {
  const { assets, isLoading } = useAssetState();

  const getAsset = (currency: string) => {
    return assets?.filter((item) => item.currencyName === currency)[0];
  };

  const notInAssets = visibleCryptos?.filter(
    (item: CryptoData) => !assets?.some((asset) => asset.currencyName === item.firstCurrency),
  );

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
        {notInAssets.length > 0 && <AddNewAssetForm cryptos={notInAssets} />}
      </div>
      <div className="sm:w-1/3">
        Not in portfolio:
        <ul className="list-none mt-4 p-2 w-full transform">
          {notInAssets.map((item: CryptoData) => (
            <CryptoNotInAsset key={item.name} crypto={item} />
          ))}
        </ul>
      </div>
    </div>
  );
});

export default CryptosAuthUser;
