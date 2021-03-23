import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// @ts-ignore
import logo from '../../assets/logo1.svg';
import { login } from './utils/login';
import { register } from './utils/register';

const LoginWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

interface LabelProps {
  usernameInputFocused: boolean;
  passwordInputFocused: boolean;
}

const StyledUsernameLabel = styled.label<Partial<LabelProps>>`
  color: ${(props) => props.usernameInputFocused && '#888888'};
  transition: 0.3s;
  transform: ${(props) => props.usernameInputFocused && 'translateY(-1.75rem) scale(.9)'};
`;

const StyledPasswordLabel = styled.label<Partial<LabelProps>>`
  color: ${(props) => props.passwordInputFocused && '#888888'};
  transition: 0.3s;
  transform: ${(props) => props.passwordInputFocused && 'translateY(-1.75rem) scale(.9)'};
`;

interface AuthFormProps {
  handleFlip?: () => void;
  variant: 'login' | 'register';
}

const AuthForm = React.memo<AuthFormProps>(({ variant, handleFlip }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [usernameInputFocused, setUsernameInputFocused] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

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
    if (variant === 'register') {
      const res = await register(payload);
      if (res === 409) {
        setError('User already exist');
      } else {
        processLogin(payload);
      }
    } else {
      processLogin(payload);
    }
  };

  async function processLogin(payload: { username: string; password: string }) {
    const response = await login(payload);
    if (response === 404) {
      setError('Credentials not valid');
    } else if (response !== 200) {
      setError('Something went wrong');
    } else {
      router.push('/');
    }
  }

  return (
    <LoginWrapper>
      <div className="grid place-items-center mx-2">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
          px-6 py-10 sm:px-10 sm:py-6 max-w-md 
          bg-white rounded-lg shadow-md lg:shadow-lg text-g"
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

          <img src={logo} alt="Logo" className="max-w-20 max-h-20 sm:max-w-28 sm:max-h-28" />
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            {variant === 'login' ? 'Login' : 'Register'}
          </h2>

          <form className="mt-10 flex flex-col" method="POST" onSubmit={handleSubmit}>
            <div className="relative">
              <StyledUsernameLabel
                usernameInputFocused={usernameInputFocused}
                className="absolute left-0 top-6 text-gray-800"
                htmlFor={`${variant}-username`}
              >
                Username
              </StyledUsernameLabel>
              <input
                id={`${variant}-username`}
                type="text"
                name="username"
                className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                     focus:outline-none focus:border-gray-200"
                required
                onChange={handleUsernameChange}
                onFocus={() => setUsernameInputFocused(true)}
                onBlur={() => !username.length && setUsernameInputFocused(false)}
              />
            </div>
            <div className="relative mt-2">
              <StyledPasswordLabel
                passwordInputFocused={passwordInputFocused}
                className="absolute left-0 top-6 text-gray-800"
                htmlFor={`${variant}-password`}
              >
                Password
              </StyledPasswordLabel>
              <input
                type="password"
                name="password"
                className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
                onChange={handlePasswordChange}
                onFocus={() => setPasswordInputFocused(true)}
                onBlur={() => !password.length && setPasswordInputFocused(false)}
              />
            </div>
            <button
              type="submit"
              className="w-3/4 mx-auto py-3 mt-10 bg-yellow-600 rounded-sm 
                  font-medium text-white uppercase
                  focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              {variant === 'login' ? 'Login' : 'Register'}
            </button>

            <div className="mt-8 sm:mb-4 text-sm self-end">
              <button type="button" onClick={handleFlip} className="flex-2 underline">
                {variant === 'login' ? 'Create an Account' : 'Log in'}
              </button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </LoginWrapper>
  );
});

export default AuthForm;
