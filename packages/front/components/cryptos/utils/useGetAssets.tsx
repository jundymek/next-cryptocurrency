import { useEffect, useState } from 'react';

interface Asset {
  currencyName: string;
  amount: number;
}

export function useGetAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const token = localStorage.getItem('token');
  async function getAssets() {
    if (token) {
      const response = await fetch('http://localhost:3001/api/assets', {
        headers: {
          Authorization: token,
        },
      });
      const assets: Asset[] = await response.json();
      return setAssets(assets);
    }
  }

  useEffect(() => {
    getAssets();
  }, []);

  return assets;
}
