import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

const Login = () => {
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
    <Layout title="Login page">
      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        <div className="border border-gray-500 flex justify-between">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={handleUsernameChange} />
        </div>
        <div className="border border-gray-500 flex justify-between">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handlePasswordChange} />
        </div>
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </Layout>
  );
};

export default Login;
