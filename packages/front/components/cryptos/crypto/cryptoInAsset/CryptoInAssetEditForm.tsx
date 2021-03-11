import React, { useEffect, useRef, useState } from 'react';
import { Asset, useAssetDispatch } from '../../../../context/assetContext';
import { useAuthState } from '../../../../context/authContext';
import { CryptoData } from '../../Cryptos';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import { Icon } from '@iconify/react';
import contentSaveEditOutline from '@iconify/icons-mdi/content-save-edit-outline';
import closeBoxOutline from '@iconify/icons-mdi/close-box-outline';
import { useWindowWidth } from '../../../../customHooks/useWindowWidth';

interface CryptoInAssetEditFormProps {
  crypto: CryptoData;
  asset: Asset;
  handleOpenDeleteModal: () => Promise<void>;
  setIsEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CryptoInAssetEditForm = React.memo<CryptoInAssetEditFormProps>(
  ({ crypto, asset, handleOpenDeleteModal, setIsEditVisible }) => {
    const { firstCurrency, name } = crypto;
    const inputReference = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(asset.amount);
    const wrapperRef = useRef<HTMLFormElement>(null);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (token) {
        const payload = { id: asset.id, amount: amount };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        await fetch(`${process.env.API_URL}/api/assets`, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(payload),
        });
        if (amount === 0) {
          handleOpenDeleteModal();
        } else {
          setAssets((prevState) =>
            prevState.map((item) => {
              if (item.currencyName === firstCurrency) return { ...item, amount: amount };
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

    const windowWidth = useWindowWidth();
    const cryptoIconSize = windowWidth < 1024 ? 32 : 64;

    return (
      <form
        action=""
        className="w-full h-24 bg-gray-900 flex items-center justify-between my-2 bg-transparent rounded-md px-4 opacity-90 text-gray-300"
        onSubmit={handleSubmit}
        ref={wrapperRef}
      >
        <div className="flex items-center w-4/5 justify-between text-sm">
          <div className="flex items-center">
            <CryptoIcon i={firstCurrency.toLowerCase()} size={cryptoIconSize} />
            <h3 className="lg:text-lg text-white ml-4 w-20 md:w-40">
              {name} <span className="text-md font-bold text-white">({firstCurrency})</span>
            </h3>
          </div>

          <input
            id={firstCurrency}
            ref={inputReference}
            type="number"
            step="0.000001"
            name={firstCurrency}
            onChange={handleChange}
            defaultValue={asset.amount.toString()}
            className="py-2 px-1 m-4 w-2/3
                            text-white appearance-none text-center md:text-3xl lg:text-4xl
                            border-b-2 border-gray-100 bg-transparent
                            focus:text-green-500 focus:outline-none focus:border-gray-200"
            required
          />
        </div>
        <div className="flex">
          <button
            className="text-2xl sm:text-4xl lg:text-6xl md:mr-4 transform transition-all duration-200 hover:text-gray-500 hover:scale-125"
            title="Save"
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
      </form>
    );
  },
);

export default CryptoInAssetEditForm;
