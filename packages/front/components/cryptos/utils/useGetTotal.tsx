import { useAssetState } from '../../../context/assetContext';
import { CryptoData } from '../Cryptos';

export function useGetTotal(cryptos: any) {
  const { assets } = useAssetState();

  const inAssets = cryptos.filter((item: CryptoData) =>
    assets?.some((asset) => asset.currencyName === item.firstCurrency),
  );

  const total = assets
    ?.map((item) => {
      const itemPrice = inAssets.find((el: CryptoData) => el.firstCurrency === item.currencyName)
        ?.price;
      return itemPrice ? parseFloat(itemPrice) * item.amount : 0;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0)
    .toFixed(2);

  return total;
}
