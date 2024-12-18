import React, { useState } from 'react';
import { login } from '../api/auth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      localStorage.setItem('token', data.token);
      alert('Login Successful');
    } catch (error) {
      console.error(error.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
