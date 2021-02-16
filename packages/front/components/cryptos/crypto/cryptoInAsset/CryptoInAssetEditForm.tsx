import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAssetDispatch } from '../../../../context/assetContext';
import { useAuthState } from '../../../../context/authContext';
import { CryptoData } from '../../Cryptos';
import { Asset } from '../../utils/useGetAssets';

interface CryptoInAssetEditFormProps {
  isActive: boolean;
  crypto: CryptoData;
  asset: Asset;
}

const StyledForm = styled.div<Partial<CryptoInAssetEditFormProps>>`
  transition: max-height 0.3s ease-out, opacity 0.3s;
  overflow: hidden;
  height: auto;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  background: linear-gradient(90deg, rgb(106, 17, 203) 0%, rgb(37, 117, 252) 100%);
  max-height: ${(props) => (props.isActive ? `8rem` : 0)};
`;

const CryptoInAssetEditForm = React.memo<CryptoInAssetEditFormProps>(
  ({ isActive, crypto, asset }) => {
    const { firstCurrency } = crypto;
    const inputReference = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(asset.amount);

    const { setAssets } = useAssetDispatch();

    const { token } = useAuthState();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (token) {
        const payload = { currencyName: firstCurrency, amount: amount };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        await fetch(`http://localhost:3001/api/assets/${firstCurrency}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(payload),
        });
        setAssets((prevState) =>
          prevState.map((item) => {
            if (item.currencyName === firstCurrency) return { ...item, amount: amount };
            return item;
          }),
        );
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.valueAsNumber);
    };

    return (
      <StyledForm
        className="absolute bottom-0 left-0 w-full z-0 rounded-b-md h-32"
        isActive={isActive}
      >
        <form
          action=""
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-center font-mono px-4">
            <label htmlFor="newAmount" className="w-1/2 px-2">
              {firstCurrency} amount
            </label>
            <input
              id="newAmount"
              ref={inputReference}
              type="number"
              name="newAmount"
              onChange={handleChange}
              defaultValue={asset.amount.toString()}
              className="w-1/2 py-2 px-1 my-4
                        text-white appearance-none text-center 
                        border-b-2 border-gray-100 bg-transparent
                        focus:text-green-500 focus:outline-none focus:border-gray-200"
              required
            />
          </div>
          <button className="w-1/2 bg-purple-700 border border-white text-white h-10 rounded-md my-2 hover:bg-purple-800 transform transition-colors duration-300">
            Save
          </button>
        </form>
      </StyledForm>
    );
  },
);

export default CryptoInAssetEditForm;
