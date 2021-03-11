import React, { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthState {
  username: string | undefined;
  token: string | undefined;
}

interface Dispatch {
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthStateContext = React.createContext<AuthState>({
  username: undefined,
  token: undefined,
});

const AuthDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    async function checkAuthState() {
      if (token) {
        const isAuth = await checkToken(token);
        if (user && isAuth) {
          setUsername(user);
          setToken(token);
          return;
        }
        setUsername(undefined);
        setToken(undefined);
      }
    }
    checkAuthState();
  }, []);

  const state = { username, token };
  const dispatch = { setUsername, setToken };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };

async function checkToken(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/status`, {
    headers: {
      Authorization: token!,
    },
  });
  if (res.status === 200) {
    return true;
  } else {
    console.log('not logged');
    return false;
  }
}
