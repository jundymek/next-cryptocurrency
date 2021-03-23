import React, { useState } from 'react';
import { useAssetState } from '../../../context/assetContext';
import ActionButton from '../../shared/button/ActionButton';
import LoadingSpinner from '../../shared/loadingSpinner/LoadingSpinner';
import Total from '../../total/Total';
import CryptoInAsset from '../crypto/cryptoInAsset/CryptoInAsset';
import { CryptoData } from '../Cryptos';
import AddNewAssetForm from './addNewAssetForm/AddNewAssetForm';

interface CryptoInAssetUserProps {
  cryptos?: CryptoData[];
}

const CryptosAuthUser = React.memo<CryptoInAssetUserProps>(({ cryptos }) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const { assets, isLoading } = useAssetState();

  const getAsset = (currency: string) => {
    return assets?.filter((item) => item.currencyName === currency)[0];
  };

  if (isLoading || !cryptos) {
    return <LoadingSpinner />;
  }

  const notInAssets = cryptos?.filter(
    (item: CryptoData) => !assets?.some((asset) => asset.currencyName === item.firstCurrency),
  );

  const toggleAddFormVisible = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-2 text-white z-10 flex flex-col justify-center items-center">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-xl md:text-4xl">Your assets</h2>
          <Total />
        </div>
        {isLoading || !cryptos ? (
          <LoadingSpinner />
        ) : (
          <>
            <ul className="list-none mt-4 py-2 w-full mx-auto flex flex-wrap justify-center">
              {cryptos?.map((item: CryptoData) => (
                <CryptoInAsset key={item.name} crypto={item} asset={getAsset(item.firstCurrency)} />
              ))}
            </ul>
            {notInAssets.length > 0 && !isAddFormVisible && (
              <div className="mt-4 sm:mt-8 sm:self-end">
                <ActionButton handleFunction={toggleAddFormVisible} text="add new asset" />
              </div>
            )}
            {isAddFormVisible && (
              <AddNewAssetForm cryptos={notInAssets} toggleAddFormVisible={toggleAddFormVisible} />
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default CryptosAuthUser;
