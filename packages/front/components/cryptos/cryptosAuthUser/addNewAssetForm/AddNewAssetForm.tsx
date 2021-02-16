import React, { useState } from 'react';
import { CryptoData } from '../../Cryptos';
import { Icon as CryptoIcon } from 'coinmarketcap-cryptocurrency-icons';
import Select from 'react-select';
import { Icon } from '@iconify/react';
import twotoneSaveAlt from '@iconify/icons-ic/twotone-save-alt';
import { useAuthState } from '../../../../context/authContext';
import { useRouter } from 'next/router';

interface AddNewAssetFormProps {
  cryptos: CryptoData[];
}

const AddNewAssetForm = React.memo<AddNewAssetFormProps>(({ cryptos }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const { token } = useAuthState();
  const router = useRouter();

  const customStyles = {
    option: () => ({
      borderBottom: '1px dotted pink',
      cursor: 'pointer',
      padding: 10,
      width: '100%',
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
    console.log(value);
    console.log(selectedAsset);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
    console.log(amount);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (token) {
      e.preventDefault();
      const payload = { currencyName: selectedAsset, amount: amount };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };
      const response = await fetch('http://localhost:3001/api/assets', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });
      console.log(response);
      router.reload();
    }
  };

  return (
    <form className="w-full flex items-center" onSubmit={handleSubmit}>
      <div className="w-full">
        <label id="listbox-label" className="block text-sm font-medium text-white">
          Add selected asset
        </label>
        <Select
          options={options}
          styles={customStyles}
          placeholder="Select crypto..."
          onChange={handleChange}
          width="600px"
          isSearchable={false}
        />
      </div>
      <div className="ml-10 flex flex-col justify-between">
        <label id="listbox-label" className="block text-sm font-medium text-white self-start">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          onChange={handleAmountChange}
          defaultValue={0}
          className="text-white appearance-none text-center text-2xl w-64 h-14
                          border-b-2 border-gray-100 bg-transparent
                          focus:text-green-500 focus:outline-none focus:border-gray-200"
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
