import React from 'react';
import { Icon } from '@iconify/react';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import squareEditOutline from '@iconify/icons-mdi/square-edit-outline';
import deleteOutline from '@iconify/icons-mdi/delete-outline';
import { Asset, useAssetDispatch } from '../../../../context/assetContext';
import { CryptoData } from '../../Cryptos';
import { useWindowWidth } from '../../../../customHooks/useWindowWidth';
import { useAuthState } from '../../../../context/authContext';

interface AssetTableItemProps {
  crypto: CryptoData;
  animate?: string;
  asset?: Asset;
}

const AssetTableItem = ({ crypto, asset }: AssetTableItemProps) => {
  const { firstCurrency, name, price } = crypto;
  const { token } = useAuthState();
  const { setAssets } = useAssetDispatch();

  const windowWidth = useWindowWidth();
  const cryptoIconSize = windowWidth < 1024 ? 32 : 64;

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
  return (
    <tr className="w-full h-24 bg-gray-900 rounded-md px-4 hover:bg-gray-700 transition-colors duration-200 text-gray-300 text-sm sm:text-2xl ml-2 md:ml-12 font-sans">
      <td className="border-r border-gray-600">
        <div className="flex items-center ml-4">
          <CryptoIcon i={firstCurrency.toLowerCase()} size={cryptoIconSize} />
          <h3 className="ml-4 w-20 sm:w-full">
            {name} <span className="text-md font-bold ">({firstCurrency})</span>
          </h3>
        </div>
      </td>
      <td className="text-center border-r border-gray-600">{asset?.amount}</td>
      <td className="text-center border-r border-gray-600">
        {asset && parseFloat((asset.amount * parseFloat(price)).toPrecision(5))} PLN
      </td>
      <td className="w-12">
        <div className="flex items-center justify-center">
          <button
            className="text-2xl sm:text-4xl lg:text-6xl md:mr-4 transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
            // onClick={handleToggleEdit}
            title="Edit"
          >
            <Icon icon={squareEditOutline} className="text-yellow-600" />
          </button>
          <button
            className="text-2xl sm:text-4xl lg:text-6xl transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
            onClick={handleDelete}
            // onClick={handleOpenDeleteModal}
            title="Delete"
          >
            <Icon icon={deleteOutline} className="text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AssetTableItem;
