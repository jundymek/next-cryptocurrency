import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from './authContext';

interface AssetProviderProps {
  children: React.ReactNode;
}

interface Asset {
  currencyName: string;
  amount: number;
}

interface Dispatch {
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

interface AssetStateProps {
  assets: Asset[] | undefined;
  isLoading: boolean;
}

const AssetStateContext = React.createContext<AssetStateProps>({
  assets: undefined,
  isLoading: false,
});

const AssetDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function AssetProvider({ children }: AssetProviderProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const { token } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    async function checkAssetState() {
      if (token) {
        console.log(token);
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
        const assets = await res.map((item: Asset) => ({
          currencyName: item.currencyName,
          amount: item.amount,
        }));
        setisLoading(false);
        console.log(assets);
        return setAssets(assets);
      }
    }
    checkAssetState();
  }, [token]);

  const state = { assets, isLoading };
  const dispatch = { setAssets };

  return (
    <AssetStateContext.Provider value={state}>
      <AssetDispatchContext.Provider value={dispatch}>{children}</AssetDispatchContext.Provider>
    </AssetStateContext.Provider>
  );
}

function useAssetState() {
  const context = React.useContext(AssetStateContext);
  if (context === undefined) {
    throw new Error('useAssetState must be used within a AssetProvider');
  }
  return context;
}
function useAssetDispatch() {
  const context = React.useContext(AssetDispatchContext);
  if (context === undefined) {
    throw new Error('useAssetDispatch must be used within a AssetProvider');
  }
  return context;
}

export { AssetProvider, useAssetState, useAssetDispatch };
