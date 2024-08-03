import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Login() {

  // Created useState variable to implement Login mechanism.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginNow = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      email: email,
      password: password
    });
    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem('currentuser', JSON.stringify(response.data.user));
      toast.loading('Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <h1 className='signup-login-heading'>USER LOGIN</h1>
      <form className='signup-login-form' onSubmit={loginNow}>
        <input 
          type='email' 
          placeholder='Email' 
          className='user-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type='password' 
          placeholder='Password' 
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn-auth' type='submit'>Login</button>
      </form>

      <Link to='/signup' className="signup-login-link"> Don't have an account? SIGNUP</Link>
      <Toaster />
    </div>
  );
}

export default Login;
