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
    const tok = localStorage.getItem('token');
    console.log(user);
    if (user && tok) {
      setUsername(user);
      setToken(tok);
    }
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
