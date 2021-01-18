import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LoginLogout = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:3001/api/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(undefined);
    router.push('/');
  };
  return (
    <div>
      {username ? (
        <div className="flex flex-col items-end">
          <p className="text-xs">
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
