import React, { useState } from 'react';
import { useAssetState } from '../../../context/assetContext';
import ActionButton from '../../shared/button/ActionButton';
import LoadingSpinner from '../../shared/loadingSpinner/LoadingSpinner';
import CryptoInAsset from '../crypto/cryptoInAsset/CryptoInAsset';
import CryptoNotInAsset from '../crypto/cryptoNotInAsset/CryptoNotInAsset';
import { CryptoData } from '../Cryptos';
import AddNewAssetForm from './addNewAssetForm/AddNewAssetForm';

interface CryptoInAssetUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosAuthUser = React.memo<CryptoInAssetUserProps>(({ visibleCryptos }) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const { assets, isLoading } = useAssetState();

  const getAsset = (currency: string) => {
    return assets?.filter((item) => item.currencyName === currency)[0];
  };

  const notInAssets = visibleCryptos?.filter(
    (item: CryptoData) => !assets?.some((asset) => asset.currencyName === item.firstCurrency),
  );

  const toggleAddFormVisible = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-2 text-white z-10 flex flex-col justify-center items-center">
        <ul className="list-none mt-4 w-full ms:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          {visibleCryptos?.map((item: CryptoData) => (
            <CryptoInAsset key={item.name} crypto={item} asset={getAsset(item.firstCurrency)} />
          ))}
        </ul>
        {notInAssets.length > 0 && !isAddFormVisible && (
          <ActionButton handleFunction={toggleAddFormVisible} text="ADD" />
        )}
        {isAddFormVisible && (
          <AddNewAssetForm cryptos={notInAssets} toggleAddFormVisible={toggleAddFormVisible} />
        )}
      </div>
      <div className="w-full">
        Not in portfolio:
        <ul className="list-none mt-4 p-2 w-full sm:w-2/3 mx-auto transform grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-4">
          {notInAssets.map((item: CryptoData) => (
            <CryptoNotInAsset key={item.name} crypto={item} />
          ))}
        </ul>
      </div>
    </div>
  );
});

export default CryptosAuthUser;
