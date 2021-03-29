import React, { useState } from 'react';
import { useAssetState } from '../../../context/assetContext';
import ActionButton from '../../shared/button/ActionButton';
import LoadingSpinner from '../../shared/loadingSpinner/LoadingSpinner';
import Total from '../../total/Total';
import AssetTable from '../crypto/cryptoInAsset/AssetTable';
import { CryptoData } from '../Cryptos';
import AddNewAssetForm from './addNewAssetForm/AddNewAssetForm';

interface CryptoInAssetUserProps {
  cryptos: CryptoData[] | undefined;
}

const CryptosAuthUser = React.memo<CryptoInAssetUserProps>(({ cryptos }) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const { assets, isLoading } = useAssetState();

  const notInAssets = (cryptos: CryptoData[]) => {
    return cryptos.filter(
      (item: CryptoData) => !assets?.some((asset) => asset.currencyName === item.firstCurrency),
    );
  };

  const toggleAddFormVisible = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-2 text-white z-10 flex flex-col justify-center items-center">
        {isLoading || !cryptos ? (
          <LoadingSpinner />
        ) : (
          <>
            {!assets?.length ? (
              <div className="w-full flex flex-col items-center justify-center">
                <h3 className="px-4 text-2xl sm:text-4xl text-center tracking-wide font-bold">
                  Create your portfolio here. Simply add your asset.
                </h3>
                {!isAddFormVisible && (
                  <div className="mt-4 sm:mt-8">
                    <ActionButton handleFunction={toggleAddFormVisible} text="add new asset" />
                  </div>
                )}
                {isAddFormVisible && (
                  <AddNewAssetForm
                    cryptos={notInAssets(cryptos)}
                    toggleAddFormVisible={toggleAddFormVisible}
                  />
                )}
              </div>
            ) : (
              <>
                <Total />
                <AssetTable cryptos={cryptos} assets={assets} />
                {notInAssets.length > 0 && !isAddFormVisible && (
                  <div className="mt-4 sm:mt-8 sm:self-end">
                    <ActionButton handleFunction={toggleAddFormVisible} text="add new asset" />
                  </div>
                )}
                {isAddFormVisible && (
                  <AddNewAssetForm
                    cryptos={notInAssets(cryptos)}
                    toggleAddFormVisible={toggleAddFormVisible}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default CryptosAuthUser;
