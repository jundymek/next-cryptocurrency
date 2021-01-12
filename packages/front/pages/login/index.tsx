import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
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
    </form>
  );
};

export default Login;
