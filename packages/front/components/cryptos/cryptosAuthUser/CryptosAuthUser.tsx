import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/loadingSpinner/LoadingSpinner';
import CryptoInAsset from '../crypto/CryptoInAsset';
import CryptoNotInAsset from '../crypto/CryptoNotInAsset';
import { CryptoData } from '../Cryptos';
import { useGetAssets, Asset } from '../utils/useGetAssets';
import AddNewAssetForm from './addNewAssetForm/AddNewAssetForm';

interface CryptoInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosAuthUser = React.memo<CryptoInAssetUserProps>(({ visibleCryptos }) => {
  const [visibleAssets, setVisibleAssets] = useState<Asset[]>([]);
  const [notInAssets, setNotInAssets] = useState<CryptoData[]>([]);
  const { assets, isLoading } = useGetAssets();

  const getAsset = (currency: string) => {
    return visibleAssets.filter((item) => item.currencyName === currency)[0];
  };

  useEffect(() => {
    const data = visibleCryptos?.filter(
      (item: CryptoData) => !assets.some((asset) => asset.currencyName === item.firstCurrency),
    );
    setNotInAssets(data);
    setVisibleAssets(assets);
  }, [assets]);

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
        {notInAssets.length > 0 && (
          <AddNewAssetForm
            cryptos={notInAssets}
            setVisibleAssets={setVisibleAssets}
            setNotInAssets={setNotInAssets}
          />
        )}
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
