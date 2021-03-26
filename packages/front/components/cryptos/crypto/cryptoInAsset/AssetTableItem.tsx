import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import squareEditOutline from '@iconify/icons-mdi/square-edit-outline';
import deleteOutline from '@iconify/icons-mdi/delete-outline';
import { Asset, useAssetDispatch } from '../../../../context/assetContext';
import { CryptoData } from '../../Cryptos';
import { useWindowWidth } from '../../../../customHooks/useWindowWidth';
import { useAuthState } from '../../../../context/authContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AssetTableEditForm from './AssetTableEditForm';
import { FinalAsset } from './AssetTable';

interface AssetTableItemProps {
  animate?: string;
  asset: FinalAsset;
}

const AssetTableItem = ({ asset }: AssetTableItemProps) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const { currency, currencyName, amount, price } = asset;
  const { token } = useAuthState();
  const { setAssets } = useAssetDispatch();

  const windowWidth = useWindowWidth();
  const cryptoIconSize = windowWidth < 1024 ? 32 : 64;

  const handleToggleEdit = () => {
    setIsEditVisible((prevState) => !prevState);
  };

  const handleOpenConfirmModal = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        setTimeout(() => {
          onClose();
        }, 1000);
        return (
          <div className="w-96 h-64 bg-black text-white p-4 flex flex-col items-center justify-center rounded-md">
            <h3 className="text-xl">{currencyName} was removed</h3>
          </div>
        );
      },
    });
  };

  const handleOpenDeleteModal = async () => {
    console.log('dupa');
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="w-9/10 mx-auto sm:w-96 h-64 bg-black text-white p-4 flex flex-col items-center rounded-md">
            <h3 className="text-xl mt-8">Are you sure?</h3>
            <div className="h-full flex flex-col justify-center">
              <p className="mb-10 text-center">
                You want to remove <span>{currencyName}</span> from your wallet?
              </p>
              <div className="flex w-1/2 self-end">
                <button className="mr-2 border border-white py-2 w-20" onClick={onClose}>
                  <span className="p-2">No</span>
                </button>
                <button
                  className="mr-2 border border-white  py-2 w-20"
                  onClick={async () => {
                    await handleDelete();
                    handleOpenConfirmModal();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const handleDelete = async () => {
    if (token && asset) {
      const payload = { id: asset.id };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(payload),
      });
      setAssets((prevState) => prevState.filter((item) => item.id !== asset.id));
    }
  };

  if (asset?.amount) {
    if (!isEditVisible) {
      return (
        <>
          <tr className="h-16 sm:h-20 bg-gray-900 rounded-md text-gray-300 text-sm sm:text-2xl font-sans">
            <td>
              <div className="flex items-center px-4">
                <CryptoIcon i={currency.toLowerCase()} size={cryptoIconSize} />
                <h3 className="px-4  sm:w-full">
                  {currencyName} <span className="text-md font-bold ">({currency})</span>
                </h3>
              </div>
            </td>
            <td className="text-center">{amount}</td>
            <td className="text-center">
              {parseFloat((amount * parseFloat(price)).toPrecision(5))} PLN
            </td>
            <td className="w-12">
              <div className="flex items-center justify-center px-2">
                <button
                  className="text-2xl sm:text-4xl lg:text-6xl md:mr-4 transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
                  onClick={handleToggleEdit}
                  title="Edit"
                >
                  <Icon icon={squareEditOutline} className="text-gray-600 hover:text-yellow-600" />
                </button>
                <button
                  className="text-2xl sm:text-4xl lg:text-6xl transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
                  onClick={handleOpenDeleteModal}
                  title="Delete"
                >
                  <Icon icon={deleteOutline} className="text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="h-2"></tr>
        </>
      );
    }
    return (
      <AssetTableEditForm
        crypto={crypto}
        asset={asset}
        handleOpenDeleteModal={handleOpenDeleteModal}
        setIsEditVisible={setIsEditVisible}
        windowWidth={windowWidth}
      />
    );
  }
  return null;
};

export default AssetTableItem;
