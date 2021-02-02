import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from '../../../context/authContext';

interface Asset {
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
      const assets: Asset[] = await response.json();
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
