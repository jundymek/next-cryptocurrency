import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from '../../../context/authContext';

export interface Asset {
  currencyName: string;
  amount: number;
}

export function useGetAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const { token } = useAuthState();
  const router = useRouter();
  async function getAssets() {
    if (token) {
      setisLoading(true);
      const response = await fetch('http://localhost:3001/api/assets', {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        setisLoading(false);
        return router.push('/login');
      }
      const res = await response.json();
      const assets = res.map((item: Asset) => ({
        currencyName: item.currencyName,
        amount: item.amount,
      }));
      setisLoading(false);
      return setAssets(assets);
    }
  }

  useEffect(() => {
    async function get() {
      await getAssets();
    }
    get();
  }, []);

  return { assets, isLoading };
}
