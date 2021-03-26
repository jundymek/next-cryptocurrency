import React, { useEffect, useRef, useState } from 'react';
import { useAssetDispatch } from '../../../../context/assetContext';
import { useAuthState } from '../../../../context/authContext';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import { Icon } from '@iconify/react';
import contentSaveEditOutline from '@iconify/icons-mdi/content-save-edit-outline';
import closeBoxOutline from '@iconify/icons-mdi/close-box-outline';
import { FinalAsset } from './AssetTable';

interface AssetTableEditFormProps {
  asset: FinalAsset;
  handleOpenDeleteModal: () => Promise<void>;
  setIsEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}

const AssetTableEditForm = React.memo<AssetTableEditFormProps>(
  ({ asset, handleOpenDeleteModal, setIsEditVisible, windowWidth }) => {
    const { currency, price, id } = asset;
    const inputReference = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(asset.amount);
    const wrapperRef = useRef<HTMLTableRowElement>(null);
    const { setAssets } = useAssetDispatch();
    const { token } = useAuthState();

    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsEditVisible(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [wrapperRef]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (token) {
        const payload = { id: id, amount: amount };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets`, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(payload),
        });
        if (amount === 0) {
          handleOpenDeleteModal();
        } else {
          setAssets((prevState) =>
            prevState.map((item) => {
              if (item.currencyName === currency) return { ...item, amount: amount };
              return item;
            }),
          );
        }
        setIsEditVisible(false);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.valueAsNumber);
    };

    const cryptoIconSize = windowWidth < 1024 ? 32 : 64;

    return (
      <>
        <tr
          className="h-16 sm:h-20 bg-gray-700 rounded-md text-gray-300 text-sm sm:text-2xl font-sans"
          ref={wrapperRef}
        >
          <td>
            <div className="flex items-center px-4">
              <CryptoIcon i={currency.toLowerCase()} size={cryptoIconSize} />
              <h3 className="px-4 sm:w-full">
                {name} <span className="text-md font-bold ">({currency})</span>
              </h3>
            </div>
          </td>
          <td className="text-center">
            <input
              id={currency}
              ref={inputReference}
              type="number"
              step="0.000001"
              name={currency}
              onChange={handleChange}
              defaultValue={asset.amount.toString()}
              className="py-2 px-1 m-4 w-2/3
                            text-white appearance-none text-center md:text-3xl lg:text-4xl
                            border-b-2 border-gray-100 bg-transparent
                            focus:text-green-500 focus:outline-none focus:border-gray-200"
              required
            />
          </td>
          <td className="text-center">
            {amount ? parseFloat((amount * parseFloat(price)).toPrecision(5)) : 0} PLN
          </td>
          <td className="w-12">
            <div className="flex items-center justify-center px-2">
              <button
                className="text-2xl sm:text-4xl lg:text-6xl md:mr-4 transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
                title="Save"
                onClick={handleSubmit}
              >
                <Icon icon={contentSaveEditOutline} />
              </button>
              <button
                className="text-2xl sm:text-4xl lg:text-6xl transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
                title="Cancel"
                onClick={() => setIsEditVisible(false)}
              >
                <Icon icon={closeBoxOutline} />
              </button>
            </div>
          </td>
        </tr>
        <tr className="h-2"></tr>
      </>
    );
  },
);

export default AssetTableEditForm;
