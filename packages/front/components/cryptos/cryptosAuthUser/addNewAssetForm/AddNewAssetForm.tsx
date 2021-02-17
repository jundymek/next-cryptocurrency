import React, { useState } from 'react';
import { CryptoData } from '../../Cryptos';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import Select from 'react-select';
import { Icon } from '@iconify/react';
import twotoneSaveAlt from '@iconify/icons-ic/twotone-save-alt';
import { useAuthState } from '../../../../context/authContext';
import { useAssetDispatch } from '../../../../context/assetContext';
import styled from 'styled-components';

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
}

const AddNewAssetForm = React.memo<AddNewAssetFormProps>(({ cryptos }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const [inputFocused, setInputFocused] = useState(amount > 0);

  const { setAssets } = useAssetDispatch();

  const { token } = useAuthState();

  console.log(amount);

  const customStyles = {
    option: () => ({
      borderBottom: '1px dotted pink',
      cursor: 'pointer',
      padding: 10,
      // width: '500px',
    }),
    control: () => ({
      borderRadius: 5,
      padding: 10,
      width: '100%',
      backgroundColor: 'white',
      display: 'flex',
    }),
    valueContainer: () => ({
      width: '100%',
    }),
    // menu: () => ({
    //   width: '300px',
    //   background: 'red',
    // }),
  };

  const options = cryptos.map((item) => {
    return {
      value: item.firstCurrency,
      label: (
        <div className="flex items-center">
          <CryptoIcon i={item.firstCurrency.toLowerCase()} className="h-6 w-6 rounded-full" />
          <span className="text-black mx-4">{item.firstCurrency}</span>{' '}
          <span className="text-black">({item.name})</span>
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
      await fetch('http://localhost:3001/api/assets', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });
      setAssets((prevState) => [...prevState, payload]);
    }
  };

  return (
    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
      <div className="w-full px-4 sm:w-1/2">
        <label id="listbox-label" className="block text-sm font-medium text-white">
          Add selected asset
        </label>
        <Select
          options={options}
          styles={customStyles}
          placeholder="Select crypto..."
          onChange={handleChange}
          isSearchable={false}
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
          onChange={handleAmountChange}
          onFocus={() => setInputFocused(true)}
          onBlur={() => !amount && setInputFocused(false)}
          className="text-white appearance-none text-center text-2xl w-full h-14
                          border-b-2 border-gray-500 bg-transparent group
                          focus:text-green-500 focus:outline-none focus:border-white"
          required
        />
      </div>
      <button className="ml-4" type="submit">
        <Icon icon={twotoneSaveAlt} className="h-14 w-14" />
      </button>
    </form>
  );
});

export default AddNewAssetForm;
