import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { useAuthDispatch, useAuthState } from '../../context/authContext';
import UserIcon from '../icons/UserIcon';
import LoggedUserIcon from '../icons/LoggedUserIcon';

const LoginLogout = () => {
  const { username } = useAuthState();
  const { setUsername, setToken } = useAuthDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`);
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
          <div className="text-xs text-gray-300 flex flex-col justify-center items-center">
            <div title={username}>
              <LoggedUserIcon className="w-24 sm:w-14 h-24 sm:h-14" />
            </div>
            <button
              className="text-red-400 underline text-2xl sm:text-sm mt-10 sm:mt-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <UserIcon className="w-24 sm:w-14 h-24 sm:h-14" />
          <div className="text-gray-200 mt-10 sm:mt-2 flex flex-col items-center justify-center sm:block">
            <Link
              href={{
                pathname: '/login',
                query: { isRegisterOpen: false },
              }}
            >
              <span className="text-2xl sm:text-sm text-yellow-500 underline cursor-pointer">
                Log in
              </span>
            </Link>{' '}
            <span className="text-xs mx-2 py-4 sm:py-0">or </span>
            <Link
              href={{
                pathname: '/login',
                query: { isRegisterOpen: true },
              }}
            >
              <span className="text-2xl sm:text-sm text-blue-500 underline cursor-pointer">
                Register
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginLogout;
