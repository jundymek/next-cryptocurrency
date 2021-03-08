import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { useAuthDispatch, useAuthState } from '../../context/authContext';

const LoginLogout = () => {
  const { username } = useAuthState();
  const { setUsername, setToken } = useAuthDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('http://localhost:3001/api/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(undefined);
    setToken(undefined);
    router.push('/');
  };
  return (
    <div>
      {username ? (
        <div className="flex flex-col items-end">
          <p className="text-xs text-gray-300">
            Logged as <span className="underline">{username}</span>
          </p>
          <button className="text-red-400 underline text-xs" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link
            href={{
              pathname: '/login',
              query: { isRegisterOpen: false },
            }}
          >
            <span className="text-xs text-green-400 underline cursor-pointer">Log in</span>
          </Link>{' '}
          or{' '}
          <Link
            href={{
              pathname: '/login',
              query: { isRegisterOpen: true },
            }}
          >
            <span className="text-xs text-blue-400 underline cursor-pointer">Register</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginLogout;
