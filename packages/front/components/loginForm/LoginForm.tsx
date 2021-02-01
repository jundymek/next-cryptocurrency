import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LogoImage from '../header/LogoImage';
import Link from 'next/link';

interface Props {
  handleFlip?: () => void;
}

const LoginForm = React.memo<Props>(({ handleFlip }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { username, password };
    console.log(username, password);
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const { token } = await response.json();
    if (response.status !== 200) {
      setError('Credentials not valid');
      console.log('Credentials not valid');
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      router.push('/');
    }
  };

  return (
    <>
      <div className="grid place-items-center mx-2">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
              px-6 py-10 sm:px-10 sm:py-6 
              bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <Link href="/">
            <a title="Home page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 float-right text-blue-500 hover:text-blue-800 transform transition-colors duration-300 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </Link>

          <LogoImage className="w-40 h-40 mx-auto" />
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Login</h2>

          <form className="mt-10" method="POST" onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              autoComplete="username"
              className="block w-full py-3 px-1 mt-2 
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-100
                      focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              onChange={handleUsernameChange}
            />

            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-100
                      focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              onChange={handlePasswordChange}
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm 
                      font-medium text-white uppercase
                      focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="mt-8 sm:mb-4 text-sm float-right">
              <button type="button" onClick={handleFlip} className="flex-2 underline">
                Create an Account
              </button>
            </div>
          </form>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  );
});

export default LoginForm;
