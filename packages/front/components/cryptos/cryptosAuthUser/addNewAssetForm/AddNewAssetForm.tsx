import React, { useState } from 'react';
import { CryptoData } from '../../Cryptos';
import Select from 'react-select';
import { useAuthState } from '../../../../context/authContext';
import { useAssetDispatch } from '../../../../context/assetContext';
import styled from 'styled-components';
import ActionButton from '../../../shared/button/ActionButton';
import { loadImage } from '../../../../helpers/loadImage';

const StyledInput = styled.input`
  &::placeholder {
    color: transparent;
  }
`;
interface LabelProps {
  inputFocused: boolean;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${(props) => (props.inputFocused ? 'white' : 'rgba(107, 114, 128, 1)')};
  transition: 1s;
  transform: ${(props) => (props.inputFocused ? 'translateY(-20px)' : 'translateY(-.2rem)')};
`;

interface AddNewAssetFormProps {
  cryptos: CryptoData[];
  toggleAddFormVisible: () => void;
}

const AddNewAssetForm = React.memo<AddNewAssetFormProps>(({ cryptos, toggleAddFormVisible }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [inputFocused, setInputFocused] = useState(amount > 0);
  const { setAssets } = useAssetDispatch();
  const { token } = useAuthState();

  const customStyles = {
    option: () => ({
      cursor: 'pointer',
      padding: 10,
      color: 'red',
      '&:hover': {
        backgroundColor: 'rgba(55, 65, 81, 1);',
      },
    }),
    control: () => ({
      borderRadius: '0.125rem',
      padding: 10,
      width: '100%',
      backgroundColor: 'rgba(17, 24, 39, .9)',
      border: '1px solid rgba(229, 231, 235, 1)',
      display: 'flex',
    }),
    valueContainer: () => ({
      width: '100%',
      color: 'red',
    }),
    menu: (_provided: any) => ({
      ..._provided,
      backgroundColor: 'rgba(17, 24, 39, 1)',
      color: 'red',
    }),
    placeholder: (_provided: any) => ({
      ..._provided,
      color: 'rgba(229, 231, 235, 1)',
    }),
  };

  const options = cryptos.map((item) => {
    return {
      value: item.firstCurrency,
      label: (
        <div className="flex items-center">
          <img
            src={loadImage(`./${item.firstCurrency.toLowerCase()}.svg`).default}
            alt={`${item.firstCurrency} icon`}
            className="h-6 w-6 rounded-full bg-gray-700"
          />
          <span className="text-gray-200 mx-4">{item.firstCurrency}</span>{' '}
          <span className="text-gray-200">({item.name})</span>
        </div>
      ),
    };
  });

  const handleChange = (value: any) => {
    setSelectedAsset(value.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      const payload = { currencyName: selectedAsset, amount: amount };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });
      const newAsset = await res.json();
      setAssets((prevState) => [...prevState, newAsset]);
      toggleAddFormVisible();
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center py-4 scale-up-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full px-4 sm:w-1/2 h-full">
        <label id="listbox-label" className="block text-sm font-medium text-white">
          Add selected asset
        </label>
        <Select
          options={options}
          styles={customStyles}
          placeholder="Select crypto..."
          onChange={handleChange}
          onBlur={(event) => event.preventDefault()}
        />
      </div>
      <div className="flex items-center justify-center relative">
        <StyledLabel
          id="listbox-label"
          className="text-sm font-medium text-white absolute bottom-0 left-0"
          inputFocused={inputFocused}
        >
          Amount
        </StyledLabel>
        <StyledInput
          id="amount"
          type="number"
          name="amount"
          step="0.000001"
          onChange={handleAmountChange}
          disabled={selectedAsset === ''}
          onFocus={() => setInputFocused(true)}
          onBlur={() => !amount && setInputFocused(false)}
          className="text-white appearance-none text-center text-2xl w-full h-14
                          border-b-2 border-gray-500 bg-transparent group
                          focus:text-yellow-500 focus:outline-none focus:border-white"
          required
        />
      </div>
      <div className="flex w-4/5 sm:w-auto sm:grid grid-cols-2 gap-4 mt-8">
        <ActionButton type="submit" text="submit" />
        <ActionButton handleFunction={toggleAddFormVisible} text="cancel" variant="cancel" />
      </div>
    </form>
  );
});

export default AddNewAssetForm;
