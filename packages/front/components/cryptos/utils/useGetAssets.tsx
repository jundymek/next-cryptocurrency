import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from '../../../context/authContext';

interface Asset {
  currencyName: string;
  amount: number;
}

export function useGetAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { token } = useAuthState();
  const router = useRouter();
  async function getAssets() {
    if (token) {
      const response = await fetch('http://localhost:3001/api/assets', {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        return router.push('/login');
      }
      const assets: Asset[] = await response.json();
      return setAssets(assets);
    }
  }

  useEffect(() => {
    getAssets();
  }, []);

  return assets;
}
