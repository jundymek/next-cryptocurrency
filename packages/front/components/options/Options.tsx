import React from 'react';
import clsx from 'clsx';
import { Currency } from '../cryptos/Cryptos';
import { OptionsContext } from '../../context/optionsContext';

interface OptionsProps {
  listOfCurrences: Currency[];
  setListOfCurrences: React.Dispatch<React.SetStateAction<Currency[]>>;
}

const Options = React.memo<OptionsProps>(({ listOfCurrences, setListOfCurrences }) => {
  const { isOptionsOpen } = React.useContext(OptionsContext);

  const optionsClass = clsx(
    'h-screen w-1/2 md:w-60 bg-blue-300 fixed top-0 left-0 transition-transform duration-500 opacity-90 py-6',
    isOptionsOpen ? 'transform translate-x-0' : 'transform -translate-x-64 invisible',
  );

  const toggleVisibility = (currency: Currency) => {
    setListOfCurrences((prevState) => {
      const modifiedVisibility = prevState.map((item) => {
        if (item.symbol === currency.symbol) {
          return { ...item, isVisible: !item.isVisible };
        } else {
          return item;
        }
      });
      return modifiedVisibility;
    });
  };

  return (
    <section className={optionsClass}>
      <h2 className="text-center text-xl">Show:</h2>
      {listOfCurrences.map((currency) => (
        <div key={currency.symbol} className="flex items-center py-2 px-4">
          <input
            type="checkbox"
            checked={currency.isVisible}
            className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
            onChange={() => toggleVisibility(currency)}
          />
          <span className="px-2">
            {currency.name} {currency.symbol}
          </span>
        </div>
      ))}
    </section>
  );
});

export default Options;
