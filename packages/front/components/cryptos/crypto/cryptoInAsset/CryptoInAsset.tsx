import React, { useEffect, useRef, useState } from 'react';
import { CryptoData } from '../../Cryptos';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
// @ts-ignore
import bgImage from '../../../../assets/bg_circle1.svg';
import CryptoInAssetEditForm from './CryptoInAssetEditForm';
import { useAuthState } from '../../../../context/authContext';
import { Asset, useAssetDispatch } from '../../../../context/assetContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Icon } from '@iconify/react';
import squareEditOutline from '@iconify/icons-mdi/square-edit-outline';
import deleteOutline from '@iconify/icons-mdi/delete-outline';
import { useWindowWidth } from '../../../../customHooks/useWindowWidth';

interface CryptoProps {
  crypto: CryptoData;
  animate?: string;
  asset?: Asset;
}

const CryptoInAsset = React.memo<CryptoProps>(({ crypto, asset }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const { firstCurrency, name, price } = crypto;
  const inputReference = useRef<HTMLInputElement>(null);
  const { token } = useAuthState();
  const { setAssets } = useAssetDispatch();

  useEffect(() => {
    if (isEditVisible) {
      inputReference.current?.focus();
    }
  }, [isEditVisible]);

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
            <h3 className="text-xl">{firstCurrency} was removed</h3>
          </div>
        );
      },
    });
  };

  const handleOpenDeleteModal = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="w-96 h-64 bg-black text-white p-4 flex flex-col items-center rounded-md">
            <h3 className="text-xl mt-8">Are you sure?</h3>
            <div className="h-full flex flex-col justify-center">
              <p className="mb-10 text-center">
                You want to remove <span>{firstCurrency}</span> from your wallet?
              </p>
              <div className="flex w-1/2 self-end">
                <button className="mr-2 border border-white px-6 py-2" onClick={onClose}>
                  <span className="p2">No</span>
                </button>
                <button
                  className="mr-2 border border-white px-6 py-2"
                  onClick={async () => {
                    await handleDelete();
                    handleOpenConfirmModal();
                  }}
                >
                  <span className="p2">Yes</span>
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
      await fetch(`http://localhost:3001/api/assets`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(payload),
      });
      setAssets((prevState) => prevState.filter((item) => item.id !== asset.id));
    }
  };

  const windowWidth = useWindowWidth();
  const cryptoIconSize = windowWidth < 1024 ? 32 : 64;

  if (asset?.amount) {
    if (!isEditVisible) {
      return (
        <li className="w-full h-24 bg-gray-900 flex items-center justify-between my-2 bg-transparent rounded-md px-4 opacity-90 hover:bg-gray-700 transition-colors duration-200 text-gray-300">
          <div className="flex items-center w-4/5 justify-between text-sm">
            <div className="flex items-center">
              <CryptoIcon i={firstCurrency.toLowerCase()} size={cryptoIconSize} />
              <h3 className="lg:text-lg  ml-4 w-20 md:w-40">
                {name} <span className="text-md font-bold ">({firstCurrency})</span>
              </h3>
              <span className="md:text-3xl lg:text-4xl ml-2 md:ml-12 font-sans">
                {asset.amount}
              </span>
            </div>
            <span className="ml-4 md:text-3xl lg:text-4xl font-sans ">
              {parseFloat((asset?.amount * parseFloat(price)).toPrecision(5))} PLN
            </span>
          </div>
          <div className="flex">
            <button
              className="text-2xl sm:text-4xl lg:text-6xl md:mr-4 transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
              onClick={handleToggleEdit}
              title="Edit"
            >
              <Icon icon={squareEditOutline} />
            </button>
            <button
              className="text-2xl sm:text-4xl lg:text-6xl transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
              onClick={handleOpenDeleteModal}
              title="Delete"
            >
              <Icon icon={deleteOutline} />
            </button>
          </div>
        </li>
      );
    }
    return (
      <CryptoInAssetEditForm
        crypto={crypto}
        asset={asset}
        handleOpenDeleteModal={handleOpenDeleteModal}
        setIsEditVisible={setIsEditVisible}
      />
    );
  }

  return null;
});

export default CryptoInAsset;
